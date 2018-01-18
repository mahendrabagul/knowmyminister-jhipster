package io.github.knowmyminister.web.rest;

import io.github.knowmyminister.KnowMyMinisterApp;

import io.github.knowmyminister.domain.WorkExperience;
import io.github.knowmyminister.repository.WorkExperienceRepository;
import io.github.knowmyminister.service.WorkExperienceService;
import io.github.knowmyminister.repository.search.WorkExperienceSearchRepository;
import io.github.knowmyminister.service.dto.WorkExperienceDTO;
import io.github.knowmyminister.service.mapper.WorkExperienceMapper;
import io.github.knowmyminister.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.github.knowmyminister.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WorkExperienceResource REST controller.
 *
 * @see WorkExperienceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowMyMinisterApp.class)
public class WorkExperienceResourceIntTest {

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @Autowired
    private WorkExperienceMapper workExperienceMapper;

    @Autowired
    private WorkExperienceService workExperienceService;

    @Autowired
    private WorkExperienceSearchRepository workExperienceSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkExperienceMockMvc;

    private WorkExperience workExperience;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkExperienceResource workExperienceResource = new WorkExperienceResource(workExperienceService);
        this.restWorkExperienceMockMvc = MockMvcBuilders.standaloneSetup(workExperienceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkExperience createEntity(EntityManager em) {
        WorkExperience workExperience = new WorkExperience()
            .organization(DEFAULT_ORGANIZATION)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return workExperience;
    }

    @Before
    public void initTest() {
        workExperienceSearchRepository.deleteAll();
        workExperience = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkExperience() throws Exception {
        int databaseSizeBeforeCreate = workExperienceRepository.findAll().size();

        // Create the WorkExperience
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(workExperience);
        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isCreated());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeCreate + 1);
        WorkExperience testWorkExperience = workExperienceList.get(workExperienceList.size() - 1);
        assertThat(testWorkExperience.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testWorkExperience.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testWorkExperience.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testWorkExperience.getEndDate()).isEqualTo(DEFAULT_END_DATE);

        // Validate the WorkExperience in Elasticsearch
        WorkExperience workExperienceEs = workExperienceSearchRepository.findOne(testWorkExperience.getId());
        assertThat(workExperienceEs).isEqualToIgnoringGivenFields(testWorkExperience);
    }

    @Test
    @Transactional
    public void createWorkExperienceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workExperienceRepository.findAll().size();

        // Create the WorkExperience with an existing ID
        workExperience.setId(1L);
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(workExperience);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrganizationIsRequired() throws Exception {
        int databaseSizeBeforeTest = workExperienceRepository.findAll().size();
        // set the field null
        workExperience.setOrganization(null);

        // Create the WorkExperience, which fails.
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(workExperience);

        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isBadRequest());

        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = workExperienceRepository.findAll().size();
        // set the field null
        workExperience.setStartDate(null);

        // Create the WorkExperience, which fails.
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(workExperience);

        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isBadRequest());

        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = workExperienceRepository.findAll().size();
        // set the field null
        workExperience.setEndDate(null);

        // Create the WorkExperience, which fails.
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(workExperience);

        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isBadRequest());

        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWorkExperiences() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);

        // Get all the workExperienceList
        restWorkExperienceMockMvc.perform(get("/api/work-experiences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workExperience.getId().intValue())))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    public void getWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);

        // Get the workExperience
        restWorkExperienceMockMvc.perform(get("/api/work-experiences/{id}", workExperience.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workExperience.getId().intValue()))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkExperience() throws Exception {
        // Get the workExperience
        restWorkExperienceMockMvc.perform(get("/api/work-experiences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);
        workExperienceSearchRepository.save(workExperience);
        int databaseSizeBeforeUpdate = workExperienceRepository.findAll().size();

        // Update the workExperience
        WorkExperience updatedWorkExperience = workExperienceRepository.findOne(workExperience.getId());
        // Disconnect from session so that the updates on updatedWorkExperience are not directly saved in db
        em.detach(updatedWorkExperience);
        updatedWorkExperience
            .organization(UPDATED_ORGANIZATION)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(updatedWorkExperience);

        restWorkExperienceMockMvc.perform(put("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isOk());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeUpdate);
        WorkExperience testWorkExperience = workExperienceList.get(workExperienceList.size() - 1);
        assertThat(testWorkExperience.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testWorkExperience.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testWorkExperience.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testWorkExperience.getEndDate()).isEqualTo(UPDATED_END_DATE);

        // Validate the WorkExperience in Elasticsearch
        WorkExperience workExperienceEs = workExperienceSearchRepository.findOne(testWorkExperience.getId());
        assertThat(workExperienceEs).isEqualToIgnoringGivenFields(testWorkExperience);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkExperience() throws Exception {
        int databaseSizeBeforeUpdate = workExperienceRepository.findAll().size();

        // Create the WorkExperience
        WorkExperienceDTO workExperienceDTO = workExperienceMapper.toDto(workExperience);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWorkExperienceMockMvc.perform(put("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperienceDTO)))
            .andExpect(status().isCreated());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);
        workExperienceSearchRepository.save(workExperience);
        int databaseSizeBeforeDelete = workExperienceRepository.findAll().size();

        // Get the workExperience
        restWorkExperienceMockMvc.perform(delete("/api/work-experiences/{id}", workExperience.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean workExperienceExistsInEs = workExperienceSearchRepository.exists(workExperience.getId());
        assertThat(workExperienceExistsInEs).isFalse();

        // Validate the database is empty
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);
        workExperienceSearchRepository.save(workExperience);

        // Search the workExperience
        restWorkExperienceMockMvc.perform(get("/api/_search/work-experiences?query=id:" + workExperience.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workExperience.getId().intValue())))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkExperience.class);
        WorkExperience workExperience1 = new WorkExperience();
        workExperience1.setId(1L);
        WorkExperience workExperience2 = new WorkExperience();
        workExperience2.setId(workExperience1.getId());
        assertThat(workExperience1).isEqualTo(workExperience2);
        workExperience2.setId(2L);
        assertThat(workExperience1).isNotEqualTo(workExperience2);
        workExperience1.setId(null);
        assertThat(workExperience1).isNotEqualTo(workExperience2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkExperienceDTO.class);
        WorkExperienceDTO workExperienceDTO1 = new WorkExperienceDTO();
        workExperienceDTO1.setId(1L);
        WorkExperienceDTO workExperienceDTO2 = new WorkExperienceDTO();
        assertThat(workExperienceDTO1).isNotEqualTo(workExperienceDTO2);
        workExperienceDTO2.setId(workExperienceDTO1.getId());
        assertThat(workExperienceDTO1).isEqualTo(workExperienceDTO2);
        workExperienceDTO2.setId(2L);
        assertThat(workExperienceDTO1).isNotEqualTo(workExperienceDTO2);
        workExperienceDTO1.setId(null);
        assertThat(workExperienceDTO1).isNotEqualTo(workExperienceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(workExperienceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(workExperienceMapper.fromId(null)).isNull();
    }
}

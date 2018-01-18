package io.github.knowmyminister.web.rest;

import io.github.knowmyminister.KnowMyMinisterApp;

import io.github.knowmyminister.domain.Minister;
import io.github.knowmyminister.repository.MinisterRepository;
import io.github.knowmyminister.service.MinisterService;
import io.github.knowmyminister.repository.search.MinisterSearchRepository;
import io.github.knowmyminister.service.dto.MinisterDTO;
import io.github.knowmyminister.service.mapper.MinisterMapper;
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
import java.util.List;

import static io.github.knowmyminister.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MinisterResource REST controller.
 *
 * @see MinisterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowMyMinisterApp.class)
public class MinisterResourceIntTest {

    private static final String DEFAULT_PERSONAL_BACKGROUND = "AAAAAAAAAA";
    private static final String UPDATED_PERSONAL_BACKGROUND = "BBBBBBBBBB";

    private static final String DEFAULT_FAMILY_BACKGROUND = "AAAAAAAAAA";
    private static final String UPDATED_FAMILY_BACKGROUND = "BBBBBBBBBB";

    private static final String DEFAULT_INTERESTS = "AAAAAAAAAA";
    private static final String UPDATED_INTERESTS = "BBBBBBBBBB";

    private static final String DEFAULT_IDEAL = "AAAAAAAAAA";
    private static final String UPDATED_IDEAL = "BBBBBBBBBB";

    private static final String DEFAULT_MOTTO = "AAAAAAAAAA";
    private static final String UPDATED_MOTTO = "BBBBBBBBBB";

    @Autowired
    private MinisterRepository ministerRepository;

    @Autowired
    private MinisterMapper ministerMapper;

    @Autowired
    private MinisterService ministerService;

    @Autowired
    private MinisterSearchRepository ministerSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMinisterMockMvc;

    private Minister minister;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MinisterResource ministerResource = new MinisterResource(ministerService);
        this.restMinisterMockMvc = MockMvcBuilders.standaloneSetup(ministerResource)
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
    public static Minister createEntity(EntityManager em) {
        Minister minister = new Minister()
            .personalBackground(DEFAULT_PERSONAL_BACKGROUND)
            .familyBackground(DEFAULT_FAMILY_BACKGROUND)
            .interests(DEFAULT_INTERESTS)
            .ideal(DEFAULT_IDEAL)
            .motto(DEFAULT_MOTTO);
        return minister;
    }

    @Before
    public void initTest() {
        ministerSearchRepository.deleteAll();
        minister = createEntity(em);
    }

    @Test
    @Transactional
    public void createMinister() throws Exception {
        int databaseSizeBeforeCreate = ministerRepository.findAll().size();

        // Create the Minister
        MinisterDTO ministerDTO = ministerMapper.toDto(minister);
        restMinisterMockMvc.perform(post("/api/ministers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministerDTO)))
            .andExpect(status().isCreated());

        // Validate the Minister in the database
        List<Minister> ministerList = ministerRepository.findAll();
        assertThat(ministerList).hasSize(databaseSizeBeforeCreate + 1);
        Minister testMinister = ministerList.get(ministerList.size() - 1);
        assertThat(testMinister.getPersonalBackground()).isEqualTo(DEFAULT_PERSONAL_BACKGROUND);
        assertThat(testMinister.getFamilyBackground()).isEqualTo(DEFAULT_FAMILY_BACKGROUND);
        assertThat(testMinister.getInterests()).isEqualTo(DEFAULT_INTERESTS);
        assertThat(testMinister.getIdeal()).isEqualTo(DEFAULT_IDEAL);
        assertThat(testMinister.getMotto()).isEqualTo(DEFAULT_MOTTO);

        // Validate the Minister in Elasticsearch
        Minister ministerEs = ministerSearchRepository.findOne(testMinister.getId());
        assertThat(ministerEs).isEqualToIgnoringGivenFields(testMinister);
    }

    @Test
    @Transactional
    public void createMinisterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ministerRepository.findAll().size();

        // Create the Minister with an existing ID
        minister.setId(1L);
        MinisterDTO ministerDTO = ministerMapper.toDto(minister);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMinisterMockMvc.perform(post("/api/ministers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Minister in the database
        List<Minister> ministerList = ministerRepository.findAll();
        assertThat(ministerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMinisters() throws Exception {
        // Initialize the database
        ministerRepository.saveAndFlush(minister);

        // Get all the ministerList
        restMinisterMockMvc.perform(get("/api/ministers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(minister.getId().intValue())))
            .andExpect(jsonPath("$.[*].personalBackground").value(hasItem(DEFAULT_PERSONAL_BACKGROUND.toString())))
            .andExpect(jsonPath("$.[*].familyBackground").value(hasItem(DEFAULT_FAMILY_BACKGROUND.toString())))
            .andExpect(jsonPath("$.[*].interests").value(hasItem(DEFAULT_INTERESTS.toString())))
            .andExpect(jsonPath("$.[*].ideal").value(hasItem(DEFAULT_IDEAL.toString())))
            .andExpect(jsonPath("$.[*].motto").value(hasItem(DEFAULT_MOTTO.toString())));
    }

    @Test
    @Transactional
    public void getMinister() throws Exception {
        // Initialize the database
        ministerRepository.saveAndFlush(minister);

        // Get the minister
        restMinisterMockMvc.perform(get("/api/ministers/{id}", minister.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(minister.getId().intValue()))
            .andExpect(jsonPath("$.personalBackground").value(DEFAULT_PERSONAL_BACKGROUND.toString()))
            .andExpect(jsonPath("$.familyBackground").value(DEFAULT_FAMILY_BACKGROUND.toString()))
            .andExpect(jsonPath("$.interests").value(DEFAULT_INTERESTS.toString()))
            .andExpect(jsonPath("$.ideal").value(DEFAULT_IDEAL.toString()))
            .andExpect(jsonPath("$.motto").value(DEFAULT_MOTTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMinister() throws Exception {
        // Get the minister
        restMinisterMockMvc.perform(get("/api/ministers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMinister() throws Exception {
        // Initialize the database
        ministerRepository.saveAndFlush(minister);
        ministerSearchRepository.save(minister);
        int databaseSizeBeforeUpdate = ministerRepository.findAll().size();

        // Update the minister
        Minister updatedMinister = ministerRepository.findOne(minister.getId());
        // Disconnect from session so that the updates on updatedMinister are not directly saved in db
        em.detach(updatedMinister);
        updatedMinister
            .personalBackground(UPDATED_PERSONAL_BACKGROUND)
            .familyBackground(UPDATED_FAMILY_BACKGROUND)
            .interests(UPDATED_INTERESTS)
            .ideal(UPDATED_IDEAL)
            .motto(UPDATED_MOTTO);
        MinisterDTO ministerDTO = ministerMapper.toDto(updatedMinister);

        restMinisterMockMvc.perform(put("/api/ministers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministerDTO)))
            .andExpect(status().isOk());

        // Validate the Minister in the database
        List<Minister> ministerList = ministerRepository.findAll();
        assertThat(ministerList).hasSize(databaseSizeBeforeUpdate);
        Minister testMinister = ministerList.get(ministerList.size() - 1);
        assertThat(testMinister.getPersonalBackground()).isEqualTo(UPDATED_PERSONAL_BACKGROUND);
        assertThat(testMinister.getFamilyBackground()).isEqualTo(UPDATED_FAMILY_BACKGROUND);
        assertThat(testMinister.getInterests()).isEqualTo(UPDATED_INTERESTS);
        assertThat(testMinister.getIdeal()).isEqualTo(UPDATED_IDEAL);
        assertThat(testMinister.getMotto()).isEqualTo(UPDATED_MOTTO);

        // Validate the Minister in Elasticsearch
        Minister ministerEs = ministerSearchRepository.findOne(testMinister.getId());
        assertThat(ministerEs).isEqualToIgnoringGivenFields(testMinister);
    }

    @Test
    @Transactional
    public void updateNonExistingMinister() throws Exception {
        int databaseSizeBeforeUpdate = ministerRepository.findAll().size();

        // Create the Minister
        MinisterDTO ministerDTO = ministerMapper.toDto(minister);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMinisterMockMvc.perform(put("/api/ministers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministerDTO)))
            .andExpect(status().isCreated());

        // Validate the Minister in the database
        List<Minister> ministerList = ministerRepository.findAll();
        assertThat(ministerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMinister() throws Exception {
        // Initialize the database
        ministerRepository.saveAndFlush(minister);
        ministerSearchRepository.save(minister);
        int databaseSizeBeforeDelete = ministerRepository.findAll().size();

        // Get the minister
        restMinisterMockMvc.perform(delete("/api/ministers/{id}", minister.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean ministerExistsInEs = ministerSearchRepository.exists(minister.getId());
        assertThat(ministerExistsInEs).isFalse();

        // Validate the database is empty
        List<Minister> ministerList = ministerRepository.findAll();
        assertThat(ministerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchMinister() throws Exception {
        // Initialize the database
        ministerRepository.saveAndFlush(minister);
        ministerSearchRepository.save(minister);

        // Search the minister
        restMinisterMockMvc.perform(get("/api/_search/ministers?query=id:" + minister.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(minister.getId().intValue())))
            .andExpect(jsonPath("$.[*].personalBackground").value(hasItem(DEFAULT_PERSONAL_BACKGROUND.toString())))
            .andExpect(jsonPath("$.[*].familyBackground").value(hasItem(DEFAULT_FAMILY_BACKGROUND.toString())))
            .andExpect(jsonPath("$.[*].interests").value(hasItem(DEFAULT_INTERESTS.toString())))
            .andExpect(jsonPath("$.[*].ideal").value(hasItem(DEFAULT_IDEAL.toString())))
            .andExpect(jsonPath("$.[*].motto").value(hasItem(DEFAULT_MOTTO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Minister.class);
        Minister minister1 = new Minister();
        minister1.setId(1L);
        Minister minister2 = new Minister();
        minister2.setId(minister1.getId());
        assertThat(minister1).isEqualTo(minister2);
        minister2.setId(2L);
        assertThat(minister1).isNotEqualTo(minister2);
        minister1.setId(null);
        assertThat(minister1).isNotEqualTo(minister2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MinisterDTO.class);
        MinisterDTO ministerDTO1 = new MinisterDTO();
        ministerDTO1.setId(1L);
        MinisterDTO ministerDTO2 = new MinisterDTO();
        assertThat(ministerDTO1).isNotEqualTo(ministerDTO2);
        ministerDTO2.setId(ministerDTO1.getId());
        assertThat(ministerDTO1).isEqualTo(ministerDTO2);
        ministerDTO2.setId(2L);
        assertThat(ministerDTO1).isNotEqualTo(ministerDTO2);
        ministerDTO1.setId(null);
        assertThat(ministerDTO1).isNotEqualTo(ministerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ministerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ministerMapper.fromId(null)).isNull();
    }
}

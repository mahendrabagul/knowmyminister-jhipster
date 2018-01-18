package io.github.knowmyminister.web.rest;

import io.github.knowmyminister.KnowMyMinisterApp;

import io.github.knowmyminister.domain.Award;
import io.github.knowmyminister.repository.AwardRepository;
import io.github.knowmyminister.service.AwardService;
import io.github.knowmyminister.repository.search.AwardSearchRepository;
import io.github.knowmyminister.service.dto.AwardDTO;
import io.github.knowmyminister.service.mapper.AwardMapper;
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
 * Test class for the AwardResource REST controller.
 *
 * @see AwardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowMyMinisterApp.class)
public class AwardResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ISSUER = "AAAAAAAAAA";
    private static final String UPDATED_ISSUER = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AwardRepository awardRepository;

    @Autowired
    private AwardMapper awardMapper;

    @Autowired
    private AwardService awardService;

    @Autowired
    private AwardSearchRepository awardSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAwardMockMvc;

    private Award award;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AwardResource awardResource = new AwardResource(awardService);
        this.restAwardMockMvc = MockMvcBuilders.standaloneSetup(awardResource)
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
    public static Award createEntity(EntityManager em) {
        Award award = new Award()
            .title(DEFAULT_TITLE)
            .startDate(DEFAULT_START_DATE)
            .issuer(DEFAULT_ISSUER)
            .description(DEFAULT_DESCRIPTION);
        return award;
    }

    @Before
    public void initTest() {
        awardSearchRepository.deleteAll();
        award = createEntity(em);
    }

    @Test
    @Transactional
    public void createAward() throws Exception {
        int databaseSizeBeforeCreate = awardRepository.findAll().size();

        // Create the Award
        AwardDTO awardDTO = awardMapper.toDto(award);
        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isCreated());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeCreate + 1);
        Award testAward = awardList.get(awardList.size() - 1);
        assertThat(testAward.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAward.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testAward.getIssuer()).isEqualTo(DEFAULT_ISSUER);
        assertThat(testAward.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Award in Elasticsearch
        Award awardEs = awardSearchRepository.findOne(testAward.getId());
        assertThat(awardEs).isEqualToIgnoringGivenFields(testAward);
    }

    @Test
    @Transactional
    public void createAwardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = awardRepository.findAll().size();

        // Create the Award with an existing ID
        award.setId(1L);
        AwardDTO awardDTO = awardMapper.toDto(award);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = awardRepository.findAll().size();
        // set the field null
        award.setTitle(null);

        // Create the Award, which fails.
        AwardDTO awardDTO = awardMapper.toDto(award);

        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isBadRequest());

        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = awardRepository.findAll().size();
        // set the field null
        award.setStartDate(null);

        // Create the Award, which fails.
        AwardDTO awardDTO = awardMapper.toDto(award);

        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isBadRequest());

        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIssuerIsRequired() throws Exception {
        int databaseSizeBeforeTest = awardRepository.findAll().size();
        // set the field null
        award.setIssuer(null);

        // Create the Award, which fails.
        AwardDTO awardDTO = awardMapper.toDto(award);

        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isBadRequest());

        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAwards() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);

        // Get all the awardList
        restAwardMockMvc.perform(get("/api/awards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(award.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].issuer").value(hasItem(DEFAULT_ISSUER.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);

        // Get the award
        restAwardMockMvc.perform(get("/api/awards/{id}", award.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(award.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.issuer").value(DEFAULT_ISSUER.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAward() throws Exception {
        // Get the award
        restAwardMockMvc.perform(get("/api/awards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);
        awardSearchRepository.save(award);
        int databaseSizeBeforeUpdate = awardRepository.findAll().size();

        // Update the award
        Award updatedAward = awardRepository.findOne(award.getId());
        // Disconnect from session so that the updates on updatedAward are not directly saved in db
        em.detach(updatedAward);
        updatedAward
            .title(UPDATED_TITLE)
            .startDate(UPDATED_START_DATE)
            .issuer(UPDATED_ISSUER)
            .description(UPDATED_DESCRIPTION);
        AwardDTO awardDTO = awardMapper.toDto(updatedAward);

        restAwardMockMvc.perform(put("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isOk());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeUpdate);
        Award testAward = awardList.get(awardList.size() - 1);
        assertThat(testAward.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAward.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testAward.getIssuer()).isEqualTo(UPDATED_ISSUER);
        assertThat(testAward.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Award in Elasticsearch
        Award awardEs = awardSearchRepository.findOne(testAward.getId());
        assertThat(awardEs).isEqualToIgnoringGivenFields(testAward);
    }

    @Test
    @Transactional
    public void updateNonExistingAward() throws Exception {
        int databaseSizeBeforeUpdate = awardRepository.findAll().size();

        // Create the Award
        AwardDTO awardDTO = awardMapper.toDto(award);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAwardMockMvc.perform(put("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isCreated());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);
        awardSearchRepository.save(award);
        int databaseSizeBeforeDelete = awardRepository.findAll().size();

        // Get the award
        restAwardMockMvc.perform(delete("/api/awards/{id}", award.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean awardExistsInEs = awardSearchRepository.exists(award.getId());
        assertThat(awardExistsInEs).isFalse();

        // Validate the database is empty
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);
        awardSearchRepository.save(award);

        // Search the award
        restAwardMockMvc.perform(get("/api/_search/awards?query=id:" + award.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(award.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].issuer").value(hasItem(DEFAULT_ISSUER.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Award.class);
        Award award1 = new Award();
        award1.setId(1L);
        Award award2 = new Award();
        award2.setId(award1.getId());
        assertThat(award1).isEqualTo(award2);
        award2.setId(2L);
        assertThat(award1).isNotEqualTo(award2);
        award1.setId(null);
        assertThat(award1).isNotEqualTo(award2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AwardDTO.class);
        AwardDTO awardDTO1 = new AwardDTO();
        awardDTO1.setId(1L);
        AwardDTO awardDTO2 = new AwardDTO();
        assertThat(awardDTO1).isNotEqualTo(awardDTO2);
        awardDTO2.setId(awardDTO1.getId());
        assertThat(awardDTO1).isEqualTo(awardDTO2);
        awardDTO2.setId(2L);
        assertThat(awardDTO1).isNotEqualTo(awardDTO2);
        awardDTO1.setId(null);
        assertThat(awardDTO1).isNotEqualTo(awardDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(awardMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(awardMapper.fromId(null)).isNull();
    }
}

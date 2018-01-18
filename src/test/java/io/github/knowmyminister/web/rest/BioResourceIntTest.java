package io.github.knowmyminister.web.rest;

import io.github.knowmyminister.KnowMyMinisterApp;

import io.github.knowmyminister.domain.Bio;
import io.github.knowmyminister.repository.BioRepository;
import io.github.knowmyminister.service.BioService;
import io.github.knowmyminister.repository.search.BioSearchRepository;
import io.github.knowmyminister.service.dto.BioDTO;
import io.github.knowmyminister.service.mapper.BioMapper;
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
 * Test class for the BioResource REST controller.
 *
 * @see BioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowMyMinisterApp.class)
public class BioResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NO = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_BORN = "AAAAAAAAAA";
    private static final String UPDATED_BORN = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Integer DEFAULT_SEX = 1;
    private static final Integer UPDATED_SEX = 2;

    private static final String DEFAULT_SPOUSE = "AAAAAAAAAA";
    private static final String UPDATED_SPOUSE = "BBBBBBBBBB";

    private static final String DEFAULT_CHILDREN = "AAAAAAAAAA";
    private static final String UPDATED_CHILDREN = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    @Autowired
    private BioRepository bioRepository;

    @Autowired
    private BioMapper bioMapper;

    @Autowired
    private BioService bioService;

    @Autowired
    private BioSearchRepository bioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBioMockMvc;

    private Bio bio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BioResource bioResource = new BioResource(bioService);
        this.restBioMockMvc = MockMvcBuilders.standaloneSetup(bioResource)
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
    public static Bio createEntity(EntityManager em) {
        Bio bio = new Bio()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .mobileNo(DEFAULT_MOBILE_NO)
            .email(DEFAULT_EMAIL)
            .born(DEFAULT_BORN)
            .age(DEFAULT_AGE)
            .sex(DEFAULT_SEX)
            .spouse(DEFAULT_SPOUSE)
            .children(DEFAULT_CHILDREN)
            .website(DEFAULT_WEBSITE);
        return bio;
    }

    @Before
    public void initTest() {
        bioSearchRepository.deleteAll();
        bio = createEntity(em);
    }

    @Test
    @Transactional
    public void createBio() throws Exception {
        int databaseSizeBeforeCreate = bioRepository.findAll().size();

        // Create the Bio
        BioDTO bioDTO = bioMapper.toDto(bio);
        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isCreated());

        // Validate the Bio in the database
        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeCreate + 1);
        Bio testBio = bioList.get(bioList.size() - 1);
        assertThat(testBio.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testBio.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testBio.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testBio.getMobileNo()).isEqualTo(DEFAULT_MOBILE_NO);
        assertThat(testBio.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testBio.getBorn()).isEqualTo(DEFAULT_BORN);
        assertThat(testBio.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testBio.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testBio.getSpouse()).isEqualTo(DEFAULT_SPOUSE);
        assertThat(testBio.getChildren()).isEqualTo(DEFAULT_CHILDREN);
        assertThat(testBio.getWebsite()).isEqualTo(DEFAULT_WEBSITE);

        // Validate the Bio in Elasticsearch
        Bio bioEs = bioSearchRepository.findOne(testBio.getId());
        assertThat(bioEs).isEqualToIgnoringGivenFields(testBio);
    }

    @Test
    @Transactional
    public void createBioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bioRepository.findAll().size();

        // Create the Bio with an existing ID
        bio.setId(1L);
        BioDTO bioDTO = bioMapper.toDto(bio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bio in the database
        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bioRepository.findAll().size();
        // set the field null
        bio.setFirstName(null);

        // Create the Bio, which fails.
        BioDTO bioDTO = bioMapper.toDto(bio);

        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isBadRequest());

        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bioRepository.findAll().size();
        // set the field null
        bio.setLastName(null);

        // Create the Bio, which fails.
        BioDTO bioDTO = bioMapper.toDto(bio);

        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isBadRequest());

        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBornIsRequired() throws Exception {
        int databaseSizeBeforeTest = bioRepository.findAll().size();
        // set the field null
        bio.setBorn(null);

        // Create the Bio, which fails.
        BioDTO bioDTO = bioMapper.toDto(bio);

        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isBadRequest());

        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bioRepository.findAll().size();
        // set the field null
        bio.setAge(null);

        // Create the Bio, which fails.
        BioDTO bioDTO = bioMapper.toDto(bio);

        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isBadRequest());

        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = bioRepository.findAll().size();
        // set the field null
        bio.setSex(null);

        // Create the Bio, which fails.
        BioDTO bioDTO = bioMapper.toDto(bio);

        restBioMockMvc.perform(post("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isBadRequest());

        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBios() throws Exception {
        // Initialize the database
        bioRepository.saveAndFlush(bio);

        // Get all the bioList
        restBioMockMvc.perform(get("/api/bios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bio.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].mobileNo").value(hasItem(DEFAULT_MOBILE_NO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].born").value(hasItem(DEFAULT_BORN.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX)))
            .andExpect(jsonPath("$.[*].spouse").value(hasItem(DEFAULT_SPOUSE.toString())))
            .andExpect(jsonPath("$.[*].children").value(hasItem(DEFAULT_CHILDREN.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())));
    }

    @Test
    @Transactional
    public void getBio() throws Exception {
        // Initialize the database
        bioRepository.saveAndFlush(bio);

        // Get the bio
        restBioMockMvc.perform(get("/api/bios/{id}", bio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bio.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME.toString()))
            .andExpect(jsonPath("$.mobileNo").value(DEFAULT_MOBILE_NO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.born").value(DEFAULT_BORN.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX))
            .andExpect(jsonPath("$.spouse").value(DEFAULT_SPOUSE.toString()))
            .andExpect(jsonPath("$.children").value(DEFAULT_CHILDREN.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBio() throws Exception {
        // Get the bio
        restBioMockMvc.perform(get("/api/bios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBio() throws Exception {
        // Initialize the database
        bioRepository.saveAndFlush(bio);
        bioSearchRepository.save(bio);
        int databaseSizeBeforeUpdate = bioRepository.findAll().size();

        // Update the bio
        Bio updatedBio = bioRepository.findOne(bio.getId());
        // Disconnect from session so that the updates on updatedBio are not directly saved in db
        em.detach(updatedBio);
        updatedBio
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .mobileNo(UPDATED_MOBILE_NO)
            .email(UPDATED_EMAIL)
            .born(UPDATED_BORN)
            .age(UPDATED_AGE)
            .sex(UPDATED_SEX)
            .spouse(UPDATED_SPOUSE)
            .children(UPDATED_CHILDREN)
            .website(UPDATED_WEBSITE);
        BioDTO bioDTO = bioMapper.toDto(updatedBio);

        restBioMockMvc.perform(put("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isOk());

        // Validate the Bio in the database
        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeUpdate);
        Bio testBio = bioList.get(bioList.size() - 1);
        assertThat(testBio.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testBio.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testBio.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testBio.getMobileNo()).isEqualTo(UPDATED_MOBILE_NO);
        assertThat(testBio.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBio.getBorn()).isEqualTo(UPDATED_BORN);
        assertThat(testBio.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testBio.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testBio.getSpouse()).isEqualTo(UPDATED_SPOUSE);
        assertThat(testBio.getChildren()).isEqualTo(UPDATED_CHILDREN);
        assertThat(testBio.getWebsite()).isEqualTo(UPDATED_WEBSITE);

        // Validate the Bio in Elasticsearch
        Bio bioEs = bioSearchRepository.findOne(testBio.getId());
        assertThat(bioEs).isEqualToIgnoringGivenFields(testBio);
    }

    @Test
    @Transactional
    public void updateNonExistingBio() throws Exception {
        int databaseSizeBeforeUpdate = bioRepository.findAll().size();

        // Create the Bio
        BioDTO bioDTO = bioMapper.toDto(bio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBioMockMvc.perform(put("/api/bios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bioDTO)))
            .andExpect(status().isCreated());

        // Validate the Bio in the database
        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBio() throws Exception {
        // Initialize the database
        bioRepository.saveAndFlush(bio);
        bioSearchRepository.save(bio);
        int databaseSizeBeforeDelete = bioRepository.findAll().size();

        // Get the bio
        restBioMockMvc.perform(delete("/api/bios/{id}", bio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean bioExistsInEs = bioSearchRepository.exists(bio.getId());
        assertThat(bioExistsInEs).isFalse();

        // Validate the database is empty
        List<Bio> bioList = bioRepository.findAll();
        assertThat(bioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchBio() throws Exception {
        // Initialize the database
        bioRepository.saveAndFlush(bio);
        bioSearchRepository.save(bio);

        // Search the bio
        restBioMockMvc.perform(get("/api/_search/bios?query=id:" + bio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bio.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].mobileNo").value(hasItem(DEFAULT_MOBILE_NO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].born").value(hasItem(DEFAULT_BORN.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX)))
            .andExpect(jsonPath("$.[*].spouse").value(hasItem(DEFAULT_SPOUSE.toString())))
            .andExpect(jsonPath("$.[*].children").value(hasItem(DEFAULT_CHILDREN.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bio.class);
        Bio bio1 = new Bio();
        bio1.setId(1L);
        Bio bio2 = new Bio();
        bio2.setId(bio1.getId());
        assertThat(bio1).isEqualTo(bio2);
        bio2.setId(2L);
        assertThat(bio1).isNotEqualTo(bio2);
        bio1.setId(null);
        assertThat(bio1).isNotEqualTo(bio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BioDTO.class);
        BioDTO bioDTO1 = new BioDTO();
        bioDTO1.setId(1L);
        BioDTO bioDTO2 = new BioDTO();
        assertThat(bioDTO1).isNotEqualTo(bioDTO2);
        bioDTO2.setId(bioDTO1.getId());
        assertThat(bioDTO1).isEqualTo(bioDTO2);
        bioDTO2.setId(2L);
        assertThat(bioDTO1).isNotEqualTo(bioDTO2);
        bioDTO1.setId(null);
        assertThat(bioDTO1).isNotEqualTo(bioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bioMapper.fromId(null)).isNull();
    }
}

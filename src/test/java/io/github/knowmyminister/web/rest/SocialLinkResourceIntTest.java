package io.github.knowmyminister.web.rest;

import io.github.knowmyminister.KnowMyMinisterApp;

import io.github.knowmyminister.domain.SocialLink;
import io.github.knowmyminister.repository.SocialLinkRepository;
import io.github.knowmyminister.service.SocialLinkService;
import io.github.knowmyminister.repository.search.SocialLinkSearchRepository;
import io.github.knowmyminister.service.dto.SocialLinkDTO;
import io.github.knowmyminister.service.mapper.SocialLinkMapper;
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
 * Test class for the SocialLinkResource REST controller.
 *
 * @see SocialLinkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowMyMinisterApp.class)
public class SocialLinkResourceIntTest {

    private static final String DEFAULT_PROVIDER = "AAAAAAAAAA";
    private static final String UPDATED_PROVIDER = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private SocialLinkRepository socialLinkRepository;

    @Autowired
    private SocialLinkMapper socialLinkMapper;

    @Autowired
    private SocialLinkService socialLinkService;

    @Autowired
    private SocialLinkSearchRepository socialLinkSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSocialLinkMockMvc;

    private SocialLink socialLink;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SocialLinkResource socialLinkResource = new SocialLinkResource(socialLinkService);
        this.restSocialLinkMockMvc = MockMvcBuilders.standaloneSetup(socialLinkResource)
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
    public static SocialLink createEntity(EntityManager em) {
        SocialLink socialLink = new SocialLink()
            .provider(DEFAULT_PROVIDER)
            .link(DEFAULT_LINK);
        return socialLink;
    }

    @Before
    public void initTest() {
        socialLinkSearchRepository.deleteAll();
        socialLink = createEntity(em);
    }

    @Test
    @Transactional
    public void createSocialLink() throws Exception {
        int databaseSizeBeforeCreate = socialLinkRepository.findAll().size();

        // Create the SocialLink
        SocialLinkDTO socialLinkDTO = socialLinkMapper.toDto(socialLink);
        restSocialLinkMockMvc.perform(post("/api/social-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialLinkDTO)))
            .andExpect(status().isCreated());

        // Validate the SocialLink in the database
        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeCreate + 1);
        SocialLink testSocialLink = socialLinkList.get(socialLinkList.size() - 1);
        assertThat(testSocialLink.getProvider()).isEqualTo(DEFAULT_PROVIDER);
        assertThat(testSocialLink.getLink()).isEqualTo(DEFAULT_LINK);

        // Validate the SocialLink in Elasticsearch
        SocialLink socialLinkEs = socialLinkSearchRepository.findOne(testSocialLink.getId());
        assertThat(socialLinkEs).isEqualToIgnoringGivenFields(testSocialLink);
    }

    @Test
    @Transactional
    public void createSocialLinkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = socialLinkRepository.findAll().size();

        // Create the SocialLink with an existing ID
        socialLink.setId(1L);
        SocialLinkDTO socialLinkDTO = socialLinkMapper.toDto(socialLink);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocialLinkMockMvc.perform(post("/api/social-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialLinkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SocialLink in the database
        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkProviderIsRequired() throws Exception {
        int databaseSizeBeforeTest = socialLinkRepository.findAll().size();
        // set the field null
        socialLink.setProvider(null);

        // Create the SocialLink, which fails.
        SocialLinkDTO socialLinkDTO = socialLinkMapper.toDto(socialLink);

        restSocialLinkMockMvc.perform(post("/api/social-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialLinkDTO)))
            .andExpect(status().isBadRequest());

        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLinkIsRequired() throws Exception {
        int databaseSizeBeforeTest = socialLinkRepository.findAll().size();
        // set the field null
        socialLink.setLink(null);

        // Create the SocialLink, which fails.
        SocialLinkDTO socialLinkDTO = socialLinkMapper.toDto(socialLink);

        restSocialLinkMockMvc.perform(post("/api/social-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialLinkDTO)))
            .andExpect(status().isBadRequest());

        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSocialLinks() throws Exception {
        // Initialize the database
        socialLinkRepository.saveAndFlush(socialLink);

        // Get all the socialLinkList
        restSocialLinkMockMvc.perform(get("/api/social-links?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialLink.getId().intValue())))
            .andExpect(jsonPath("$.[*].provider").value(hasItem(DEFAULT_PROVIDER.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }

    @Test
    @Transactional
    public void getSocialLink() throws Exception {
        // Initialize the database
        socialLinkRepository.saveAndFlush(socialLink);

        // Get the socialLink
        restSocialLinkMockMvc.perform(get("/api/social-links/{id}", socialLink.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(socialLink.getId().intValue()))
            .andExpect(jsonPath("$.provider").value(DEFAULT_PROVIDER.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSocialLink() throws Exception {
        // Get the socialLink
        restSocialLinkMockMvc.perform(get("/api/social-links/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSocialLink() throws Exception {
        // Initialize the database
        socialLinkRepository.saveAndFlush(socialLink);
        socialLinkSearchRepository.save(socialLink);
        int databaseSizeBeforeUpdate = socialLinkRepository.findAll().size();

        // Update the socialLink
        SocialLink updatedSocialLink = socialLinkRepository.findOne(socialLink.getId());
        // Disconnect from session so that the updates on updatedSocialLink are not directly saved in db
        em.detach(updatedSocialLink);
        updatedSocialLink
            .provider(UPDATED_PROVIDER)
            .link(UPDATED_LINK);
        SocialLinkDTO socialLinkDTO = socialLinkMapper.toDto(updatedSocialLink);

        restSocialLinkMockMvc.perform(put("/api/social-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialLinkDTO)))
            .andExpect(status().isOk());

        // Validate the SocialLink in the database
        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeUpdate);
        SocialLink testSocialLink = socialLinkList.get(socialLinkList.size() - 1);
        assertThat(testSocialLink.getProvider()).isEqualTo(UPDATED_PROVIDER);
        assertThat(testSocialLink.getLink()).isEqualTo(UPDATED_LINK);

        // Validate the SocialLink in Elasticsearch
        SocialLink socialLinkEs = socialLinkSearchRepository.findOne(testSocialLink.getId());
        assertThat(socialLinkEs).isEqualToIgnoringGivenFields(testSocialLink);
    }

    @Test
    @Transactional
    public void updateNonExistingSocialLink() throws Exception {
        int databaseSizeBeforeUpdate = socialLinkRepository.findAll().size();

        // Create the SocialLink
        SocialLinkDTO socialLinkDTO = socialLinkMapper.toDto(socialLink);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSocialLinkMockMvc.perform(put("/api/social-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialLinkDTO)))
            .andExpect(status().isCreated());

        // Validate the SocialLink in the database
        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSocialLink() throws Exception {
        // Initialize the database
        socialLinkRepository.saveAndFlush(socialLink);
        socialLinkSearchRepository.save(socialLink);
        int databaseSizeBeforeDelete = socialLinkRepository.findAll().size();

        // Get the socialLink
        restSocialLinkMockMvc.perform(delete("/api/social-links/{id}", socialLink.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean socialLinkExistsInEs = socialLinkSearchRepository.exists(socialLink.getId());
        assertThat(socialLinkExistsInEs).isFalse();

        // Validate the database is empty
        List<SocialLink> socialLinkList = socialLinkRepository.findAll();
        assertThat(socialLinkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSocialLink() throws Exception {
        // Initialize the database
        socialLinkRepository.saveAndFlush(socialLink);
        socialLinkSearchRepository.save(socialLink);

        // Search the socialLink
        restSocialLinkMockMvc.perform(get("/api/_search/social-links?query=id:" + socialLink.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialLink.getId().intValue())))
            .andExpect(jsonPath("$.[*].provider").value(hasItem(DEFAULT_PROVIDER.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SocialLink.class);
        SocialLink socialLink1 = new SocialLink();
        socialLink1.setId(1L);
        SocialLink socialLink2 = new SocialLink();
        socialLink2.setId(socialLink1.getId());
        assertThat(socialLink1).isEqualTo(socialLink2);
        socialLink2.setId(2L);
        assertThat(socialLink1).isNotEqualTo(socialLink2);
        socialLink1.setId(null);
        assertThat(socialLink1).isNotEqualTo(socialLink2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SocialLinkDTO.class);
        SocialLinkDTO socialLinkDTO1 = new SocialLinkDTO();
        socialLinkDTO1.setId(1L);
        SocialLinkDTO socialLinkDTO2 = new SocialLinkDTO();
        assertThat(socialLinkDTO1).isNotEqualTo(socialLinkDTO2);
        socialLinkDTO2.setId(socialLinkDTO1.getId());
        assertThat(socialLinkDTO1).isEqualTo(socialLinkDTO2);
        socialLinkDTO2.setId(2L);
        assertThat(socialLinkDTO1).isNotEqualTo(socialLinkDTO2);
        socialLinkDTO1.setId(null);
        assertThat(socialLinkDTO1).isNotEqualTo(socialLinkDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(socialLinkMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(socialLinkMapper.fromId(null)).isNull();
    }
}

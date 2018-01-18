package io.github.knowmyminister.web.rest;

import io.github.knowmyminister.KnowMyMinisterApp;

import io.github.knowmyminister.domain.PoliticalParty;
import io.github.knowmyminister.repository.PoliticalPartyRepository;
import io.github.knowmyminister.service.PoliticalPartyService;
import io.github.knowmyminister.repository.search.PoliticalPartySearchRepository;
import io.github.knowmyminister.service.dto.PoliticalPartyDTO;
import io.github.knowmyminister.service.mapper.PoliticalPartyMapper;
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
 * Test class for the PoliticalPartyResource REST controller.
 *
 * @see PoliticalPartyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KnowMyMinisterApp.class)
public class PoliticalPartyResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ABBREVIATION = "AAAAAAAAAA";
    private static final String UPDATED_ABBREVIATION = "BBBBBBBBBB";

    private static final String DEFAULT_FOUNDED = "AAAAAAAAAA";
    private static final String UPDATED_FOUNDED = "BBBBBBBBBB";

    private static final String DEFAULT_PRECEDED_BY = "AAAAAAAAAA";
    private static final String UPDATED_PRECEDED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_NEWS_PAPER = "AAAAAAAAAA";
    private static final String UPDATED_NEWS_PAPER = "BBBBBBBBBB";

    private static final String DEFAULT_YOUTH_WING = "AAAAAAAAAA";
    private static final String UPDATED_YOUTH_WING = "BBBBBBBBBB";

    private static final String DEFAULT_WOMENS_WING = "AAAAAAAAAA";
    private static final String UPDATED_WOMENS_WING = "BBBBBBBBBB";

    private static final String DEFAULT_PEASANTS_WING = "AAAAAAAAAA";
    private static final String UPDATED_PEASANTS_WING = "BBBBBBBBBB";

    private static final String DEFAULT_MINORITY_WING = "AAAAAAAAAA";
    private static final String UPDATED_MINORITY_WING = "BBBBBBBBBB";

    private static final String DEFAULT_MEMBERSHIP = "AAAAAAAAAA";
    private static final String UPDATED_MEMBERSHIP = "BBBBBBBBBB";

    private static final String DEFAULT_IDEOLOGY = "AAAAAAAAAA";
    private static final String UPDATED_IDEOLOGY = "BBBBBBBBBB";

    private static final String DEFAULT_POLITICAL_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POLITICAL_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_INTERNATIONAL_AFFILIATION = "AAAAAAAAAA";
    private static final String UPDATED_INTERNATIONAL_AFFILIATION = "BBBBBBBBBB";

    private static final String DEFAULT_COLOUR = "AAAAAAAAAA";
    private static final String UPDATED_COLOUR = "BBBBBBBBBB";

    private static final String DEFAULT_E_CI_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_E_CI_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_ALLIANCE = "AAAAAAAAAA";
    private static final String UPDATED_ALLIANCE = "BBBBBBBBBB";

    private static final String DEFAULT_SEATS_IN_LOK_SABHA = "AAAAAAAAAA";
    private static final String UPDATED_SEATS_IN_LOK_SABHA = "BBBBBBBBBB";

    private static final String DEFAULT_SEATS_IN_RAJYA_SABHA = "AAAAAAAAAA";
    private static final String UPDATED_SEATS_IN_RAJYA_SABHA = "BBBBBBBBBB";

    private static final String DEFAULT_ELECTION_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_ELECTION_SYMBOL = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_PARLIAMENTARY_CHAIRPERSON = "AAAAAAAAAA";
    private static final String UPDATED_PARLIAMENTARY_CHAIRPERSON = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private PoliticalPartyRepository politicalPartyRepository;

    @Autowired
    private PoliticalPartyMapper politicalPartyMapper;

    @Autowired
    private PoliticalPartyService politicalPartyService;

    @Autowired
    private PoliticalPartySearchRepository politicalPartySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPoliticalPartyMockMvc;

    private PoliticalParty politicalParty;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PoliticalPartyResource politicalPartyResource = new PoliticalPartyResource(politicalPartyService);
        this.restPoliticalPartyMockMvc = MockMvcBuilders.standaloneSetup(politicalPartyResource)
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
    public static PoliticalParty createEntity(EntityManager em) {
        PoliticalParty politicalParty = new PoliticalParty()
            .description(DEFAULT_DESCRIPTION)
            .abbreviation(DEFAULT_ABBREVIATION)
            .founded(DEFAULT_FOUNDED)
            .precededBy(DEFAULT_PRECEDED_BY)
            .newsPaper(DEFAULT_NEWS_PAPER)
            .youthWing(DEFAULT_YOUTH_WING)
            .womensWing(DEFAULT_WOMENS_WING)
            .peasantsWing(DEFAULT_PEASANTS_WING)
            .minorityWing(DEFAULT_MINORITY_WING)
            .membership(DEFAULT_MEMBERSHIP)
            .ideology(DEFAULT_IDEOLOGY)
            .politicalPosition(DEFAULT_POLITICAL_POSITION)
            .internationalAffiliation(DEFAULT_INTERNATIONAL_AFFILIATION)
            .colour(DEFAULT_COLOUR)
            .eCIStatus(DEFAULT_E_CI_STATUS)
            .alliance(DEFAULT_ALLIANCE)
            .seatsInLokSabha(DEFAULT_SEATS_IN_LOK_SABHA)
            .seatsInRajyaSabha(DEFAULT_SEATS_IN_RAJYA_SABHA)
            .electionSymbol(DEFAULT_ELECTION_SYMBOL)
            .website(DEFAULT_WEBSITE)
            .parliamentaryChairperson(DEFAULT_PARLIAMENTARY_CHAIRPERSON)
            .email(DEFAULT_EMAIL);
        return politicalParty;
    }

    @Before
    public void initTest() {
        politicalPartySearchRepository.deleteAll();
        politicalParty = createEntity(em);
    }

    @Test
    @Transactional
    public void createPoliticalParty() throws Exception {
        int databaseSizeBeforeCreate = politicalPartyRepository.findAll().size();

        // Create the PoliticalParty
        PoliticalPartyDTO politicalPartyDTO = politicalPartyMapper.toDto(politicalParty);
        restPoliticalPartyMockMvc.perform(post("/api/political-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicalPartyDTO)))
            .andExpect(status().isCreated());

        // Validate the PoliticalParty in the database
        List<PoliticalParty> politicalPartyList = politicalPartyRepository.findAll();
        assertThat(politicalPartyList).hasSize(databaseSizeBeforeCreate + 1);
        PoliticalParty testPoliticalParty = politicalPartyList.get(politicalPartyList.size() - 1);
        assertThat(testPoliticalParty.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPoliticalParty.getAbbreviation()).isEqualTo(DEFAULT_ABBREVIATION);
        assertThat(testPoliticalParty.getFounded()).isEqualTo(DEFAULT_FOUNDED);
        assertThat(testPoliticalParty.getPrecededBy()).isEqualTo(DEFAULT_PRECEDED_BY);
        assertThat(testPoliticalParty.getNewsPaper()).isEqualTo(DEFAULT_NEWS_PAPER);
        assertThat(testPoliticalParty.getYouthWing()).isEqualTo(DEFAULT_YOUTH_WING);
        assertThat(testPoliticalParty.getWomensWing()).isEqualTo(DEFAULT_WOMENS_WING);
        assertThat(testPoliticalParty.getPeasantsWing()).isEqualTo(DEFAULT_PEASANTS_WING);
        assertThat(testPoliticalParty.getMinorityWing()).isEqualTo(DEFAULT_MINORITY_WING);
        assertThat(testPoliticalParty.getMembership()).isEqualTo(DEFAULT_MEMBERSHIP);
        assertThat(testPoliticalParty.getIdeology()).isEqualTo(DEFAULT_IDEOLOGY);
        assertThat(testPoliticalParty.getPoliticalPosition()).isEqualTo(DEFAULT_POLITICAL_POSITION);
        assertThat(testPoliticalParty.getInternationalAffiliation()).isEqualTo(DEFAULT_INTERNATIONAL_AFFILIATION);
        assertThat(testPoliticalParty.getColour()).isEqualTo(DEFAULT_COLOUR);
        assertThat(testPoliticalParty.geteCIStatus()).isEqualTo(DEFAULT_E_CI_STATUS);
        assertThat(testPoliticalParty.getAlliance()).isEqualTo(DEFAULT_ALLIANCE);
        assertThat(testPoliticalParty.getSeatsInLokSabha()).isEqualTo(DEFAULT_SEATS_IN_LOK_SABHA);
        assertThat(testPoliticalParty.getSeatsInRajyaSabha()).isEqualTo(DEFAULT_SEATS_IN_RAJYA_SABHA);
        assertThat(testPoliticalParty.getElectionSymbol()).isEqualTo(DEFAULT_ELECTION_SYMBOL);
        assertThat(testPoliticalParty.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testPoliticalParty.getParliamentaryChairperson()).isEqualTo(DEFAULT_PARLIAMENTARY_CHAIRPERSON);
        assertThat(testPoliticalParty.getEmail()).isEqualTo(DEFAULT_EMAIL);

        // Validate the PoliticalParty in Elasticsearch
        PoliticalParty politicalPartyEs = politicalPartySearchRepository.findOne(testPoliticalParty.getId());
        assertThat(politicalPartyEs).isEqualToIgnoringGivenFields(testPoliticalParty);
    }

    @Test
    @Transactional
    public void createPoliticalPartyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = politicalPartyRepository.findAll().size();

        // Create the PoliticalParty with an existing ID
        politicalParty.setId(1L);
        PoliticalPartyDTO politicalPartyDTO = politicalPartyMapper.toDto(politicalParty);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPoliticalPartyMockMvc.perform(post("/api/political-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicalPartyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PoliticalParty in the database
        List<PoliticalParty> politicalPartyList = politicalPartyRepository.findAll();
        assertThat(politicalPartyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPoliticalParties() throws Exception {
        // Initialize the database
        politicalPartyRepository.saveAndFlush(politicalParty);

        // Get all the politicalPartyList
        restPoliticalPartyMockMvc.perform(get("/api/political-parties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(politicalParty.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].abbreviation").value(hasItem(DEFAULT_ABBREVIATION.toString())))
            .andExpect(jsonPath("$.[*].founded").value(hasItem(DEFAULT_FOUNDED.toString())))
            .andExpect(jsonPath("$.[*].precededBy").value(hasItem(DEFAULT_PRECEDED_BY.toString())))
            .andExpect(jsonPath("$.[*].newsPaper").value(hasItem(DEFAULT_NEWS_PAPER.toString())))
            .andExpect(jsonPath("$.[*].youthWing").value(hasItem(DEFAULT_YOUTH_WING.toString())))
            .andExpect(jsonPath("$.[*].womensWing").value(hasItem(DEFAULT_WOMENS_WING.toString())))
            .andExpect(jsonPath("$.[*].peasantsWing").value(hasItem(DEFAULT_PEASANTS_WING.toString())))
            .andExpect(jsonPath("$.[*].minorityWing").value(hasItem(DEFAULT_MINORITY_WING.toString())))
            .andExpect(jsonPath("$.[*].membership").value(hasItem(DEFAULT_MEMBERSHIP.toString())))
            .andExpect(jsonPath("$.[*].ideology").value(hasItem(DEFAULT_IDEOLOGY.toString())))
            .andExpect(jsonPath("$.[*].politicalPosition").value(hasItem(DEFAULT_POLITICAL_POSITION.toString())))
            .andExpect(jsonPath("$.[*].internationalAffiliation").value(hasItem(DEFAULT_INTERNATIONAL_AFFILIATION.toString())))
            .andExpect(jsonPath("$.[*].colour").value(hasItem(DEFAULT_COLOUR.toString())))
            .andExpect(jsonPath("$.[*].eCIStatus").value(hasItem(DEFAULT_E_CI_STATUS.toString())))
            .andExpect(jsonPath("$.[*].alliance").value(hasItem(DEFAULT_ALLIANCE.toString())))
            .andExpect(jsonPath("$.[*].seatsInLokSabha").value(hasItem(DEFAULT_SEATS_IN_LOK_SABHA.toString())))
            .andExpect(jsonPath("$.[*].seatsInRajyaSabha").value(hasItem(DEFAULT_SEATS_IN_RAJYA_SABHA.toString())))
            .andExpect(jsonPath("$.[*].electionSymbol").value(hasItem(DEFAULT_ELECTION_SYMBOL.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].parliamentaryChairperson").value(hasItem(DEFAULT_PARLIAMENTARY_CHAIRPERSON.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getPoliticalParty() throws Exception {
        // Initialize the database
        politicalPartyRepository.saveAndFlush(politicalParty);

        // Get the politicalParty
        restPoliticalPartyMockMvc.perform(get("/api/political-parties/{id}", politicalParty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(politicalParty.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.abbreviation").value(DEFAULT_ABBREVIATION.toString()))
            .andExpect(jsonPath("$.founded").value(DEFAULT_FOUNDED.toString()))
            .andExpect(jsonPath("$.precededBy").value(DEFAULT_PRECEDED_BY.toString()))
            .andExpect(jsonPath("$.newsPaper").value(DEFAULT_NEWS_PAPER.toString()))
            .andExpect(jsonPath("$.youthWing").value(DEFAULT_YOUTH_WING.toString()))
            .andExpect(jsonPath("$.womensWing").value(DEFAULT_WOMENS_WING.toString()))
            .andExpect(jsonPath("$.peasantsWing").value(DEFAULT_PEASANTS_WING.toString()))
            .andExpect(jsonPath("$.minorityWing").value(DEFAULT_MINORITY_WING.toString()))
            .andExpect(jsonPath("$.membership").value(DEFAULT_MEMBERSHIP.toString()))
            .andExpect(jsonPath("$.ideology").value(DEFAULT_IDEOLOGY.toString()))
            .andExpect(jsonPath("$.politicalPosition").value(DEFAULT_POLITICAL_POSITION.toString()))
            .andExpect(jsonPath("$.internationalAffiliation").value(DEFAULT_INTERNATIONAL_AFFILIATION.toString()))
            .andExpect(jsonPath("$.colour").value(DEFAULT_COLOUR.toString()))
            .andExpect(jsonPath("$.eCIStatus").value(DEFAULT_E_CI_STATUS.toString()))
            .andExpect(jsonPath("$.alliance").value(DEFAULT_ALLIANCE.toString()))
            .andExpect(jsonPath("$.seatsInLokSabha").value(DEFAULT_SEATS_IN_LOK_SABHA.toString()))
            .andExpect(jsonPath("$.seatsInRajyaSabha").value(DEFAULT_SEATS_IN_RAJYA_SABHA.toString()))
            .andExpect(jsonPath("$.electionSymbol").value(DEFAULT_ELECTION_SYMBOL.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.parliamentaryChairperson").value(DEFAULT_PARLIAMENTARY_CHAIRPERSON.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPoliticalParty() throws Exception {
        // Get the politicalParty
        restPoliticalPartyMockMvc.perform(get("/api/political-parties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePoliticalParty() throws Exception {
        // Initialize the database
        politicalPartyRepository.saveAndFlush(politicalParty);
        politicalPartySearchRepository.save(politicalParty);
        int databaseSizeBeforeUpdate = politicalPartyRepository.findAll().size();

        // Update the politicalParty
        PoliticalParty updatedPoliticalParty = politicalPartyRepository.findOne(politicalParty.getId());
        // Disconnect from session so that the updates on updatedPoliticalParty are not directly saved in db
        em.detach(updatedPoliticalParty);
        updatedPoliticalParty
            .description(UPDATED_DESCRIPTION)
            .abbreviation(UPDATED_ABBREVIATION)
            .founded(UPDATED_FOUNDED)
            .precededBy(UPDATED_PRECEDED_BY)
            .newsPaper(UPDATED_NEWS_PAPER)
            .youthWing(UPDATED_YOUTH_WING)
            .womensWing(UPDATED_WOMENS_WING)
            .peasantsWing(UPDATED_PEASANTS_WING)
            .minorityWing(UPDATED_MINORITY_WING)
            .membership(UPDATED_MEMBERSHIP)
            .ideology(UPDATED_IDEOLOGY)
            .politicalPosition(UPDATED_POLITICAL_POSITION)
            .internationalAffiliation(UPDATED_INTERNATIONAL_AFFILIATION)
            .colour(UPDATED_COLOUR)
            .eCIStatus(UPDATED_E_CI_STATUS)
            .alliance(UPDATED_ALLIANCE)
            .seatsInLokSabha(UPDATED_SEATS_IN_LOK_SABHA)
            .seatsInRajyaSabha(UPDATED_SEATS_IN_RAJYA_SABHA)
            .electionSymbol(UPDATED_ELECTION_SYMBOL)
            .website(UPDATED_WEBSITE)
            .parliamentaryChairperson(UPDATED_PARLIAMENTARY_CHAIRPERSON)
            .email(UPDATED_EMAIL);
        PoliticalPartyDTO politicalPartyDTO = politicalPartyMapper.toDto(updatedPoliticalParty);

        restPoliticalPartyMockMvc.perform(put("/api/political-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicalPartyDTO)))
            .andExpect(status().isOk());

        // Validate the PoliticalParty in the database
        List<PoliticalParty> politicalPartyList = politicalPartyRepository.findAll();
        assertThat(politicalPartyList).hasSize(databaseSizeBeforeUpdate);
        PoliticalParty testPoliticalParty = politicalPartyList.get(politicalPartyList.size() - 1);
        assertThat(testPoliticalParty.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPoliticalParty.getAbbreviation()).isEqualTo(UPDATED_ABBREVIATION);
        assertThat(testPoliticalParty.getFounded()).isEqualTo(UPDATED_FOUNDED);
        assertThat(testPoliticalParty.getPrecededBy()).isEqualTo(UPDATED_PRECEDED_BY);
        assertThat(testPoliticalParty.getNewsPaper()).isEqualTo(UPDATED_NEWS_PAPER);
        assertThat(testPoliticalParty.getYouthWing()).isEqualTo(UPDATED_YOUTH_WING);
        assertThat(testPoliticalParty.getWomensWing()).isEqualTo(UPDATED_WOMENS_WING);
        assertThat(testPoliticalParty.getPeasantsWing()).isEqualTo(UPDATED_PEASANTS_WING);
        assertThat(testPoliticalParty.getMinorityWing()).isEqualTo(UPDATED_MINORITY_WING);
        assertThat(testPoliticalParty.getMembership()).isEqualTo(UPDATED_MEMBERSHIP);
        assertThat(testPoliticalParty.getIdeology()).isEqualTo(UPDATED_IDEOLOGY);
        assertThat(testPoliticalParty.getPoliticalPosition()).isEqualTo(UPDATED_POLITICAL_POSITION);
        assertThat(testPoliticalParty.getInternationalAffiliation()).isEqualTo(UPDATED_INTERNATIONAL_AFFILIATION);
        assertThat(testPoliticalParty.getColour()).isEqualTo(UPDATED_COLOUR);
        assertThat(testPoliticalParty.geteCIStatus()).isEqualTo(UPDATED_E_CI_STATUS);
        assertThat(testPoliticalParty.getAlliance()).isEqualTo(UPDATED_ALLIANCE);
        assertThat(testPoliticalParty.getSeatsInLokSabha()).isEqualTo(UPDATED_SEATS_IN_LOK_SABHA);
        assertThat(testPoliticalParty.getSeatsInRajyaSabha()).isEqualTo(UPDATED_SEATS_IN_RAJYA_SABHA);
        assertThat(testPoliticalParty.getElectionSymbol()).isEqualTo(UPDATED_ELECTION_SYMBOL);
        assertThat(testPoliticalParty.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testPoliticalParty.getParliamentaryChairperson()).isEqualTo(UPDATED_PARLIAMENTARY_CHAIRPERSON);
        assertThat(testPoliticalParty.getEmail()).isEqualTo(UPDATED_EMAIL);

        // Validate the PoliticalParty in Elasticsearch
        PoliticalParty politicalPartyEs = politicalPartySearchRepository.findOne(testPoliticalParty.getId());
        assertThat(politicalPartyEs).isEqualToIgnoringGivenFields(testPoliticalParty);
    }

    @Test
    @Transactional
    public void updateNonExistingPoliticalParty() throws Exception {
        int databaseSizeBeforeUpdate = politicalPartyRepository.findAll().size();

        // Create the PoliticalParty
        PoliticalPartyDTO politicalPartyDTO = politicalPartyMapper.toDto(politicalParty);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPoliticalPartyMockMvc.perform(put("/api/political-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicalPartyDTO)))
            .andExpect(status().isCreated());

        // Validate the PoliticalParty in the database
        List<PoliticalParty> politicalPartyList = politicalPartyRepository.findAll();
        assertThat(politicalPartyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePoliticalParty() throws Exception {
        // Initialize the database
        politicalPartyRepository.saveAndFlush(politicalParty);
        politicalPartySearchRepository.save(politicalParty);
        int databaseSizeBeforeDelete = politicalPartyRepository.findAll().size();

        // Get the politicalParty
        restPoliticalPartyMockMvc.perform(delete("/api/political-parties/{id}", politicalParty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean politicalPartyExistsInEs = politicalPartySearchRepository.exists(politicalParty.getId());
        assertThat(politicalPartyExistsInEs).isFalse();

        // Validate the database is empty
        List<PoliticalParty> politicalPartyList = politicalPartyRepository.findAll();
        assertThat(politicalPartyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPoliticalParty() throws Exception {
        // Initialize the database
        politicalPartyRepository.saveAndFlush(politicalParty);
        politicalPartySearchRepository.save(politicalParty);

        // Search the politicalParty
        restPoliticalPartyMockMvc.perform(get("/api/_search/political-parties?query=id:" + politicalParty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(politicalParty.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].abbreviation").value(hasItem(DEFAULT_ABBREVIATION.toString())))
            .andExpect(jsonPath("$.[*].founded").value(hasItem(DEFAULT_FOUNDED.toString())))
            .andExpect(jsonPath("$.[*].precededBy").value(hasItem(DEFAULT_PRECEDED_BY.toString())))
            .andExpect(jsonPath("$.[*].newsPaper").value(hasItem(DEFAULT_NEWS_PAPER.toString())))
            .andExpect(jsonPath("$.[*].youthWing").value(hasItem(DEFAULT_YOUTH_WING.toString())))
            .andExpect(jsonPath("$.[*].womensWing").value(hasItem(DEFAULT_WOMENS_WING.toString())))
            .andExpect(jsonPath("$.[*].peasantsWing").value(hasItem(DEFAULT_PEASANTS_WING.toString())))
            .andExpect(jsonPath("$.[*].minorityWing").value(hasItem(DEFAULT_MINORITY_WING.toString())))
            .andExpect(jsonPath("$.[*].membership").value(hasItem(DEFAULT_MEMBERSHIP.toString())))
            .andExpect(jsonPath("$.[*].ideology").value(hasItem(DEFAULT_IDEOLOGY.toString())))
            .andExpect(jsonPath("$.[*].politicalPosition").value(hasItem(DEFAULT_POLITICAL_POSITION.toString())))
            .andExpect(jsonPath("$.[*].internationalAffiliation").value(hasItem(DEFAULT_INTERNATIONAL_AFFILIATION.toString())))
            .andExpect(jsonPath("$.[*].colour").value(hasItem(DEFAULT_COLOUR.toString())))
            .andExpect(jsonPath("$.[*].eCIStatus").value(hasItem(DEFAULT_E_CI_STATUS.toString())))
            .andExpect(jsonPath("$.[*].alliance").value(hasItem(DEFAULT_ALLIANCE.toString())))
            .andExpect(jsonPath("$.[*].seatsInLokSabha").value(hasItem(DEFAULT_SEATS_IN_LOK_SABHA.toString())))
            .andExpect(jsonPath("$.[*].seatsInRajyaSabha").value(hasItem(DEFAULT_SEATS_IN_RAJYA_SABHA.toString())))
            .andExpect(jsonPath("$.[*].electionSymbol").value(hasItem(DEFAULT_ELECTION_SYMBOL.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].parliamentaryChairperson").value(hasItem(DEFAULT_PARLIAMENTARY_CHAIRPERSON.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PoliticalParty.class);
        PoliticalParty politicalParty1 = new PoliticalParty();
        politicalParty1.setId(1L);
        PoliticalParty politicalParty2 = new PoliticalParty();
        politicalParty2.setId(politicalParty1.getId());
        assertThat(politicalParty1).isEqualTo(politicalParty2);
        politicalParty2.setId(2L);
        assertThat(politicalParty1).isNotEqualTo(politicalParty2);
        politicalParty1.setId(null);
        assertThat(politicalParty1).isNotEqualTo(politicalParty2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PoliticalPartyDTO.class);
        PoliticalPartyDTO politicalPartyDTO1 = new PoliticalPartyDTO();
        politicalPartyDTO1.setId(1L);
        PoliticalPartyDTO politicalPartyDTO2 = new PoliticalPartyDTO();
        assertThat(politicalPartyDTO1).isNotEqualTo(politicalPartyDTO2);
        politicalPartyDTO2.setId(politicalPartyDTO1.getId());
        assertThat(politicalPartyDTO1).isEqualTo(politicalPartyDTO2);
        politicalPartyDTO2.setId(2L);
        assertThat(politicalPartyDTO1).isNotEqualTo(politicalPartyDTO2);
        politicalPartyDTO1.setId(null);
        assertThat(politicalPartyDTO1).isNotEqualTo(politicalPartyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(politicalPartyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(politicalPartyMapper.fromId(null)).isNull();
    }
}

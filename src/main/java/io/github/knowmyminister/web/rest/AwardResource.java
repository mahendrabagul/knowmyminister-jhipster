package io.github.knowmyminister.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.knowmyminister.service.AwardService;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;
import io.github.knowmyminister.web.rest.util.PaginationUtil;
import io.github.knowmyminister.service.dto.AwardDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Award.
 */
@RestController
@RequestMapping("/api")
public class AwardResource {

    private final Logger log = LoggerFactory.getLogger(AwardResource.class);

    private static final String ENTITY_NAME = "award";

    private final AwardService awardService;

    public AwardResource(AwardService awardService) {
        this.awardService = awardService;
    }

    /**
     * POST  /awards : Create a new award.
     *
     * @param awardDTO the awardDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new awardDTO, or with status 400 (Bad Request) if the award has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/awards")
    @Timed
    public ResponseEntity<AwardDTO> createAward(@Valid @RequestBody AwardDTO awardDTO) throws URISyntaxException {
        log.debug("REST request to save Award : {}", awardDTO);
        if (awardDTO.getId() != null) {
            throw new BadRequestAlertException("A new award cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AwardDTO result = awardService.save(awardDTO);
        return ResponseEntity.created(new URI("/api/awards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /awards : Updates an existing award.
     *
     * @param awardDTO the awardDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated awardDTO,
     * or with status 400 (Bad Request) if the awardDTO is not valid,
     * or with status 500 (Internal Server Error) if the awardDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/awards")
    @Timed
    public ResponseEntity<AwardDTO> updateAward(@Valid @RequestBody AwardDTO awardDTO) throws URISyntaxException {
        log.debug("REST request to update Award : {}", awardDTO);
        if (awardDTO.getId() == null) {
            return createAward(awardDTO);
        }
        AwardDTO result = awardService.save(awardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, awardDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /awards : get all the awards.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of awards in body
     */
    @GetMapping("/awards")
    @Timed
    public ResponseEntity<List<AwardDTO>> getAllAwards(Pageable pageable) {
        log.debug("REST request to get a page of Awards");
        Page<AwardDTO> page = awardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/awards");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /awards/:id : get the "id" award.
     *
     * @param id the id of the awardDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the awardDTO, or with status 404 (Not Found)
     */
    @GetMapping("/awards/{id}")
    @Timed
    public ResponseEntity<AwardDTO> getAward(@PathVariable Long id) {
        log.debug("REST request to get Award : {}", id);
        AwardDTO awardDTO = awardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(awardDTO));
    }

    /**
     * DELETE  /awards/:id : delete the "id" award.
     *
     * @param id the id of the awardDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/awards/{id}")
    @Timed
    public ResponseEntity<Void> deleteAward(@PathVariable Long id) {
        log.debug("REST request to delete Award : {}", id);
        awardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/awards?query=:query : search for the award corresponding
     * to the query.
     *
     * @param query the query of the award search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/awards")
    @Timed
    public ResponseEntity<List<AwardDTO>> searchAwards(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Awards for query {}", query);
        Page<AwardDTO> page = awardService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/awards");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}

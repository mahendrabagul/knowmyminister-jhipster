package io.github.knowmyminister.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import io.github.knowmyminister.service.BioService;
import io.github.knowmyminister.service.dto.BioDTO;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Bio.
 */
@RestController
@RequestMapping("/api")
public class BioResource {

    private final Logger log = LoggerFactory.getLogger(BioResource.class);

    private static final String ENTITY_NAME = "bio";

    private final BioService bioService;

    public BioResource(BioService bioService) {
        this.bioService = bioService;
    }

    /**
     * POST  /bios : Create a new bio.
     *
     * @param bioDTO the bioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bioDTO, or with status 400 (Bad Request) if the bio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bios")
    @Timed
    public ResponseEntity<BioDTO> createBio(@Valid @RequestBody BioDTO bioDTO) throws URISyntaxException {
        log.debug("REST request to save Bio : {}", bioDTO);
        if (bioDTO.getId() != null) {
            throw new BadRequestAlertException("A new bio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BioDTO result = bioService.save(bioDTO);
        return ResponseEntity.created(new URI("/api/bios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bios : Updates an existing bio.
     *
     * @param bioDTO the bioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bioDTO,
     * or with status 400 (Bad Request) if the bioDTO is not valid,
     * or with status 500 (Internal Server Error) if the bioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bios")
    @Timed
    public ResponseEntity<BioDTO> updateBio(@Valid @RequestBody BioDTO bioDTO) throws URISyntaxException {
        log.debug("REST request to update Bio : {}", bioDTO);
        if (bioDTO.getId() == null) {
            return createBio(bioDTO);
        }
        BioDTO result = bioService.save(bioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bios : get all the bios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bios in body
     */
    @GetMapping("/bios")
    @Timed
    public List<BioDTO> getAllBios() {
        log.debug("REST request to get all Bios");
        return bioService.findAll();
        }

    /**
     * GET  /bios/:id : get the "id" bio.
     *
     * @param id the id of the bioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bios/{id}")
    @Timed
    public ResponseEntity<BioDTO> getBio(@PathVariable Long id) {
        log.debug("REST request to get Bio : {}", id);
        BioDTO bioDTO = bioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bioDTO));
    }

    /**
     * DELETE  /bios/:id : delete the "id" bio.
     *
     * @param id the id of the bioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bios/{id}")
    @Timed
    public ResponseEntity<Void> deleteBio(@PathVariable Long id) {
        log.debug("REST request to delete Bio : {}", id);
        bioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/bios?query=:query : search for the bio corresponding
     * to the query.
     *
     * @param query the query of the bio search
     * @return the result of the search
     */
    @GetMapping("/_search/bios")
    @Timed
    public List<BioDTO> searchBios(@RequestParam String query) {
        log.debug("REST request to search Bios for query {}", query);
        return bioService.search(query);
    }

}

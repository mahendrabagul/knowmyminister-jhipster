package io.github.knowmyminister.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.knowmyminister.service.SocialLinkService;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;
import io.github.knowmyminister.service.dto.SocialLinkDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing SocialLink.
 */
@RestController
@RequestMapping("/api")
public class SocialLinkResource {

    private final Logger log = LoggerFactory.getLogger(SocialLinkResource.class);

    private static final String ENTITY_NAME = "socialLink";

    private final SocialLinkService socialLinkService;

    public SocialLinkResource(SocialLinkService socialLinkService) {
        this.socialLinkService = socialLinkService;
    }

    /**
     * POST  /social-links : Create a new socialLink.
     *
     * @param socialLinkDTO the socialLinkDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new socialLinkDTO, or with status 400 (Bad Request) if the socialLink has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/social-links")
    @Timed
    public ResponseEntity<SocialLinkDTO> createSocialLink(@Valid @RequestBody SocialLinkDTO socialLinkDTO) throws URISyntaxException {
        log.debug("REST request to save SocialLink : {}", socialLinkDTO);
        if (socialLinkDTO.getId() != null) {
            throw new BadRequestAlertException("A new socialLink cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SocialLinkDTO result = socialLinkService.save(socialLinkDTO);
        return ResponseEntity.created(new URI("/api/social-links/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /social-links : Updates an existing socialLink.
     *
     * @param socialLinkDTO the socialLinkDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated socialLinkDTO,
     * or with status 400 (Bad Request) if the socialLinkDTO is not valid,
     * or with status 500 (Internal Server Error) if the socialLinkDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/social-links")
    @Timed
    public ResponseEntity<SocialLinkDTO> updateSocialLink(@Valid @RequestBody SocialLinkDTO socialLinkDTO) throws URISyntaxException {
        log.debug("REST request to update SocialLink : {}", socialLinkDTO);
        if (socialLinkDTO.getId() == null) {
            return createSocialLink(socialLinkDTO);
        }
        SocialLinkDTO result = socialLinkService.save(socialLinkDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, socialLinkDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /social-links : get all the socialLinks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of socialLinks in body
     */
    @GetMapping("/social-links")
    @Timed
    public List<SocialLinkDTO> getAllSocialLinks() {
        log.debug("REST request to get all SocialLinks");
        return socialLinkService.findAll();
        }

    /**
     * GET  /social-links/:id : get the "id" socialLink.
     *
     * @param id the id of the socialLinkDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the socialLinkDTO, or with status 404 (Not Found)
     */
    @GetMapping("/social-links/{id}")
    @Timed
    public ResponseEntity<SocialLinkDTO> getSocialLink(@PathVariable Long id) {
        log.debug("REST request to get SocialLink : {}", id);
        SocialLinkDTO socialLinkDTO = socialLinkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(socialLinkDTO));
    }

    /**
     * DELETE  /social-links/:id : delete the "id" socialLink.
     *
     * @param id the id of the socialLinkDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/social-links/{id}")
    @Timed
    public ResponseEntity<Void> deleteSocialLink(@PathVariable Long id) {
        log.debug("REST request to delete SocialLink : {}", id);
        socialLinkService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/social-links?query=:query : search for the socialLink corresponding
     * to the query.
     *
     * @param query the query of the socialLink search
     * @return the result of the search
     */
    @GetMapping("/_search/social-links")
    @Timed
    public List<SocialLinkDTO> searchSocialLinks(@RequestParam String query) {
        log.debug("REST request to search SocialLinks for query {}", query);
        return socialLinkService.search(query);
    }

}

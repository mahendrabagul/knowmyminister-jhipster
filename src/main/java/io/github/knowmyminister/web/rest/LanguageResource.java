package io.github.knowmyminister.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import io.github.knowmyminister.service.LanguageService;
import io.github.knowmyminister.service.dto.LanguageDTO;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;
import io.github.knowmyminister.web.rest.util.PaginationUtil;

/**
 * REST controller for managing Language.
 */
@RestController
@RequestMapping("/api")
public class LanguageResource
{

	private final Logger log = LoggerFactory.getLogger(LanguageResource.class);

	private static final String ENTITY_NAME = "language";

	private final LanguageService languageService;

	public LanguageResource(LanguageService languageService)
	{
		this.languageService = languageService;
	}

	/**
	 * POST /languages : Create a new language.
	 *
	 * @param languageDTO
	 *            the languageDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new languageDTO, or with status 400 (Bad Request) if the language
	 *         has already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/languages")
	@Timed
	public ResponseEntity<LanguageDTO> createLanguage(@RequestBody LanguageDTO languageDTO) throws URISyntaxException
	{
		log.debug("REST request to save Language : {}", languageDTO);
		if (languageDTO.getId() != null)
		{
			throw new BadRequestAlertException("A new language cannot already have an ID", ENTITY_NAME, "idexists");
		}
		LanguageDTO result = languageService.save(languageDTO);
		return ResponseEntity.created(new URI("/api/languages/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /languages : Updates an existing language.
	 *
	 * @param languageDTO
	 *            the languageDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         languageDTO, or with status 400 (Bad Request) if the languageDTO
	 *         is not valid, or with status 500 (Internal Server Error) if the
	 *         languageDTO couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/languages")
	@Timed
	public ResponseEntity<LanguageDTO> updateLanguage(@RequestBody LanguageDTO languageDTO) throws URISyntaxException
	{
		log.debug("REST request to update Language : {}", languageDTO);
		if (languageDTO.getId() == null)
		{
			return createLanguage(languageDTO);
		}
		LanguageDTO result = languageService.save(languageDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, languageDTO.getId().toString())).body(result);
	}

	/**
	 * GET /languages : get all the languages.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of languages
	 *         in body
	 */
	@GetMapping("/languages")
	@Timed
	public ResponseEntity<List<LanguageDTO>> getAllLanguages(Pageable pageable)
	{
		log.debug("REST request to get a page of Languages");
		Page<LanguageDTO> page = languageService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/languages");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /languages/:id : get the "id" language.
	 *
	 * @param id
	 *            the id of the languageDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         languageDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/languages/{id}")
	@Timed
	public ResponseEntity<LanguageDTO> getLanguage(@PathVariable Long id)
	{
		log.debug("REST request to get Language : {}", id);
		LanguageDTO languageDTO = languageService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(languageDTO));
	}

	/**
	 * DELETE /languages/:id : delete the "id" language.
	 *
	 * @param id
	 *            the id of the languageDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/languages/{id}")
	@Timed
	public ResponseEntity<Void> deleteLanguage(@PathVariable Long id)
	{
		log.debug("REST request to delete Language : {}", id);
		languageService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * SEARCH /_search/languages?query=:query : search for the language
	 * corresponding to the query.
	 *
	 * @param query
	 *            the query of the language search
	 * @param pageable
	 *            the pagination information
	 * @return the result of the search
	 */
	@GetMapping("/_search/languages")
	@Timed
	public ResponseEntity<List<LanguageDTO>> searchLanguages(@RequestParam String query, Pageable pageable)
	{
		log.debug("REST request to search for a page of Languages for query {}", query);
		Page<LanguageDTO> page = languageService.search(query, pageable);
		HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/languages");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

}

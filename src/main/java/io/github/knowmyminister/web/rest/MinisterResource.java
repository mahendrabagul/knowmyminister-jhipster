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
import io.github.knowmyminister.service.MinisterService;
import io.github.knowmyminister.service.dto.MinisterDTO;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;
import io.github.knowmyminister.web.rest.util.PaginationUtil;

/**
 * REST controller for managing Minister.
 */
@RestController
@RequestMapping("/api")
public class MinisterResource
{

	private final Logger log = LoggerFactory.getLogger(MinisterResource.class);

	private static final String ENTITY_NAME = "minister";

	private final MinisterService ministerService;

	public MinisterResource(MinisterService ministerService)
	{
		this.ministerService = ministerService;
	}

	/**
	 * POST /ministers : Create a new minister.
	 *
	 * @param ministerDTO
	 *            the ministerDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new ministerDTO, or with status 400 (Bad Request) if the minister
	 *         has already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/ministers")
	@Timed
	public ResponseEntity<MinisterDTO> createMinister(@RequestBody MinisterDTO ministerDTO) throws URISyntaxException
	{
		log.debug("REST request to save Minister : {}", ministerDTO);
		if (ministerDTO.getId() != null)
		{
			throw new BadRequestAlertException("A new minister cannot already have an ID", ENTITY_NAME, "idexists");
		}
		MinisterDTO result = ministerService.save(ministerDTO);
		return ResponseEntity.created(new URI("/api/ministers/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /ministers : Updates an existing minister.
	 *
	 * @param ministerDTO
	 *            the ministerDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         ministerDTO, or with status 400 (Bad Request) if the ministerDTO
	 *         is not valid, or with status 500 (Internal Server Error) if the
	 *         ministerDTO couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/ministers")
	@Timed
	public ResponseEntity<MinisterDTO> updateMinister(@RequestBody MinisterDTO ministerDTO) throws URISyntaxException
	{
		log.debug("REST request to update Minister : {}", ministerDTO);
		if (ministerDTO.getId() == null)
		{
			return createMinister(ministerDTO);
		}
		MinisterDTO result = ministerService.save(ministerDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ministerDTO.getId().toString())).body(result);
	}

	/**
	 * GET /ministers : get all the ministers.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of ministers
	 *         in body
	 */
	@GetMapping("/ministers")
	@Timed
	public ResponseEntity<List<MinisterDTO>> getAllMinisters(Pageable pageable)
	{
		log.debug("REST request to get a page of Ministers");
		Page<MinisterDTO> page = ministerService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ministers");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /ministers/:id : get the "id" minister.
	 *
	 * @param id
	 *            the id of the ministerDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         ministerDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/ministers/{id}")
	@Timed
	public ResponseEntity<MinisterDTO> getMinister(@PathVariable Long id)
	{
		log.debug("REST request to get Minister : {}", id);
		MinisterDTO ministerDTO = ministerService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ministerDTO));
	}

	/**
	 * DELETE /ministers/:id : delete the "id" minister.
	 *
	 * @param id
	 *            the id of the ministerDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/ministers/{id}")
	@Timed
	public ResponseEntity<Void> deleteMinister(@PathVariable Long id)
	{
		log.debug("REST request to delete Minister : {}", id);
		ministerService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * SEARCH /_search/ministers?query=:query : search for the minister
	 * corresponding to the query.
	 *
	 * @param query
	 *            the query of the minister search
	 * @param pageable
	 *            the pagination information
	 * @return the result of the search
	 */
	@GetMapping("/_search/ministers")
	@Timed
	public ResponseEntity<List<MinisterDTO>> searchMinisters(@RequestParam String query, Pageable pageable)
	{
		log.debug("REST request to search for a page of Ministers for query {}", query);
		Page<MinisterDTO> page = ministerService.search(query, pageable);
		HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/ministers");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

}

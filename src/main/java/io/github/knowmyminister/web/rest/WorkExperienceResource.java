package io.github.knowmyminister.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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
import io.github.knowmyminister.service.WorkExperienceService;
import io.github.knowmyminister.service.dto.WorkExperienceDTO;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;
import io.github.knowmyminister.web.rest.util.PaginationUtil;

/**
 * REST controller for managing WorkExperience.
 */
@RestController
@RequestMapping("/api")
public class WorkExperienceResource
{

	private final Logger log = LoggerFactory.getLogger(WorkExperienceResource.class);

	private static final String ENTITY_NAME = "workExperience";

	private final WorkExperienceService workExperienceService;

	public WorkExperienceResource(WorkExperienceService workExperienceService)
	{
		this.workExperienceService = workExperienceService;
	}

	/**
	 * POST /work-experiences : Create a new workExperience.
	 *
	 * @param workExperienceDTO
	 *            the workExperienceDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new workExperienceDTO, or with status 400 (Bad Request) if the
	 *         workExperience has already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/work-experiences")
	@Timed
	public ResponseEntity<WorkExperienceDTO> createWorkExperience(
			@Valid @RequestBody WorkExperienceDTO workExperienceDTO) throws URISyntaxException
	{
		log.debug("REST request to save WorkExperience : {}", workExperienceDTO);
		if (workExperienceDTO.getId() != null)
		{
			throw new BadRequestAlertException("A new workExperience cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		WorkExperienceDTO result = workExperienceService.save(workExperienceDTO);
		return ResponseEntity.created(new URI("/api/work-experiences/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /work-experiences : Updates an existing workExperience.
	 *
	 * @param workExperienceDTO
	 *            the workExperienceDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         workExperienceDTO, or with status 400 (Bad Request) if the
	 *         workExperienceDTO is not valid, or with status 500 (Internal
	 *         Server Error) if the workExperienceDTO couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/work-experiences")
	@Timed
	public ResponseEntity<WorkExperienceDTO> updateWorkExperience(
			@Valid @RequestBody WorkExperienceDTO workExperienceDTO) throws URISyntaxException
	{
		log.debug("REST request to update WorkExperience : {}", workExperienceDTO);
		if (workExperienceDTO.getId() == null)
		{
			return createWorkExperience(workExperienceDTO);
		}
		WorkExperienceDTO result = workExperienceService.save(workExperienceDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workExperienceDTO.getId().toString()))
				.body(result);
	}

	/**
	 * GET /work-experiences : get all the workExperiences.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         workExperiences in body
	 */
	@GetMapping("/work-experiences")
	@Timed
	public ResponseEntity<List<WorkExperienceDTO>> getAllWorkExperiences(Pageable pageable)
	{
		log.debug("REST request to get a page of WorkExperiences");
		Page<WorkExperienceDTO> page = workExperienceService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/work-experiences");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /work-experiences/:id : get the "id" workExperience.
	 *
	 * @param id
	 *            the id of the workExperienceDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         workExperienceDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/work-experiences/{id}")
	@Timed
	public ResponseEntity<WorkExperienceDTO> getWorkExperience(@PathVariable Long id)
	{
		log.debug("REST request to get WorkExperience : {}", id);
		WorkExperienceDTO workExperienceDTO = workExperienceService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(workExperienceDTO));
	}

	/**
	 * DELETE /work-experiences/:id : delete the "id" workExperience.
	 *
	 * @param id
	 *            the id of the workExperienceDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/work-experiences/{id}")
	@Timed
	public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long id)
	{
		log.debug("REST request to delete WorkExperience : {}", id);
		workExperienceService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * SEARCH /_search/work-experiences?query=:query : search for the
	 * workExperience corresponding to the query.
	 *
	 * @param query
	 *            the query of the workExperience search
	 * @param pageable
	 *            the pagination information
	 * @return the result of the search
	 */
	@GetMapping("/_search/work-experiences")
	@Timed
	public ResponseEntity<List<WorkExperienceDTO>> searchWorkExperiences(@RequestParam String query, Pageable pageable)
	{
		log.debug("REST request to search for a page of WorkExperiences for query {}", query);
		Page<WorkExperienceDTO> page = workExperienceService.search(query, pageable);
		HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page,
				"/api/_search/work-experiences");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

}

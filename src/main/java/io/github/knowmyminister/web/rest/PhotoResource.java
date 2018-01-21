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
import io.github.knowmyminister.service.PhotoService;
import io.github.knowmyminister.service.dto.PhotoDTO;
import io.github.knowmyminister.web.rest.errors.BadRequestAlertException;
import io.github.knowmyminister.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Photo.
 */
@RestController
@RequestMapping("/api")
public class PhotoResource
{

	private final Logger log = LoggerFactory.getLogger(PhotoResource.class);

	private static final String ENTITY_NAME = "photo";

	private final PhotoService photoService;

	public PhotoResource(PhotoService photoService)
	{
		this.photoService = photoService;
	}

	/**
	 * POST /photos : Create a new photo.
	 *
	 * @param photoDTO
	 *            the photoDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new photoDTO, or with status 400 (Bad Request) if the photo has
	 *         already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/photos")
	@Timed
	public ResponseEntity<PhotoDTO> createPhoto(@Valid @RequestBody PhotoDTO photoDTO) throws URISyntaxException
	{
		log.debug("REST request to save Photo : {}", photoDTO);
		if (photoDTO.getId() != null)
		{
			throw new BadRequestAlertException("A new photo cannot already have an ID", ENTITY_NAME, "idexists");
		}
		PhotoDTO result = photoService.save(photoDTO);
		return ResponseEntity.created(new URI("/api/photos/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /photos : Updates an existing photo.
	 *
	 * @param photoDTO
	 *            the photoDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         photoDTO, or with status 400 (Bad Request) if the photoDTO is not
	 *         valid, or with status 500 (Internal Server Error) if the photoDTO
	 *         couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/photos")
	@Timed
	public ResponseEntity<PhotoDTO> updatePhoto(@Valid @RequestBody PhotoDTO photoDTO) throws URISyntaxException
	{
		log.debug("REST request to update Photo : {}", photoDTO);
		if (photoDTO.getId() == null)
		{
			return createPhoto(photoDTO);
		}
		PhotoDTO result = photoService.save(photoDTO);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, photoDTO.getId().toString()))
				.body(result);
	}

	/**
	 * GET /photos : get all the photos.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of photos in
	 *         body
	 */
	@GetMapping("/photos")
	@Timed
	public List<PhotoDTO> getAllPhotos()
	{
		log.debug("REST request to get all Photos");
		return photoService.findAll();
	}

	/**
	 * GET /photos/:id : get the "id" photo.
	 *
	 * @param id
	 *            the id of the photoDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         photoDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/photos/{id}")
	@Timed
	public ResponseEntity<PhotoDTO> getPhoto(@PathVariable Long id)
	{
		log.debug("REST request to get Photo : {}", id);
		PhotoDTO photoDTO = photoService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(photoDTO));
	}

	/**
	 * DELETE /photos/:id : delete the "id" photo.
	 *
	 * @param id
	 *            the id of the photoDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/photos/{id}")
	@Timed
	public ResponseEntity<Void> deletePhoto(@PathVariable Long id)
	{
		log.debug("REST request to delete Photo : {}", id);
		photoService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * SEARCH /_search/photos?query=:query : search for the photo corresponding
	 * to the query.
	 *
	 * @param query
	 *            the query of the photo search
	 * @return the result of the search
	 */
	@GetMapping("/_search/photos")
	@Timed
	public List<PhotoDTO> searchPhotos(@RequestParam String query)
	{
		log.debug("REST request to search Photos for query {}", query);
		return photoService.search(query);
	}

}

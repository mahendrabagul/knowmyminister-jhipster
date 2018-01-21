package io.github.knowmyminister.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * REST controller for searching minister by multiple criteria.
 */
@RestController
@RequestMapping("/api")
public class CommonResource
{
	private final Logger log = LoggerFactory.getLogger(CommonResource.class);

	/**
	 * /_search/languages?query=:query search for the minister corresponding to
	 * the query.
	 *
	 * @param query
	 *            the query of the language search
	 * @param pageable
	 *            the pagination information
	 * @return the result of the search
	 */
	@GetMapping("/_search/common")
	@Timed
	public ResponseEntity<String> searchInCommon(@RequestParam String query)
	{
		log.debug("REST request to search for a page of common for query {}", query);
		return new ResponseEntity<>("Hello" + query, HttpStatus.OK);
	}

}

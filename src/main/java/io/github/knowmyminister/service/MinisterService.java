package io.github.knowmyminister.service;

import io.github.knowmyminister.service.dto.MinisterDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Minister.
 */
public interface MinisterService {

    /**
     * Save a minister.
     *
     * @param ministerDTO the entity to save
     * @return the persisted entity
     */
    MinisterDTO save(MinisterDTO ministerDTO);

    /**
     * Get all the ministers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MinisterDTO> findAll(Pageable pageable);

    /**
     * Get the "id" minister.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MinisterDTO findOne(Long id);

    /**
     * Delete the "id" minister.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the minister corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MinisterDTO> search(String query, Pageable pageable);
}

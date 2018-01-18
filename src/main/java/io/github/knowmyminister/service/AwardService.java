package io.github.knowmyminister.service;

import io.github.knowmyminister.service.dto.AwardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Award.
 */
public interface AwardService {

    /**
     * Save a award.
     *
     * @param awardDTO the entity to save
     * @return the persisted entity
     */
    AwardDTO save(AwardDTO awardDTO);

    /**
     * Get all the awards.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AwardDTO> findAll(Pageable pageable);

    /**
     * Get the "id" award.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AwardDTO findOne(Long id);

    /**
     * Delete the "id" award.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the award corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AwardDTO> search(String query, Pageable pageable);
}

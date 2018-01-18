package io.github.knowmyminister.service;

import io.github.knowmyminister.service.dto.BioDTO;
import java.util.List;

/**
 * Service Interface for managing Bio.
 */
public interface BioService {

    /**
     * Save a bio.
     *
     * @param bioDTO the entity to save
     * @return the persisted entity
     */
    BioDTO save(BioDTO bioDTO);

    /**
     * Get all the bios.
     *
     * @return the list of entities
     */
    List<BioDTO> findAll();

    /**
     * Get the "id" bio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BioDTO findOne(Long id);

    /**
     * Delete the "id" bio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the bio corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<BioDTO> search(String query);
}

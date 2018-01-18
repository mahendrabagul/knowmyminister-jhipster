package io.github.knowmyminister.service;

import io.github.knowmyminister.service.dto.WorkExperienceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing WorkExperience.
 */
public interface WorkExperienceService {

    /**
     * Save a workExperience.
     *
     * @param workExperienceDTO the entity to save
     * @return the persisted entity
     */
    WorkExperienceDTO save(WorkExperienceDTO workExperienceDTO);

    /**
     * Get all the workExperiences.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<WorkExperienceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" workExperience.
     *
     * @param id the id of the entity
     * @return the entity
     */
    WorkExperienceDTO findOne(Long id);

    /**
     * Delete the "id" workExperience.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the workExperience corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<WorkExperienceDTO> search(String query, Pageable pageable);
}

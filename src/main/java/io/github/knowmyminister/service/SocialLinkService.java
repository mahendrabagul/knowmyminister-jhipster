package io.github.knowmyminister.service;

import io.github.knowmyminister.service.dto.SocialLinkDTO;
import java.util.List;

/**
 * Service Interface for managing SocialLink.
 */
public interface SocialLinkService {

    /**
     * Save a socialLink.
     *
     * @param socialLinkDTO the entity to save
     * @return the persisted entity
     */
    SocialLinkDTO save(SocialLinkDTO socialLinkDTO);

    /**
     * Get all the socialLinks.
     *
     * @return the list of entities
     */
    List<SocialLinkDTO> findAll();

    /**
     * Get the "id" socialLink.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SocialLinkDTO findOne(Long id);

    /**
     * Delete the "id" socialLink.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the socialLink corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<SocialLinkDTO> search(String query);
}

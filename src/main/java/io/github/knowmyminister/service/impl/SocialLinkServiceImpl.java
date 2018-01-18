package io.github.knowmyminister.service.impl;

import io.github.knowmyminister.service.SocialLinkService;
import io.github.knowmyminister.domain.SocialLink;
import io.github.knowmyminister.repository.SocialLinkRepository;
import io.github.knowmyminister.repository.search.SocialLinkSearchRepository;
import io.github.knowmyminister.service.dto.SocialLinkDTO;
import io.github.knowmyminister.service.mapper.SocialLinkMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing SocialLink.
 */
@Service
@Transactional
public class SocialLinkServiceImpl implements SocialLinkService {

    private final Logger log = LoggerFactory.getLogger(SocialLinkServiceImpl.class);

    private final SocialLinkRepository socialLinkRepository;

    private final SocialLinkMapper socialLinkMapper;

    private final SocialLinkSearchRepository socialLinkSearchRepository;

    public SocialLinkServiceImpl(SocialLinkRepository socialLinkRepository, SocialLinkMapper socialLinkMapper, SocialLinkSearchRepository socialLinkSearchRepository) {
        this.socialLinkRepository = socialLinkRepository;
        this.socialLinkMapper = socialLinkMapper;
        this.socialLinkSearchRepository = socialLinkSearchRepository;
    }

    /**
     * Save a socialLink.
     *
     * @param socialLinkDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SocialLinkDTO save(SocialLinkDTO socialLinkDTO) {
        log.debug("Request to save SocialLink : {}", socialLinkDTO);
        SocialLink socialLink = socialLinkMapper.toEntity(socialLinkDTO);
        socialLink = socialLinkRepository.save(socialLink);
        SocialLinkDTO result = socialLinkMapper.toDto(socialLink);
        socialLinkSearchRepository.save(socialLink);
        return result;
    }

    /**
     * Get all the socialLinks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SocialLinkDTO> findAll() {
        log.debug("Request to get all SocialLinks");
        return socialLinkRepository.findAll().stream()
            .map(socialLinkMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one socialLink by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SocialLinkDTO findOne(Long id) {
        log.debug("Request to get SocialLink : {}", id);
        SocialLink socialLink = socialLinkRepository.findOne(id);
        return socialLinkMapper.toDto(socialLink);
    }

    /**
     * Delete the socialLink by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SocialLink : {}", id);
        socialLinkRepository.delete(id);
        socialLinkSearchRepository.delete(id);
    }

    /**
     * Search for the socialLink corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SocialLinkDTO> search(String query) {
        log.debug("Request to search SocialLinks for query {}", query);
        return StreamSupport
            .stream(socialLinkSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(socialLinkMapper::toDto)
            .collect(Collectors.toList());
    }
}

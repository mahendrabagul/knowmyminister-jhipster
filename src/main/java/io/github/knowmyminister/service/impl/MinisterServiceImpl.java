package io.github.knowmyminister.service.impl;

import io.github.knowmyminister.service.MinisterService;
import io.github.knowmyminister.domain.Minister;
import io.github.knowmyminister.repository.MinisterRepository;
import io.github.knowmyminister.repository.search.MinisterSearchRepository;
import io.github.knowmyminister.service.dto.MinisterDTO;
import io.github.knowmyminister.service.mapper.MinisterMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Minister.
 */
@Service
@Transactional
public class MinisterServiceImpl implements MinisterService {

    private final Logger log = LoggerFactory.getLogger(MinisterServiceImpl.class);

    private final MinisterRepository ministerRepository;

    private final MinisterMapper ministerMapper;

    private final MinisterSearchRepository ministerSearchRepository;

    public MinisterServiceImpl(MinisterRepository ministerRepository, MinisterMapper ministerMapper, MinisterSearchRepository ministerSearchRepository) {
        this.ministerRepository = ministerRepository;
        this.ministerMapper = ministerMapper;
        this.ministerSearchRepository = ministerSearchRepository;
    }

    /**
     * Save a minister.
     *
     * @param ministerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MinisterDTO save(MinisterDTO ministerDTO) {
        log.debug("Request to save Minister : {}", ministerDTO);
        Minister minister = ministerMapper.toEntity(ministerDTO);
        minister = ministerRepository.save(minister);
        MinisterDTO result = ministerMapper.toDto(minister);
        ministerSearchRepository.save(minister);
        return result;
    }

    /**
     * Get all the ministers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MinisterDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ministers");
        return ministerRepository.findAll(pageable)
            .map(ministerMapper::toDto);
    }

    /**
     * Get one minister by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MinisterDTO findOne(Long id) {
        log.debug("Request to get Minister : {}", id);
        Minister minister = ministerRepository.findOne(id);
        return ministerMapper.toDto(minister);
    }

    /**
     * Delete the minister by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Minister : {}", id);
        ministerRepository.delete(id);
        ministerSearchRepository.delete(id);
    }

    /**
     * Search for the minister corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MinisterDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Ministers for query {}", query);
        Page<Minister> result = ministerSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(ministerMapper::toDto);
    }
}

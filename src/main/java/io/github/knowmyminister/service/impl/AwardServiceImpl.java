package io.github.knowmyminister.service.impl;

import io.github.knowmyminister.service.AwardService;
import io.github.knowmyminister.domain.Award;
import io.github.knowmyminister.repository.AwardRepository;
import io.github.knowmyminister.repository.search.AwardSearchRepository;
import io.github.knowmyminister.service.dto.AwardDTO;
import io.github.knowmyminister.service.mapper.AwardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Award.
 */
@Service
@Transactional
public class AwardServiceImpl implements AwardService {

    private final Logger log = LoggerFactory.getLogger(AwardServiceImpl.class);

    private final AwardRepository awardRepository;

    private final AwardMapper awardMapper;

    private final AwardSearchRepository awardSearchRepository;

    public AwardServiceImpl(AwardRepository awardRepository, AwardMapper awardMapper, AwardSearchRepository awardSearchRepository) {
        this.awardRepository = awardRepository;
        this.awardMapper = awardMapper;
        this.awardSearchRepository = awardSearchRepository;
    }

    /**
     * Save a award.
     *
     * @param awardDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AwardDTO save(AwardDTO awardDTO) {
        log.debug("Request to save Award : {}", awardDTO);
        Award award = awardMapper.toEntity(awardDTO);
        award = awardRepository.save(award);
        AwardDTO result = awardMapper.toDto(award);
        awardSearchRepository.save(award);
        return result;
    }

    /**
     * Get all the awards.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AwardDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Awards");
        return awardRepository.findAll(pageable)
            .map(awardMapper::toDto);
    }

    /**
     * Get one award by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AwardDTO findOne(Long id) {
        log.debug("Request to get Award : {}", id);
        Award award = awardRepository.findOne(id);
        return awardMapper.toDto(award);
    }

    /**
     * Delete the award by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Award : {}", id);
        awardRepository.delete(id);
        awardSearchRepository.delete(id);
    }

    /**
     * Search for the award corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AwardDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Awards for query {}", query);
        Page<Award> result = awardSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(awardMapper::toDto);
    }
}

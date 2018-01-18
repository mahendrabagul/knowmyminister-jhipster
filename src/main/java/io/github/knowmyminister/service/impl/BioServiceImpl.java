package io.github.knowmyminister.service.impl;

import io.github.knowmyminister.service.BioService;
import io.github.knowmyminister.domain.Bio;
import io.github.knowmyminister.repository.BioRepository;
import io.github.knowmyminister.repository.search.BioSearchRepository;
import io.github.knowmyminister.service.dto.BioDTO;
import io.github.knowmyminister.service.mapper.BioMapper;
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
 * Service Implementation for managing Bio.
 */
@Service
@Transactional
public class BioServiceImpl implements BioService {

    private final Logger log = LoggerFactory.getLogger(BioServiceImpl.class);

    private final BioRepository bioRepository;

    private final BioMapper bioMapper;

    private final BioSearchRepository bioSearchRepository;

    public BioServiceImpl(BioRepository bioRepository, BioMapper bioMapper, BioSearchRepository bioSearchRepository) {
        this.bioRepository = bioRepository;
        this.bioMapper = bioMapper;
        this.bioSearchRepository = bioSearchRepository;
    }

    /**
     * Save a bio.
     *
     * @param bioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BioDTO save(BioDTO bioDTO) {
        log.debug("Request to save Bio : {}", bioDTO);
        Bio bio = bioMapper.toEntity(bioDTO);
        bio = bioRepository.save(bio);
        BioDTO result = bioMapper.toDto(bio);
        bioSearchRepository.save(bio);
        return result;
    }

    /**
     * Get all the bios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BioDTO> findAll() {
        log.debug("Request to get all Bios");
        return bioRepository.findAll().stream()
            .map(bioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BioDTO findOne(Long id) {
        log.debug("Request to get Bio : {}", id);
        Bio bio = bioRepository.findOne(id);
        return bioMapper.toDto(bio);
    }

    /**
     * Delete the bio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bio : {}", id);
        bioRepository.delete(id);
        bioSearchRepository.delete(id);
    }

    /**
     * Search for the bio corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BioDTO> search(String query) {
        log.debug("Request to search Bios for query {}", query);
        return StreamSupport
            .stream(bioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(bioMapper::toDto)
            .collect(Collectors.toList());
    }
}

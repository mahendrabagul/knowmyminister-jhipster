package io.github.knowmyminister.service.impl;

import io.github.knowmyminister.service.WorkExperienceService;
import io.github.knowmyminister.domain.WorkExperience;
import io.github.knowmyminister.repository.WorkExperienceRepository;
import io.github.knowmyminister.repository.search.WorkExperienceSearchRepository;
import io.github.knowmyminister.service.dto.WorkExperienceDTO;
import io.github.knowmyminister.service.mapper.WorkExperienceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing WorkExperience.
 */
@Service
@Transactional
public class WorkExperienceServiceImpl implements WorkExperienceService {

    private final Logger log = LoggerFactory.getLogger(WorkExperienceServiceImpl.class);

    private final WorkExperienceRepository workExperienceRepository;

    private final WorkExperienceMapper workExperienceMapper;

    private final WorkExperienceSearchRepository workExperienceSearchRepository;

    public WorkExperienceServiceImpl(WorkExperienceRepository workExperienceRepository, WorkExperienceMapper workExperienceMapper, WorkExperienceSearchRepository workExperienceSearchRepository) {
        this.workExperienceRepository = workExperienceRepository;
        this.workExperienceMapper = workExperienceMapper;
        this.workExperienceSearchRepository = workExperienceSearchRepository;
    }

    /**
     * Save a workExperience.
     *
     * @param workExperienceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public WorkExperienceDTO save(WorkExperienceDTO workExperienceDTO) {
        log.debug("Request to save WorkExperience : {}", workExperienceDTO);
        WorkExperience workExperience = workExperienceMapper.toEntity(workExperienceDTO);
        workExperience = workExperienceRepository.save(workExperience);
        WorkExperienceDTO result = workExperienceMapper.toDto(workExperience);
        workExperienceSearchRepository.save(workExperience);
        return result;
    }

    /**
     * Get all the workExperiences.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WorkExperienceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WorkExperiences");
        return workExperienceRepository.findAll(pageable)
            .map(workExperienceMapper::toDto);
    }

    /**
     * Get one workExperience by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public WorkExperienceDTO findOne(Long id) {
        log.debug("Request to get WorkExperience : {}", id);
        WorkExperience workExperience = workExperienceRepository.findOne(id);
        return workExperienceMapper.toDto(workExperience);
    }

    /**
     * Delete the workExperience by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WorkExperience : {}", id);
        workExperienceRepository.delete(id);
        workExperienceSearchRepository.delete(id);
    }

    /**
     * Search for the workExperience corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WorkExperienceDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of WorkExperiences for query {}", query);
        Page<WorkExperience> result = workExperienceSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(workExperienceMapper::toDto);
    }
}

package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.WorkExperience;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WorkExperience entity.
 */
public interface WorkExperienceSearchRepository extends ElasticsearchRepository<WorkExperience, Long> {
}

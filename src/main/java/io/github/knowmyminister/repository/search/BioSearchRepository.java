package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.Bio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Bio entity.
 */
public interface BioSearchRepository extends ElasticsearchRepository<Bio, Long> {
}

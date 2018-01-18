package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.Minister;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Minister entity.
 */
public interface MinisterSearchRepository extends ElasticsearchRepository<Minister, Long> {
}

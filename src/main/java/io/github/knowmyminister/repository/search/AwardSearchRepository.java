package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.Award;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Award entity.
 */
public interface AwardSearchRepository extends ElasticsearchRepository<Award, Long> {
}

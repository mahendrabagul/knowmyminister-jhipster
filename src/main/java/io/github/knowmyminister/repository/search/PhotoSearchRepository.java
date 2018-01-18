package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.Photo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Photo entity.
 */
public interface PhotoSearchRepository extends ElasticsearchRepository<Photo, Long> {
}

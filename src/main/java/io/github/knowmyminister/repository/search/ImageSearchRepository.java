package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.Image;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Image entity.
 */
public interface ImageSearchRepository extends ElasticsearchRepository<Image, Long> {
}

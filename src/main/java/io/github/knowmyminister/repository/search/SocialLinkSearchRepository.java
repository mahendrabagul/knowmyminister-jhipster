package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.SocialLink;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SocialLink entity.
 */
public interface SocialLinkSearchRepository extends ElasticsearchRepository<SocialLink, Long> {
}

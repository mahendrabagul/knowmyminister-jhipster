package io.github.knowmyminister.repository.search;

import io.github.knowmyminister.domain.PoliticalParty;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PoliticalParty entity.
 */
public interface PoliticalPartySearchRepository extends ElasticsearchRepository<PoliticalParty, Long> {
}

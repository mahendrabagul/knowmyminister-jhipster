package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.PoliticalParty;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PoliticalParty entity.
 */
@Repository
public interface PoliticalPartyRepository extends JpaRepository<PoliticalParty, Long>
{

}

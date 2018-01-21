package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.Award;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Award entity.
 */
@Repository
public interface AwardRepository extends JpaRepository<Award, Long>
{

}

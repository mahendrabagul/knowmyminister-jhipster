package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.Bio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bio entity.
 */
@Repository
public interface BioRepository extends JpaRepository<Bio, Long> {

}

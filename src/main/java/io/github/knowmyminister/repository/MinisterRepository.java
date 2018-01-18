package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.Minister;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Minister entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MinisterRepository extends JpaRepository<Minister, Long> {

}

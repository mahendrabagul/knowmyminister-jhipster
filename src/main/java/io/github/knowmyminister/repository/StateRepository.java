package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.State;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the State entity.
 */
@Repository
public interface StateRepository extends JpaRepository<State, Long> {

}

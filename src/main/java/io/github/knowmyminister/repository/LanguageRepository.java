package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.Language;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Language entity.
 */
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {

}

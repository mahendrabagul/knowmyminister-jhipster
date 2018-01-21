package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.SocialLink;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SocialLink entity.
 */
@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {

}

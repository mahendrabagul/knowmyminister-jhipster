package io.github.knowmyminister.repository;

import io.github.knowmyminister.domain.Image;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Image entity.
 */
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}

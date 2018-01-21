package io.github.knowmyminister.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.knowmyminister.domain.WorkExperience;

/**
 * Spring Data JPA repository for the WorkExperience entity.
 */
@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long>
{

}

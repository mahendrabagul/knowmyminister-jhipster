package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.WorkExperienceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity WorkExperience and its DTO WorkExperienceDTO.
 */
@Mapper(componentModel = "spring", uses = {MinisterMapper.class, LanguageMapper.class})
public interface WorkExperienceMapper extends EntityMapper<WorkExperienceDTO, WorkExperience> {

    @Mapping(source = "minister.id", target = "ministerId")
    @Mapping(source = "language.id", target = "languageId")
    WorkExperienceDTO toDto(WorkExperience workExperience);

    @Mapping(source = "ministerId", target = "minister")
    @Mapping(source = "languageId", target = "language")
    WorkExperience toEntity(WorkExperienceDTO workExperienceDTO);

    default WorkExperience fromId(Long id) {
        if (id == null) {
            return null;
        }
        WorkExperience workExperience = new WorkExperience();
        workExperience.setId(id);
        return workExperience;
    }
}

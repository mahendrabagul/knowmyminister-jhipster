package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.EducationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Education and its DTO EducationDTO.
 */
@Mapper(componentModel = "spring", uses = {MinisterMapper.class, LanguageMapper.class})
public interface EducationMapper extends EntityMapper<EducationDTO, Education> {

    @Mapping(source = "minister.id", target = "ministerId")
    @Mapping(source = "language.id", target = "languageId")
    EducationDTO toDto(Education education);

    @Mapping(source = "ministerId", target = "minister")
    @Mapping(source = "languageId", target = "language")
    Education toEntity(EducationDTO educationDTO);

    default Education fromId(Long id) {
        if (id == null) {
            return null;
        }
        Education education = new Education();
        education.setId(id);
        return education;
    }
}

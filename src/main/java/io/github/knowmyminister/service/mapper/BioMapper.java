package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.BioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bio and its DTO BioDTO.
 */
@Mapper(componentModel = "spring", uses = {LanguageMapper.class, ImageMapper.class})
public interface BioMapper extends EntityMapper<BioDTO, Bio> {

    @Mapping(source = "language.id", target = "languageId")
    @Mapping(source = "profilePicture.id", target = "profilePictureId")
    BioDTO toDto(Bio bio);

    @Mapping(source = "languageId", target = "language")
    @Mapping(source = "profilePictureId", target = "profilePicture")
    Bio toEntity(BioDTO bioDTO);

    default Bio fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bio bio = new Bio();
        bio.setId(id);
        return bio;
    }
}

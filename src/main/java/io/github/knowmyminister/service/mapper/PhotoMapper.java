package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.PhotoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Photo and its DTO PhotoDTO.
 */
@Mapper(componentModel = "spring", uses = {MinisterMapper.class, PoliticalPartyMapper.class})
public interface PhotoMapper extends EntityMapper<PhotoDTO, Photo> {

    @Mapping(source = "minister.id", target = "ministerId")
    @Mapping(source = "politicalParty.id", target = "politicalPartyId")
    PhotoDTO toDto(Photo photo);

    @Mapping(source = "ministerId", target = "minister")
    @Mapping(source = "politicalPartyId", target = "politicalParty")
    Photo toEntity(PhotoDTO photoDTO);

    default Photo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Photo photo = new Photo();
        photo.setId(id);
        return photo;
    }
}

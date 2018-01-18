package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.MinisterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Minister and its DTO MinisterDTO.
 */
@Mapper(componentModel = "spring", uses = {ImageMapper.class, PoliticalPartyMapper.class, BioMapper.class})
public interface MinisterMapper extends EntityMapper<MinisterDTO, Minister> {

    @Mapping(source = "electionSign.id", target = "electionSignId")
    @Mapping(source = "party.id", target = "partyId")
    @Mapping(source = "bio.id", target = "bioId")
    @Mapping(source = "politicalParty.id", target = "politicalPartyId")
    MinisterDTO toDto(Minister minister);

    @Mapping(source = "electionSignId", target = "electionSign")
    @Mapping(source = "partyId", target = "party")
    @Mapping(source = "bioId", target = "bio")
    @Mapping(target = "addresses", ignore = true)
    @Mapping(target = "awards", ignore = true)
    @Mapping(target = "photos", ignore = true)
    @Mapping(target = "workExperinces", ignore = true)
    @Mapping(target = "educations", ignore = true)
    @Mapping(target = "socialLinks", ignore = true)
    @Mapping(source = "politicalPartyId", target = "politicalParty")
    Minister toEntity(MinisterDTO ministerDTO);

    default Minister fromId(Long id) {
        if (id == null) {
            return null;
        }
        Minister minister = new Minister();
        minister.setId(id);
        return minister;
    }
}

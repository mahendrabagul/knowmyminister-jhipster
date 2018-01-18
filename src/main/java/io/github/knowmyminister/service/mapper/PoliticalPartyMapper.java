package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.PoliticalPartyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PoliticalParty and its DTO PoliticalPartyDTO.
 */
@Mapper(componentModel = "spring", uses = {ImageMapper.class, MinisterMapper.class})
public interface PoliticalPartyMapper extends EntityMapper<PoliticalPartyDTO, PoliticalParty> {

    @Mapping(source = "logo.id", target = "logoId")
    @Mapping(source = "president.id", target = "presidentId")
    @Mapping(source = "rajyasabhaLeader.id", target = "rajyasabhaLeaderId")
    @Mapping(source = "loksabhaLeader.id", target = "loksabhaLeaderId")
    PoliticalPartyDTO toDto(PoliticalParty politicalParty);

    @Mapping(source = "logoId", target = "logo")
    @Mapping(source = "presidentId", target = "president")
    @Mapping(source = "rajyasabhaLeaderId", target = "rajyasabhaLeader")
    @Mapping(source = "loksabhaLeaderId", target = "loksabhaLeader")
    @Mapping(target = "socialLinks", ignore = true)
    @Mapping(target = "ministers", ignore = true)
    @Mapping(target = "photos", ignore = true)
    @Mapping(target = "headquarters", ignore = true)
    PoliticalParty toEntity(PoliticalPartyDTO politicalPartyDTO);

    default PoliticalParty fromId(Long id) {
        if (id == null) {
            return null;
        }
        PoliticalParty politicalParty = new PoliticalParty();
        politicalParty.setId(id);
        return politicalParty;
    }
}

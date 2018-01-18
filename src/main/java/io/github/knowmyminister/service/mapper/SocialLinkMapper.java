package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.SocialLinkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SocialLink and its DTO SocialLinkDTO.
 */
@Mapper(componentModel = "spring", uses = {MinisterMapper.class, PoliticalPartyMapper.class})
public interface SocialLinkMapper extends EntityMapper<SocialLinkDTO, SocialLink> {

    @Mapping(source = "minister.id", target = "ministerId")
    @Mapping(source = "politicalParty.id", target = "politicalPartyId")
    SocialLinkDTO toDto(SocialLink socialLink);

    @Mapping(source = "ministerId", target = "minister")
    @Mapping(source = "politicalPartyId", target = "politicalParty")
    SocialLink toEntity(SocialLinkDTO socialLinkDTO);

    default SocialLink fromId(Long id) {
        if (id == null) {
            return null;
        }
        SocialLink socialLink = new SocialLink();
        socialLink.setId(id);
        return socialLink;
    }
}

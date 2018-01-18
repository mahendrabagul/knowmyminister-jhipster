package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.AwardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Award and its DTO AwardDTO.
 */
@Mapper(componentModel = "spring", uses = {MinisterMapper.class})
public interface AwardMapper extends EntityMapper<AwardDTO, Award> {

    @Mapping(source = "minister.id", target = "ministerId")
    AwardDTO toDto(Award award);

    @Mapping(source = "ministerId", target = "minister")
    Award toEntity(AwardDTO awardDTO);

    default Award fromId(Long id) {
        if (id == null) {
            return null;
        }
        Award award = new Award();
        award.setId(id);
        return award;
    }
}

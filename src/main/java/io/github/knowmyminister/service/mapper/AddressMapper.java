package io.github.knowmyminister.service.mapper;

import io.github.knowmyminister.domain.*;
import io.github.knowmyminister.service.dto.AddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {MinisterMapper.class, PoliticalPartyMapper.class, StateMapper.class, CountryMapper.class})
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {

    @Mapping(source = "minister.id", target = "ministerId")
    @Mapping(source = "politicalParty.id", target = "politicalPartyId")
    @Mapping(source = "state.id", target = "stateId")
    @Mapping(source = "contry.id", target = "contryId")
    AddressDTO toDto(Address address);

    @Mapping(source = "ministerId", target = "minister")
    @Mapping(source = "politicalPartyId", target = "politicalParty")
    @Mapping(source = "stateId", target = "state")
    @Mapping(source = "contryId", target = "contry")
    Address toEntity(AddressDTO addressDTO);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}

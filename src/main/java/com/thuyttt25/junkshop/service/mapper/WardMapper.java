package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.District;
import com.thuyttt25.junkshop.domain.Ward;
import com.thuyttt25.junkshop.service.dto.DistrictDTO;
import com.thuyttt25.junkshop.service.dto.WardDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Ward} and its DTO {@link WardDTO}.
 */
@Mapper(componentModel = "spring")
public interface WardMapper extends EntityMapper<WardDTO, Ward> {
    WardDTO toDto(Ward s);

    @Named("districtId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DistrictDTO toDtoDistrictId(District district);
}

package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.District;
import com.thuyttt25.junkshop.domain.Ward;
import com.thuyttt25.junkshop.service.dto.DistrictDTO;
import com.thuyttt25.junkshop.service.dto.WardDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface WardMapper extends EntityMapper<WardDTO, Ward> {
    @Mapping(target = "district", source = "district", qualifiedByName = "districtId")
    WardDTO toDto(Ward s);

    @Named("districtId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DistrictDTO toDtoDistrictId(District district);
}

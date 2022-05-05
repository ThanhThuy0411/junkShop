package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.District;
import com.thuyttt25.junkshop.service.dto.DistrictDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DistrictMapper extends EntityMapper<DistrictDTO, District> {}

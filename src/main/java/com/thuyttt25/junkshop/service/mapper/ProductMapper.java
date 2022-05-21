package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.District;
import com.thuyttt25.junkshop.domain.Product;
import com.thuyttt25.junkshop.domain.User;
import com.thuyttt25.junkshop.domain.Ward;
import com.thuyttt25.junkshop.service.dto.*;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    ProductDTO toDto(Product s);

    @Named("wardId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WardDTO toDtoWardId(Ward ward);

    @Named("districtId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DistrictDTO toDtoDistrictId(District district);
}

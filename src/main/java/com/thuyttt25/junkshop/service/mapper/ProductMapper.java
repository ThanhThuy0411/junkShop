package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.District;
import com.thuyttt25.junkshop.domain.Product;
import com.thuyttt25.junkshop.domain.User;
import com.thuyttt25.junkshop.domain.Ward;
import com.thuyttt25.junkshop.service.dto.*;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
//    @Mapping(target = "ward", source = "ward", qualifiedByName = "wardId")
//    @Mapping(target = "district", source = "district", qualifiedByName = "districtId")
//    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    ProductDTO toDto(Product s);

    @Named("wardId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WardDTO toDtoWardId(Ward ward);

    @Named("districtId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DistrictDTO toDtoDistrictId(District district);

//    @Named("userId")
//    @BeanMapping(ignoreByDefault = true)
//    @Mapping(target = "id", source = "id")
//    UserDTO toDtoUserId(User user);
}

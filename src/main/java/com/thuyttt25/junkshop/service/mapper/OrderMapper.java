package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.District;
import com.thuyttt25.junkshop.domain.Order;
import com.thuyttt25.junkshop.domain.Product;
import com.thuyttt25.junkshop.domain.Ward;
import com.thuyttt25.junkshop.service.dto.DistrictDTO;
import com.thuyttt25.junkshop.service.dto.OrderDTO;
import com.thuyttt25.junkshop.service.dto.ProductDTO;
import com.thuyttt25.junkshop.service.dto.WardDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    //    @Mapping(target = "ward", source = "ward", qualifiedByName = "wardId")
//    @Mapping(target = "district.districtName", source = "district.districtName")
//    @Mapping(target = "district.id", source = "district.id")
//    @Mapping(target = "product.productName", source = "product.productName")
//    @Mapping(target = "product.id", source = "product.id")
    OrderDTO toDto(Order s);

    @Named("wardId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WardDTO toDtoWardId(Ward ward);

    @Named("districtId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DistrictDTO toDtoDistrictId(District district);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);

    @Named("productName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "productName", source = "productName")
    ProductDTO toDtoProductName(Product product);
}

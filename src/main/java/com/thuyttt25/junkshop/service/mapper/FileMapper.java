package com.thuyttt25.junkshop.service.mapper;

import com.thuyttt25.junkshop.domain.File;
import com.thuyttt25.junkshop.domain.Product;
import com.thuyttt25.junkshop.service.dto.FileDTO;
import com.thuyttt25.junkshop.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link File} and its DTO {@link FileDTO}.
 */
@Mapper(componentModel = "spring")
public interface FileMapper extends EntityMapper<FileDTO, File> {
    @Mapping(target = "product", source = "product", qualifiedByName = "productId")
    FileDTO toDto(File s);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);
}

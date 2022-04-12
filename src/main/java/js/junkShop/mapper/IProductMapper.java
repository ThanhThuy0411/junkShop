package js.junkShop.mapper;

import js.junkShop.dto.product.ProductDto;
import js.junkShop.entity.ProductEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductEntity fromProductDtoToProductEntity(ProductDto dto);
    ProductDto toProductDto(ProductEntity productEntity);
    List<ProductDto> toProductDtos(List<ProductEntity> productEntity);
}

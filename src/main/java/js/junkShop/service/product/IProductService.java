package js.junkShop.service.product;


import js.junkShop.dto.product.ProductDto;

import java.util.List;
import java.util.UUID;

public interface IProductService {
    ProductDto createProduct (ProductDto product);
    ProductDto updateProduct(ProductDto product, UUID productId);
    ProductDto getById (UUID productId);
    boolean delete(UUID productId);
    List<ProductDto> getByProductId(UUID productId);
    void deleteByProductId(UUID productId);
}

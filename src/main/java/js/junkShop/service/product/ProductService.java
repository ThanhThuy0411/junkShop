package js.junkShop.service.product;

import js.junkShop.dto.product.ProductDto;
import js.junkShop.entity.ProductEntity;
import js.junkShop.mapper.IProductMapper;
import js.junkShop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProductService implements IProductService {
    private final ProductRepository productRepo;
    private final IProductMapper productMapper;
    public ProductService(ProductRepository productRepo, IProductMapper productMapper) {
        this.productRepo = productRepo;
        this.productMapper = productMapper;
    }

    public ProductDto createProduct (ProductDto order) {
        ProductEntity orderEntity = productMapper.fromProductDtoToProductEntity(order);
        ProductEntity returnProduct = productRepo.save(orderEntity);
        return productMapper.toProductDto(returnProduct);
    }

    public ProductDto updateProduct (ProductDto orderDto, UUID orderId){
        ProductEntity orderEntity = productMapper.fromProductDtoToProductEntity(orderDto);
        orderEntity.setProductId(orderId);
        ProductEntity returnProduct = productRepo.save(orderEntity);
        return productMapper.toProductDto(returnProduct);
    }


    public boolean delete(UUID orderId) {
        ProductEntity orderEntity = productRepo.findFirstByProductId(orderId);
        if(orderEntity != null){
           productRepo.deleteById(orderId);
           return true;
        }
        return false;
    }


    public ProductDto getById (UUID orderId){
        ProductEntity orderEntity = productRepo.findFirstByProductId(orderId);
        if(orderEntity != null){
            return productMapper.toProductDto(orderEntity);
        }
        return  null;
    }


    @Override
    public List<ProductDto> getByProductId(UUID productId) {
        List<ProductEntity> orderEntity2 = productRepo.findByProductId(productId);
        if (orderEntity2 != null){
            return productMapper.toProductDtos(orderEntity2);
        }
        return null;
    }

    @Override
    public void deleteByProductId(UUID productId) {
        List<ProductEntity> orderEntities = productRepo.findByProductId(productId);
        for(ProductEntity order : orderEntities) {
            delete(order.getProductId());
        }
    }

}

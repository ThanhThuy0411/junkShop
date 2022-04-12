package js.junkShop.repository;

import js.junkShop.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository <ProductEntity, UUID> {
    ProductEntity findFirstByProductId (UUID productId);
    void deleteById (UUID productId);
    List<ProductEntity> findByProductId(UUID productId);
}

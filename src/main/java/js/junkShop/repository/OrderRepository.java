package js.junkShop.repository;

import js.junkShop.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository <OrderEntity, UUID> {
    OrderEntity findFirstByOrderId (UUID orderId);
    void deleteById (UUID orderId);

    List<OrderEntity> findByProductId(UUID productId);
}

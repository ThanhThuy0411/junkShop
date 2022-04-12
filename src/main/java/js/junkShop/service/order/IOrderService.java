package js.junkShop.service.order;


import js.junkShop.dto.order.OrderDto;

import java.util.List;
import java.util.UUID;

public interface IOrderService {
    OrderDto createOrder (OrderDto order);
    OrderDto updateOrder (OrderDto order, UUID orderId);
    OrderDto getById (UUID orderId);
    boolean delete(UUID orderId);
    List<OrderDto> getByProductId(UUID productId);
    void deleteByProductId(UUID productId);
}

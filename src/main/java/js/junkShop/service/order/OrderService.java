package js.junkShop.service.order;

import js.junkShop.dto.order.OrderDto;
import js.junkShop.entity.OrderEntity;
import js.junkShop.mapper.IOrderMapper;
import js.junkShop.repository.OrderRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class OrderService implements IOrderService {
    private final OrderRepository orderRepo;
    private final IOrderMapper orderMapper;
    public OrderService(OrderRepository orderRepo, IOrderMapper orderMapper) {
        this.orderRepo = orderRepo;
        this.orderMapper = orderMapper;
    }

    public OrderDto createOrder (OrderDto order) {
        OrderEntity orderEntity = orderMapper.fromOrderDtoToOrderEntity(order);
        OrderEntity returnOrder = orderRepo.save(orderEntity);
        return orderMapper.toOrderDto(returnOrder);
    }

    public OrderDto updateOrder (OrderDto orderDto, UUID orderId){
        OrderEntity orderEntity = orderMapper.fromOrderDtoToOrderEntity(orderDto);
        orderEntity.setOrderId(orderId);
        OrderEntity returnOrder = orderRepo.save(orderEntity);
        return orderMapper.toOrderDto(returnOrder);
    }


    public boolean delete(UUID orderId) {
        OrderEntity orderEntity = orderRepo.findFirstByOrderId(orderId);
        if(orderEntity != null){
           orderRepo.deleteById(orderId);
           return true;
        }
        return false;
    }


    public OrderDto getById (UUID orderId){
        OrderEntity orderEntity = orderRepo.findFirstByOrderId(orderId);
        if(orderEntity != null){
            return orderMapper.toOrderDto(orderEntity);
        }
        return  null;
    }


    @Override
    public List<OrderDto> getByProductId(UUID productId) {
        List<OrderEntity> orderEntity2 = orderRepo.findByProductId(productId);
        if (orderEntity2 != null){
            return orderMapper.toOrderDtos(orderEntity2);
        }
        return null;
    }

    @Override
    public void deleteByProductId(UUID productId) {
        List<OrderEntity> orderEntities = orderRepo.findByProductId(productId);
        for(OrderEntity order : orderEntities) {
            delete(order.getOrderId());
        }
    }

}

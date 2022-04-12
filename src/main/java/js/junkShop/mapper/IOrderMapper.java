package js.junkShop.mapper;

import js.junkShop.dto.order.OrderDto;
import js.junkShop.entity.OrderEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IOrderMapper {
    OrderEntity fromOrderDtoToOrderEntity(OrderDto dto);
    OrderDto toOrderDto(OrderEntity fileEntity);
    List<OrderDto> toOrderDtos(List<OrderEntity> fileEntity);
}

package com.thuyttt25.junkshop.service;

import com.thuyttt25.junkshop.service.dto.OrderDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    OrderDTO save(OrderDTO orderDTO);

    OrderDTO update(OrderDTO orderDTO);

    Optional<OrderDTO> partialUpdate(OrderDTO orderDTO);

    Page<OrderDTO> findAll(Pageable pageable);

    Optional<OrderDTO> findOne(Long id);

    void delete(Long id);
}

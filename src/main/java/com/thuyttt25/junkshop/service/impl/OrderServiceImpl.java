package com.thuyttt25.junkshop.service.impl;

import com.thuyttt25.junkshop.domain.Order;
import com.thuyttt25.junkshop.domain.Product;
import com.thuyttt25.junkshop.domain.User;
import com.thuyttt25.junkshop.domain.enumeration.ProductStatus;
import com.thuyttt25.junkshop.repository.OrderRepository;
import com.thuyttt25.junkshop.service.OrderService;
import com.thuyttt25.junkshop.service.ProductService;
import com.thuyttt25.junkshop.service.UserService;
import com.thuyttt25.junkshop.service.dto.OrderDTO;
import com.thuyttt25.junkshop.service.dto.ProductDTO;
import com.thuyttt25.junkshop.service.mapper.OrderMapper;
import java.util.Optional;

import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    private final ProductService productService;


    private final OrderMapper orderMapper;

    private final UserService userService;

    public OrderServiceImpl(OrderRepository orderRepository, ProductService productService, OrderMapper orderMapper, UserService userService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.orderMapper = orderMapper;
        this.userService = userService;
    }

    @Override
    public OrderDTO save(OrderDTO orderDTO) throws Exception {
        log.debug("Request to save Order : {}", orderDTO);
        Order order = orderMapper.toEntity(orderDTO);
        // Set current user for this product

        Optional<User> user = this.userService.getUserWithAuthorities();
        if(user.isPresent()){
            order.setUser(user.get());
        }
        order = orderRepository.save(order);

        ProductDTO productDTO = orderDTO.getProduct();
        productDTO.setProductStatus(ProductStatus.Sold);
        Optional<ProductDTO> productUpdate = this.productService.partialUpdate(productDTO);
        if(!productUpdate.isPresent()){
            throw new Exception("Error when update product status to Sold");
        }
        return orderMapper.toDto(order);
    }

    @Override
    public OrderDTO update(OrderDTO orderDTO) {
        log.debug("Request to save Order : {}", orderDTO);
        Order order = orderMapper.toEntity(orderDTO);
        order = orderRepository.save(order);
        return orderMapper.toDto(order);
    }

    @Override
    public Optional<OrderDTO> partialUpdate(OrderDTO orderDTO) {
        log.debug("Request to partially update Order : {}", orderDTO);

        return orderRepository
            .findById(orderDTO.getId())
            .map(existingOrder -> {
                orderMapper.partialUpdate(existingOrder, orderDTO);

                return existingOrder;
            })
            .map(orderRepository::save)
            .map(orderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAll(pageable).map(orderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrderDTO> findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findById(id).map(orderMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.deleteById(id);
    }
}

package com.thuyttt25.junkshop.service.impl;

import com.thuyttt25.junkshop.domain.Product;
import com.thuyttt25.junkshop.domain.User;
import com.thuyttt25.junkshop.repository.ProductRepository;
import com.thuyttt25.junkshop.service.ProductService;
import com.thuyttt25.junkshop.service.UserService;
import com.thuyttt25.junkshop.service.dto.ProductDTO;
import com.thuyttt25.junkshop.service.mapper.ProductMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final UserService userService;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, UserService userService) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.userService = userService;
    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);

        Optional<User> user = this.userService.getUserWithAuthorities();
        if(user.isPresent()){
            product.setUser(user.get());
        }

        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    public ProductDTO update(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    public Optional<ProductDTO> partialUpdate(ProductDTO productDTO) {
        log.debug("Request to partially update Product : {}", productDTO);

        return productRepository
            .findById(productDTO.getId())
            .map(existingProduct -> {
                productMapper.partialUpdate(existingProduct, productDTO);

                return existingProduct;
            })
            .map(productRepository::save)
            .map(productMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable, Long userId) {
        log.debug("Request to get all Products");
        Optional<Long>  userIdOp = Optional.ofNullable(userId);
        if(userIdOp.isPresent()){
            return productRepository.findAllByUserId(pageable , userIdOp.get()).map(productMapper::toDto);
        }
        else{
            return productRepository.findAll(pageable).map(productMapper::toDto);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id).map(productMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
    }
}

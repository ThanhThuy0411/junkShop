package com.thuyttt25.junkshop.service;

import com.thuyttt25.junkshop.service.dto.ProductDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductDTO save(ProductDTO productDTO);

    ProductDTO update(ProductDTO productDTO);

    Optional<ProductDTO> partialUpdate(ProductDTO productDTO);

    Page<ProductDTO> findAll(Pageable pageable);

    Optional<ProductDTO> findOne(Long id);

    void delete(Long id);
}

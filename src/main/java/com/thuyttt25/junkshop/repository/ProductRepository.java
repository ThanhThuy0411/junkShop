package com.thuyttt25.junkshop.repository;

import com.thuyttt25.junkshop.domain.Product;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {}

package com.thuyttt25.junkshop.repository;

import com.thuyttt25.junkshop.domain.Order;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {}

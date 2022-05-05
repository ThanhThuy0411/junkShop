package com.thuyttt25.junkshop.repository;

import com.thuyttt25.junkshop.domain.District;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {}

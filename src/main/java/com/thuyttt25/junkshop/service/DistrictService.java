package com.thuyttt25.junkshop.service;

import com.thuyttt25.junkshop.service.dto.DistrictDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DistrictService {
    DistrictDTO save(DistrictDTO districtDTO);

    DistrictDTO update(DistrictDTO districtDTO);

    Optional<DistrictDTO> partialUpdate(DistrictDTO districtDTO);

    Page<DistrictDTO> findAll(Pageable pageable);

    Optional<DistrictDTO> findOne(Long id);

    void delete(Long id);
}

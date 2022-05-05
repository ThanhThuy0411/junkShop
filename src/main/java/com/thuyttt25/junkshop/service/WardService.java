package com.thuyttt25.junkshop.service;

import com.thuyttt25.junkshop.service.dto.WardDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WardService {

    WardDTO save(WardDTO wardDTO);

    WardDTO update(WardDTO wardDTO);

    Optional<WardDTO> partialUpdate(WardDTO wardDTO);

    Page<WardDTO> findAll(Pageable pageable);

    Optional<WardDTO> findOne(Long id);

    void delete(Long id);
}

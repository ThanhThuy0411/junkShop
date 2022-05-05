package com.thuyttt25.junkshop.service;

import com.thuyttt25.junkshop.service.dto.FileDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FileService {

    FileDTO save(FileDTO fileDTO);

    FileDTO update(FileDTO fileDTO);

    Optional<FileDTO> partialUpdate(FileDTO fileDTO);

    Page<FileDTO> findAll(Pageable pageable);

    Optional<FileDTO> findOne(Long id);

    void delete(Long id);
}

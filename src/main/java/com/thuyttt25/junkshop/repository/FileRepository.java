package com.thuyttt25.junkshop.repository;

import com.thuyttt25.junkshop.domain.File;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface FileRepository extends JpaRepository<File, Long> {}

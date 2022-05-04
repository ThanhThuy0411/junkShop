package com.thuyttt25.junkshop.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FileMapperTest {

    private FileMapper fileMapper;

    @BeforeEach
    public void setUp() {
        fileMapper = new FileMapperImpl();
    }
}

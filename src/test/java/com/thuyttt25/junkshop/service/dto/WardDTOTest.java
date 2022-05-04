package com.thuyttt25.junkshop.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.thuyttt25.junkshop.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WardDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WardDTO.class);
        WardDTO wardDTO1 = new WardDTO();
        wardDTO1.setId(1L);
        WardDTO wardDTO2 = new WardDTO();
        assertThat(wardDTO1).isNotEqualTo(wardDTO2);
        wardDTO2.setId(wardDTO1.getId());
        assertThat(wardDTO1).isEqualTo(wardDTO2);
        wardDTO2.setId(2L);
        assertThat(wardDTO1).isNotEqualTo(wardDTO2);
        wardDTO1.setId(null);
        assertThat(wardDTO1).isNotEqualTo(wardDTO2);
    }
}

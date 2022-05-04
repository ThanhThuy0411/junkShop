package com.thuyttt25.junkshop.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.thuyttt25.junkshop.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DistrictTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(District.class);
        District district1 = new District();
        district1.setId(1L);
        District district2 = new District();
        district2.setId(district1.getId());
        assertThat(district1).isEqualTo(district2);
        district2.setId(2L);
        assertThat(district1).isNotEqualTo(district2);
        district1.setId(null);
        assertThat(district1).isNotEqualTo(district2);
    }
}

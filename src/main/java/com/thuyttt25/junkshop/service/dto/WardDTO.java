package com.thuyttt25.junkshop.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.thuyttt25.junkshop.domain.Ward} entity.
 */
public class WardDTO implements Serializable {

    private Long id;

    private String wardName;

    private DistrictDTO district;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWardName() {
        return wardName;
    }

    public void setWardName(String wardName) {
        this.wardName = wardName;
    }

    public DistrictDTO getDistrict() {
        return district;
    }

    public void setDistrict(DistrictDTO district) {
        this.district = district;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WardDTO)) {
            return false;
        }

        WardDTO wardDTO = (WardDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, wardDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WardDTO{" +
            "id=" + getId() +
            ", wardName='" + getWardName() + "'" +
            ", district=" + getDistrict() +
            "}";
    }
}

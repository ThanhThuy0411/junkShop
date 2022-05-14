package com.thuyttt25.junkshop.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A Ward.
 */
@Entity
@Table(name = "ward")
public class Ward implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ward_name")
    private String wardName;

    @ManyToOne
    private District district;

    public Long getId() {
        return this.id;
    }

    public Ward id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWardName() {
        return this.wardName;
    }

    public Ward wardName(String wardName) {
        this.setWardName(wardName);
        return this;
    }

    public void setWardName(String wardName) {
        this.wardName = wardName;
    }

    public District getDistrict() {
        return this.district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Ward district(District district) {
        this.setDistrict(district);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ward)) {
            return false;
        }
        return id != null && id.equals(((Ward) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Ward{" +
            "id=" + getId() +
            ", wardName='" + getWardName() + "'" +
            "}";
    }
}

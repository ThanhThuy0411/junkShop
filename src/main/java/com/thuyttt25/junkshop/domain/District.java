package com.thuyttt25.junkshop.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A District.
 */
@Entity
@Table(name = "district")
public class District implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "district_name")
    private String districtName;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public District id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistrictName() {
        return this.districtName;
    }

    public District districtName(String districtName) {
        this.setDistrictName(districtName);
        return this;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof District)) {
            return false;
        }
        return id != null && id.equals(((District) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "District{" +
            "id=" + getId() +
            ", districtName='" + getDistrictName() + "'" +
            "}";
    }
}

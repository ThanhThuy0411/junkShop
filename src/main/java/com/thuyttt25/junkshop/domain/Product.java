package com.thuyttt25.junkshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.thuyttt25.junkshop.domain.enumeration.ProductStatus;
import com.thuyttt25.junkshop.domain.enumeration.ProductType;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type")
    private ProductType productType;

    @Column(name = "price")
    private Double price;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_status")
    private ProductStatus productStatus;

    @Column(name = "date")
    private Instant date;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "product" }, allowSetters = true)
    private Set<File> files = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "district" }, allowSetters = true)
    private Ward ward;

    @ManyToOne
    private District district;

    @ManyToOne
    private User user;

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return this.productName;
    }

    public Product productName(String productName) {
        this.setProductName(productName);
        return this;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public ProductType getProductType() {
        return this.productType;
    }

    public Product productType(ProductType productType) {
        this.setProductType(productType);
        return this;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Double getPrice() {
        return this.price;
    }

    public Product price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAddress() {
        return this.address;
    }

    public Product address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductStatus getProductStatus() {
        return this.productStatus;
    }

    public Product productStatus(ProductStatus productStatus) {
        this.setProductStatus(productStatus);
        return this;
    }

    public void setProductStatus(ProductStatus productStatus) {
        this.productStatus = productStatus;
    }

    public Instant getDate() {
        return this.date;
    }

    public Product date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<File> getFiles() {
        return this.files;
    }

    public void setFiles(Set<File> files) {
        if (this.files != null) {
            this.files.forEach(i -> i.setProduct(null));
        }
        if (files != null) {
            files.forEach(i -> i.setProduct(this));
        }
        this.files = files;
    }

    public Product files(Set<File> files) {
        this.setFiles(files);
        return this;
    }

    public Product addFile(File file) {
        this.files.add(file);
        file.setProduct(this);
        return this;
    }

    public Product removeFile(File file) {
        this.files.remove(file);
        file.setProduct(null);
        return this;
    }

    public Ward getWard() {
        return this.ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Product ward(Ward ward) {
        this.setWard(ward);
        return this;
    }

    public District getDistrict() {
        return this.district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Product district(District district) {
        this.setDistrict(district);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product user(User user) {
        this.setUser(user);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", productName='" + getProductName() + "'" +
            ", productType='" + getProductType() + "'" +
            ", price=" + getPrice() +
            ", address='" + getAddress() + "'" +
            ", description='" + getDescription() + "'" +
            ", productStatus='" + getProductStatus() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}

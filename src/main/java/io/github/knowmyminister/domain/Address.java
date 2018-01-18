package io.github.knowmyminister.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "line_1")
    private String line1;

    @Column(name = "line_2")
    private String line2;

    @Column(name = "area")
    private String area;

    @NotNull
    @Column(name = "pincode", nullable = false)
    private String pincode;

    @Column(name = "village")
    private String village;

    @Column(name = "taluka")
    private String taluka;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @ManyToOne
    private Minister minister;

    @ManyToOne
    private PoliticalParty politicalParty;

    @OneToOne
    @JoinColumn(unique = true)
    private State state;

    @OneToOne
    @JoinColumn(unique = true)
    private Country contry;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLine1() {
        return line1;
    }

    public Address line1(String line1) {
        this.line1 = line1;
        return this;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public Address line2(String line2) {
        this.line2 = line2;
        return this;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getArea() {
        return area;
    }

    public Address area(String area) {
        this.area = area;
        return this;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getPincode() {
        return pincode;
    }

    public Address pincode(String pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getVillage() {
        return village;
    }

    public Address village(String village) {
        this.village = village;
        return this;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getTaluka() {
        return taluka;
    }

    public Address taluka(String taluka) {
        this.taluka = taluka;
        return this;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Minister getMinister() {
        return minister;
    }

    public Address minister(Minister minister) {
        this.minister = minister;
        return this;
    }

    public void setMinister(Minister minister) {
        this.minister = minister;
    }

    public PoliticalParty getPoliticalParty() {
        return politicalParty;
    }

    public Address politicalParty(PoliticalParty politicalParty) {
        this.politicalParty = politicalParty;
        return this;
    }

    public void setPoliticalParty(PoliticalParty politicalParty) {
        this.politicalParty = politicalParty;
    }

    public State getState() {
        return state;
    }

    public Address state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Country getContry() {
        return contry;
    }

    public Address contry(Country country) {
        this.contry = country;
        return this;
    }

    public void setContry(Country country) {
        this.contry = country;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", line1='" + getLine1() + "'" +
            ", line2='" + getLine2() + "'" +
            ", area='" + getArea() + "'" +
            ", pincode='" + getPincode() + "'" +
            ", village='" + getVillage() + "'" +
            ", taluka='" + getTaluka() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}

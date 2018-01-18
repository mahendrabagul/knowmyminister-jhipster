package io.github.knowmyminister.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SocialLink.
 */
@Entity
@Table(name = "social_link")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "sociallink")
public class SocialLink implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "provider", nullable = false)
    private String provider;

    @NotNull
    @Column(name = "jhi_link", nullable = false)
    private String link;

    @ManyToOne
    private Minister minister;

    @ManyToOne
    private PoliticalParty politicalParty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProvider() {
        return provider;
    }

    public SocialLink provider(String provider) {
        this.provider = provider;
        return this;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getLink() {
        return link;
    }

    public SocialLink link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Minister getMinister() {
        return minister;
    }

    public SocialLink minister(Minister minister) {
        this.minister = minister;
        return this;
    }

    public void setMinister(Minister minister) {
        this.minister = minister;
    }

    public PoliticalParty getPoliticalParty() {
        return politicalParty;
    }

    public SocialLink politicalParty(PoliticalParty politicalParty) {
        this.politicalParty = politicalParty;
        return this;
    }

    public void setPoliticalParty(PoliticalParty politicalParty) {
        this.politicalParty = politicalParty;
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
        SocialLink socialLink = (SocialLink) o;
        if (socialLink.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), socialLink.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SocialLink{" +
            "id=" + getId() +
            ", provider='" + getProvider() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}

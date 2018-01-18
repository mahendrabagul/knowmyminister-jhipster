package io.github.knowmyminister.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Award entity.
 */
public class AwardDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Instant startDate;

    @NotNull
    private String issuer;

    private String description;

    private Long ministerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getMinisterId() {
        return ministerId;
    }

    public void setMinisterId(Long ministerId) {
        this.ministerId = ministerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AwardDTO awardDTO = (AwardDTO) o;
        if(awardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), awardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AwardDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", issuer='" + getIssuer() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}

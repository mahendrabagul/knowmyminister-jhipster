package io.github.knowmyminister.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Minister entity.
 */
public class MinisterDTO implements Serializable {

    private Long id;

    private String personalBackground;

    private String familyBackground;

    private String interests;

    private String ideal;

    private String motto;

    private Long electionSignId;

    private Long partyId;

    private Long bioId;

    private Long politicalPartyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersonalBackground() {
        return personalBackground;
    }

    public void setPersonalBackground(String personalBackground) {
        this.personalBackground = personalBackground;
    }

    public String getFamilyBackground() {
        return familyBackground;
    }

    public void setFamilyBackground(String familyBackground) {
        this.familyBackground = familyBackground;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getIdeal() {
        return ideal;
    }

    public void setIdeal(String ideal) {
        this.ideal = ideal;
    }

    public String getMotto() {
        return motto;
    }

    public void setMotto(String motto) {
        this.motto = motto;
    }

    public Long getElectionSignId() {
        return electionSignId;
    }

    public void setElectionSignId(Long imageId) {
        this.electionSignId = imageId;
    }

    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long politicalPartyId) {
        this.partyId = politicalPartyId;
    }

    public Long getBioId() {
        return bioId;
    }

    public void setBioId(Long bioId) {
        this.bioId = bioId;
    }

    public Long getPoliticalPartyId() {
        return politicalPartyId;
    }

    public void setPoliticalPartyId(Long politicalPartyId) {
        this.politicalPartyId = politicalPartyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MinisterDTO ministerDTO = (MinisterDTO) o;
        if(ministerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ministerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MinisterDTO{" +
            "id=" + getId() +
            ", personalBackground='" + getPersonalBackground() + "'" +
            ", familyBackground='" + getFamilyBackground() + "'" +
            ", interests='" + getInterests() + "'" +
            ", ideal='" + getIdeal() + "'" +
            ", motto='" + getMotto() + "'" +
            "}";
    }
}

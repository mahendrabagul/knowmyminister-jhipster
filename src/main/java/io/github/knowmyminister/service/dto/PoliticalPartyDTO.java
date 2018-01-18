package io.github.knowmyminister.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the PoliticalParty entity.
 */
public class PoliticalPartyDTO implements Serializable {

    private Long id;

    private String description;

    private String abbreviation;

    private String founded;

    private String precededBy;

    private String newsPaper;

    private String youthWing;

    private String womensWing;

    private String peasantsWing;

    private String minorityWing;

    private String membership;

    private String ideology;

    private String politicalPosition;

    private String internationalAffiliation;

    private String colour;

    private String eCIStatus;

    private String alliance;

    private String seatsInLokSabha;

    private String seatsInRajyaSabha;

    private String electionSymbol;

    private String website;

    private String parliamentaryChairperson;

    private String email;

    private Long logoId;

    private Long presidentId;

    private Long rajyasabhaLeaderId;

    private Long loksabhaLeaderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getFounded() {
        return founded;
    }

    public void setFounded(String founded) {
        this.founded = founded;
    }

    public String getPrecededBy() {
        return precededBy;
    }

    public void setPrecededBy(String precededBy) {
        this.precededBy = precededBy;
    }

    public String getNewsPaper() {
        return newsPaper;
    }

    public void setNewsPaper(String newsPaper) {
        this.newsPaper = newsPaper;
    }

    public String getYouthWing() {
        return youthWing;
    }

    public void setYouthWing(String youthWing) {
        this.youthWing = youthWing;
    }

    public String getWomensWing() {
        return womensWing;
    }

    public void setWomensWing(String womensWing) {
        this.womensWing = womensWing;
    }

    public String getPeasantsWing() {
        return peasantsWing;
    }

    public void setPeasantsWing(String peasantsWing) {
        this.peasantsWing = peasantsWing;
    }

    public String getMinorityWing() {
        return minorityWing;
    }

    public void setMinorityWing(String minorityWing) {
        this.minorityWing = minorityWing;
    }

    public String getMembership() {
        return membership;
    }

    public void setMembership(String membership) {
        this.membership = membership;
    }

    public String getIdeology() {
        return ideology;
    }

    public void setIdeology(String ideology) {
        this.ideology = ideology;
    }

    public String getPoliticalPosition() {
        return politicalPosition;
    }

    public void setPoliticalPosition(String politicalPosition) {
        this.politicalPosition = politicalPosition;
    }

    public String getInternationalAffiliation() {
        return internationalAffiliation;
    }

    public void setInternationalAffiliation(String internationalAffiliation) {
        this.internationalAffiliation = internationalAffiliation;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String geteCIStatus() {
        return eCIStatus;
    }

    public void seteCIStatus(String eCIStatus) {
        this.eCIStatus = eCIStatus;
    }

    public String getAlliance() {
        return alliance;
    }

    public void setAlliance(String alliance) {
        this.alliance = alliance;
    }

    public String getSeatsInLokSabha() {
        return seatsInLokSabha;
    }

    public void setSeatsInLokSabha(String seatsInLokSabha) {
        this.seatsInLokSabha = seatsInLokSabha;
    }

    public String getSeatsInRajyaSabha() {
        return seatsInRajyaSabha;
    }

    public void setSeatsInRajyaSabha(String seatsInRajyaSabha) {
        this.seatsInRajyaSabha = seatsInRajyaSabha;
    }

    public String getElectionSymbol() {
        return electionSymbol;
    }

    public void setElectionSymbol(String electionSymbol) {
        this.electionSymbol = electionSymbol;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getParliamentaryChairperson() {
        return parliamentaryChairperson;
    }

    public void setParliamentaryChairperson(String parliamentaryChairperson) {
        this.parliamentaryChairperson = parliamentaryChairperson;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getLogoId() {
        return logoId;
    }

    public void setLogoId(Long imageId) {
        this.logoId = imageId;
    }

    public Long getPresidentId() {
        return presidentId;
    }

    public void setPresidentId(Long ministerId) {
        this.presidentId = ministerId;
    }

    public Long getRajyasabhaLeaderId() {
        return rajyasabhaLeaderId;
    }

    public void setRajyasabhaLeaderId(Long ministerId) {
        this.rajyasabhaLeaderId = ministerId;
    }

    public Long getLoksabhaLeaderId() {
        return loksabhaLeaderId;
    }

    public void setLoksabhaLeaderId(Long ministerId) {
        this.loksabhaLeaderId = ministerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PoliticalPartyDTO politicalPartyDTO = (PoliticalPartyDTO) o;
        if(politicalPartyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), politicalPartyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PoliticalPartyDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", abbreviation='" + getAbbreviation() + "'" +
            ", founded='" + getFounded() + "'" +
            ", precededBy='" + getPrecededBy() + "'" +
            ", newsPaper='" + getNewsPaper() + "'" +
            ", youthWing='" + getYouthWing() + "'" +
            ", womensWing='" + getWomensWing() + "'" +
            ", peasantsWing='" + getPeasantsWing() + "'" +
            ", minorityWing='" + getMinorityWing() + "'" +
            ", membership='" + getMembership() + "'" +
            ", ideology='" + getIdeology() + "'" +
            ", politicalPosition='" + getPoliticalPosition() + "'" +
            ", internationalAffiliation='" + getInternationalAffiliation() + "'" +
            ", colour='" + getColour() + "'" +
            ", eCIStatus='" + geteCIStatus() + "'" +
            ", alliance='" + getAlliance() + "'" +
            ", seatsInLokSabha='" + getSeatsInLokSabha() + "'" +
            ", seatsInRajyaSabha='" + getSeatsInRajyaSabha() + "'" +
            ", electionSymbol='" + getElectionSymbol() + "'" +
            ", website='" + getWebsite() + "'" +
            ", parliamentaryChairperson='" + getParliamentaryChairperson() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}

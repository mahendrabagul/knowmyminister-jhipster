package io.github.knowmyminister.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PoliticalParty.
 */
@Entity
@Table(name = "political_party")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "politicalparty")
public class PoliticalParty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "abbreviation")
    private String abbreviation;

    @Column(name = "founded")
    private String founded;

    @Column(name = "preceded_by")
    private String precededBy;

    @Column(name = "news_paper")
    private String newsPaper;

    @Column(name = "youth_wing")
    private String youthWing;

    @Column(name = "womens_wing")
    private String womensWing;

    @Column(name = "peasants_wing")
    private String peasantsWing;

    @Column(name = "minority_wing")
    private String minorityWing;

    @Column(name = "membership")
    private String membership;

    @Column(name = "ideology")
    private String ideology;

    @Column(name = "political_position")
    private String politicalPosition;

    @Column(name = "international_affiliation")
    private String internationalAffiliation;

    @Column(name = "colour")
    private String colour;

    @Column(name = "e_ci_status")
    private String eCIStatus;

    @Column(name = "alliance")
    private String alliance;

    @Column(name = "seats_in_lok_sabha")
    private String seatsInLokSabha;

    @Column(name = "seats_in_rajya_sabha")
    private String seatsInRajyaSabha;

    @Column(name = "election_symbol")
    private String electionSymbol;

    @Column(name = "website")
    private String website;

    @Column(name = "parliamentary_chairperson")
    private String parliamentaryChairperson;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private Image logo;

    @OneToOne
    @JoinColumn(unique = true)
    private Minister president;

    @OneToOne
    @JoinColumn(unique = true)
    private Minister rajyasabhaLeader;

    @OneToOne
    @JoinColumn(unique = true)
    private Minister loksabhaLeader;

    @OneToMany(mappedBy = "politicalParty")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SocialLink> socialLinks = new HashSet<>();

    @OneToMany(mappedBy = "politicalParty")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Minister> ministers = new HashSet<>();

    @OneToMany(mappedBy = "politicalParty")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(mappedBy = "politicalParty")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Address> headquarters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public PoliticalParty description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public PoliticalParty abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getFounded() {
        return founded;
    }

    public PoliticalParty founded(String founded) {
        this.founded = founded;
        return this;
    }

    public void setFounded(String founded) {
        this.founded = founded;
    }

    public String getPrecededBy() {
        return precededBy;
    }

    public PoliticalParty precededBy(String precededBy) {
        this.precededBy = precededBy;
        return this;
    }

    public void setPrecededBy(String precededBy) {
        this.precededBy = precededBy;
    }

    public String getNewsPaper() {
        return newsPaper;
    }

    public PoliticalParty newsPaper(String newsPaper) {
        this.newsPaper = newsPaper;
        return this;
    }

    public void setNewsPaper(String newsPaper) {
        this.newsPaper = newsPaper;
    }

    public String getYouthWing() {
        return youthWing;
    }

    public PoliticalParty youthWing(String youthWing) {
        this.youthWing = youthWing;
        return this;
    }

    public void setYouthWing(String youthWing) {
        this.youthWing = youthWing;
    }

    public String getWomensWing() {
        return womensWing;
    }

    public PoliticalParty womensWing(String womensWing) {
        this.womensWing = womensWing;
        return this;
    }

    public void setWomensWing(String womensWing) {
        this.womensWing = womensWing;
    }

    public String getPeasantsWing() {
        return peasantsWing;
    }

    public PoliticalParty peasantsWing(String peasantsWing) {
        this.peasantsWing = peasantsWing;
        return this;
    }

    public void setPeasantsWing(String peasantsWing) {
        this.peasantsWing = peasantsWing;
    }

    public String getMinorityWing() {
        return minorityWing;
    }

    public PoliticalParty minorityWing(String minorityWing) {
        this.minorityWing = minorityWing;
        return this;
    }

    public void setMinorityWing(String minorityWing) {
        this.minorityWing = minorityWing;
    }

    public String getMembership() {
        return membership;
    }

    public PoliticalParty membership(String membership) {
        this.membership = membership;
        return this;
    }

    public void setMembership(String membership) {
        this.membership = membership;
    }

    public String getIdeology() {
        return ideology;
    }

    public PoliticalParty ideology(String ideology) {
        this.ideology = ideology;
        return this;
    }

    public void setIdeology(String ideology) {
        this.ideology = ideology;
    }

    public String getPoliticalPosition() {
        return politicalPosition;
    }

    public PoliticalParty politicalPosition(String politicalPosition) {
        this.politicalPosition = politicalPosition;
        return this;
    }

    public void setPoliticalPosition(String politicalPosition) {
        this.politicalPosition = politicalPosition;
    }

    public String getInternationalAffiliation() {
        return internationalAffiliation;
    }

    public PoliticalParty internationalAffiliation(String internationalAffiliation) {
        this.internationalAffiliation = internationalAffiliation;
        return this;
    }

    public void setInternationalAffiliation(String internationalAffiliation) {
        this.internationalAffiliation = internationalAffiliation;
    }

    public String getColour() {
        return colour;
    }

    public PoliticalParty colour(String colour) {
        this.colour = colour;
        return this;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String geteCIStatus() {
        return eCIStatus;
    }

    public PoliticalParty eCIStatus(String eCIStatus) {
        this.eCIStatus = eCIStatus;
        return this;
    }

    public void seteCIStatus(String eCIStatus) {
        this.eCIStatus = eCIStatus;
    }

    public String getAlliance() {
        return alliance;
    }

    public PoliticalParty alliance(String alliance) {
        this.alliance = alliance;
        return this;
    }

    public void setAlliance(String alliance) {
        this.alliance = alliance;
    }

    public String getSeatsInLokSabha() {
        return seatsInLokSabha;
    }

    public PoliticalParty seatsInLokSabha(String seatsInLokSabha) {
        this.seatsInLokSabha = seatsInLokSabha;
        return this;
    }

    public void setSeatsInLokSabha(String seatsInLokSabha) {
        this.seatsInLokSabha = seatsInLokSabha;
    }

    public String getSeatsInRajyaSabha() {
        return seatsInRajyaSabha;
    }

    public PoliticalParty seatsInRajyaSabha(String seatsInRajyaSabha) {
        this.seatsInRajyaSabha = seatsInRajyaSabha;
        return this;
    }

    public void setSeatsInRajyaSabha(String seatsInRajyaSabha) {
        this.seatsInRajyaSabha = seatsInRajyaSabha;
    }

    public String getElectionSymbol() {
        return electionSymbol;
    }

    public PoliticalParty electionSymbol(String electionSymbol) {
        this.electionSymbol = electionSymbol;
        return this;
    }

    public void setElectionSymbol(String electionSymbol) {
        this.electionSymbol = electionSymbol;
    }

    public String getWebsite() {
        return website;
    }

    public PoliticalParty website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getParliamentaryChairperson() {
        return parliamentaryChairperson;
    }

    public PoliticalParty parliamentaryChairperson(String parliamentaryChairperson) {
        this.parliamentaryChairperson = parliamentaryChairperson;
        return this;
    }

    public void setParliamentaryChairperson(String parliamentaryChairperson) {
        this.parliamentaryChairperson = parliamentaryChairperson;
    }

    public String getEmail() {
        return email;
    }

    public PoliticalParty email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Image getLogo() {
        return logo;
    }

    public PoliticalParty logo(Image image) {
        this.logo = image;
        return this;
    }

    public void setLogo(Image image) {
        this.logo = image;
    }

    public Minister getPresident() {
        return president;
    }

    public PoliticalParty president(Minister minister) {
        this.president = minister;
        return this;
    }

    public void setPresident(Minister minister) {
        this.president = minister;
    }

    public Minister getRajyasabhaLeader() {
        return rajyasabhaLeader;
    }

    public PoliticalParty rajyasabhaLeader(Minister minister) {
        this.rajyasabhaLeader = minister;
        return this;
    }

    public void setRajyasabhaLeader(Minister minister) {
        this.rajyasabhaLeader = minister;
    }

    public Minister getLoksabhaLeader() {
        return loksabhaLeader;
    }

    public PoliticalParty loksabhaLeader(Minister minister) {
        this.loksabhaLeader = minister;
        return this;
    }

    public void setLoksabhaLeader(Minister minister) {
        this.loksabhaLeader = minister;
    }

    public Set<SocialLink> getSocialLinks() {
        return socialLinks;
    }

    public PoliticalParty socialLinks(Set<SocialLink> socialLinks) {
        this.socialLinks = socialLinks;
        return this;
    }

    public PoliticalParty addSocialLink(SocialLink socialLink) {
        this.socialLinks.add(socialLink);
        socialLink.setPoliticalParty(this);
        return this;
    }

    public PoliticalParty removeSocialLink(SocialLink socialLink) {
        this.socialLinks.remove(socialLink);
        socialLink.setPoliticalParty(null);
        return this;
    }

    public void setSocialLinks(Set<SocialLink> socialLinks) {
        this.socialLinks = socialLinks;
    }

    public Set<Minister> getMinisters() {
        return ministers;
    }

    public PoliticalParty ministers(Set<Minister> ministers) {
        this.ministers = ministers;
        return this;
    }

    public PoliticalParty addMinister(Minister minister) {
        this.ministers.add(minister);
        minister.setPoliticalParty(this);
        return this;
    }

    public PoliticalParty removeMinister(Minister minister) {
        this.ministers.remove(minister);
        minister.setPoliticalParty(null);
        return this;
    }

    public void setMinisters(Set<Minister> ministers) {
        this.ministers = ministers;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public PoliticalParty photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public PoliticalParty addPhoto(Photo photo) {
        this.photos.add(photo);
        photo.setPoliticalParty(this);
        return this;
    }

    public PoliticalParty removePhoto(Photo photo) {
        this.photos.remove(photo);
        photo.setPoliticalParty(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Set<Address> getHeadquarters() {
        return headquarters;
    }

    public PoliticalParty headquarters(Set<Address> addresses) {
        this.headquarters = addresses;
        return this;
    }

    public PoliticalParty addHeadquarter(Address address) {
        this.headquarters.add(address);
        address.setPoliticalParty(this);
        return this;
    }

    public PoliticalParty removeHeadquarter(Address address) {
        this.headquarters.remove(address);
        address.setPoliticalParty(null);
        return this;
    }

    public void setHeadquarters(Set<Address> addresses) {
        this.headquarters = addresses;
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
        PoliticalParty politicalParty = (PoliticalParty) o;
        if (politicalParty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), politicalParty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PoliticalParty{" +
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

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
 * A Minister.
 */
@Entity
@Table(name = "minister")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "minister")
public class Minister implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "personal_background")
    private String personalBackground;

    @Column(name = "family_background")
    private String familyBackground;

    @Column(name = "interests")
    private String interests;

    @Column(name = "ideal")
    private String ideal;

    @Column(name = "motto")
    private String motto;

    @OneToOne
    @JoinColumn(unique = true)
    private Image electionSign;

    @OneToOne
    @JoinColumn(unique = true)
    private PoliticalParty party;

    @OneToOne
    @JoinColumn(unique = true)
    private Bio bio;

    @OneToMany(mappedBy = "minister")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Address> addresses = new HashSet<>();

    @OneToMany(mappedBy = "minister")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Award> awards = new HashSet<>();

    @OneToMany(mappedBy = "minister")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(mappedBy = "minister")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkExperience> workExperinces = new HashSet<>();

    @OneToMany(mappedBy = "minister")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Education> educations = new HashSet<>();

    @OneToMany(mappedBy = "minister")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SocialLink> socialLinks = new HashSet<>();

    @ManyToOne
    private PoliticalParty politicalParty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersonalBackground() {
        return personalBackground;
    }

    public Minister personalBackground(String personalBackground) {
        this.personalBackground = personalBackground;
        return this;
    }

    public void setPersonalBackground(String personalBackground) {
        this.personalBackground = personalBackground;
    }

    public String getFamilyBackground() {
        return familyBackground;
    }

    public Minister familyBackground(String familyBackground) {
        this.familyBackground = familyBackground;
        return this;
    }

    public void setFamilyBackground(String familyBackground) {
        this.familyBackground = familyBackground;
    }

    public String getInterests() {
        return interests;
    }

    public Minister interests(String interests) {
        this.interests = interests;
        return this;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getIdeal() {
        return ideal;
    }

    public Minister ideal(String ideal) {
        this.ideal = ideal;
        return this;
    }

    public void setIdeal(String ideal) {
        this.ideal = ideal;
    }

    public String getMotto() {
        return motto;
    }

    public Minister motto(String motto) {
        this.motto = motto;
        return this;
    }

    public void setMotto(String motto) {
        this.motto = motto;
    }

    public Image getElectionSign() {
        return electionSign;
    }

    public Minister electionSign(Image image) {
        this.electionSign = image;
        return this;
    }

    public void setElectionSign(Image image) {
        this.electionSign = image;
    }

    public PoliticalParty getParty() {
        return party;
    }

    public Minister party(PoliticalParty politicalParty) {
        this.party = politicalParty;
        return this;
    }

    public void setParty(PoliticalParty politicalParty) {
        this.party = politicalParty;
    }

    public Bio getBio() {
        return bio;
    }

    public Minister bio(Bio bio) {
        this.bio = bio;
        return this;
    }

    public void setBio(Bio bio) {
        this.bio = bio;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public Minister addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public Minister addAddress(Address address) {
        this.addresses.add(address);
        address.setMinister(this);
        return this;
    }

    public Minister removeAddress(Address address) {
        this.addresses.remove(address);
        address.setMinister(null);
        return this;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<Award> getAwards() {
        return awards;
    }

    public Minister awards(Set<Award> awards) {
        this.awards = awards;
        return this;
    }

    public Minister addAward(Award award) {
        this.awards.add(award);
        award.setMinister(this);
        return this;
    }

    public Minister removeAward(Award award) {
        this.awards.remove(award);
        award.setMinister(null);
        return this;
    }

    public void setAwards(Set<Award> awards) {
        this.awards = awards;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public Minister photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public Minister addPhoto(Photo photo) {
        this.photos.add(photo);
        photo.setMinister(this);
        return this;
    }

    public Minister removePhoto(Photo photo) {
        this.photos.remove(photo);
        photo.setMinister(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Set<WorkExperience> getWorkExperinces() {
        return workExperinces;
    }

    public Minister workExperinces(Set<WorkExperience> workExperiences) {
        this.workExperinces = workExperiences;
        return this;
    }

    public Minister addWorkExperince(WorkExperience workExperience) {
        this.workExperinces.add(workExperience);
        workExperience.setMinister(this);
        return this;
    }

    public Minister removeWorkExperince(WorkExperience workExperience) {
        this.workExperinces.remove(workExperience);
        workExperience.setMinister(null);
        return this;
    }

    public void setWorkExperinces(Set<WorkExperience> workExperiences) {
        this.workExperinces = workExperiences;
    }

    public Set<Education> getEducations() {
        return educations;
    }

    public Minister educations(Set<Education> educations) {
        this.educations = educations;
        return this;
    }

    public Minister addEducation(Education education) {
        this.educations.add(education);
        education.setMinister(this);
        return this;
    }

    public Minister removeEducation(Education education) {
        this.educations.remove(education);
        education.setMinister(null);
        return this;
    }

    public void setEducations(Set<Education> educations) {
        this.educations = educations;
    }

    public Set<SocialLink> getSocialLinks() {
        return socialLinks;
    }

    public Minister socialLinks(Set<SocialLink> socialLinks) {
        this.socialLinks = socialLinks;
        return this;
    }

    public Minister addSocialLink(SocialLink socialLink) {
        this.socialLinks.add(socialLink);
        socialLink.setMinister(this);
        return this;
    }

    public Minister removeSocialLink(SocialLink socialLink) {
        this.socialLinks.remove(socialLink);
        socialLink.setMinister(null);
        return this;
    }

    public void setSocialLinks(Set<SocialLink> socialLinks) {
        this.socialLinks = socialLinks;
    }

    public PoliticalParty getPoliticalParty() {
        return politicalParty;
    }

    public Minister politicalParty(PoliticalParty politicalParty) {
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
        Minister minister = (Minister) o;
        if (minister.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), minister.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Minister{" +
            "id=" + getId() +
            ", personalBackground='" + getPersonalBackground() + "'" +
            ", familyBackground='" + getFamilyBackground() + "'" +
            ", interests='" + getInterests() + "'" +
            ", ideal='" + getIdeal() + "'" +
            ", motto='" + getMotto() + "'" +
            "}";
    }
}

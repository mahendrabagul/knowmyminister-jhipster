package io.github.knowmyminister.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Bio.
 */
@Entity
@Table(name = "bio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "bio")
public class Bio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "mobile_no")
    private String mobileNo;

    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "born", nullable = false)
    private String born;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Column(name = "sex", nullable = false)
    private Integer sex;

    @Column(name = "spouse")
    private String spouse;

    @Column(name = "children")
    private String children;

    @Column(name = "website")
    private String website;

    @OneToOne
    @JoinColumn(unique = true)
    private Language language;

    @OneToOne
    @JoinColumn(unique = true)
    private Image profilePicture;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Bio firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Bio lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Bio middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public Bio mobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
        return this;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getEmail() {
        return email;
    }

    public Bio email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBorn() {
        return born;
    }

    public Bio born(String born) {
        this.born = born;
        return this;
    }

    public void setBorn(String born) {
        this.born = born;
    }

    public Integer getAge() {
        return age;
    }

    public Bio age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getSex() {
        return sex;
    }

    public Bio sex(Integer sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getSpouse() {
        return spouse;
    }

    public Bio spouse(String spouse) {
        this.spouse = spouse;
        return this;
    }

    public void setSpouse(String spouse) {
        this.spouse = spouse;
    }

    public String getChildren() {
        return children;
    }

    public Bio children(String children) {
        this.children = children;
        return this;
    }

    public void setChildren(String children) {
        this.children = children;
    }

    public String getWebsite() {
        return website;
    }

    public Bio website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Language getLanguage() {
        return language;
    }

    public Bio language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Image getProfilePicture() {
        return profilePicture;
    }

    public Bio profilePicture(Image image) {
        this.profilePicture = image;
        return this;
    }

    public void setProfilePicture(Image image) {
        this.profilePicture = image;
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
        Bio bio = (Bio) o;
        if (bio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bio{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", mobileNo='" + getMobileNo() + "'" +
            ", email='" + getEmail() + "'" +
            ", born='" + getBorn() + "'" +
            ", age=" + getAge() +
            ", sex=" + getSex() +
            ", spouse='" + getSpouse() + "'" +
            ", children='" + getChildren() + "'" +
            ", website='" + getWebsite() + "'" +
            "}";
    }
}

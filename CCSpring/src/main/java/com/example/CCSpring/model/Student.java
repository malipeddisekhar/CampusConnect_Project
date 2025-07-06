package com.example.CCSpring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class Student {

    @Id
    private Long userId; // Same as User's id

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    // Extended profile fields
    private String headline;
    @Column(length = 2000)
    private String about; // bio/description
    private String gender;
    private String phone;
    private String profilePhotoUrl; // S3/local path or URL

    // Social links
    private String github;
    private String linkedin;
    private String facebook;
    private String twitter;
    private String blog;
    private String otherLink;

    // Constructors
    public Student() {}

    public Student(User user) {
        this.user = user;
    }

    // Getters and setters

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }

    public String getTwitter() { return twitter; }
    public void setTwitter(String twitter) { this.twitter = twitter; }

    public String getBlog() { return blog; }
    public void setBlog(String blog) { this.blog = blog; }

    public String getOtherLink() { return otherLink; }
    public void setOtherLink(String otherLink) { this.otherLink = otherLink; }
}
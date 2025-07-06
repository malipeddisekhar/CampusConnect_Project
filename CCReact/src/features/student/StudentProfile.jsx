import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentProfile.css";

function StudentProfile() {
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        headline: "",
        about: "",
        gender: "",
        phone: "",
        github: "",
        linkedin: "",
        facebook: "",
        twitter: "",
        blog: "",
        otherLink: "",
        profilePhotoUrl: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("/profile.png");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/student/profile", { withCredentials: true })
            .then((res) => {
                setStudent(res.data);
                if (res.data.profilePhotoUrl) {
                    setPreview(res.data.profilePhotoUrl.startsWith("http")
                        ? res.data.profilePhotoUrl
                        : "http://localhost:8080/" + res.data.profilePhotoUrl
                    );
                }
            })
            .catch(() => alert("Failed to load student profile."));
    }, []);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = () => {
        if (!imageFile) return;
        const formData = new FormData();
        formData.append("file", imageFile);
        axios
            .post("http://localhost:8080/api/student/upload", formData, { withCredentials: true })
            .then((res) => {
                alert("✅ Image uploaded");
                setStudent((s) => ({ ...s, profilePhotoUrl: res.data.url || res.data.profilePhotoUrl }));
            })
            .catch(() => alert("Failed to upload image"));
    };

    const updateProfile = () => {
        axios
            .put("http://localhost:8080/api/student/profile", student, { withCredentials: true })
            .then(() => {
                alert("✅ Profile updated");
                navigate("/student"); // <-- Change this route if needed
            })
            .catch(() => alert("Failed to update profile"));
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="profile-image-container">
                    <img src={preview} className="profile-image-large" alt="Profile" />
                    <input type="file" className="upload-button" onChange={handleImage} />
                    <button className="save-photo-btn" onClick={uploadImage}>
                        💾 Save Photo
                    </button>
                </div>
                <div className="form-grid">
                    <input name="headline" value={student.headline || ""} onChange={handleChange} placeholder="Headline" />
                    <input name="gender" value={student.gender || ""} onChange={handleChange} placeholder="Gender" />
                    <input name="phone" value={student.phone || ""} onChange={handleChange} placeholder="Phone" />
                    <input name="github" value={student.github || ""} onChange={handleChange} placeholder="GitHub URL" />
                    <input name="linkedin" value={student.linkedin || ""} onChange={handleChange} placeholder="LinkedIn URL" />
                    <input name="facebook" value={student.facebook || ""} onChange={handleChange} placeholder="Facebook URL" />
                    <input name="twitter" value={student.twitter || ""} onChange={handleChange} placeholder="Twitter URL" />
                    <input name="blog" value={student.blog || ""} onChange={handleChange} placeholder="Blog/Website URL" />
                    <input name="otherLink" value={student.otherLink || ""} onChange={handleChange} placeholder="Other Link" />
                    <textarea
                        name="about"
                        value={student.about || ""}
                        onChange={handleChange}
                        placeholder="About You"
                    />
                </div>
                <div className="button-row">
                    <button className="btn btn-orange" onClick={updateProfile}>
                        🔄 Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./StudentProfile.css";

// function StudentProfile() {
//     const [student, setStudent] = useState({
//         regNumber: "",
//         collegeName: "",
//         gender: "",
//         phone: "",
//         github: "",
//         linkedin: "",
//         facebook: "",
//         twitter: "",
//         blog: "",
//         otherLink: "",
//         headline: "",
//         about: "",
//         profileImagePath: "",
//     });

//     const [imageFile, setImageFile] = useState(null);
//     const [preview, setPreview] = useState("/profile.png");

//     useEffect(() => {
//         axios.get("http://localhost:8080/api/student/profile", { withCredentials: true })
//             .then(res => {
//                 setStudent(res.data);
//                 if (res.data.profileImagePath) {
//                     setPreview("http://localhost:8080/" + res.data.profileImagePath);
//                 }
//             });
//     }, []);

//     const handleChange = (e) => {
//         setStudent({ ...student, [e.target.name]: e.target.value });
//     };

//     const handleImage = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFile(file);
//             setPreview(URL.createObjectURL(file));
//         }
//     };

//     const uploadImage = () => {
//         if (!imageFile) return;
//         const formData = new FormData();
//         formData.append("file", imageFile);
//         axios.post("http://localhost:8080/api/student/upload", formData, { withCredentials: true })
//             .then(() => alert("✅ Image uploaded"));
//     };

//     const updateProfile = () => {
//         axios.put("http://localhost:8080/api/student/profile", student, { withCredentials: true })
//             .then(() => alert("✅ Profile updated"));
//     };

//     return (
//         <div className="profile-wrapper">
//             <div className="profile-card">
//                 <div className="profile-image-container">
//                     <img src={preview} className="profile-image-large" alt="Profile" />
//                     <input type="file" onChange={handleImage} />
//                     <button onClick={uploadImage}>💾 Save Photo</button>
//                 </div>
//                 <div className="form-grid">
//                     <input name="regNumber" value={student.regNumber || ""} onChange={handleChange} placeholder="Reg Number" />
//                     <input name="collegeName" value={student.collegeName || ""} onChange={handleChange} placeholder="College Name" />
//                     <input name="gender" value={student.gender || ""} onChange={handleChange} placeholder="Gender" />
//                     <input name="phone" value={student.phone || ""} onChange={handleChange} placeholder="Phone" />
//                     <input name="headline" value={student.headline || ""} onChange={handleChange} placeholder="Headline" />
//                     <textarea name="about" value={student.about || ""} onChange={handleChange} placeholder="About You" />
//                     <input name="github" value={student.github || ""} onChange={handleChange} placeholder="GitHub URL" />
//                     <input name="linkedin" value={student.linkedin || ""} onChange={handleChange} placeholder="LinkedIn URL" />
//                     <input name="facebook" value={student.facebook || ""} onChange={handleChange} placeholder="Facebook URL" />
//                     <input name="twitter" value={student.twitter || ""} onChange={handleChange} placeholder="Twitter URL" />
//                     <input name="blog" value={student.blog || ""} onChange={handleChange} placeholder="Blog/Website URL" />
//                     <input name="otherLink" value={student.otherLink || ""} onChange={handleChange} placeholder="Other Link" />
//                 </div>
//                 <button onClick={updateProfile}>🔄 Update Profile</button>
//             </div>527777783
//         </div>
//     );
// }

// export default StudentProfile;
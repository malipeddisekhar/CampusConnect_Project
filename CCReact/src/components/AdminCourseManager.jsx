// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AdminCourseManager() {
//     const [courses, setCourses] = useState([]);
//     const [name, setName] = useState("");
//     const [branch, setBranch] = useState("");
//     const [teachers, setTeachers] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [selectedCourseId, setSelectedCourseId] = useState(null);
//     const [selectedTeacherId, setSelectedTeacherId] = useState("");
//     const [selectedStudentId, setSelectedStudentId] = useState("");
//     useEffect(() => {
//         fetchCourses();
//         fetchTeachers();
//         fetchStudents();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get("http://localhost:8080/api/courses/all", { withCredentials: true });
//             setCourses(res.data);
//         } catch (err) {
//             console.error("Error fetching courses:", err);
//         }
//     };

//     const fetchTeachers = async () => {
//         try {
//             const res = await axios.get("http://localhost:8080/api/user/teachers", { withCredentials: true });
//             setTeachers(res.data);
//         } catch (err) {
//             console.error("Error fetching teachers:", err);
//         }
//     };

//     const fetchStudents = async () => {
//         try {
//             const res = await axios.get("http://localhost:8080/api/user/students", { withCredentials: true });
//             setStudents(res.data);
//         } catch (err) {
//             console.error("Error fetching students:", err);
//         }
//     };

//     const createCourse = async () => {
//         if (!name || !branch) {
//             alert("Please enter course name and branch");
//             return;
//         }

//         try {
//             await axios.post("http://localhost:8080/api/courses/create", { name, branch }, { withCredentials: true });
//             setName("");
//             setBranch("");
//             fetchCourses();
//         } catch (err) {
//             console.error("Error creating course:", err);
//             alert("Failed to create course");
//         }
//     };

//     const assignTeacher = async (courseId) => {
//         if (!selectedTeacherId) {
//             alert("Select a teacher to assign");
//             return;
//         }

//         try {
//             await axios.put(
//                 `http://localhost:8080/api/courses/assign-teacher?courseId=${courseId}&teacherId=${selectedTeacherId}`,
//                 {},
//                 { withCredentials: true }
//             );
//             setSelectedTeacherId("");
//             fetchCourses();
//         } catch (err) {
//             console.error("Error assigning teacher:", err);
//             alert("Failed to assign teacher");
//         }
//     };

//     const enrollStudent = async (courseId) => {
//         if (!selectedStudentId) {
//             alert("Select a student to enroll");
//             return;
//         }

//         try {
//             await axios.put(
//                 `http://localhost:8080/api/courses/enroll-student?courseId=${courseId}&studentId=${selectedStudentId}`,
//                 {},
//                 { withCredentials: true }
//             );
//             setSelectedStudentId("");
//             fetchCourses();
//         } catch (err) {
//             console.error("Error enrolling student:", err);
//             alert("Failed to enroll student");
//         }
//     };
//     const deleteCourse = async (courseId) => {
//         if (!window.confirm("Are you sure you want to delete this course?")) return;

//         try {
//             await axios.delete(`http://localhost:8080/api/courses/delete/${courseId}`, { withCredentials: true });
//             fetchCourses(); // Refresh after deletion
//             alert("Course deleted successfully");
//         } catch (err) {
//             console.error("Error deleting course:", err);
//             alert("Failed to delete course");
//         }
//     };


//     return (
//         <>
//             <div className="container mt-4">
//                 <h3>📚 Manage Courses</h3>

//                 {/* Create Course */}
//                 <div className="mt-3">
//                     <input
//                         type="text"
//                         placeholder="Course Name"
//                         className="form-control mb-2"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <select
//                         className="form-select mb-2"
//                         value={branch}
//                         onChange={(e) => setBranch(e.target.value)}
//                     >
//                         <option value="">Select Branch</option>
//                         <option value="CSE">CSE</option>
//                         <option value="CSM">CSM</option>
//                         <option value="CSD">CSD</option>
//                         <option value="IT">IT</option>
//                         <option value="ECE">ECE</option>
//                         <option value="CIVIL">CIVIL</option>
//                         <option value="MECH">MECH</option>
//                         <option value="EEE">EEE</option>
//                     </select>

//                     <button className="btn btn-success" onClick={createCourse}>
//                         ➕ Create Course
//                     </button>

//                     <button className="btn btn-secondary mt-4" onClick={() => navigate("/teacher")}>⬅️ Back to Dashboard</button>
//                 </div>

//                 {/* Course Table */}
//                 <div className="mt-4">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>Course</th>
//                                 <th>Branch</th>
//                                 <th>Assigned Teacher</th>
//                                 <th>Assign New Teacher</th>
//                                 <th>Enroll Student</th>
//                                 <th>Actions</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {courses.map((course) => (
//                                 <tr key={course.id}>
//                                     <td>{course.name}</td>
//                                     <td>{course.branch}</td>
//                                     <td>
//                                         {course.teacher
//                                             ? `${course.teacher.name} (${course.teacher.email})`
//                                             : "Not Yet Appointed"}
//                                     </td>
//                                     <td>
//                                         <select
//                                             className="form-select"
//                                             value={selectedCourseId === course.id ? selectedTeacherId : ""}
//                                             onChange={(e) => {
//                                                 setSelectedCourseId(course.id);
//                                                 setSelectedTeacherId(e.target.value);
//                                             }}
//                                         >
//                                             <option value="">Select Teacher</option>
//                                             {teachers.map((t) => (
//                                                 <option key={t.id} value={t.id}>
//                                                     {t.name} ({t.email})
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <button
//                                             className="btn btn-sm btn-primary mt-1"
//                                             onClick={() => assignTeacher(course.id)}
//                                         >
//                                             👤 Assign
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <select
//                                             className="form-select"
//                                             value={selectedCourseId === course.id ? selectedStudentId : ""}
//                                             onChange={(e) => {
//                                                 setSelectedCourseId(course.id);
//                                                 setSelectedStudentId(e.target.value);
//                                             }}
//                                         >
//                                             <option value="">Select Student</option>
//                                             {students.map((s) => (
//                                                 <option key={s.id} value={s.id}>
//                                                     {s.name} ({s.email})
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <button
//                                             className="btn btn-sm btn-success mt-1"
//                                             onClick={() => enrollStudent(course.id)}
//                                         >
//                                             🎓 Enroll
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="btn btn-sm btn-danger"
//                                             onClick={() => deleteCourse(course.id)}
//                                         >
//                                             ❌ Delete
//                                         </button>
//                                     </td>

//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// }
// export default AdminCourseManager;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCourseManager() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");

    useEffect(() => {
        fetchCourses();
        fetchTeachers();
        fetchStudents();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/courses/all", { withCredentials: true });
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    const fetchTeachers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user/teachers", { withCredentials: true });
            setTeachers(res.data);
            console.log(res)
        } catch (err) {
            console.error("Error fetching teachers:", err);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user/students", { withCredentials: true });
            setStudents(res.data);
            console.log(res)
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    const createCourse = async () => {
        if (!name || !branch) {
            alert("Please enter course name and branch");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/courses/create", { name, branch }, { withCredentials: true });
            setName("");
            setBranch("");
            fetchCourses();
            alert("✅ Course created!");
        } catch (err) {
            console.error("Error creating course:", err);
            alert("Failed to create course");
        }
    };

    const assignTeacher = async (courseId) => {
        if (!selectedTeacherId) {
            alert("Select a teacher to assign");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/courses/assign-teacher?courseId=${courseId}&teacherId=${selectedTeacherId}`,
                {},
                { withCredentials: true }
            );
            setSelectedTeacherId("");
            fetchCourses();
        } catch (err) {
            console.error("Error assigning teacher:", err);
            alert("Failed to assign teacher");
        }
    };

    const enrollStudent = async (courseId) => {
        if (!selectedStudentId) {
            alert("Select a student to enroll");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/courses/enroll-student?courseId=${courseId}&studentId=${selectedStudentId}`,
                {},
                { withCredentials: true }
            );
            setSelectedStudentId("");
            fetchCourses();
        } catch (err) {
            console.error("Error enrolling student:", err);
            alert("Failed to enroll student");
        }
    };

    const deleteCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/courses/delete/${courseId}`, { withCredentials: true });
            fetchCourses();
            alert("Course deleted successfully");
        } catch (err) {
            console.error("Error deleting course:", err);
            alert("Failed to delete course");
        }
    };

    return (
        <div className="container mt-4">
            <h3>📚 Manage Courses</h3>

            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Course Name"
                    className="form-control mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    className="form-select mb-2"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="CSM">CSM</option>
                    <option value="CSD">CSD</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="MECH">MECH</option>
                    <option value="EEE">EEE</option>
                </select>
                <button className="btn btn-success" onClick={createCourse}>
                    ➕ Create Course
                </button>
                <button className="btn btn-secondary mt-4" onClick={() => navigate("/admin")}>⬅️ Back to Dashboard</button>
            </div>

            <div className="mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Teacher</th>
                            <th>Assign Teacher</th>
                            <th>Enroll Student</th>
                            <th>Enrolled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>{course.name}</td>
                                <td>{course.branch}</td>
                                <td>
                                    {course.teacher
                                        ? `${course.teacher.name} (${course.teacher.email})`
                                        : "Not Yet Appointed"}
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={selectedCourseId === course.id ? selectedTeacherId : ""}
                                        onChange={(e) => {
                                            setSelectedCourseId(course.id);
                                            setSelectedTeacherId(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Teacher</option>
                                        {teachers.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name} ({t.email})
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-sm btn-primary mt-1" onClick={() => assignTeacher(course.id)}>👤 Assign</button>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={selectedCourseId === course.id ? selectedStudentId : ""}
                                        onChange={(e) => {
                                            setSelectedCourseId(course.id);
                                            setSelectedStudentId(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Student</option>
                                        {students.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name} ({s.email})
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-sm btn-success mt-1" onClick={() => enrollStudent(course.id)}>🎓 Enroll</button>
                                </td>
                                <td>{course.students ? course.students.length : 0}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteCourse(course.id)}>❌ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminCourseManager;

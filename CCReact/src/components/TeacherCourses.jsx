import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherCourses() {
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/courses/my-course", { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    setCourse(res.data);

                    // Fetch students for this course
                    axios.get(`http://localhost:8080/api/courses/enrolled-students?courseId=${res.data.id}`, { withCredentials: true })
                        .then((sres) => setStudents(sres.data))
                        .catch((err) => {
                            console.error("Error loading students:", err);
                            setStudents([]);
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching course:", err);
                setCourse(null);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2>📘 My Assigned Course</h2>

            {!course ? (
                <p className="text-muted">You have not been assigned to any course yet.</p>
            ) : (
                <>
                    <div className="card mb-4 p-3">
                        <h4>{course.name}</h4>
                        <p><strong>Branch:</strong> {course.branch}</p>
                        <p><strong>Course ID:</strong> {course.id}</p>
                    </div>

                    <h5>👨‍🎓 Enrolled Students ({students.length})</h5>
                    {students.length === 0 ? (
                        <p className="text-muted">No students enrolled yet.</p>
                    ) : (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, index) => (
                                    <tr key={s.id}>
                                        <td>{index + 1}</td>
                                        <td>{s.name}</td>
                                        <td>{s.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
            <button className="btn btn-secondary mt-4" onClick={() => navigate("/teacher")}>
                ⬅️ Back to Dashboard
            </button>
        </div>
    );
}

export default TeacherCourses;

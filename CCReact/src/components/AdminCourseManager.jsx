import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminCourseManager() {
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");

    useEffect(() => {
        fetchCourses();
        fetchTeachers();
    }, []);

    const fetchCourses = async () => {
        const res = await axios.get("http://localhost:8080/api/courses/all", { withCredentials: true });
        setCourses(res.data);
    };

    const fetchTeachers = async () => {
        const res = await axios.get("http://localhost:8080/api/user/teachers", { withCredentials: true });
        setTeachers(res.data);
    };

    const createCourse = async () => {
        if (!name || !branch) {
            alert("Please enter course name and branch");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/api/courses/create",
                { name, branch },
                { withCredentials: true }
            );
            setName("");
            setBranch("");
            fetchCourses();
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

    return (
        <div className="container mt-4">
            <h3>📚 Manage Courses</h3>

            {/* Add Course Form */}
            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Course Name"
                    className="form-control mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Branch (CSE, ECE...)"
                    className="form-control mb-2"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                />
                <button className="btn btn-success" onClick={createCourse}>
                    ➕ Create Course
                </button>
            </div>

            {/* Course Table */}
            <div className="mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Assigned Teacher</th>
                            <th>Assign New Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
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
                                    <button
                                        className="btn btn-sm btn-primary mt-1"
                                        onClick={() => assignTeacher(course.id)}
                                    >
                                        👤 Assign
                                    </button>
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

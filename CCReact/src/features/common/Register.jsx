import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/user/register",
                form,
                { withCredentials: true }
            );
            alert(res.data);
            nav("/"); // redirect to login after successful registration
        } catch (err) {
            alert(
                err.response?.data || "Registration failed. Try again with a new email."
            );
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-3">Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="name"
                        className="form-control mb-3"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        className="form-control mb-3"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <button type="submit" className="btn btn-success w-100 mb-2">
                        Register
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={() => nav("/")}
                    >
                        Go to Login
                    </button>
                </form>
            </div>
        </>

    );
}

export default Register;

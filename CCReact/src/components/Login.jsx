import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/user/login",
                { email, password },
                { withCredentials: true }
            );

            alert(res.data.message);
            console.log("User Role:", res.data.role);
            console.log("User Email:", res.data.email);
            localStorage.setItem("role",res.data.role);
            localStorage.setItem("email",res.data.email);
            localStorage.setItem("username",res.data.name);
            // Redirect based on role
            if (res.data.role === "admin") nav("/admin");
            else if (res.data.role === "teacher") nav("/teacher");
            else nav("/student");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed. Check credentials.");
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-3">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        Login
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={() => nav("/reg")}
                    >
                        Go to Register
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;

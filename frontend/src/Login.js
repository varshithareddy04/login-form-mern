import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        // Empty field validation

        if (!email || !password) {

            setMessage("All fields are required");
            setMessageType("error");

            return;
        }

        // Email validation

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            setMessage("Enter valid email");
            setMessageType("error");

            return;
        }

        // Password validation

        if (password.length < 6) {

            setMessage("Password must be at least 6 characters");
            setMessageType("error");

            return;
        }

        try {

            const res = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email,
                    password
                }
            );

            setMessage(res.data.message);
            setMessageType("success");

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Login Failed"
            );

            setMessageType("error");
        }
    };

    return (

        <div className="container">

            <form className="login-form" onSubmit={handleLogin}>

                <h2>Login Form</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="show-password">

                    <input
                        type="checkbox"
                        onChange={() =>
                            setShowPassword(!showPassword)
                        }
                    />

                    <label>Show Password</label>

                </div>

                <button type="submit">
                    Login
                </button>

                {message && (

                    <p className={messageType}>
                        {message}
                    </p>
                )}

            </form>

        </div>
    );
}

export default Login;
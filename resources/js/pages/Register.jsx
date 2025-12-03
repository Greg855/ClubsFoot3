import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate("/");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        c_password: "",
    });
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (captchaValue) {
            // Send captchaValue to your backend for verification
            console.log("reCAPTCHA token:", captchaValue);
            // Proceed with form submission
            setSubmitting(true);
            setErrors(null);
            try {
                const res = await axios.post("/api/register", form);
                const body = res.data;
                // Controller may return either { token: ... } or an array like [ { token: ... }, "message" ]
                const token =
                    body.token ||
                    (Array.isArray(body) &&
                        (body[0]?.token || body["0"]?.token));
                if (token) {
                    localStorage.setItem("token", token);
                    navigate("/");
                    return;
                }
                setErrors(body.errors || body.message || body);
            } catch (err) {
                if (err.response && err.response.data) {
                    setErrors(err.response.data.errors || err.response.data);
                } else {
                    setErrors({ message: "Network error" });
                }
            } finally {
                setSubmitting(false);
            }
        } else {
            alert("Please complete the reCAPTCHA.");
        }
    }

    return (
        <div className="container py-4">
            <h1>Register</h1>

            {errors && (
                <div className="alert alert-danger">
                    <pre style={{ margin: 0 }}>
                        {JSON.stringify(errors, null, 2)}
                    </pre>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        type="email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                        type="password"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm password</label>
                    <input
                        name="c_password"
                        value={form.c_password}
                        onChange={handleChange}
                        className="form-control"
                        type="password"
                        required
                    />
                </div>

                <ReCAPTCHA
                    sitekey={process.env.MIX_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                />

                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

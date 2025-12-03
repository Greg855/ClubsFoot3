import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../AuthContext";

export default function Login() {
    const authContext = React.useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!captchaValue) {
            alert("Please complete the reCAPTCHA.");
            return;
        }
        setSubmitting(true);
        setErrors(null);

        try {
            const res = await axios.post("/api/login", { email, password });
            const body = res.data;
            const token = body[0]?.token || body.data?.[0]?.token;

            if (body.message) {
                localStorage.setItem("token",  token);
                authContext.login(token);
                console.log(token);
                navigate("/");
            }
            setErrors(body.errors);
        } catch (err) {
            if (err.response && err.response.data) {
                console.log("erreur 1");
                setErrors(err.response.data.errors || err.response.data);
            } else {
                setErrors({ message: "Network error" });
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="container py-4">
            <h1>Login</h1>

            {errors && (
                <div className="alert alert-danger">
                    <pre style={{ margin: 0 }}>
                        {JSON.stringify(errors, null, 2)}
                    </pre>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        type="email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    disabled={submitting && !captchaValue}
                >
                    {submitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Live tracking states for the real-time password checklist display matrix
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
  });

  // Automatically update the validation checklist markers every time the password string updates
  useEffect(() => {
    const pwd = formData.password;
    setPasswordCriteria({
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
    });
  }, [formData.password]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (formData.username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Fail early if any requirement marker inside our checklist object is still false
    if (!passwordCriteria.minLength || !passwordCriteria.hasUppercase || !passwordCriteria.hasNumber) {
      setError("Please satisfy all password security requirements before signing up.");
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="register-page" style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Create Account</h1>

      {error && <p className="error-message" style={{ color: "#f44336", fontWeight: "bold", marginBottom: "1rem" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "6px" }}
        />

        {/* DYNAMIC PASSWORD REQUIREMENTS CHECKLIST DISPLAY CONTAINER */}
        <div className="password-requirements" style={{ textAlign: "left", padding: "8px 12px", marginBottom: "16px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.05)", fontSize: "0.85rem" }}>
          <p style={{ margin: "0 0 6px 0", fontWeight: "bold", color: "#9ca3af" }}>Password Requirements:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: passwordCriteria.minLength ? "#4caf50" : "#f44336" }}>
              {passwordCriteria.minLength ? "✔️" : "❌"} At least 8 characters long
            </span>
            <span style={{ color: passwordCriteria.hasUppercase ? "#4caf50" : "#f44336" }}>
              {passwordCriteria.hasUppercase ? "✔️" : "❌"} At least 1 uppercase letter
            </span>
            <span style={{ color: passwordCriteria.hasNumber ? "#4caf50" : "#f44336" }}>
              {passwordCriteria.hasNumber ? "✔️" : "❌"} At least 1 number digit
            </span>
          </div>
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", cursor: "pointer", borderRadius: "6px" }}>
          Register
        </button>
      </form>
    </div>
  );
}

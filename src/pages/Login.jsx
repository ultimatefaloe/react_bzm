import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginHander = async (e) => {
    try {
      if (!formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }

      await Promise.resolve(()=> setTimeout(() => {}, 1000)); // Simulate async login operation
      login(formData);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={() => console.log("Form submitted", { email, password })}>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

// -- form
// -- useState
// -- function for submission

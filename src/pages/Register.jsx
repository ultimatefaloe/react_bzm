import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validation = (password, confirmPassword) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one symbol");
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    return errors;
  };

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    const errors = validation(formData.password, formData.confirmPassword);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      await Promise.resolve(() => setTimeout(() => {}, 5000)); // Simulate async registration operation
      const res = await register(formData);
      if (res.success) {
        navigate("/profile");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form action="/register" method="POST" onSubmit={onSubmitHandler}>
        <div>
          <div>
            <label htmlFor="fullName">Full Name:</label>
          </div>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="email">Email:</label>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

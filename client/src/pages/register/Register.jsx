import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    password: "",
    img: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      alert("Registration successful!");
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" gutterBottom>
          New User Registration:
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Country and City side-by-side */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              required
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Box>

          <TextField
            fullWidth
            required
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Image URL (Optional)"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

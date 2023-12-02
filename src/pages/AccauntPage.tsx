import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
} from "@mui/material";
import useAccountMe from "../store/account";
import request from "../server";

const defaultTheme = createTheme();

const AccauntPage: React.FC = () => {
  const { accData, loading, getAccData } = useAccountMe();

  console.log(accData);
  const [formDate, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    birthday: "",
    email: "",
    facebook: "",
    github: "",
    info: "",
    instagram: "",
    phoneNumber: "",
    telegram: "",
    youtube: "",
    linkedin: "",
  });

  useEffect(() => {
    updateFormData();
  }, [accData]);

  useEffect(() => {
    getAccData();
  }, [getAccData]);

  const updateFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...accData,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await request.put("auth/updatedetails", formDate);
    getAccData();

    // console.log(e.target);
  };
  console.log(formDate.firstName);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      {loading ? (
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.firstName}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    autoComplete="firstName"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.lastName}
                    name="lastName"
                    type="text"
                    id="lastName"
                    label="Last Name"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.username}
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.info}
                    name="info"
                    label="Info"
                    type="text"
                    id="info"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.phoneNumber}
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    id="phoneNumber"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.birthday}
                    name="birthday"
                    label="Birthday"
                    type="text"
                    id="birthday"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.address}
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.email}
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.github}
                    name="github"
                    label="GitHub"
                    type="text"
                    id="github"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.linkedin}
                    name="linkedin"
                    label="LinkedIn"
                    type="text"
                    id="linkedin"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    value={formDate.telegram}
                    name="telegram"
                    label="Telegram"
                    type="text"
                    id="telegram"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.instagram}
                    name="instagram"
                    label="Instagram"
                    type="text"
                    id="instagram"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.youtube}
                    name="youtube"
                    label="YouTube"
                    type="text"
                    id="youtube"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formDate.facebook}
                    name="facebook"
                    label="Facebook"
                    type="text"
                    id="facebook"
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container></Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </div>
  );
};

export default AccauntPage;

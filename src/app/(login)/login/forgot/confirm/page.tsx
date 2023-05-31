"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { FormEvent, useState } from "react";

const Page = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordField, setPasswordField] = useState("");
    const [confirmPasswordField, setConfirmPasswordField] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!passwordField || !confirmPasswordField) {
            setError("Fill in all fields!");
            return;
        }

        if (passwordField !== confirmPasswordField) {
            setError("The password does not match");
            return;
        }

        setError("");
        setInfo("");
        setLoading(true);

        const result = await api.redefinePassword(passwordField, "");
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setInfo("Password successfully reset!");
            setPasswordField("");
            setConfirmPasswordField("");
        }
    };

    return (
        <>
            <Typography
                component="p"
                sx={{ textAlign: "center", mt: 2, color: "#555" }}
            >
                Hello **user**, please reset your password below
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="New password"
                    name="new password"
                    type="password"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    value={passwordField}
                    onChange={(e) => setPasswordField(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    label="Confirm new Password"
                    name="confirm password"
                    type="password"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    value={confirmPasswordField}
                    onChange={(e) => setConfirmPasswordField(e.target.value)}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Set new password"}
                </Button>

                {error && (
                    <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                )}
                {info && (
                    <Alert variant="filled" severity="success" sx={{ mt: 3 }}>
                        {info}
                    </Alert>
                )}
            </Box>
        </>
    );
};

export default Page;

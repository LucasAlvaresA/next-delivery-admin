"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { FormEvent, useState } from "react";

const Page = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailField, setEmailField] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailField) {
            setError("Fill in your email!");
            return;
        }

        setError("");
        setInfo("");
        setLoading(true);

        const result = await api.forgotPassword(emailField);
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setInfo("Your password recovery email has been sent!");
        }
    };

    return (
        <>
            <Typography
                component="p"
                sx={{ textAlign: "center", mt: 2, color: "#555" }}
            >
                Do you want to recover your password?
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="E-mail"
                    name="email"
                    required
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Recover"}
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

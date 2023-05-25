"use client";

import { api } from "@/libs/api";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
    Alert,
} from "@mui/material";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Page = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailField || !passwordField) {
            setError("Fill in all fields!");
            return;
        }

        setError("");
        setLoading(true);

        const result = await api.login(emailField, passwordField);
        setLoading(false);
        if (result.error) {
            setError(result.error);
        }
    };

    return (
        <>
            <Typography
                component="p"
                sx={{ textAlign: "center", mt: 2, color: "#555" }}
            >
                Enter your data to enter the establishment's administrative
                panel and manage products/orders
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
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    value={passwordField}
                    onChange={(e) => setPasswordField(e.target.value)}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </Button>

                {error && (
                    <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ mt: 3 }}>
                    <MuiLink
                        href="/login/forgot"
                        variant="body2"
                        component={Link}
                    >
                        Forgot your password?
                    </MuiLink>
                </Box>
            </Box>
        </>
    );
};

export default Page;

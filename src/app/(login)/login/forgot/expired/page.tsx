"use client";

import { Alert, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 3 }}>
                This link has expired, please try again
            </Alert>

            <MuiLink href="/login/forgot" component={Link} variant="button">
                Forgot your password?
            </MuiLink>
        </>
    );
};

export default Page;

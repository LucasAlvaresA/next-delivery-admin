import { Menu } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderDrawer } from "./HeaderDrawer";
import { useState } from "react";

export const Header = () => {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const pageTitle = "NextDelivery";

    const handleLogout = () => {
        router.push("/login");
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <AppBar component="nav" position="relative">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        sx={{ display: { sm: "none" } }}
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="div"
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        <Link
                            href="/"
                            style={{ color: "#FFF", textDecoration: "none" }}
                        >
                            {pageTitle}
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        <Link href="/orders" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "#FFF" }}>Orders</Button>
                        </Link>
                        <Link
                            href="/products"
                            style={{ textDecoration: "none" }}
                        >
                            <Button sx={{ color: "#FFF" }}>Products</Button>
                        </Link>
                        <Link
                            href="/categories"
                            style={{ textDecoration: "none" }}
                        >
                            <Button sx={{ color: "#FFF" }}>Categories</Button>
                        </Link>
                        <Button onClick={handleLogout} sx={{ color: "#FFF" }}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <HeaderDrawer
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    title={pageTitle}
                    onLogout={handleLogout}
                />
            </Box>
        </>
    );
};

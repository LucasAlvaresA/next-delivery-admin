import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import Link from "next/link";

type Props = {
    open: boolean;
    title: string;
    onClose: () => void;
    onLogout: () => void;
};

export const HeaderDrawer = ({ open, onClose, title, onLogout }: Props) => {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                display: { xs: "block", sm: "none" },
            }}
        >
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 2, padding: 3 }}>
                    {title}
                </Typography>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link
                                href="/orders"
                                style={{
                                    color: "#000",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItemText primary="Orders" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link
                                href="/products"
                                style={{
                                    color: "#000",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItemText primary="Products" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link
                                href="/categories"
                                style={{
                                    color: "#000",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItemText primary="Categories" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={onLogout}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

"use client";

import { ProductTableSkeleton } from "@/components/ProductTableSkeleton";
import { api } from "@/libs/api";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getProdutcs();
    }, []);

    const getProdutcs = async () => {
        setLoading(true);
        setProducts(await api.getProducts());
        setCategories(await api.getCategories());
        setLoading(false);
    };

    const handleNewProduct = () => {};

    return (
        <>
            <Box sx={{ my: 3 }}>
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        component="h5"
                        variant="h5"
                        sx={{ color: "#555", mr: 2 }}
                    >
                        Products
                    </Typography>
                    <Button onClick={handleNewProduct}>New Product</Button>
                </Box>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: 50,
                                    display: { xs: "none", md: "table-cell" },
                                }}
                            >
                                ID
                            </TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell
                                sx={{
                                    display: { xs: "none", md: "table-cell" },
                                }}
                            >
                                Price
                            </TableCell>
                            <TableCell
                                sx={{
                                    display: { xs: "none", md: "table-cell" },
                                }}
                            >
                                Category
                            </TableCell>
                            <TableCell
                                sx={{
                                    xs: 50,
                                    md: 130,
                                }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <>
                                <ProductTableSkeleton />
                                <ProductTableSkeleton />
                                <ProductTableSkeleton />
                            </>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default Page;

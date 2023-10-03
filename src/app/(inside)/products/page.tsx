"use client";

import { ProductEditDialog } from "@/components/ProductEditDialog";
import { ProductTableItem } from "@/components/ProductTableItem";
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton";
import { api } from "@/libs/api";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product>();
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product>();
    const [loadingEdit, setLoadingEdit] = useState(false);

    useEffect(() => {
        getProdutcs();
    }, []);

    const getProdutcs = async () => {
        setLoading(true);
        setProducts(await api.getProducts());
        setCategories(await api.getCategories());
        setLoading(false);
    };

    const handleNewProduct = () => {
        setProductToEdit(undefined);
        setShowEditDialog(true);
    };

    const handleEditProduct = (product: Product) => {
        setProductToEdit(product);
        setShowEditDialog(true);
    };

    const handleSaveEditDialog = async (event: FormEvent<HTMLFormElement>) => {
        let form = new FormData(event.currentTarget);
        setLoadingEdit(true);
        if (productToEdit) {
            form.append("id", productToEdit.id.toString());
            await api.updateProduct(form);
        } else {
            await api.createProduct(form);
        }
        setLoadingEdit(false);
        setShowEditDialog(false);
        getProdutcs();
    };

    const handleDeleteProduct = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            setLoadingDelete(true);
            await api.deleteProduct(productToDelete.id);
            setLoadingDelete(false);
            setShowDeleteDialog(false);
            getProdutcs();
        }
    };

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
                                    width: { xs: 50, md: 130 },
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
                        {!loading &&
                            products.map((item) => (
                                <ProductTableItem
                                    key={item.id}
                                    item={item}
                                    onEdit={handleEditProduct}
                                    onDelete={handleDeleteProduct}
                                />
                            ))}
                    </TableBody>
                </Table>

                <Dialog
                    open={showDeleteDialog}
                    onClose={() =>
                        !loadingDelete ? setShowDeleteDialog(false) : null
                    }
                >
                    <DialogTitle>
                        Are you sure you want to delete this product?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            It is not possible to restore the product after
                            confirming this action
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={loadingDelete}
                        >
                            No
                        </Button>
                        <Button
                            color="error"
                            onClick={handleConfirmDelete}
                            disabled={loadingDelete}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <ProductEditDialog
                    open={showEditDialog}
                    onClose={() => setShowEditDialog(false)}
                    onSave={handleSaveEditDialog}
                    disabled={loadingEdit}
                    product={productToEdit}
                    categories={categories}
                />
            </Box>
        </>
    );
};

export default Page;

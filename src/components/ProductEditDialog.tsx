import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { FormEvent } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (event: FormEvent<HTMLFormElement>) => void;
    categories: Category[];
    product?: Product;
    disabled?: boolean;
};

export const ProductEditDialog = ({
    open,
    onClose,
    onSave,
    categories,
    product,
    disabled,
}: Props) => {
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(event);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                {product ? "Edit Product" : "New Product"}
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    encType="multipart/form-data"
                    onSubmit={handleFormSubmit}
                >
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="imgField">
                            Image
                        </InputLabel>
                        <Input
                            id="imgField"
                            name="image"
                            type="file"
                            fullWidth
                            disabled={disabled}
                            inputProps={{ accept: "image/*" }}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="nameField">
                            Name
                        </InputLabel>
                        <TextField
                            id="nameField"
                            variant="standard"
                            name="name"
                            defaultValue={product?.name}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="priceField">
                            Price
                        </InputLabel>
                        <TextField
                            id="priceField"
                            variant="standard"
                            name="price"
                            type="price"
                            defaultValue={product?.price}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel
                            variant="standard"
                            htmlFor="descriptionField"
                        >
                            Description
                        </InputLabel>
                        <TextField
                            id="descriptionField"
                            variant="standard"
                            name="description"
                            defaultValue={product?.description}
                            multiline
                            rows={4}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="categoryField">
                            Categories
                        </InputLabel>
                        <Select
                            id="categoryField"
                            variant="standard"
                            name="category"
                            defaultValue={
                                product?.category.id || categories[0]?.id
                            }
                            required
                            fullWidth
                            disabled={disabled}
                        >
                            {categories.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            disabled={disabled}
                            onClick={onClose}
                            color="error"
                        >
                            Cancel
                        </Button>
                        <Button disabled={disabled} type="submit">
                            Save
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

"use client";

import { OrderItem } from "@/components/OrderItem";
import { api } from "@/libs/api";
import { dateFormat } from "@/libs/dateFormat";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Refresh, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    InputAdornment,
    Skeleton,
    TextField,
    Typography,
} from "@mui/material";
import { KeyboardEvent, useEffect, useState } from "react";

const Page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [printOrder, setPrintOrder] = useState<Order | null>(null);

    const getOrders = async () => {
        setSearchInput("");
        setOrders([]);
        setLoading(true);
        const orderList: Order[] = await api.getOrders();
        setOrders(orderList);
        setLoading(false);
    };

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        setSearchInput("");
        setFilteredOrders(orders);
    }, [orders]);

    const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (
            event.code.toLowerCase() === "enter" ||
            event.code.toLowerCase() === "numpadenter"
        ) {
            if (searchInput !== "") {
                let newOrders: Order[] = [];

                for (let i in orders) {
                    if (orders[i].id.toString() === searchInput) {
                        newOrders.push(orders[i]);
                    }
                }

                setFilteredOrders(newOrders);
            } else {
                setFilteredOrders(orders);
            }
        }
    };

    const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
        await api.changeOrderStatus(id, newStatus);
        getOrders();
    };

    const handlePrintAction = (order: Order) => {
        setPrintOrder(order);
        setTimeout(() => {
            window && window.print();
        }, 200);
    };

    return (
        <>
            <Box sx={{ my: 3, displayPrint: "none" }}>
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            component="h5"
                            variant="h5"
                            sx={{ color: "#555", mr: 2 }}
                        >
                            Orders
                        </Typography>
                        {loading && <CircularProgress size={24} />}
                        {!loading && (
                            <Button
                                onClick={getOrders}
                                size="small"
                                sx={{
                                    justifyContent: {
                                        xs: "flex-start",
                                        sm: "center",
                                    },
                                }}
                            >
                                <Refresh />
                                <Typography
                                    component={"div"}
                                    sx={{
                                        color: "#555",
                                        display: { xs: "none", md: "block" },
                                    }}
                                >
                                    Refresh
                                </Typography>
                            </Button>
                        )}
                    </Box>
                    <TextField
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyUp={handleSearchKey}
                        placeholder="Search a order"
                        variant="standard"
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
                    {loading && (
                        <>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                        </>
                    )}
                    {!loading &&
                        filteredOrders.map((item, index) => (
                            <Grid key={index} item xs={1}>
                                <OrderItem
                                    item={item}
                                    onChangeStatus={handleChangeStatus}
                                    onPrint={handlePrintAction}
                                />
                            </Grid>
                        ))}
                </Grid>
            </Box>
            <Box sx={{ display: "none", displayPrint: "block" }}>
                {printOrder && (
                    <>
                        <Typography component="h5" variant="h5">
                            Order info
                        </Typography>
                        <Box>ID: #{printOrder.id}</Box>
                        <Box>
                            Order Date: {dateFormat(printOrder.orderDate)}
                        </Box>
                        <Box>Client: {printOrder.userName}</Box>

                        <Typography component="h5" variant="h5">
                            Payment info
                        </Typography>
                        <Box>Payment type: {printOrder.paymentType}</Box>
                        <Box>Subtotal: ${printOrder.subtotal.toFixed(2)}</Box>
                        <Box>
                            Shipping: ${printOrder.shippingPrice.toFixed(2)}
                        </Box>
                        {printOrder.couponDiscount && (
                            <Box>
                                {" "}
                                Discount: -${" "}
                                {printOrder.couponDiscount.toFixed(2)}
                            </Box>
                        )}
                        <Box>Total: ${printOrder.total.toFixed(2)}</Box>

                        <Typography component="h5" variant="h5">
                            Address
                        </Typography>
                        <Box>Street: {printOrder.shippingAddress.address}</Box>
                        <Box>Number: {printOrder.shippingAddress.number}</Box>
                        <Box>
                            Complement: {printOrder.shippingAddress.complement}
                        </Box>
                        <Box>Zipcode: {printOrder.shippingAddress.zipCode}</Box>
                        <Box>
                            Neighborhood:
                            {printOrder.shippingAddress.neighborhood}
                        </Box>
                        <Box>City: {printOrder.shippingAddress.city}</Box>
                        <Box>State: {printOrder.shippingAddress.state}</Box>

                        <Typography component="h5" variant="h5">
                            Products
                        </Typography>
                        {printOrder.products.map((item, index) => (
                            <Box key={index}>
                                {item.quantity}x {item.product.name}
                            </Box>
                        ))}
                    </>
                )}
            </Box>
        </>
    );
};

export default Page;

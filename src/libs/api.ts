import { Category } from "@/types/Category";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tempProduct: Product = {
    id: 999,
    image: "https://static.todamateria.com.br/upload/pi/ng/pinguim01-cke.jpg",
    category: {
        id: 87,
        name: "Penguin",
    },
    name: "Penguin",
    price: 65.2,
    description: "Just a nice penguin",
};

export const api = {
    login: async (
        email: string,
        password: string
    ): Promise<{ error: string; token?: string }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // This fake email is only for alerts front end test
                if (email !== "test@test.com") {
                    resolve({
                        error: "Email not found",
                    });
                } else {
                    resolve({
                        error: "",
                        token: "123",
                    });
                }
            }, 1000);
        });
    },
    forgotPassword: async (email: string): Promise<{ error: string }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ error: "" });
            }, 1000);
        });
    },
    redefinePassword: async (
        password: string,
        token: string
    ): Promise<{ error: string }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ error: "" });
            }, 1000);
        });
    },
    getOrders: async (): Promise<Order[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders: Order[] = [];
                const allStatus: OrderStatus[] = [
                    "preparing",
                    "sent",
                    "delivered",
                ];

                for (let i = 0; i < 6; i++) {
                    orders.push({
                        id: parseInt("12" + i),
                        status: allStatus[Math.floor(Math.random() * 3)],
                        orderDate: "2023-01-03 18:30",
                        userId: "1",
                        userName: "John Doe",
                        shippingAddress: {
                            id: 99,
                            zipCode: "38938933",
                            address: "Test street",
                            number: "1500",
                            neighborhood: "Somewhere",
                            city: "São Paulo",
                            state: "SP",
                            complement: "Complement address",
                        },
                        shippingPrice: 12,
                        paymentType: "card",
                        changeValue: 0,
                        coupon: "TEST5",
                        couponDiscount: 2,
                        products: [
                            { quantity: 2, product: tempProduct },
                            {
                                quantity: 3,
                                product: {
                                    ...tempProduct,
                                    id: 45,
                                    name: "Another Penguin",
                                    image: "https://teretallinn.com/wp-content/uploads/2022/01/penguin2_2-1024x768-1.jpeg",
                                },
                            },
                        ],
                        subtotal: 99,
                        total: 120,
                    });
                }
                resolve(orders);
            }, 1000);
        });
    },
    changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
        return true;
    },
    getCategories: async (): Promise<Category[]> => {
        const list: Category[] = [
            { id: 99, name: "Penguins" },
            { id: 98, name: "Bears" },
            { id: 97, name: "Dogs" },
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(list);
            }, 200);
        });
    },
    getProducts: async (): Promise<Product[]> => {
        const list: Product[] = [
            { ...tempProduct, id: 123 },
            { ...tempProduct, id: 124 },
            { ...tempProduct, id: 125 },
            { ...tempProduct, id: 126 },
            { ...tempProduct, id: 127 },
            { ...tempProduct, id: 128 },
            { ...tempProduct, id: 129 },
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(list);
            }, 500);
        });
    },
    deleteProduct: async (id: number): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    },
    createProduct: async (form: FormData): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    },
    updateProduct: async (form: FormData): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    },
};

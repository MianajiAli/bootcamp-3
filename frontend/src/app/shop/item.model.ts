export interface Item {
    title: string
    name: {
        [key: string]: boolean | undefined; // Allow additional dynamic properties
    };
    updated_at: string;
    created_at: string;
    id: number;
}

export interface ApiResponse {
    status: boolean;
    message: string;
    data: Item[]; // `data` is now an array of `Item` objects
}

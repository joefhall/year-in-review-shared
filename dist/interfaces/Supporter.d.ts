export interface Supporter {
    email: string;
    fields: {
        [key: string]: string;
    };
    searchesResults?: {
        [key: string]: string;
    };
    supporterId?: string;
}

export interface InsertData {
    type: 'field' | 'search';
    id: string;
    truncateLength?: number;
    format?: string;
    fallback?: string;
}

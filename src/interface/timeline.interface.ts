export interface IPost {
    id: string;
    created_at: string;
    text: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        profile_image_url: string;
        company_name: string
    };
    likes_count: number;
    replies_count: number;
} 
export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    videoUrl?: string;
    createdAt?: Date;
}
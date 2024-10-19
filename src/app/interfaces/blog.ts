export interface Section {
    title: string;
    content: string;
    videoUrl?: string;
    imageUrl?: string;
}

export interface Blog {
    _id: string;
    title: string;
    type: string;
    imageUrl?:  string,
    viewCount?: Number,
    author: string;
    sections: Section[];
    createdAt?: Date;
    updatedAt?: Date;
}
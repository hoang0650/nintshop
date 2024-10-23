export interface Comment {
    id: string; // Thêm id vào đây
    author: string;
    content: string;
    date: Date;
    avatarUrl: string;
    likes?: number;
    replies?: Reply[];
  }
  
  export interface Reply {
    author: string;
    content: string;
    date: Date;
    avatarUrl: string;
  }
  
export interface Blog {
  _id: string;
  title: string;
  type: string;
  author: string;
  imageUrl: string;
  viewCount: number;
  createdAt: Date;
  sections: { title: string; content: string }[];
}
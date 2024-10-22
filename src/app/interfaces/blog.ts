export interface Blog {
  _id: string;
  title: string;
  type: string;
  author: string;
  imageUrl: string;
  sections: { title: string; content: string }[];
}
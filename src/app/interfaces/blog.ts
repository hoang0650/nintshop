export interface BlogSection {
    title: string;
    content: string;
    videoUrl?: string;
    images?: string[];
  }
  
  export interface Blog {
    _id?: string;
    title: string;
    type: string;
    author: string;
    imageUrl: string;
    sections: BlogSection[];
  }
  
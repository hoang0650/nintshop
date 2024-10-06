export interface editUser {
    id: number;
    username: string;
    email: string;
    role: string;
    blocked: boolean;
    image: string;
    permissions?: {
      [key: string]: {
        view: boolean;
        edit: boolean;
        delete: boolean;
      }
    };
  }
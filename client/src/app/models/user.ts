
// localhost:5000/users
// localhost:5000/users/:id

export class User {
    _id: string;
    name: string;
    role: string;
    profile_image:string;
    blocked: boolean;
    createdAt: string;
    __v: number
  }


  export class UserResponse{
    success: boolean;
    count: number;
    pagination: {
      next: {
        page: number;
        limit: number;
      };
    };
    data: User[]; // Soru verileri
    total: number;
  }
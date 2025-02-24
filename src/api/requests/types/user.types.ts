export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
  }
  
  export interface UsersResponseDTO {
    users: UserDTO[];
    total: number;
    skip: number;
    limit: number;
  }
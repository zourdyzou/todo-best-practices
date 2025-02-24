export interface TodoDTO {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponseDTO {
  todos: TodoDTO[];
  total: number;
  skip: number;
  limit: number;
}

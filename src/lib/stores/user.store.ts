import { create } from 'zustand';
import { UserDTO, UsersResponseDTO } from '../../api/requests/types/user.types';

interface UserState {
  users: UserDTO[];
  totalUsers: number;
  selectedUser: UserDTO | null;
}

interface UserActions {
  setUsers: (usersResponse: UsersResponseDTO) => void;
  setSelectedUser: (user: UserDTO | null) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  // Initial State
  users: [],
  totalUsers: 0,
  selectedUser: null,

  // Actions
  setUsers: (usersResponse) => set({
    users: usersResponse.users,
    totalUsers: usersResponse.total,
  }),
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
// External imports
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// API hooks
import { useUsers } from "@/api/apiHooks/useUsers";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useUserStore } from "@/lib/stores/user.store";

const ITEMS_PER_PAGE = 10;

export const UserSelect = () => {
  const { users, setUsers, selectedUser, setSelectedUser } = useUserStore();
  const { ref, inView } = useInView();
  
  const { 
    data, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage 
  } = useUsers(ITEMS_PER_PAGE);

  useEffect(() => {
    if (data?.pages) {
      const allUsers = data.pages.flatMap(page => page.users);
      setUsers({
        users: allUsers,
        total: data.pages[0].total,
        skip: allUsers.length,
        limit: ITEMS_PER_PAGE
      });
    }
  }, [data, setUsers]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="w-[200px] h-10 flex items-center justify-center rounded-md border border-input bg-background">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <Select
      value={selectedUser?.id?.toString() || "all"}
      onValueChange={(value) => {
        if (value === "all") {
          setSelectedUser(null);
          return;
        }
        const user = users.find((u) => u.id.toString() === value);
        setSelectedUser(user || null);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Users</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.firstName} {user.lastName}
          </SelectItem>
        ))}
        
        {hasNextPage && (
          <div 
            ref={ref}
            className="p-2 flex justify-center border-t"
          >
            {isFetchingNextPage ? (
              <Spinner size="sm" />
            ) : (
              <span className="text-sm text-muted-foreground">
                Scroll for more...
              </span>
            )}
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

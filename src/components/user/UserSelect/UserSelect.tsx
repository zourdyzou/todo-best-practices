// External imports
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// API
import { getUsers } from "@/api/requests/get";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useUserStore } from "@/lib/stores/user.store";

const ITEMS_PER_PAGE = 10;

export const UserSelect = () => {
  const { users, setUsers, selectedUser, setSelectedUser } = useUserStore();
  const [skip, setSkip] = useState(0);
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['users', skip],
    queryFn: () => getUsers(skip, ITEMS_PER_PAGE),
  });

  useEffect(() => {
    if (data) {
      setUsers({
        users: [...users, ...data.users],
        total: data.total,
        skip,
        limit: ITEMS_PER_PAGE
      });
    }
  }, [data]);

  const handleLoadMore = () => {
    setSkip(prev => prev + ITEMS_PER_PAGE);
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="w-[200px] h-10 flex items-center justify-center rounded-md border border-input bg-background">
        <Spinner size="sm" />
      </div>
    );
  }

  const hasMore = users.length < (data?.total ?? 0);

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
        
        {hasMore && (
          <div className="p-2 flex justify-center border-t">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLoadMore}
              disabled={isFetching}
              className="w-full"
            >
              {isFetching ? (
                <Spinner size="sm" />
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
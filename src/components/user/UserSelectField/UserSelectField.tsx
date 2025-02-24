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
import { cn } from "@/lib/utils";
import { ErrorState } from "@/components/error/ErrorState/ErrorState";

interface UserSelectFieldProps {
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
  hideAllOption?: boolean;
}

export const UserSelectField = ({
  value,
  onValueChange,
  className,
  hideAllOption = false,
}: UserSelectFieldProps) => {
  const { ref, inView } = useInView();

  const { data, isLoading, isFetchingNextPage, isError, hasNextPage, fetchNextPage } =
    useUsers(10);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const users = data?.pages.flatMap((page) => page.users) ?? [];

  if (isError) {
    return (
      <div className="space-y-2">
        <Select value={value} onValueChange={onValueChange} disabled>
          <SelectTrigger className={cn("w-full border-destructive", className)}>
            <SelectValue placeholder="Failed to load users" />
          </SelectTrigger>
        </Select>
        <ErrorState 
          title="Failed to load users"
          description="Unable to load user list. Please try again later."
          className="min-h-[100px] p-4" // Override default height/padding for inline use
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-10 flex items-center justify-center rounded-md border border-input bg-background">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent className="w-full min-w-[200px]">
        {!hideAllOption && <SelectItem value="all">All Users</SelectItem>}
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.firstName} {user.lastName}
          </SelectItem>
        ))}

        {hasNextPage && (
          <div ref={ref} className="p-2 flex justify-center border-t">
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

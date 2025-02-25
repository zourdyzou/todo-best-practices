import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const ErrorState = ({
  title = "Failed to load data",
  description = "There was a problem loading the data. Please try refreshing the page or try again later.",
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 min-h-[400px] rounded-lg border border-destructive border-dashed p-8",
        className
      )}
    >
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <p data-testid="error-title" className="text-lg font-medium">{title}</p>
      </div>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </div>
  );
};
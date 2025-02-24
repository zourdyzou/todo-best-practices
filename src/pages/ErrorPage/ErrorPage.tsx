// External imports
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

// Components
import { Button } from "@/components/ui/button";

export default function ErrorPage () {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "Great Scott! Something went wrong!";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Back to the Future GIF */}
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://giphy.com/embed/3o6Mb9rUQ3F3iYqyOs"
            width="100%"
            height="100%"
            className="absolute"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        {/* Error Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Roads? Where we're going, we don't need roads!
          </h1>
          
          <p className="text-muted-foreground text-lg">
            {errorMessage}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="space-x-2"
            >
              ← Go Back
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="space-x-2"
            >
              Back to the Future (Home)
            </Button>
          </div>
        </div>

        {/* Easter Egg */}
        <p className="text-sm text-muted-foreground mt-8">
          Time circuits: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};
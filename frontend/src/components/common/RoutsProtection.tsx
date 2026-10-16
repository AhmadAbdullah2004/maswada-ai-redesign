import { useAuth } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function RoutsProtection({ children }: { children: React.ReactNode }) {
    const { isSignedIn , isLoaded } = useAuth();

    if (!isLoaded) {
        return <div><Loader2 className="size-4 animate-spin" /></div>
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />
    }

  return <>{children}</>;
}
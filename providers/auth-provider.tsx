'use client';

import {FullPageLoadingSpinner} from "@/components/loading-spinner";
import {useSession} from "@/features/session/hooks";
import {useUserStore} from "@/store/user-store";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AuthProvider({children}: {children: React.ReactNode}) {
  const {data: userData, isLoading: isSessionLoading, error: sessionError} = useSession();
  const {setUser} = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (sessionError) {
      router.push('/auth/login');
    }
  }, [sessionError, router]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  if (isSessionLoading) {
    return <FullPageLoadingSpinner text="Loading session..." />;
  }

  return <>{children}</>;
}


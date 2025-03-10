import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/auth-provider";
import { Spinner } from "@/components/ui/spinner";
import { AdminNavbar } from "./admin-navbar";
import Head from "next/head";

interface AuthWrapperProps {
    children: React.ReactNode;
    title?: string;
}

export function AuthWrapper({ children, title = "Admin Dashboard" }: AuthWrapperProps) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Redirect if not admin
        if (!authLoading) {
            if (!user) {
                router.push("/lido/admin/login");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, authLoading, router]);

    if (authLoading || !isAuthorized) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Head>
                    <title>Loading... | TCCo. - Connecting SMB Communities</title>
                </Head>
                <Spinner className="h-8 w-8 text-primary" />
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{title} | TCCo. - Connecting SMB Communities</title>
            </Head>
            <AdminNavbar />
            <main className="container mx-auto py-8 mt-20">
                {children}
            </main>
        </>
    );
} 
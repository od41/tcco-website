import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

const logo = require("@/assets/logo_full_white_1.png");

const adminLinks = [
    {
        title: "Business Management",
        href: "/lido/admin/auth/dashboard",
    },
    {
        title: "Metrics",
        href: "/lido/admin/auth/metrics",
    },
];

export function AdminNavbar() {
    const router = useRouter();
    const currentPath = router.pathname;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/lido/admin/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="fixed top-0 w-full z-40 bg-background border-b border-border">
            <div className="container mx-auto flex justify-between items-center h-16 px-4">
                <div className="flex items-center gap-8">
                    <Link href="/lido/admin/auth/dashboard" className="flex items-center gap-2">
                        <Image
                            src={logo.default.src}
                            alt="TCCo. logo"
                            width={100}
                            height={10}
                        />
                        <span className="text-sm font-medium font-display">| Admin</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6 ml-10">
                        {adminLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm transition-colors hover:text-primary ${currentPath === link.href ? "text-primary font-medium" : "text-muted-foreground"
                                    }`}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-primary"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
} 
'use client';


import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";


export function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="bg-[#0F0F0F] text-white fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4  sm:px-6 py-6">
                <nav className="flex flex-wrap items-center justify-between gap-4">

                    {/* Logo + Link para Painel */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                        <Link href="/">
                            <h1 className="font-bold text-2xl sm:text-3xl cursor-pointer">
                                Tarefas<span className="text-red-600">+</span>
                            </h1>
                        </Link>

                        {session?.user && (
                            <Link
                                href="/dashboard"
                                className="text-sm sm:text-md text-black font-semibold cursor-pointer bg-[#FAFAFA] px-4 py-1 rounded-md transition-transform duration-300 hover:scale-105"
                            >
                                Meu painel
                            </Link>
                        )}
                    </div>

                    {/* Login / Logout */}
                    <div>
                        {status === "loading" ? null : session ? (
                            <button
                                onClick={() => signOut()}
                                className="text-sm border border-amber-50 cursor-pointer rounded-3xl px-4 sm:px-6 py-2 transition-transform duration-300 hover:scale-105"
                            >
                                Olá, {session.user?.name?.split(" ")[0]}!
                            </button>
                        ) : (
                            <button
                                onClick={() => signIn("google")}
                                className="text-sm border border-amber-50 cursor-pointer rounded-3xl px-4 sm:px-6 py-2 transition-transform duration-300 hover:scale-105"
                            >
                                Entrar com Google
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>

    );
}

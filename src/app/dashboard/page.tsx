import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Head from "next/head";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/"); 
    }

    return (
        <main className="bg-[#0F0F0F] text-white min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>
            <h1>Página painel</h1>
            <p className="text-xl font-semibold">Bem-vindo, {session?.user?.name}</p>
        </main>
    );
}

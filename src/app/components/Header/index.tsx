import Link from "next/link";

export function Header() {
    return (
        <header className="bg-[#0F0F0F] text-white fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="max-w-screen-xl mx-auto px-6 py-8">
                <nav className="flex items-center justify-between w-full mx-10">

                    <div className="flex items-center gap-6">
                        <Link href="/">
                            <h1 className="font-bold text-3xl cursor-pointer">Tarefas<span className="text-red-600">+</span></h1>
                        </Link>

                        <Link href="/dashboard" className="text-md text-black font-semibold cursor-pointer bg-[#FAFAFA] px-4 py-1 rounded-md transition-transform duration-300 hover:scale-105">  
                            Meu painel
                        </Link>
                    </div>

                    <a className="text-sm border border-amber-50 rounded-3xl px-6 py-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                        Minha conta
                    </a>
                </nav>
            </div>
        </header>
    );
}

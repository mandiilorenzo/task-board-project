"use client";

import { TextArea } from "@/app/components/TextArea";
import { FiShare } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import Head from "next/head";
import db from "../../services/fireBaseConnection";
import { addDoc, collection } from "firebase/firestore";

export interface DashboardClientProps {
    user: {
        email: string;
    };
}

export default function DashboardClient({ user }: DashboardClientProps) {
    const [input, setInput] = useState("");
    const [publicTask, setPublicTask] = useState(false);

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked);
    }

    async function handleRegisterTask(event: React.FormEvent) {
        event.preventDefault();

        if (input.trim() === "") {
            alert("Por favor, digite uma tarefa antes de registrar.");
            return;
        }

        try {
            await addDoc(collection(db, "tasks"), {
                task: input,
                public: publicTask,
                created: new Date(),
                userEmail: user.email
            });

            console.log("Tarefa registrada com sucesso!");
            setInput("");
            setPublicTask(false);
        } catch (error) {
            console.error("Erro ao registrar tarefa:", error);
        }
    }

    return (
        <main className="min-h-screen bg-[#0F0F0F] text-white pt-32">
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>

            <section className="bg-black w-full h-1/2 flex justify-center items-center px-4">
                <div className="w-full max-w-4xl flex flex-col justify-center gap-6">
                    <h1 className="text-3xl sm:text-4xl font-bold">Qual sua tarefa?</h1>

                    <form onSubmit={handleRegisterTask} className="w-full flex flex-col gap-4">
                        <TextArea
                            value={input}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setInput(e.target.value)
                            }
                            placeholder="Digite sua tarefa..."
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={publicTask}
                                onChange={handleChangePublic}
                                className="appearance-none w-5 h-5 bg-black border-2 border-white rounded-md checked:bg-white checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:items-center checked:before:justify-center"
                            />
                            <label className="font-bold text-sm ml-3">Deixar tarefa pública</label>
                        </div>

                        <button
                            type="submit"
                            className="text-md font-bold bg-blue-500 rounded-xl w-full transition-transform duration-300 hover:scale-105 px-6 py-3 mb-10"
                        >
                            Registrar
                        </button>
                    </form>
                </div>
            </section>

            <section className="bg-white text-black w-full min-h-[50vh] px-4 py-12">
                <div className="max-w-4xl mx-auto flex flex-col gap-8">
                    <h2 className="font-bold text-center text-3xl">Minhas tarefas</h2>

                    <article className="flex flex-col gap-4">
                        <div className="bg-gray-100 rounded-lg p-4 flex items-start justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-600 mb-1">
                                    PÚBLICO
                                </span>
                                <p className="text-base">Minha primeira tarefa de exemplo</p>
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                                <button className="cursor-pointer transition-transform duration-300 hover:scale-105">
                                    <FiShare size={20} color="#3183ff" />
                                </button>
                                <button className="cursor-pointer transition-transform duration-300 hover:scale-105">
                                    <FaTrash size={20} color="#ea3140" />
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

import { Metadata } from "next";
import db from "../../../services/fireBaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { TextArea } from "../../components/TextArea";

interface TaskPageProps {
    params: {
        id: string;
        userEmail: string;
        task: string;
        public: boolean;
        created: Date;
    };
}

export const metadata: Metadata = {
    title: "Detalhes da Tarefa",
};

export default async function Task({ params }: TaskPageProps) {
    const { id } = params;
    const docRef = doc(db, "tasks", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        redirect("/");
    }

    const task = snapshot.data();

    const miliseconds = task?.created?.seconds
        ? task.created.seconds * 1000
        : null;

    const taskDetails = {
        id: snapshot.id,
        task: task?.task,
        public: task?.public,
        created: miliseconds
            ? new Date(miliseconds).toLocaleDateString("pt-BR")
            : "Data desconhecida",
        userEmail: task?.userEmail,
    }

    if (!task?.public) {
        redirect("/");
    }

    return (
        <main className="bg-[#F4F4F5] min-h-screen py-8 px-4">
            <div className="bg-white max-w-[1024px] mx-auto rounded-lg shadow-sm p-6 my-32">

                <h1 className="text-2xl font-bold text-black mb-8">Minha tarefa</h1>

                <div className="border border-gray-300 rounded-md p-4 mb-8">
                    <p className="text-gray-800">{taskDetails.task}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Criada em: {taskDetails.created} | Usuário: {taskDetails.userEmail}
                    </p>
                </div>

                <section className="mb-8 w-full">
                    <h2 className="text-lg font-semibold mb-2">Deixar comentário</h2>
                    <textarea
                        placeholder="Digite seu comentário"
                        className="w-full border border-gray-300 rounded-md p-3 mb-3 resize-none bg-gray-50"
                        rows={4}
                    ></textarea>
                    <button className="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                        Enviar comentário
                    </button>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-4">Todos comentários</h2>

                    
                </section>
            </div>
        </main>


    );
}

import { Metadata } from "next";
import db from "../../../services/fireBaseConnection";
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { FaTrash } from "react-icons/fa";

interface TaskPageProps {
    params: {
        id: string;
    };
}

export const metadata: Metadata = {
    title: "Detalhes da Tarefa",
};

export default async function Task({ params }: TaskPageProps) {
    const { id } = params;
    const docRef = doc(db, "tasks", id);
    const snapshot = await getDoc(docRef);
    const session = await getServerSession(authOptions);

    if (!snapshot.exists()) {
        redirect("/");
    }

    const task = snapshot.data();

    if (!task?.public) {
        redirect("/");
    }

    const miliseconds = task?.created?.seconds ? task.created.seconds * 1000 : null;

    const taskDetails = {
        id: snapshot.id,
        task: task?.task,
        public: task?.public,
        created: miliseconds
            ? new Date(miliseconds).toLocaleDateString("pt-BR")
            : "Data desconhecida",
        userEmail: task?.userEmail,
    };

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("taskId", "==", id));
    const commentSnapshot = await getDocs(q);
    const comments = commentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

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

                {session?.user && (
                    <form
                        className="mb-8 w-full"
                        action={async (formData) => {
                            "use server";
                            const comment = formData.get("comment")?.toString();
                            if (!comment) return;

                            await addDoc(collection(db, "comments"), {
                                comment,
                                taskId: id,
                                created: new Date(),
                                user: session?.user?.name || session?.user?.email,
                            });
                        }}
                    >
                        <h2 className="text-lg font-semibold mb-2">Deixar comentário</h2>
                        <div className="text-sm text-gray-600 mb-2">
                            Comentando como: <strong>{session.user.name || session.user.email}</strong>
                        </div>
                        <textarea
                            name="comment"
                            placeholder="Digite seu comentário"
                            className="w-full border border-gray-300 rounded-md p-3 mb-3 resize-none bg-gray-50"
                            rows={4}
                        ></textarea>
                        <button
                            type="submit"
                            disabled={!session?.user}
                            className="bg-blue-600 text-white cursor-pointer disabled:bg-blue-200 disabeld:cursor-not-allowed px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
                        >
                            Enviar comentário
                        </button>
                    </form>
                )}

                <section>
                    <h2 className="text-lg font-semibold mb-4">Todos comentários</h2>
                    {comments.map((comment: any, index: number) => (
                        <div key={index} className="border rounded p-3 mb-2 flex flex-col items-start gap-4">
                            <div className="flex items-center justify-between gap-2 w-full">
                                <span className="text-sm text-gray-600 block">{comment.user}</span>
                                {
                                    (comment.user === session?.user?.email || comment.user === session?.user?.name) && (
                                        <button className="text-red-500 hover:text-red-700 cursor-pointer transition-all">
                                            <FaTrash size={20} color="#ea3140" />
                                        </button>
                                    )

                                }
                            </div>

                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}



import { HTMLProps } from "react";

export function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
    return (
        <textarea
            className="w-full h-[208px] p-4 rounded-lg border border-black bg-white text-black resize-none outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua tarefa..."
            {...rest}
        ></textarea>
    );
}

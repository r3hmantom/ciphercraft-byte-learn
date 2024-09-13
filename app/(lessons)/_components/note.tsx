import { ReactNode } from "react";

interface CodeSnippetProps {
    children?: ReactNode
}

export default function Note({ children }: CodeSnippetProps) {
    return (
        <div className="p-5 bg-gray-200 rounded flex-1 flex justify-center items-center">
            {children}
        </div>
    );
}

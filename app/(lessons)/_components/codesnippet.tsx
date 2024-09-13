import { ReactNode } from "react";

interface CodeSnippetProps {
    children?: ReactNode
}

export default function CodeSnippet({ children }: CodeSnippetProps) {
    return (
        <div className="p-5 bg-amber-200 rounded font-mono flex-1 flex justify-center items-center">
            {children}
        </div>
    );
}

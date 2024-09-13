import {
    Bell,
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
    return (
        <aside className="hidden border-r border-gray-200 bg-white md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b border-gray-200 px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
                        <Package2 className="h-6 w-6 text-gray-600" />
                        <span>Byte Learn</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 transition-all"
                        >
                            <Home className="h-4 w-4 text-gray-600" />
                            Dashboard
                        </Link>

                        <Link
                            href="/dashboard/courses"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-100 text-gray-900 transition-all"
                        >
                            <Package className="h-4 w-4 text-gray-900" />
                            Courses
                        </Link>
                    </nav>
                </div>
            </div>
        </aside>
    );
}

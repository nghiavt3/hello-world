import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
export function Menu({ label, darkMode, children }: { label: string; darkMode: boolean; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative group text-left w-full md:w-auto">
            <button className={`px-4 py-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} rounded w-full md:w-auto flex items-center justify-between`}>{label}<ChevronDown className="ml-2" size={16} /></button>
            <div className={`absolute left-0 mt-0 w-full md:w-48 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg rounded hidden group-hover:block`}>
                {children}
            </div>
        </div>
    );
}

export function MenuItem({ href, children, darkMode, onClick }: { href:string; children: React.ReactNode; darkMode: boolean; onClick?: () => void }) {
    return (
        <Link href={href} className={`block px-4 py-2 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} cursor-pointer`} onClick={onClick}>
            {children}
        </Link>
    );
}

Menu.Item = MenuItem;

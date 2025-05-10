import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/usercontext";
import { Menu } from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Search, User, Menu as MenuIcon, Bell, ChevronDown, Settings, Palette, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function Navbar({ onOpenSettings, menuItems, darkMode, style }: { onOpenSettings: () => void; menuItems: any[]; darkMode: boolean; style?: React.CSSProperties }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log(user);
            setUser(null);
            router.push("/login");
        } catch (err) {
            //setError("Đăng xuất thất bại.");
        }
    };

    const userOperations = [
        { name: 'Settings', icon: <Settings className="w-4 h-4" />, action: () => console.log('Settings') },
        { name: 'Customize', icon: <Palette className="w-4 h-4" />, action: () => console.log('Customize') },
        { name: 'Profile', icon: <User className="w-4 h-4" />, action: () => console.log('Profile') },
        { name: 'Logout', icon: <LogOut className="w-4 h-4 text-red-500" />, action: handleLogout, className: `text-red-500 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}` }
    ]

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);


    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <nav className={`p-4 flex items-center justify-between relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {/* <div className="text-xl font-bold mr-4">CVS</div> */}
            <div className="text-2xl font-extrabold text-blue-600">CVS</div>
            <div className="hidden md:flex flex gap-4 items-center">
                {menuItems.map((menu) => (
                    <Menu key={menu.label} label={menu.label} darkMode={darkMode}>
                        {menu.subItems.map((item: any) => (
                            <Menu.Item key={item.name} href={item.href} darkMode={darkMode}>{item.name}</Menu.Item>
                        ))}
                    </Menu>
                ))}
            </div>
            <div className="flex gap-4 items-center ml-auto">
                <div className="relative ">
                    <input type="text" placeholder="Tìm kiếm" className={`p-2 rounded ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} pl-10`} />
                    <Search className="absolute left-2 top-2 text-gray-400" size={20} />
                </div>
                <Bell className="cursor-pointer" size={24} />
                <Button className={` ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`} onClick={onOpenSettings}>⚙️</Button>

                {user ? (
                    <div className="relative hidden md:block cursor-pointer">
                        <div className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={user?.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border" />
                            <ChevronDown className="w-5 h-5 ml-2 text-blue-600" />
                        </div>
                        {dropdownOpen && (
                            <div className={`absolute right-0 mt-2 w-48 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}  rounded-lg shadow-lg z-10`}>
                                <div className="p-2 font-semibold text-center border-b">{user?.displayName}</div>
                                {userOperations.map((opertion, index) => (
                                    <div key={index}>
                                        <div className={`p-2 cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex items-center gap-2 ${opertion.className || ''}`} onClick={opertion.action}>
                                            {opertion.icon} {opertion.name}
                                        </div>
                                        {index !== menuItems.length - 1 && <div className="border-t"></div>}
                                    </div>

                                ))}

                            </div>
                        )}
                    </div>
                ) : (
                    <Button onClick={() => router.push('/login')} className="bg-blue-500 text-white">
                        Đăng nhập
                    </Button>
                )}


                {/* <User className="hidden md:block cursor-pointer" size={24} /> */}


                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <MenuIcon size={24} />
                </button>
            </div>
            {isMenuOpen && (
                <div className={`absolute top-full left-0 w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-4 flex flex-col md:hidden`}>
                    {menuItems.map((menu) => (
                        <Menu key={menu.label} label={menu.label} darkMode={darkMode}>
                            {menu.subItems.map((item: any) => (
                                <Menu.Item key={item.name} href={item.href} darkMode={darkMode}>{item.name}</Menu.Item>
                            ))}
                        </Menu>
                    ))}
                </div>
            )}
        </nav>
    );
}

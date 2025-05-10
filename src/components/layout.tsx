"use client"
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { usePathname,  } from "next/navigation";
import { UserProvider } from "@/context/usercontext";
interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/login" || pathname === "/register";

    // const { theme, setTheme } = useTheme();
    const [theme, setTheme] = useState({
        
            primaryColor: '#4F46E5',
            backgroundColor: '#F3F4F6',
            textColor: '#111827',
            borderRadius: '0.5rem',
            darkMode: false,
            modalOpen: false,  
    });

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
        }
      }, []);

    const menuItems = [
        {
            label: "Dữ liệu", subItems: [
                { name: "Dữ liệu doanh nghiệp", href: "/du-lieu/doanh-nghiep" },
                { name: "Dữ liệu tài chính", href: "/du-lieu/tai-chinh" }
            ]
        },
        {
            label: "Công cụ", subItems: [
                { name: "Bộ lọc doanh nghiệp", href: "/cong-cu/bo-loc" },
                { name: "Biểu đồ nâng cao", href: "/cong-cu/bieu-do" }
            ]
        },
    ];

    return (isHomePage ? (
        <div className="min-h-screen">
            
                <UserProvider>
                    <main className="p-0">{children}</main>
                </UserProvider>
            
        </div>
    ) : (
        <div className="min-h-screen" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
            
                <UserProvider>
                    <Navbar onOpenSettings={() => { setTheme({ ...theme, modalOpen: true }); console.log(theme) }} menuItems={menuItems} darkMode={theme.darkMode} />
                    <Modal open={theme.modalOpen} onClose={() => setTheme({ ...theme, modalOpen: false })} 
                    onSave={()=>{setTheme({ ...theme, modalOpen: false }); localStorage.setItem('theme', JSON.stringify({ ...theme, modalOpen: false })); }}>
                        <div className="p-6">
                            <Card className="p-4 max-w-md mx-auto mb-6">
                                <h2 className="text-xl font-semibold mb-4">UI Panel</h2>
                                <div className="space-y-2">
                                    <Input
                                        type="color"
                                        label="Primary Color"
                                        value={theme.primaryColor}
                                        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                                    />
                                    <Input
                                        type="color"
                                        label="Background Color"
                                        value={theme.backgroundColor}
                                        onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                                    />
                                    <Input
                                        type="color"
                                        label="Text Color"
                                        value={theme.textColor}
                                        onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                                    />
                                    <label className="flex items-center gap-2">
                                        Border Radius:
                                        <input
                                            type="range"
                                            min="0"
                                            max="2"
                                            step="0.1"
                                            value={parseFloat(theme.borderRadius)}
                                            onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value + "rem" })}
                                        />
                                    </label>
                                    <div className="flex items-center justify-between">
                                        <span>Dark Mode</span>
                                        <Switch
                                            checked={theme.darkMode}
                                            onCheckedChange={(checked) =>
                                                setTheme({ ...theme, darkMode: checked, backgroundColor: checked ? "#1F2937" : "#F3F4F6" })
                                            }
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Modal>
                    <main className="p-0">{children}</main>
                </UserProvider>
           
        </div>
    ))
}

"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Mail, Lock } from 'lucide-react';
import { useUser } from "@/context/usercontext";

const runningTexts = [
    'Cộng đồng "Nghiện dữ liệu Tài chính"',
    'Nền tảng Phân tích Cơ bản số một Việt Nam',
    'Tham gia trao đổi, chia sẻ thông tin'
];

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [runningText, setRunningText] = useState(runningTexts[0]);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            if (currentUser) {
                setUser(currentUser);
                if (pathname !== "/dashboard") {
                    router.push("/dashboard");
                }
            }
        });
        return () => unsubscribe();
    }, [router]);


    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % runningTexts.length;
            setRunningText(runningTexts[index]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError('Thông tin đăng nhập không chính xác.');
        }
    };

    const handleEmailLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            router.push("/dashboard");

        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user);
            router.push("/dashboard");
        } catch (err) {
            setError("Đăng nhập bằng Google thất bại.");
        }
    };

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user);
            router.push("/dashboard");
        } catch (err) {
            setError("Đăng nhập bằng Facebook thất bại.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f5fa]">
            <div className="bg-white rounded-xl shadow-lg w-[900px] flex border border-gray-200">
                <div className="w-1/2 bg-[#e8f0fe] flex flex-col justify-center items-center p-10 text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4 animate-fade-in-out">
                        {runningText}
                    </h1>
                    <p className="text-gray-600">
                        Nền tảng Phân tích Cơ bản số một Việt Nam
                    </p>
                </div>
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Đăng nhập</h2>
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-6 relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-black"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-6 relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-black"
                                placeholder="Mật khẩu"
                                required
                            />
                        </div>
                        <div className="mb-4 text-right">
                            <Link href="/forgot-password" className="text-indigo-600 hover:underline text-sm">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-3 rounded-lg shadow-md transition duration-300">
                            Đăng nhập
                        </Button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="text-indigo-600 hover:underline">
                            Đăng ký
                        </Link>
                    </p>
                    <div className="mt-6">
                        <Button onClick={handleGoogleLogin} className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg shadow-md transition duration-300">
                            Tiếp tục với Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

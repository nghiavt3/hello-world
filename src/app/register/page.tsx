'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User } from 'lucide-react';
import { signOut } from "firebase/auth";
const runningTexts = [
  'Tìm kiếm ý tưởng đầu tư đột phá',
  'Phân tích các ý tưởng đầu tư sáng tạo',
  'Hệ thống dữ liệu Kinh tế Tài chính'
];

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [runningText, setRunningText] = useState(runningTexts[0]);
  const router = useRouter();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % runningTexts.length;
      setRunningText(runningTexts[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await signOut(auth);

      setSuccess('User registered successfully!');
      setTimeout(() => {

        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f5fa]">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[900px] flex border border-gray-200">
        <div className="w-1/2 bg-[#e8f0fe] flex flex-col justify-center items-center p-10 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4 animate-fade-in-out">{runningText}</h1>
          <p className="text-gray-600">
            Thoả sức sáng tạo và phân tích các ý tưởng đầu tư, kinh doanh đột phá với hệ thống dữ liệu Kinh tế Tài chính cùng cá nhân hóa trải nghiệm.
          </p>
        </div>
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Đăng ký tài khoản</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-6 relative">
              <User className="absolute left-3 top-3 text-gray-900" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  font-bold text-black"
                placeholder="Họ và tên"
                required
              />
            </div>
            <div className="mb-6 relative">
              <Mail className="absolute left-3 top-3 text-gray-900" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  font-bold text-black"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-3 text-gray-900" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  font-bold text-black"
                placeholder="Mật khẩu"
                required
              />
            </div>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  font-bold text-black"
                placeholder="Xác nhận mật khẩu"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-3 rounded-lg shadow-md transition duration-300">
              Đăng ký
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn đã có tài khoản?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


'use client';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
    } catch (err) {
      setError('Không thể gửi email đặt lại mật khẩu. Vui lòng kiểm tra email và thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f5fa]">
      <div className="bg-white rounded-xl shadow-lg w-[500px] p-10 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Quên mật khẩu</h2>
        {message && <p className="text-green-500 text-sm mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-6 relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-black"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-3 rounded-lg shadow-md transition duration-300">
            Gửi yêu cầu đặt lại mật khẩu
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          <Link href="/login" className="text-indigo-600 hover:underline">
            Quay lại trang đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

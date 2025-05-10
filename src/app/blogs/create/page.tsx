"use client"
import { useState } from 'react';
import { dbfs } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Editor from '@/blog_components/Editor';

export default function CreatePost() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const handleSave = async () => {
        await addDoc(collection(dbfs, 'posts'), {
            title,
            content,
            createdAt: Timestamp.now(),
        });
        alert('Đã lưu bài viết!');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">✍️ Tạo Bài Viết Mới</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tiêu đề</label>
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề bài viết..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nội dung</label>
                    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                        <Editor content={content} setContent={setContent} />
                    </div>
                </div>

                <div className="text-right">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition-all shadow-sm"
                    >
                        💾 Lưu bài viết
                    </button>
                </div>
            </div>
        </div>
    );
}

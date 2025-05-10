import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { dbfs, storage } from '../lib/firebase';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = '';

            if (image) {
                const storageRef = ref(storage, `posts/${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }


            await addDoc(collection(dbfs, 'posts'), {
                title,
                content,
                category,
                imageUrl,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            // Reset form
            setTitle('');
            setContent('');
            setCategory('');
            setImage(null);
            alert('Bài viết đã được tạo thành công!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Có lỗi xảy ra khi tạo bài viết');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Tạo bài viết mới</h2>

            <div className="mb-4">
                <label className="block mb-2">Tiêu đề</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Danh mục</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Nội dung</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded h-40"
                    required
                />11
            </div>

            <div className="mb-4">
                <label className="block mb-2">Hình ảnh</label>
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]);
                        }
                    }}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isSubmitting ? 'Đang tải lên...' : 'Đăng bài'}
            </button>
        </form>
    );
}
// app/posts/[id]/page.tsx
import { dbfs } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';

export default async function PostDetailPage({ params }: { params: { id: string } }) {
    const docRef = doc(dbfs, 'posts', params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return notFound();

    const post = docSnap.data();

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <article className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-8">
                    Ngày đăng: {post.createdAt?.toDate().toLocaleDateString()}
                </p>
                <div
                    className="prose prose-lg max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </div>
    );
}

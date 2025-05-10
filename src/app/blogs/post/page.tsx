import Link from 'next/link';
import { dbfs } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// 👇 Hàm tách ảnh đầu tiên từ HTML
function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

// 👇 Hàm tóm tắt nội dung không có HTML
function extractExcerpt(html: string, maxLength = 150): string {
  const text = html.replace(/<[^>]*>?/gm, ''); // loại bỏ HTML
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export default async function PostListPage() {
  const q = query(collection(dbfs, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt?.toDate().toLocaleDateString() || '',
      thumbnail: extractFirstImage(data.content),
      excerpt: extractExcerpt(data.content),
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">📰 Bài viết mới nhất</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <Link key={post.id} href={`/blogs/post/${post.id}`} className="group">
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition duration-200 overflow-hidden border border-gray-200">
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt="Thumbnail"
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1 mb-3">Ngày đăng: {post.createdAt}</p>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

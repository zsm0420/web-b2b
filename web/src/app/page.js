// 首页 - 静态导出版本
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to B2B Website</h1>
        <p className="text-gray-600 mb-8">This is a static export of your Next.js application</p>
        <div className="space-x-4">
          <Link
            href="/product"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Products
          </Link>
          <Link
            href="/case"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            View Cases
          </Link>
        </div>
      </div>
    </div>
  );
}

/** @type {import('next').NextConfig} */

const nextConfig = {
    // 移除静态导出，启用动态渲染
    // output: 'export', // 注释掉静态导出
    trailingSlash: true, // 添加尾斜杠
    images: {
        unoptimized: true, // 静态导出需要禁用图片优化
        domains: [],
    },
    env: {
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID || '001',
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

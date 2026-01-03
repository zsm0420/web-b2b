/** @type {import('next').NextConfig} */

const nextConfig = {
    // 启用服务器端渲染
    output: 'standalone',
    trailingSlash: true,
    images: {
        unoptimized: false, // 动态渲染不需要禁用图片优化
        domains: [],
    },
    env: {
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID || '001',
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['*'],
        },
    },
};

export default nextConfig;

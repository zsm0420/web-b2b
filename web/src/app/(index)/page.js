export default function Home() {
    // 获取模板id
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || '001';
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="text-2xl font-bold text-gray-900">
                            公司网站 (模板 {templateId})
                        </div>
                        <nav className="space-x-8">
                            <a href="/about" className="text-gray-600 hover:text-gray-900">关于我们</a>
                            <a href="/contact" className="text-gray-600 hover:text-gray-900">联系我们</a>
                            <a href="/test" className="text-gray-600 hover:text-gray-900">测试页面</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        欢迎访问我们的网站
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        网站正在正常运行中，部署问题已修复
                    </p>
                    <div className="space-x-4">
                        <a href="/about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                            了解更多
                        </a>
                        <a href="/contact" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                            联系我们
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        主要功能
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏢</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">企业展示</h3>
                            <p className="text-gray-600">展示公司信息、产品和服务</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">响应式设计</h3>
                            <p className="text-gray-600">适配各种设备和屏幕尺寸</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">高性能</h3>
                            <p className="text-gray-600">快速加载和流畅的用户体验</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Status Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        部署状态
                    </h2>
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                        ✅ 前端部署成功
                    </div>
                    <div className="mt-4 text-gray-600">
                        <p>如果您看到此页面，说明前端部署已经成功</p>
                        <p>后端功能将在稍后配置</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export function generateMetadata({params}) {
    // 静态metadata
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || '001';
    return {
        title: '公司网站 - 首页',
        description: '欢迎访问我们的公司网站，了解我们的产品和服务',
        keywords: '公司,产品,服务,联系我们',
        // Open Graph
        openGraph: {
            title: '公司网站 - 首页',
            description: '欢迎访问我们的公司网站，了解我们的产品和服务',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'https://your-site.vercel.app',
            siteName: '公司网站',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: '公司网站 - 首页',
            description: '欢迎访问我们的公司网站，了解我们的产品和服务',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
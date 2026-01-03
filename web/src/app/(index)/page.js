import { getSectionDataCached } from './utils';

export default async function Home() {
    try {
        // 获取首页数据
        const sectionData = await getSectionDataCached();
        
        // 提供默认值防止 null 错误
        const safeSectionData = sectionData || {};
        
        // 获取模板id
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || '001';
        
        // 准备传递给模板的props
        const templateProps = {
            bannerData: safeSectionData.bannerData || {},
            aboutData: safeSectionData.aboutData || {},
            productData: safeSectionData.productData || [],
            newsData: safeSectionData.newsData || [],
            caseData: safeSectionData.caseData || []
        };
        
        // 动态导入对应模板
        const HomeTemplateModule = await import(`@/templates/${templateId}/homeTemplate`);
        const HomeTemplate = HomeTemplateModule.default;
        
        return <HomeTemplate {...templateProps} />;
    } catch (error) {
        console.error('Home page error:', error);
        
        // 如果API调用失败，显示专业的静态版本
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="text-2xl font-bold text-gray-900">
                                Blueheart
                            </div>
                            <nav className="space-x-8">
                                <a href="/" className="text-gray-600 hover:text-blue-600">首页</a>
                                <a href="/about" className="text-gray-600 hover:text-blue-600">关于我们</a>
                                <a href="/product" className="text-gray-600 hover:text-blue-600">产品中心</a>
                                <a href="/news" className="text-gray-600 hover:text-blue-600">新闻资讯</a>
                                <a href="/case" className="text-gray-600 hover:text-blue-600">成功案例</a>
                                <a href="/contact" className="text-gray-600 hover:text-blue-600">联系我们</a>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            全球领先的电商平台
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            致力于为全球客户提供无缝愉快的购物体验，连接人们与他们喜爱的产品
                        </p>
                        <div className="space-x-4">
                            <a href="/product" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                浏览产品
                            </a>
                            <a href="/contact" className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                联系我们
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                关于Blueheart
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                成立于2018年，Blueheart是全球领先的电商平台，专注于为全球客户提供无缝愉快的购物体验
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    我们的使命
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    我们的使命是连接人们与他们喜爱的产品，提供精心策划的高品质商品，涵盖电子、时尚、家居用品等多个品类。
                                </p>
                                <p className="text-gray-600 mb-6">
                                    专注于创新、可靠性和客户满意度，我们迅速扩大了用户群，与可信的供应商和品牌建立了强大的关系。
                                </p>
                                <a href="/about" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                                    了解更多 →
                                </a>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
                                        <div className="text-gray-600">年经验</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                                        <div className="text-gray-600">合作伙伴</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                                        <div className="text-gray-600">产品类别</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                                        <div className="text-gray-600">客户服务</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="bg-gray-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                为什么选择我们
                            </h2>
                            <p className="text-xl text-gray-600">
                                我们采用先进技术确保安全交易、及时交付和响应式客户服务
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🚀</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">技术创新</h3>
                                <p className="text-gray-600">
                                    先进的网站和移动应用程序专为快速、简单、安全的购物而设计
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">可靠伙伴关系</h3>
                                <p className="text-gray-600">
                                    与可信的供应商和品牌建立了强大的关系，确保产品质量
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">优质服务</h3>
                                <p className="text-gray-600">
                                    响应式客户服务和及时交付，为客户提供最佳购物体验
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Categories */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                产品类别
                            </h2>
                            <p className="text-xl text-gray-600">
                                涵盖多个品类的高品质商品
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">电子产品</h3>
                                <p className="text-gray-600 text-sm">最新科技产品</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👕</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">时尚服装</h3>
                                <p className="text-gray-600 text-sm">潮流时尚单品</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏠</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">家居用品</h3>
                                <p className="text-gray-600 text-sm">舒适家居生活</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">更多类别</h3>
                                <p className="text-gray-600 text-sm">探索更多选择</p>
                            </div>
                        </div>
                        
                        <div className="text-center mt-12">
                            <a href="/product" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                查看全部产品
                            </a>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            开始您的购物之旅
                        </h2>
                        <p className="text-xl mb-8">
                            加入我们，体验无缝的在线购物体验
                        </p>
                        <div className="space-x-4">
                            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                立即联系
                            </a>
                            <a href="/about" className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                了解更多
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Blueheart</h3>
                                <p className="text-gray-400">
                                    全球领先的电商平台，为全球客户提供无缝愉快的购物体验。
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">产品</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="/product" className="hover:text-white">电子产品</a></li>
                                    <li><a href="/product" className="hover:text-white">时尚服装</a></li>
                                    <li><a href="/product" className="hover:text-white">家居用品</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">公司</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="/about" className="hover:text-white">关于我们</a></li>
                                    <li><a href="/news" className="hover:text-white">新闻资讯</a></li>
                                    <li><a href="/case" className="hover:text-white">成功案例</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">联系我们</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="/contact" className="hover:text-white">联系我们</a></li>
                                    <li><a href="/faq" className="hover:text-white">常见问题</a></li>
                                    <li><a href="/download" className="hover:text-white">下载中心</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2018-2024 Blueheart. 保留所有权利。</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export async function generateMetadata({ params }) {
    // 使用缓存的函数获取首页数据
    const data = await getSectionDataCached();

    // 提供默认值防止 null 错误
    const safeData = data || {};
    const seoData = safeData.seoData || {};

    // 从详情数据中提取信息
    const { seo_title, seo_description, seo_keywords } = seoData;
    const siteName = safeData.siteName;

    // 返回动态生成的metadata
    return {
        title: seo_title || 'Blueheart - 全球领先的电商平台',
        description: seo_description || 'Blueheart是全球领先的电商平台，专注于为全球客户提供无缝愉快的购物体验。连接人们与他们喜爱的产品，提供高品质商品。',
        keywords: seo_keywords || '电商,购物,在线购物,B2B,外贸,电子产品,时尚,家居',
        // Open Graph
        openGraph: {
            title: seo_title || 'Blueheart - 全球领先的电商平台',
            description: seo_description || 'Blueheart是全球领先的电商平台，专注于为全球客户提供无缝愉快的购物体验。',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName || 'Blueheart',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || 'Blueheart - 全球领先的电商平台',
            description: seo_description || siteName || 'Blueheart是全球领先的电商平台，专注于为全球客户提供无缝愉快的购物体验。',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
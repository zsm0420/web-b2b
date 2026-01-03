import { getSectionDataCached } from './utils';

export default async function Page() {
    try {
        const sectionData = await getSectionDataCached();

        // 提供默认值防止 null 错误
        const safeSectionData = sectionData || {};

        // 获取模板id
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

        // 准备传递给模板的props
        const templateProps = {
            bannerData: safeSectionData.bannerData || {},
            aboutData: safeSectionData.aboutData || {}
        };

        try {
            // 动态导入对应模板
            const AboutTemplateModule = await import(`@/templates/${templateId}/aboutTemplate`);
            const AboutTemplate = AboutTemplateModule.default;

            return <AboutTemplate {...templateProps} />;
        } catch (templateError) {
            console.error(`加载模板失败: ${templateError}`);
            return (
                <div className="p-10 text-center">
                    <h1 className="text-2xl font-bold mb-4">关于我们</h1>
                    <p className="text-gray-600">模板加载失败，正在恢复默认模式...</p>
                </div>
            );
        }
    } catch (error) {
        console.error('About page error:', error);
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">关于我们</h1>
                <p className="text-gray-600">数据加载中...</p>
            </div>
        );
    }
}

export async function generateMetadata({ params }) {
    // 使用缓存的函数获取关于我们页面数据
    const data = await getSectionDataCached();

    // 提供默认值防止 null 错误
    const safeData = data || {};
    const seoData = safeData.seoData || {};

    // 从详情数据中提取信息
    const { seo_title, seo_description, seo_keywords } = seoData;
    const siteName = safeData.siteName;

    // 返回动态生成的metadata
    return {
        title: seo_title || '关于我们',
        description: seo_description || '关于我们',
        keywords: seo_keywords || '关于我们',
        // Open Graph
        openGraph: {
            title: seo_title || '关于我们',
            description: seo_description || '关于我们',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName || '',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || '关于我们',
            description: seo_description || siteName || '关于我们',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
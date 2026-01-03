import api from "@/utils/axiosApi";
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
            downloadData: safeSectionData.downloadData || []
        };

        // 动态导入对应模板
        const DownloadTemplateModule = await import(`@/templates/${templateId}/downloadTemplate`);
        const DownloadTemplate = DownloadTemplateModule.default;

        return <DownloadTemplate {...templateProps} />;
    } catch (error) {
        console.error('Download page error:', error);
        // 如果API调用失败，显示错误页面
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">下载页面</h1>
                <p className="text-gray-600">数据加载中...</p>
            </div>
        );
    }
}

export async function generateMetadata({ params }) {
    // 使用缓存的函数获取案例详情数据
    const data = await getSectionDataCached();

    // 提供默认值防止 null 错误
    const safeData = data || {};
    const seoData = safeData.seoData || {};

    // 从详情数据中提取信息
    const { seo_title, seo_description, seo_keywords } = seoData;
    const siteName = safeData.siteName;


    // 返回动态生成的metadata
    return {
        title: seo_title || 'Download',
        description: seo_description || 'Download',
        keywords: seo_keywords || 'Download',
        // Open Graph
        openGraph: {
            title: seo_title || 'Download',
            description: seo_description || 'Download',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName || '',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || 'Download',
            description: seo_description || siteName || 'Download',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}


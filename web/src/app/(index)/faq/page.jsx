import api from "@/utils/axiosApi";
import {cache} from "react";
import {getIp} from "@/utils/tools";

export default async function Page() {
    try {
        const sectionData = await getSectionDataCached();

        // 如果获取数据失败，使用默认空数据
        const templateProps = {
            bannerData: sectionData?.bannerData || {},
            faqData: sectionData?.faqData || []
        };

        // 获取模板id
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

        try {
            // 动态导入对应模板
            const FaqTemplateModule = await import(`@/templates/${templateId}/faqTemplate`);
            const FaqTemplate = FaqTemplateModule.default;
            return <FaqTemplate {...templateProps} />;
        } catch (templateError) {
            console.error('Template import error:', templateError);
            return (
                <div className="p-10 text-center">
                    <h1 className="text-2xl font-bold mb-4">常见问题</h1>
                    <p className="text-gray-600">FAQ 页面加载中...</p>
                </div>
            );
        }
    } catch (error) {
        console.error('FAQ page error:', error);
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">常见问题</h1>
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
        title: seo_title || 'Faq',
        description: seo_description || 'Faq',
        keywords: seo_keywords || 'Faq',
        // Open Graph
        openGraph: {
            title: seo_title || 'Faq',
            description: seo_description || 'Faq',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName || '',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || 'Faq',
            description: seo_description || siteName || 'Faq',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

const getSectionDataCached = cache(async () =>{
    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-forwarded-for': getIp()
        };
        const {code, msg, data} = await api.get('/myapp/index/faq/section', {headers});
        if (code === 0) {
            return data;
        } else {
            console.error(`获取数据错误: ${msg}`);
            return null;
        }
    } catch (err) {
        console.error("获取数据失败:", err);
        return null;
    }
})
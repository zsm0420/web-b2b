import api from "@/utils/axiosApi";
import {cache} from "react";
import {getIp} from "@/utils/tools";

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
            contactData: safeSectionData.contactData || {}
        };

        // 动态导入对应模板
        const ContactTemplateModule = await import(`@/templates/${templateId}/contactTemplate`);
        const ContactTemplate = ContactTemplateModule.default;

        return <ContactTemplate {...templateProps} />;
    } catch (error) {
        console.error('Contact page error:', error);
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">联系我们</h1>
                <p className="text-gray-600">数据加载中...</p>
            </div>
        );
    }
}

export async function generateMetadata({ params }) {
    // 使用缓存的函数获取联系页面数据
    const data = await getSectionDataCached();

    // 提供默认值防止 null 错误
    const safeData = data || {};
    const seoData = safeData.seoData || {};

    // 从详情数据中提取信息
    const { seo_title, seo_description, seo_keywords } = seoData;
    const siteName = safeData.siteName;

    // 返回动态生成的metadata
    return {
        title: seo_title || '联系我们',
        description: seo_description || '联系我们',
        keywords: seo_keywords || '联系我们',
        // Open Graph
        openGraph: {
            title: seo_title || '联系我们',
            description: seo_description || '联系我们',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName || '',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || '联系我们',
            description: seo_description || siteName || '联系我们',
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
        const {code, msg, data} = await api.get('/myapp/index/contact/section', {headers});
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
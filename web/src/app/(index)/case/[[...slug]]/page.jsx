import api from "@/utils/axiosApi";
import { getSectionDataCached } from '../utils';

// 为静态导出生成参数
export async function generateStaticParams() {
    // 生成一些示例页面参数
    return [
        { slug: [] }, // 首页参数
        { slug: ['page', '1'] }, // 第一页
        { slug: ['page', '2'] }, // 第二页
        { slug: ['page', '3'] }, // 第三页
    ];
}

export default async function Page({params}) {
    try {
        const pageNumber = getPageNumber(params?.slug);
        const urlParams = {page: pageNumber, pageSize: 9};
        const sectionData = await getSectionDataCached(urlParams);

        // 提供默认值防止 null 错误
        const safeSectionData = sectionData || {};

        // 获取模板id
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

        // 准备传递给模板的props
        const templateProps = {
            bannerData: safeSectionData.bannerData,
            pageNumber: pageNumber,
            total: safeSectionData.total,
            caseData: safeSectionData.caseData
        };

        // 动态导入对应模板
        const CaseTemplateModule = await import(`@/templates/${templateId}/caseTemplate`);
        const CaseTemplate = CaseTemplateModule.default;

        return <CaseTemplate {...templateProps} />;
    } catch (error) {
        console.error('Case page error:', error);
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">案例中心</h1>
                <p className="text-gray-600">数据加载中...</p>
            </div>
        );
    }
}

export async function generateMetadata({params}) {
    const pageNumber = getPageNumber(params?.slug);
    const urlParams = {page: pageNumber, pageSize: 9};
    const {seoData = {}, siteName=''} = await getSectionDataCached(urlParams);

    // 提取SEO数据并提供默认值
    const {
        seo_title = 'Case',
        seo_description = 'Case',
        seo_keywords = 'Case'
    } = seoData || {};

    return {
        title: seo_title,
        description: seo_description,
        keywords: seo_keywords,
        // Open Graph
        openGraph: {
            title: seo_title || 'Case',
            description: seo_description || 'Case',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName,
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || 'Case',
            description: seo_description || siteName || 'Case',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

// 从URL参数中提取页码的辅助函数
function getPageNumber(slug) {
    const slugArray = slug || [];

    if (slugArray.length > 0 && slugArray[0] === 'page' && slugArray.length >= 2) {
        return parseInt(slugArray[1], 10) || 1;
    }

    return 1;
}


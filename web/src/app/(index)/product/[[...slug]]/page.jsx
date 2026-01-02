import {cache} from "react";
import api from "@/utils/axiosApi";
import {getIp} from "@/utils/tools";

// 为静态导出生成参数
export async function generateStaticParams() {
    // 生成一些示例产品页面参数
    return [
        { slug: [] }, // 首页参数
        { slug: ['page', '1'] }, // 第一页
        { slug: ['page', '2'] }, // 第二页
        { slug: ['page', '3'] }, // 第三页
        { slug: ['category', '1'] }, // 分类1
        { slug: ['category', '1', 'page', '1'] }, // 分类1第一页
        { slug: ['category', '2'] }, // 分类2
        { slug: ['category', '2', 'page', '1'] }, // 分类2第一页
    ];
}

export default async function Page({params, searchParams}) {
    try {
        // 解析slug参数
        const slug = params?.slug || [];

        // 解析category和page
        let categoryId = null;
        let pageNumber = 1;
        let pageSize = 9;

        const id = process.env.NEXT_PUBLIC_TEMPLATE_ID;

        // 兼容模板
        if (['004', '005', '006', '007', '008', '009', '010'].includes(id)) {
            pageSize = 12;
        }

        // 解析不同的路由模式
        if (slug.length > 0) {
            if (slug[0] === 'category' && slug.length >= 2) {
                // 处理 /product/category/[id] 和 /product/category/[id]/page/[number]
                categoryId = slug[1];

                // 检查是否还有页码
                if (slug.length >= 4 && slug[2] === 'page') {
                    pageNumber = parseInt(slug[3], 10) || 1;
                }
            } else if (slug[0] === 'page' && slug.length >= 2) {
                // 处理 /product/page/[number]
                pageNumber = parseInt(slug[1], 10) || 1;
            }
        }

        // 获取搜索参数
        const searchQuery = searchParams?.s || '';

        const urlParams = {page: pageNumber, pageSize: pageSize, categoryId, searchQuery}
        let sectionData;
        try {
            sectionData = await getSectionDataCached(urlParams);
        } catch (apiError) {
            console.warn('API连接失败，使用默认数据:', apiError);
            // 当API不可用时提供模拟数据
            sectionData = {
                bannerData: '',
                categoryData: [
                    { id: -1, title: 'All Products' },
                    { id: 1, title: 'Category 1' },
                    { id: 2, title: 'Category 2' }
                ],
                productData: [
                    { id: 1, title: 'Sample Product 1', cover: 'sample1.jpg' },
                    { id: 2, title: 'Sample Product 2', cover: 'sample2.jpg' },
                    { id: 3, title: 'Sample Product 3', cover: 'sample3.jpg' }
                ],
                featuredData: [
                    { id: 1, title: 'Featured Product 1', cover: 'featured1.jpg' }
                ],
                total: 3
            };
        }

        // 提供默认值防止 null 错误
        const safeSectionData = sectionData || {};
        const {bannerData, categoryData, productData, featuredData, total} = safeSectionData;

        // 获取模板id
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

        // 准备传递给模板的props
        const templateProps = {
            bannerData,
            categoryId,
            pageNumber,
            total,
            pageSize,
            categoryData,
            productData,
            featuredData,
            searchQuery
        };

        try {
            // 动态导入对应模板
            const ProductTemplateModule = await import(`@/templates/${templateId}/productTemplate`);
            const ProductTemplate = ProductTemplateModule.default;
            
            return <ProductTemplate {...templateProps} />;
        } catch (templateError) {
            console.error(`加载产品模板失败: ${templateError}`);
            return (
                <div className="p-10 text-center">
                    <h1 className="text-2xl font-bold mb-4">产品中心</h1>
                    <p className="text-gray-600">模板加载失败，正在恢复默认模式...</p>
                </div>
            );
        }
    } catch (error) {
        console.error('Product page error:', error);
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">产品中心</h1>
                <p className="text-gray-600">数据加载中...</p>
            </div>
        );
    }
}

export async function generateMetadata({params}) {
    // 使用缓存的函数获取案例详情数据，并提供默认值
    let data;
    try {
        data = await getSectionDataCached({page: 1, pageSize: 9});
    } catch (error) {
        console.warn('Metadata获取数据失败:', error);
        data = null;
    }

    // 提供默认值防止 null 错误
    const safeData = data || {};
    const seoData = safeData.seoData || {};

    // 从详情数据中提取信息
    const {seo_title, seo_description, seo_keywords} = seoData;
    const siteName = safeData.siteName;

    // 返回动态生成的metadata
    return {
        title: seo_title || 'Products',
        description: seo_description || 'Products',
        keywords: seo_keywords || 'Products',
        // Open Graph
        openGraph: {
            title: seo_title || 'Products',
            description: seo_description || 'Products',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            siteName: siteName || '',
            image: '',
            type: 'website',
        },
        // Twitter
        twitter: {
            card: 'summary',
            title: seo_title || siteName || 'Products',
            description: seo_description || siteName || 'Products',
            image: '',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

const getSectionDataCached = cache(async (params) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-forwarded-for': getIp()
        };
        const {code, msg, data} = await api.get('/myapp/index/thing/section', {headers, params});
        if (code === 0) {
            return data;
        } else {
            console.error(`获取数据错误: ${msg}`);
            throw new Error(`API错误: ${msg}`);
        }
    } catch (err) {
        console.error("获取数据失败:", err);
        // 抛出错误而不是返回null，让调用方可以处理
        throw err;
    }
})
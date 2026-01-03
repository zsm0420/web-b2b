import {cache} from "react";
import api from "@/utils/axiosApi";
import {getIp} from "@/utils/tools";

export const getSectionDataCached = cache(async () =>{
    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-forwarded-for': getIp()
        };
        const {code, msg, data} = await api.get('/myapp/index/home/section', {headers});
        if (code === 0) {
            return data;
        } else {
            console.error(`获取数据错误: ${msg}`);
            // 返回模拟数据而不是 null，确保页面能正常显示
            return getMockSectionData();
        }
    } catch (err) {
        console.error("获取数据失败:", err);
        // 返回模拟数据而不是 null，确保页面能正常显示
        return getMockSectionData();
    }
});

// 模拟首页数据，用于API请求失败时的备选方案
function getMockSectionData() {
    return {
        bannerData: [
            {
                title: "全球领先的电商平台",
                subtitle: "致力于为全球客户提供无缝愉快的购物体验",
                image: "https://picsum.photos/1200/600"
            }
        ],
        productData: [
            {
                title: "精选产品 1",
                description: "高品质的产品描述",
                image: "https://picsum.photos/500/500"
            },
            {
                title: "精选产品 2",
                description: "高品质的产品描述",
                image: "https://picsum.photos/500/500"
            },
            {
                title: "精选产品 3",
                description: "高品质的产品描述",
                image: "https://picsum.photos/500/500"
            }
        ],
        categoryData: [
            {
                name: "电子产品",
                image: "https://picsum.photos/400/300"
            },
            {
                name: "家居用品",
                image: "https://picsum.photos/400/300"
            },
            {
                name: "时尚服饰",
                image: "https://picsum.photos/400/300"
            }
        ],
        aboutData: {
            title: "关于我们",
            content: "成立于2018年，Blueheart是全球领先的电商平台，专注于为全球客户提供无缝愉快的购物体验。",
            image: "https://picsum.photos/800/600"
        },
        companyName: "Blueheart",
        statsData: {
            customers: "10万+",
            products: "5万+",
            countries: "50+"
        },
        commentData: [
            {
                customerName: "张先生",
                comment: "非常好的购物体验，产品质量一流！",
                rating: 5
            },
            {
                customerName: "李女士",
                comment: "服务周到，物流快速，会继续回购！",
                rating: 5
            }
        ],
        newsData: [
            {
                title: "公司新闻 1",
                summary: "公司最新动态和重要消息",
                date: "2026-01-01",
                image: "https://picsum.photos/600/400"
            },
            {
                title: "公司新闻 2",
                summary: "公司最新动态和重要消息",
                date: "2025-12-28",
                image: "https://picsum.photos/600/400"
            }
        ]
    };
}
import {cache} from "react";
import api from "@/utils/axiosApi";
import {getIp} from "@/utils/tools";

export const getSectionDataCached = cache(async () =>{
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
            throw new Error(`API错误: ${msg}`);
        }
    } catch (err) {
        console.error("获取数据失败:", err);
        // 抛出错误而不是返回null，让调用方可以处理
        throw err;
    }
});
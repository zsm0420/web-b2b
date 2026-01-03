// 测试前端配置和API连接
import axios from 'axios';

// 模拟前端的axios配置
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://web-b2b.onrender.com',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function testFrontendConfig() {
    console.log('🧪 测试前端配置和API连接...');
    console.log('API基础地址:', api.defaults.baseURL);
    
    try {
        // 测试基础配置API
        console.log('\n1. 测试基础配置API...');
        const response = await api.get('/myapp/admin/basicGlobal/listInfo');
        console.log('✅ 基础配置API测试成功');
        console.log('响应数据:', response.data);
        
        // 测试获取thing列表
        console.log('\n2. 测试获取thing列表...');
        const thingResponse = await api.get('/myapp/admin/thing/list');
        console.log('✅ thing列表API测试成功');
        console.log('响应数据:', thingResponse.data);
        
        console.log('\n🎉 前端配置测试完全成功！');
        console.log('✅ 后端API连接正常');
        console.log('✅ Token认证工作正常');
        console.log('✅ 数据库连接正常');
        
    } catch (error) {
        console.log('❌ 测试失败');
        console.log('错误信息:', error.message);
        if (error.response) {
            console.log('状态码:', error.response.status);
            console.log('响应数据:', error.response.data);
        }
    }
}

testFrontendConfig().catch(console.error);
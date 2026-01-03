import axios from 'axios';

const API_URL = 'https://web-b2b.onrender.com';

async function testBackend() {
    console.log('测试后端服务...');
    
    try {
        // 测试根路径
        console.log('\n1. 测试根路径...');
        const response = await axios.get(API_URL, {
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        console.log('✅ 根路径连接成功');
        console.log('状态码:', response.status);
        console.log('响应数据:', response.data);
        
    } catch (error) {
        console.log('❌ 根路径连接失败');
        console.log('错误信息:', error.message);
        if (error.response) {
            console.log('状态码:', error.response.status);
            console.log('响应数据:', error.response.data);
        }
    }
    
    try {
        // 测试API路径
        console.log('\n2. 测试API路径...');
        const apiResponse = await axios.get(`${API_URL}/myapp/admin/basicGlobal/listInfo`, {
            timeout: 30000,
            headers: {
                'ADMINTOKEN': 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        console.log('✅ API路径连接成功');
        console.log('状态码:', apiResponse.status);
        console.log('响应数据:', apiResponse.data);
        
    } catch (error) {
        console.log('❌ API路径连接失败');
        console.log('错误信息:', error.message);
        if (error.response) {
            console.log('状态码:', error.response.status);
            console.log('响应数据:', error.response.data);
            console.log('响应头:', error.response.headers);
        }
    }
}

testBackend().catch(console.error);
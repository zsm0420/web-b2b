// 这个脚本用于在后端创建管理员账户并设置Token
// 需要在Django后端运行

import axios from 'axios';

const API_URL = 'https://web-b2b.onrender.com';
const ADMIN_TOKEN = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

// 测试API连接
async function testApiConnection() {
    try {
        const response = await axios.get(`${API_URL}/`);
        console.log('API根目录连接成功');
        console.log('状态码:', response.status);
        console.log('响应数据:', response.data);
        return true;
    } catch (error) {
        console.error('API连接失败:', error.message);
        console.error('状态码:', error.response?.status);
        console.error('响应数据:', error.response?.data);
        console.error('响应头:', error.response?.headers);
        return false;
    }
}

// 创建管理员用户
async function createAdminUser() {
    try {
        // 尝试创建用户
        const response = await axios.post(
            `${API_URL}/myapp/admin/user/create`,
            {
                username: 'admin',
                password: 'admin123',
                admin_token: ADMIN_TOKEN,
                exp: '1893456000' // 2030年过期
            },
            {
                headers: {
                    'ADMINTOKEN': ADMIN_TOKEN // 使用相同的Token作为认证
                }
            }
        );
        
        console.log('创建管理员用户成功:', response.data);
        return true;
    } catch (error) {
        console.error('创建管理员用户失败:', error.message);
        
        // 如果创建失败，尝试使用登录API获取Token
        try {
            const loginResponse = await axios.post(
                `${API_URL}/myapp/admin/adminLogin`,
                {
                    username: 'admin',
                    password: 'admin123'
                }
            );
            
            console.log('管理员登录成功:', loginResponse.data);
            return true;
        } catch (loginError) {
            console.error('管理员登录失败:', loginError.message);
            return false;
        }
    }
}

// 测试Token认证
async function testTokenAuth() {
    try {
        const response = await axios.get(
            `${API_URL}/myapp/admin/basicGlobal/listInfo`,
            {
                headers: {
                    'ADMINTOKEN': ADMIN_TOKEN
                }
            }
        );
        
        console.log('Token认证成功:', response.data);
        return true;
    } catch (error) {
        console.error('Token认证失败:', error.message);
        console.error('状态码:', error.response?.status);
        console.error('响应数据:', error.response?.data);
        return false;
    }
}

// 主函数
async function main() {
    console.log('开始设置管理员Token...');
    
    // 1. 测试API连接
    const connectionOk = await testApiConnection();
    if (!connectionOk) {
        console.log('无法连接到API，终止执行');
        return;
    }
    
    // 2. 创建管理员用户
    const userCreated = await createAdminUser();
    if (!userCreated) {
        console.log('无法创建管理员用户，尝试继续使用现有Token');
    }
    
    // 3. 测试Token认证
    const authOk = await testTokenAuth();
    if (!authOk) {
        console.log('Token认证失败，请检查后端配置');
    } else {
        console.log('Token认证成功！前端可以正常使用API');
    }
}

main().catch(console.error);
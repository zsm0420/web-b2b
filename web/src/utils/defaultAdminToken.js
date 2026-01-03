// 默认管理员Token
export const DEFAULT_ADMIN_TOKEN = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";

// 在页面加载时自动设置Token
export function setDefaultAdminToken() {
    if (typeof window !== 'undefined') {
        // 检查是否已有Token
        const existingToken = localStorage.getItem('admintoken');
        
        // 如果没有Token，则设置默认Token
        if (!existingToken) {
            console.log('设置默认管理员Token');
            localStorage.setItem('admintoken', DEFAULT_ADMIN_TOKEN);
            return true;
        }
        
        return false;
    }
    
    return false;
}
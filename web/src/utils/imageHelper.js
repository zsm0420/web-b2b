/**
 * 安全的图片URL构建工具函数
 * @param {string|object|null|undefined} imageName - 图片名称或对象
 * @param {string} [defaultImage='https://picsum.photos/800/600'] - 默认图片URL
 * @returns {string} 完整的图片URL
 */
export function buildImageUrl(imageName, defaultImage = 'https://picsum.photos/800/600') {
    // 处理空值、undefined或null
    if (!imageName) {
        console.warn('图片名称为空，使用默认图片:', defaultImage);
        return defaultImage;
    }
    
    // 处理对象类型（防止显示 {}）
    if (typeof imageName === 'object') {
        console.error('图片名称是对象类型，转换为字符串:', imageName);
        const imageStr = JSON.stringify(imageName);
        // 如果对象为空或只包含空属性，使用默认图片
        if (imageStr === '{}' || imageStr === '[]') {
            return defaultImage;
        }
        // 尝试从对象中提取有效的字符串值
        const extractedName = extractStringFromObject(imageName);
        if (extractedName) {
            // 检查提取的URL是否是完整的URL
            if (extractedName.startsWith('http')) {
                return extractedName;
            }
            return `${process.env.NEXT_PUBLIC_BASE_URL || ''}/upload/img/${extractedName}`;
        }
        return defaultImage;
    }
    
    // 确保是字符串类型
    const imageStr = String(imageName).trim();
    
    // 如果是空字符串，使用默认图片
    if (!imageStr) {
        return defaultImage;
    }
    
    // 如果是完整的HTTP URL，直接返回
    if (imageStr.startsWith('http')) {
        return imageStr;
    }
    
    // 构建完整的URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    return `${baseUrl}/upload/img/${imageStr}`;
}

/**
 * 从对象中提取字符串值
 * @param {object} obj - 可能包含图片名称的对象
 * @returns {string|null} 提取的字符串值或null
 */
function extractStringFromObject(obj) {
    if (!obj || typeof obj !== 'object') return null;
    
    // 尝试常见的图片字段名
    const possibleKeys = ['image', 'img', 'cover', 'src', 'url', 'name', 'filename', 'path'];
    
    for (const key of possibleKeys) {
        if (obj[key] && typeof obj[key] === 'string' && obj[key].trim()) {
            return obj[key].trim();
        }
    }
    
    // 如果没有找到，返回null
    return null;
}

/**
 * 批量构建图片URL数组
 * @param {Array} imageList - 图片名称数组
 * @param {string} [defaultImage='https://picsum.photos/800/600'] - 默认图片URL
 * @returns {Array} 图片URL数组
 */
export function buildImageUrlArray(imageList, defaultImage = 'https://picsum.photos/800/600') {
    if (!Array.isArray(imageList)) {
        console.warn('图片列表不是数组，返回空数组');
        return [];
    }
    
    return imageList.map(imageName => buildImageUrl(imageName, defaultImage));
}

/**
 * 安全地处理轮播图数据
 * @param {string|Array} bannerData - 轮播图数据
 * @returns {Array} 安全的图片URL数组
 */
export function processBannerData(bannerData) {
    // 如果是字符串，尝试解析为数组
    if (typeof bannerData === 'string') {
        try {
            const parsed = JSON.parse(bannerData);
            if (Array.isArray(parsed)) {
                return buildImageUrlArray(parsed);
            }
        } catch (e) {
            // 如果解析失败，尝试按#分割
            const parts = bannerData.split('#').filter(item => item.trim());
            return buildImageUrlArray(parts);
        }
    }
    
    // 如果是数组，直接处理
    if (Array.isArray(bannerData)) {
        return buildImageUrlArray(bannerData);
    }
    
    // 如果是对象，尝试提取数组
    if (typeof bannerData === 'object' && bannerData !== null) {
        const extracted = extractStringFromObject(bannerData);
        if (extracted) {
            return [buildImageUrl(extracted)];
        }
    }
    
    // 返回空数组作为fallback
    console.warn('轮播图数据格式不支持，返回空数组:', bannerData);
    return [];
}
/**
 * 安全访问嵌套对象属性的工具函数
 * 防止访问 null 或 undefined 属性导致的错误
 */

/**
 * 安全访问嵌套对象属性
 * @param {Object} obj - 要访问的对象
 * @param {string} path - 属性路径，如 'basicSite.site_logo'
 * @param {*} defaultValue - 默认值
 * @returns {*} 属性值或默认值
 */
export function safeGet(obj, path, defaultValue = '') {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }

  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : defaultValue;
  }, obj);
}

/**
 * 安全映射数组
 * @param {Array} arr - 要映射的数组
 * @param {Function} fn - 映射函数
 * @param {Array} defaultArray - 默认数组
 * @returns {Array} 映射后的数组或默认数组
 */
export function safeMap(arr, fn, defaultArray = []) {
  if (!arr || !Array.isArray(arr)) {
    return defaultArray;
  }
  return arr.map(fn);
}

/**
 * 获取安全的 sectionData
 * @param {Object} sectionData - section 数据
 * @returns {Object} 安全的 sectionData
 */
export function getSafeSectionData(sectionData) {
  return {
    ...sectionData,
    basicSite: sectionData?.basicSite || {},
    basicGlobal: sectionData?.basicGlobal || {},
    navData: Array.isArray(sectionData?.navData) ? sectionData.navData : [],
    categoryData: Array.isArray(sectionData?.categoryData) ? sectionData.categoryData : [],
    contactData: sectionData?.contactData || {},
  };
}

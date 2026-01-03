# 后端API测试指南

## 前言

本文档提供了测试本项目中Django后端API的详细指南，包括测试环境搭建、常用测试工具、测试用例示例以及故障排除指南。

## 测试环境

### 部署状态

本项目的前端已成功部署到Vercel：
- 前端URL: https://web-fjzll71iq-mos-projects-e998b3b8.vercel.app
- API URL配置已更新为指向Django后端: https://django-backend.onrender.com

Django后端已配置为部署到Render平台：
- 数据库：PostgreSQL（已配置）
- 部署状态：待确认

### 环境变量

后端需要以下环境变量：

```
DATABASE_URL=postgresql://web_b2b_db_user:cIYdysJiQqeBeQpoZ7e064Wdexj1lc1E@dpg-d5cfv5m3jp1c73dtndhg-a/web_b2b_db
DJANGO_SETTINGS_MODULE=server.settings
ALLOWED_HOSTS=*
RENDER=true
```

如果使用S3存储静态文件和媒体文件，需要额外配置：

```
USE_S3=true
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_STORAGE_BUCKET_NAME=your_bucket_name
AWS_S3_REGION_NAME=your_region_name
```

## API端点概述

本项目包含以下主要API端点：

### 前台API

| 端点 | 方法 | 描述 | 需要认证 |
|------|------|------|----------|
| `/myapp/index/thing/section` | GET | 获取所有产品数据 | 否 |
| `/myapp/index/thing/detail` | GET | 获取产品详情 | 否 |
| `/myapp/index/common/section` | GET | 获取常用数据 | 否 |
| `/myapp/index/inquiry/create` | POST | 创建询价 | 否 |
| `/myapp/index/contact/section` | GET | 获取联系信息 | 否 |
| `/myapp/index/about/section` | GET | 获取关于信息 | 否 |
| `/myapp/index/home/section` | GET | 获取首页数据 | 否 |
| `/myapp/index/news/section` | GET | 获取新闻列表 | 否 |
| `/myapp/index/news/detail` | GET | 获取新闻详情 | 否 |

### 后台API

| 端点 | 方法 | 描述 | 需要认证 |
|------|------|------|----------|
| `/myapp/admin/adminLogin` | POST | 管理员登录 | 是 |
| `/myapp/admin/user/list` | GET | 获取用户列表 | 是 |
| `/myapp/admin/user/create` | POST | 创建用户 | 是 |
| `/myapp/admin/user/delete` | POST | 删除用户 | 是 |
| `/myapp/admin/user/updatePwd` | POST | 更新密码 | 是 |
| `/myapp/admin/cdn/uploadImg` | POST | 上传图片 | 是 |
| `/myapp/admin/cdn/uploadLogoImg` | POST | 上传Logo | 是 |
| `/myapp/admin/cdn/uploadIcoImg` | POST | 上传网站图标 | 是 |
| `/myapp/admin/cdn/uploadNormalFile` | POST | 上传普通文件 | 是 |

## 测试工具

可以使用以下工具测试API：

1. **Postman** - 流行的API测试工具
2. **Insomnia** - 轻量级REST客户端
3. **curl** - 命令行工具
4. **Thunder Client** - VS Code扩展

## 测试用例

以下是一些常见的测试用例示例：

### 1. 测试首页数据API

```bash
curl -X GET "https://django-backend.onrender.com/myapp/index/home/section" \
  -H "Content-Type: application/json" \
  -H "x-forwarded-for: 127.0.0.1"
```

期望响应：
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "bannerData": [...],
    "productData": [...],
    ...
  }
}
```

### 2. 测试产品详情API

```bash
curl -X GET "https://django-backend.onrender.com/myapp/index/thing/detail?id=1" \
  -H "Content-Type: application/json"
```

期望响应：
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": 1,
    "title": "产品标题",
    "description": "产品描述",
    ...
  }
}
```

### 3. 测试管理员登录API

```bash
curl -X POST "https://django-backend.onrender.com/myapp/admin/adminLogin" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=password123"
```

期望响应：
```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "username": "admin",
    "admin_token": "abc123...",
    ...
  }
}
```

### 4. 测试带认证的API

```bash
curl -X GET "https://django-backend.onrender.com/myapp/admin/user/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token abc123..."
```

期望响应：
```json
{
  "code": 0,
  "msg": "查询成功",
  "data": [...]
}
```

### 5. 测试文件上传API

```bash
curl -X POST "https://django-backend.onrender.com/myapp/admin/cdn/uploadImg" \
  -H "Authorization: Token abc123..." \
  -F "my-file=@/path/to/image.jpg"
```

期望响应：
```json
{
  "code": 0,
  "data": "1641234567.jpg"
}
```

## 前端集成测试

### 测试前端与后端API的集成

1. 访问前端网站：https://web-fjzll71iq-mos-projects-e998b3b8.vercel.app
2. 检查网络请求，验证API调用是否成功
3. 验证前端是否正确处理API响应
4. 测试前端是否正确处理API错误

可以使用浏览器开发者工具检查网络请求：
1. 打开浏览器开发者工具（F12）
2. 切换到"网络"标签
3. 刷新页面，观察API请求
4. 检查请求和响应的详细内容

## 故障排除

### 常见问题及解决方案

1. **API返回401未授权错误**
   - 确保请求包含正确的认证令牌
   - 验证令牌是否过期
   - 检查认证头格式是否正确

2. **API返回404未找到错误**
   - 确认API端点URL是否正确
   - 检查服务器是否正确部署
   - 验证Django路由配置

3. **API返回500内部服务器错误**
   - 检查服务器日志以获取详细错误信息
   - 验证数据库连接和查询
   - 检查代码中的异常处理

4. **前端无法显示数据**
   - 检查网络请求是否成功
   - 验证前端是否正确处理API响应
   - 确保API URL配置正确

5. **文件上传失败**
   - 检查文件大小是否超过限制
   - 验证文件格式是否正确
   - 确保服务器有足够的磁盘空间

### 日志分析

分析服务器日志是排查问题的关键：

1. **Render日志**
   - 登录Render控制台
   - 选择您的Web服务
   - 查看"日志"标签页

2. **Django日志**
   - Django应用会记录错误到`info.log`文件
   - 可以在Render控制台中查看日志

### 性能测试

可以使用以下工具进行API性能测试：

1. **Apache Bench (ab)** - 简单的HTTP服务器基准测试工具
2. **wrk** - 现代化的HTTP基准测试工具
3. **k6** - 现代化的负载测试工具

## 后续步骤

1. **完成API测试**：
   - 使用提供的测试用例验证所有API端点
   - 测试前端与后端的集成

2. **优化API性能**：
   - 实施缓存策略
   - 优化数据库查询
   - 添加API限流

3. **增强API安全性**：
   - 实施更严格的认证机制
   - 添加输入验证和清理
   - 实施CORS策略

4. **API文档**：
   - 考虑使用Swagger或类似工具生成API文档
   - 创建更详细的API使用指南

## 参考资源

1. [Django REST framework文档](https://www.django-rest-framework.org/)
2. [Render部署文档](https://render.com/docs)
3. [Postman测试API指南](https://learning.postman.com/docs/writing-scripts/test-scripts/)
4. [cURL命令行工具文档](https://curl.se/docs/manpage.html)
5. [k6负载测试工具文档](https://k6.io/docs/)
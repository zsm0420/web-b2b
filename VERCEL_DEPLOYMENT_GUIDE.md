# Vercel 部署环境变量配置指南

## 问题诊断结果

经过检查，发现你的项目有以下关键问题导致Vercel部署后页面无法正常显示：

### 1. API配置不一致
- 前端有两个不同的API配置文件，导致请求失败
- 已统一修复为使用 `NEXT_PUBLIC_API_URL`

### 2. CORS配置问题
- 后端CORS配置只允许有限域名访问
- 已修复为允许所有域名访问

### 3. 缺少Vercel配置文件
- 已创建 `vercel.json` 配置文件

## Vercel 环境变量设置

在部署到Vercel之前，你需要在Vercel项目设置中配置以下环境变量：

### 必需的环境变量

1. **NEXT_PUBLIC_API_URL**
   - 你的后端API服务地址
   - 例如：`https://your-backend-domain.com` 或 `https://your-backend.railway.app`
   - 在Vercel中设置环境变量名：`NEXT_PUBLIC_API_URL`

2. **NEXT_PUBLIC_BASE_URL**
   - 你的前端网站域名
   - 例如：`https://your-site.vercel.app` 或 `https://your-domain.com`
   - 在Vercel中设置环境变量名：`NEXT_PUBLIC_BASE_URL`

3. **NEXT_PUBLIC_TEMPLATE_ID**
   - 网站模板ID
   - 例如：`001`, `002`, `003`, `004`
   - 在Vercel中设置环境变量名：`NEXT_PUBLIC_TEMPLATE_ID`

### 设置步骤

1. 登录 [Vercel](https://vercel.com)
2. 选择你的项目
3. 进入 **Settings** 选项卡
4. 点击左侧菜单的 **Environment Variables**
5. 点击 **Add New** 按钮添加以下变量：

```
Name: NEXT_PUBLIC_API_URL
Value: 你的后端API地址

Name: NEXT_PUBLIC_BASE_URL  
Value: 你的前端域名

Name: NEXT_PUBLIC_TEMPLATE_ID
Value: 001
```

6. 确保勾选 **Production**, **Preview**, **Development** 环境
7. 点击 **Save** 保存

## 部署检查清单

- [ ] 后端Django服务已部署并可访问
- [ ] 前端Vercel环境变量已正确配置
- [ ] 域名解析已正确设置（如果有自定义域名）
- [ ] CORS配置已允许前端域名访问

## 测试部署

1. 部署完成后，访问你的Vercel网站
2. 打开浏览器开发者工具检查网络请求
3. 确认API请求能正常返回数据
4. 检查控制台是否有错误信息

## 常见问题

### 1. 页面空白或加载失败
- 检查 `NEXT_PUBLIC_API_URL` 是否正确
- 确认后端服务是否正常运行

### 2. API请求失败
- 验证CORS配置是否正确
- 检查后端服务URL是否可访问

### 3. 静态资源加载失败
- 检查 `NEXT_PUBLIC_BASE_URL` 是否正确
- 确认域名设置无误

## 部署完成后的验证

部署成功后，你应该能够：
- 正常访问网站首页
- 看到公司信息和产品展示
- 后台管理页面能正常显示和操作
- 所有API接口能正常响应

如果问题仍然存在，请检查Vercel部署日志中的错误信息。
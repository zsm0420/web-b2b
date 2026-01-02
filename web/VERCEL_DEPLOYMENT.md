# Vercel部署指南

## 前置准备

1. 确保已安装Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. 登录Vercel
   ```bash
   vercel login
   ```

## 环境变量配置

在Vercel项目设置中配置以下环境变量：

- `NEXT_PUBLIC_TEMPLATE_ID`: 模板ID（001-004）
- `NEXT_PUBLIC_API_URL`: API服务器地址（生产环境）

## 部署步骤

### 方法一：使用Vercel CLI（推荐）

```bash
# 在项目根目录执行
cd web
vercel

# 按提示操作：
# - Set up and deploy? 选择 Y
# - Which scope? 选择你的账户
# - Link to existing project? 选择 N
# - Project name: 输入项目名称（如：website）
# - Directory: 使用默认路径
# - Override settings? 选择 N
```

### 方法二：连接Git仓库

1. 将代码推送到GitHub/GitLab
2. 在Vercel控制台导入仓库
3. 配置构建设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## 部署后配置

1. **域名绑定**：在Vercel控制台添加自定义域名
2. **环境变量**：在项目设置中添加生产环境变量
3. **函数超时**：如需要，调整API函数超时时间

## 监控和调试

1. 查看部署日志
2. 监控函数性能
3. 检查环境变量是否正确设置

## 故障排除

- **构建失败**：检查package.json和next.config.mjs配置
- **内存不足**：增加Node.js内存限制
- **API调用失败**：检查NEXT_PUBLIC_API_URL环境变量
- **404错误**：检查路由配置和重定向规则

## 下一步计划

部署成功后，可以：
1. 测试所有页面功能
2. 配置自定义域名
3. 添加后端API支持
4. 设置监控和报警
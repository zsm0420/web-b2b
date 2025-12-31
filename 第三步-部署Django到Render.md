# 第三步：部署 Django 后端到 Render

## 📋 准备工作

在开始之前，确保你已经：
- ✅ 代码已上传到 GitHub
- ✅ 已注册 Render 账号

---

## 3.1 注册并登录 Render

### 步骤：

1. 访问 [Render.com](https://render.com)

2. 点击右上角的 **Sign up** 按钮

3. 选择 **Sign up with GitHub**（最简单）

4. 授权 Render 访问你的 GitHub 账号

5. 等待注册完成，自动登录

---

## 3.2 创建 Django Web Service

### 步骤：

1. 在 Render 控制台，点击右上角的 **New +** 按钮

2. 选择 **Web Service**

3. 选择你的 GitHub 仓库：
   - 在 "Connect a repository" 下
   - 搜索并选择 `web-b2b` 仓库
   - 点击 **Connect**

4. 配置 Web Service：

| 配置项 | 填写内容 |
|--------|---------|
| **Name** | `django-backend`（也可以自定义） |
| **Region** | `Oregon (US West)` 或选择离你最近的 |
| **Branch** | `master` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r server/requirements.txt` |
| **Start Command** | `gunicorn server.wsgi:application --bind 0.0.0.0:$PORT` |

**重要提示：**
- Build Command 中的 `server/requirements.txt` 路径要根据你的实际结构调整
- 如果 `requirements.txt` 在根目录，就用 `pip install -r requirements.txt`

5. **高级配置（重要！）：**

点击 **Advanced** 展开更多选项

**添加环境变量（Environment Variables）：**

| Key | Value | 说明 |
|-----|-------|------|
| `PYTHON_VERSION` | `3.8` | Python 版本 |
| `DJANGO_SETTINGS_MODULE` | `server.settings` | Django 配置文件 |
| `RENDER` | `true` | 标识为 Render 环境 |

**暂时不添加 DATABASE_URL，等数据库准备好了再加！**

---

## 3.3 开始部署

1. 检查所有配置是否正确

2. 点击底部的 **Create Web Service** 按钮

3. 等待部署开始（首次需要几分钟）

---

## 3.4 查看部署状态

### 查看部署日志：

1. 在 Web Service 页面，点击 **Logs** 标签

2. 你会看到实时的部署日志：

   **成功日志示例：**
   ```
   Build completed in 45.2s
   Starting gunicorn...
   Listening on port 10000
   ```

   **如果看到错误，请截图或复制错误信息！**

3. 部署成功后，页面顶部会显示状态为 **Live** ✅

---

## 3.5 获取后端 URL

### 部署成功后：

1. 在 Web Service 页面顶部，找到 **URL**

2. 复制这个 URL，格式类似：
   ```
   https://django-backend-xxxxx.onrender.com
   ```

3. **保存到记事本！下一步部署前端时需要用到！**

---

## 3.6 测试后端是否工作

### 访问测试：

在浏览器中访问：
```
https://django-backend-xxxxx.onrender.com/
```

### 期望结果：

**如果部署成功：**
- 可能会看到 Django 默认页面或 404（这是正常的）
- 或者看到 API 错误（因为数据库还没配置，也正常）

**如果看到这个页面，说明后端部署成功！**

---

## 3.7 测试管理后台

### 访问管理页面：

```
https://django-backend-xxxxx.onrender.com/admin/
```

### 可能的情况：

**情况 1：看到登录页面** ✅
- 说明 Django 运行正常
- 但暂时无法登录（数据库未配置）

**情况 2：看到错误页面** ⚠️
- 可能是数据库连接问题
- 正常，因为还没配置数据库

**情况 3：部署失败** ❌
- 查看日志，找出错误原因

---

## ❓ 常见问题

### Q: Build 失败怎么办？

**检查：**
1. `requirements.txt` 路径是否正确
2. 查看日志中的具体错误信息
3. 可能是某个依赖包安装失败

**常见错误：**
```
ERROR: Could not find a version that satisfies the requirement xxx
```
→ 删除 `requirements.txt` 中不存在的包

---

### Q: Start Command 执行失败？

**检查：**
1. 确保 `gunicorn` 在 `requirements.txt` 中
2. 检查命令是否正确：`gunicorn server.wsgi:application`
3. 注意 `server` 是你的 Django 项目目录名

---

### Q: 部署成功但无法访问？

**可能原因：**
1. 防火墙阻止
2. 域名还在生效中
3. 服务还在启动中（等待 1-2 分钟）

---

### Q: 看到 "Application error" 页面？

**说明：**
- 服务启动失败
- 查看日志找原因
- 可能是配置问题或代码错误

---

### Q: 可以先不配置数据库吗？

**回答：**
- ✅ 可以！
- 部署会成功，但无法访问数据库相关功能
- 先把前端部署完，最后再回来配置数据库

---

## ✅ 完成标记

完成以下任务：

- [ ] 注册并登录 Render
- [ ] 创建 Web Service
- [ ] 添加环境变量
- [ ] 部署成功（状态为 Live）
- [ ] 获取后端 URL
- [ ] 测试后端可以访问

---

## 📝 记录你的信息

部署成功后，记录以下信息给下一步使用：

```
后端 URL: https://django-backend-xxxxx.onrender.com
```

---

## 🎯 完成后告诉我

当你完成后，告诉我：
- "后端部署成功" + 你的后端 URL

或者
- "有问题" + 错误信息

我会帮你准备**第四步：部署 Next.js 前端到 Cloudflare Pages**！

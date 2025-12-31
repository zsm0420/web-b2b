# 第三步：部署 Django 后端到 Claw Cloud Run

## 📋 准备工作

在开始之前，确保你已经：
- ✅ 代码已上传到 GitHub
- ✅ GitHub 账号注册时间超过 180 天
- ✅ 已准备好 Dockerfile 等配置文件（已自动生成）

---

## 3.1 注册并登录 Claw Cloud Run

### 步骤：

1. 访问 [Claw Cloud Run](https://run.claw.cloud/)
   或直接访问控制台：https://console.run.claw.cloud/signin

2. 点击 **Sign in with GitHub**

3. 授权 Claw Cloud 访问你的 GitHub 账号

4. 首次登录会要求：
   - **选择区域**：推荐选择 `Singapore (新加坡)`
     - 为什么选新加坡？
       - 亚洲访问速度快
       - 自定义域名证书支持好
       - 日本区域证书有问题，不推荐
   - **设置账户名称**：随意填写

5. 等待账户激活，你会看到 **每月 $5 免费额度**

6. 查看右上角，确认显示 **$5.00** 可用额度

---

## 3.2 创建容器应用

### 步骤：

1. 登录后，点击左侧菜单的 **App Launchpad**

2. 点击 **Create App** 按钮

3. 填写应用信息：

| 配置项 | 填写内容 | 说明 |
|--------|---------|------|
| **Application Name** | `django-backend` | 应用名称，可自定义 |
| **Image** | `Dockerfile` | 选择自定义镜像 |
| **Repository** | `你的GitHub用户名/web-b2b` | 选择你的 GitHub 仓库 |
| **Branch** | `master` | 使用主分支 |
| **Dockerfile Path** | `server/Dockerfile` | Dockerfile 路径 |
| **Working Directory** | `/app` | 容器工作目录 |

4. **配置资源（重要！）**：

| 配置项 | 填写内容 | 说明 |
|--------|---------|------|
| **CPU** | `0.1` | 0.1 核 CPU（够用） |
| **Memory** | `256 MB` | 内存（够用） |
| **Container Port** | `8000` | Django 默认端口 |

**资源费用估算：**
- CPU 0.1 核 + Memory 256 MB
- 每天约 $0.02 - $0.03
- 30 天约 $0.6 - $0.9
- ✅ 完全在 $5 免费额度内！

5. **配置启动命令（重要！）**：

找到 **Command** 和 **Arguments** 部分：

| 配置项 | 填写内容 | 说明 |
|--------|---------|------|
| **Command** | `/bin/bash` | 使用 bash 执行命令 |
| **Arguments** | `-c "gunicorn server.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 120"` | 启动 gunicorn 服务器 |

**详细解释：**
- `/bin/bash`：使用 bash shell
- `-c`：执行后面的命令
- `gunicorn server.wsgi:application`：启动 Django 应用
- `--bind 0.0.0.0:8000`：监听所有 IP 的 8000 端口
- `--workers 2`：2个工作进程（根据内存调整）
- `--timeout 120`：请求超时时间 120 秒

**如果界面格式不同，也可以这样设置：**

| 配置项 | 填写内容 | 说明 |
|--------|---------|------|
| **Command** | `gunicorn` | 直接运行 gunicorn |
| **Arguments** | `server.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 120` | gunicorn 的参数 |

6. **配置网络（重要！）**：

- 勾选 **Enable Internet Access**（启用外部访问）

6. **配置存储（重要！）**：

- 找到 **Local Storage** 部分
- 点击 **Add**
- 填写以下内容：

| 配置项 | 填写内容 |
|--------|---------|
| **Mount Path** | `/app/server/upload` |
| **Storage Size** | `100 MB` 或 `500 MB` |

**为什么要挂载存储？**
- Django 上传的文件需要持久化存储
- 如果不挂载，容器重启后文件会丢失

8. **环境变量（重要！）**：

找到 **Environment Variables** 部分，添加以下变量：

| Key | Value | 说明 |
|-----|-------|------|
| `DJANGO_SETTINGS_MODULE` | `server.settings` | Django 配置文件 |
| `PYTHONUNBUFFERED` | `1` | Python 输出不缓冲 |
| `RENDER` | `false` | 标识非 Render 环境 |

**注意：暂时不添加 `DATABASE_URL`，等数据库配置好了再加！**

9. 检查所有配置，点击 **Deploy Application**

---

## 3.3 等待部署完成

### 部署过程：

1. 点击 **Deploy Application** 后，会自动：
   - 从 GitHub 拉取代码
   - 构建 Docker 镜像
   - 启动容器

2. 部署时间：**3-8 分钟**（首次较慢）

3. 查看部署状态：
   - 在应用页面查看状态
   - 状态显示为 **Running** ✅ 表示成功
   - 状态显示为 **Failed** ❌ 表示失败

---

## 3.4 查看部署日志

### 如果部署失败，查看日志：

1. 在应用页面，点击 **Logs** 或 **Console** 标签

2. 查看实时日志输出

**成功日志示例：**
```
Building Docker image...
Step 1/10 : FROM python:3.8-slim
...
Successfully built xxxxx
Successfully tagged xxxxx
Starting container...
Listening on port 8000
```

**错误日志示例：**
```
ERROR: Could not find a version...
```
→ 需要检查 requirements.txt

---

## 3.5 获取后端 URL

### 部署成功后：

1. 在应用页面，找到 **Domain** 或 **Access URL** 部分

2. 你会看到两个地址：
   - **内网地址**：类似 `django-backend.internal.xxx`
   - **公网地址**：类似 `django-backend-xxx.run.claw.cloud`

3. **复制公网地址！** 格式类似：
   ```
   https://django-backend-xxxx.run.claw.cloud
   ```

4. **保存到记事本！下一步部署前端时需要用到！**

---

## 3.6 测试后端是否工作

### 测试 1：访问首页

在浏览器中访问：
```
https://django-backend-xxxx.run.claw.cloud/
```

**期望结果：**
- 可能看到 Django 默认页面或 404（正常）
- 或者看到 API 错误（因为数据库没配置，也正常）

**只要能看到响应，说明后端部署成功！**

### 测试 2：访问管理后台

访问：
```
https://django-backend-xxxx.run.claw.cloud/admin/
```

**可能的情况：**

**情况 1：看到登录页面** ✅
- 说明 Django 运行正常！
- 暂时无法登录（数据库未配置）

**情况 2：看到错误页面** ⚠️
- 数据库连接问题
- 正常，等配置好数据库即可

**情况 3：无法访问** ❌
- 检查容器是否运行
- 查看日志找原因

---

## 3.7 查看费用情况

### 查看每日消费：

1. 在应用页面右上角，查看 **Total** 或 **Cost**

2. 确认每日消费在 $0.02 - $0.03 之间

3. 计算月消费：$0.02 × 31 = $0.62
   - ✅ 远低于 $5 免费额度！

---

## 3.8 配置自定义域名（可选）

### 如果你有自己的域名：

1. 在应用页面，点击 **Manage Network** 或 **Custom Domain**

2. 点击 **Add Custom Domain**

3. 输入你的域名，例如：
   ```
   api.yourdomain.com
   ```

4. 按照提示配置 DNS 解析：
   - 记录类型：`CNAME`
   - 记录值：你的 Claw Cloud 域名

5. 等待 SSL 证书自动签发（1-10 分钟）

---

## ❓ 常见问题

### Q: "Image not found" 或 "Dockerfile not found"

**解决方法：**
1. 检查 Dockerfile 路径是否正确
2. 确认文件在 `server/Dockerfile`
3. 确保 Dockerfile 已上传到 GitHub

---

### Q: "Module not found" 错误

**解决方法：**
1. 检查 `requirements.txt` 路径
2. 查看 Dockerfile 中的 COPY 路径
3. 确保所有依赖都在 requirements.txt 中

---

### Q: 容器启动后立即失败

**解决方法：**
1. 查看日志中的具体错误
2. 检查启动命令：`gunicorn server.wsgi:application`
3. 确认 `server` 是你的项目目录名

---

### Q: 上传的文件丢失

**解决方法：**
1. 确认已配置 Local Storage
2. 检查挂载路径：`/app/server/upload`
3. 检查存储大小是否足够

---

### Q: 超出 $5 额度怎么办？

**解决方法：**
1. 降低资源：CPU 改为 0.05，内存改为 128 MB
2. 减少存储大小
3. 或升级到付费套餐（$5/月）

---

### Q: 容器访问速度慢？

**可能原因：**
1. 选择离用户最近的区域
2. 确认没有网络问题
3. 检查 CPU 是否充足

---

## ✅ 完成标记

完成以下任务：

- [ ] 注册并登录 Claw Cloud Run
- [ ] 创建应用并配置
- [ ] 配置资源、网络、存储
- [ ] 添加环境变量
- [ ] 部署成功（状态为 Running）
- [ ] 获取后端公网地址
- [ ] 测试后端可以访问
- [ ] 确认每日消费在额度内

---

## 📝 记录你的信息

部署成功后，记录以下信息：

```
后端 URL: https://django-backend-xxxx.run.claw.cloud
公网域名: django-backend-xxx.run.claw.cloud
每日消费: $0.0x
```

---

## 🎯 完成后告诉我

当你完成后，告诉我：
- "后端部署成功" + 你的后端 URL

或者
- "有问题" + 错误信息或截图

我会帮你准备**第四步：部署 Next.js 前端到 Cloudflare Pages**！

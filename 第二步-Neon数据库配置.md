# 第二步：Neon 数据库配置指南

## 2.1 在 Neon 创建数据库

### 步骤：

1. 登录 [Neon.tech](https://neon.tech)

2. 点击右上角的 **New project** 按钮

3. 填写项目信息：
   - **Project name**: `web-b2b`（或自定义）
   - **Database name**: `neondb`（默认即可，也可以改成 `web_b2b`）

4. 选择区域（推荐选择离你最近的）：
   - 亚洲用户：`ap-southeast-1 (Singapore)` 或 `ap-northeast-1 (Tokyo)`
   - 欧洲用户：`eu-central-1 (Frankfurt)`
   - 美国用户：`us-east-2 (Northern Virginia)`

5. 点击 **Create project** 按钮

6. 等待几秒钟，项目创建完成！

---

## 2.2 获取数据库连接字符串

### 步骤：

1. 在 Neon 控制台，你会看到项目概览页面

2. 找到 **Connection Details** 部分

3. 复制 **Connection string**，格式类似：
   ```
   postgresql://web_b2b_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

4. **把这个字符串保存到记事本！后面会用到！**

---

## 2.3 导入数据到 Neon（重要！）

你的数据库是 MySQL 格式，需要转换到 PostgreSQL。

### 方法 A：使用 pgloader 工具（推荐，最简单）

如果你有技术基础，可以使用 pgloader 自动转换：

```bash
# 在你的电脑上安装 pgloader
# Windows: 下载 https://pgloader.org/downloads.html

# 运行转换命令（替换成你的实际信息）
pgloader \
  mysql://root:4643830@127.0.0.1:3306/web_b2b \
  "postgresql://web_b2b_owner:你的密码@你的Neon主机/neondb?sslmode=require"
```

### 方法 B：手动转换 SQL（适合小白）

#### 步骤 1：修改 SQL 文件

1. 用文本编辑器打开 `web_b2b.sql`

2. 批量替换以下内容（按顺序）：

   | 替换 | 改为 |
   |------|------|
   | `int(11)` | `integer` |
   | `bigint(20)` | `bigint` |
   | `datetime(6)` | `timestamp` |
   | `longtext` | `text` |
   | `ENGINE = InnoDB` | 删除整行 |
   | `AUTO_INCREMENT =` | 删除 |
   | `ROW_FORMAT = DYNAMIC` | 删除 |
   | `CHARACTER SET = utf8mb4` | 删除 |
   | `COLLATE = utf8mb4_general_ci` | 删除 |

3. 保存修改后的文件

#### 步骤 2：在 Neon 导入 SQL

1. 回到 Neon 控制台

2. 点击左侧菜单的 **SQL Editor**

3. 把修改后的 SQL 文件内容全部复制粘贴到编辑器

4. 点击 **Run** 按钮执行

5. 等待执行完成（可能需要几十秒）

6. 执行成功后，你会看到 "Success" 提示

---

## 2.4 验证数据库

### 检查数据是否导入成功：

1. 在 SQL Editor 中输入：
   ```sql
   SELECT COUNT(*) FROM django_migrations;
   ```

2. 点击 Run，如果有结果返回，说明数据导入成功！

3. 或者查看左侧的 **Tables** 列表，应该能看到多个表

---

## 2.5 完成后的准备工作

完成后，你需要准备以下信息给下一步使用：

1. ✅ **Neon Connection String**（连接字符串）
   - 格式：`postgresql://web_b2b_owner:xxx@xxx.neon.tech/neondb?sslmode=require`

2. ✅ 确认数据库中有数据

---

## ❓ 常见问题

### Q: SQL 导入失败怎么办？
A: 检查是否正确替换了 MySQL 特有的语法（ENGINE、AUTO_INCREMENT 等）

### Q: 转换工具（pgloader）不会用？
A: 使用方法 B 手动转换，教程里有详细步骤

### Q: 转换后数据有问题？
A: 可以直接在 Neon 的 SQL Editor 中手动修复

### Q: 可以跳过数据导入吗？
A: 不建议，但也可以先部署空数据库，后续再导入数据

---

## ✅ 完成标记

完成以下任务后，就可以进行第三步了：

- [ ] 创建了 Neon 项目
- [ ] 获取了连接字符串
- [ ] 成功导入了数据库
- [ ] 验证数据存在

**准备好了吗？告诉我："完成"，我们继续第三步！**

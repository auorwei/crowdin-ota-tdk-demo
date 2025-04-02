# Crowdin OTA TDK Demo

这是一个使用 Next.js 和 Crowdin OTA 实现的实时 TDK (Title, Description, Keywords) 管理系统演示。

## 功能特点

- 基于 Next.js 13+ 和 App Router
- 使用 Crowdin OTA 实现实时内容更新
- 支持多语言
- 服务器端渲染 (SSR)
- 响应式设计

## 开始使用

### 环境要求

- Node.js 16.8 或更高版本
- npm 或 yarn

### 安装

1. 克隆仓库
```bash
git clone https://github.com/yourusername/crowdin-ota-tdk-demo.git
cd crowdin-ota-tdk-demo
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
创建 `.env.local` 文件并添加以下内容：
```env
NEXT_PUBLIC_CROWDIN_DISTRIBUTION_HASH=your_distribution_hash
NEXT_PUBLIC_CROWDIN_PROJECT_ID=your_project_id
```

4. 运行开发服务器
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署

## 项目结构

```
├── app/
│   ├── components/     # React 组件
│   ├── services/      # 服务层
│   ├── contexts/      # React Context
│   ├── server/        # 服务器端代码
│   └── page.tsx       # 主页
├── public/            # 静态资源
└── package.json       # 项目配置
```

## 技术栈

- Next.js 13+
- TypeScript
- Tailwind CSS
- Crowdin OTA Client
- React Context API

## 许可证

MIT

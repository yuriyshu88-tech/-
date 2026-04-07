# 时律 (ShiLv)

> 把想做的，做到。

时律是一款帮助用户持续推进长期目标的执行恢复工具。核心不在"计划记录"，而在"中断后可重启、任务可调节、持续可推进"。

## 产品理念

很多人有长期目标，但执行容易中断；中断后容易自责并放弃。时律的核心是**通过拆解与路径重构，让用户更容易达成目标**——将模糊意图拆解为可执行的阶段任务，在中断后自动重构执行路径，降低每一步的决策成本。

核心闭环：**建档 → 每日三任务 → 次日确认 → AI 动态调节 → 持续执行**

## 功能概览

- **AI 智能建档** — 通过 5 道动态澄清问题，将模糊目标拆解为可执行的阶段计划
- **每日三任务** — 每天只需聚焦 3 件事，降低决策成本
- **次日确认** — 温和回顾昨日进度，无负担地重启执行
- **日历视图** — 可视化阶段进度，点击任意日期查看详情
- **自适应重排** — 基于完成/忽略反馈，动态调整后续计划

## 技术栈

| 层面 | 技术选型 |
|------|---------|
| 跨端框架 | React Native + Expo + TypeScript |
| 状态管理 | Zustand |
| AI 服务 | 硅基流动 (Qwen3.5-122B) |
| 目标平台 | iOS / Android |

## 项目结构

```
shilv-app/
├── App.tsx                     # 应用入口与路由分发
├── index.ts                    # Expo 注册入口
├── src/
│   ├── screens/                # 页面组件
│   │   ├── SplashScreen.tsx    # 启动页
│   │   ├── NewGoalScreen.tsx   # 新建目标页
│   │   ├── ClarifyScreen.tsx   # AI 五问澄清页
│   │   ├── PlanResultScreen.tsx# 规划结果页
│   │   ├── TaskScreen.tsx      # 任务页（核心）
│   │   ├── YesterdayScreen.tsx # 次日确认页
│   │   ├── CalendarScreen.tsx  # 日历页
│   │   ├── ProfileScreen.tsx   # 我的页
│   │   └── FeedbackScreen.tsx  # 帮助与反馈页
│   ├── components/             # 通用组件
│   │   ├── AppFrame.tsx        # 应用框架
│   │   ├── BottomTabBar.tsx    # 底部导航栏
│   │   ├── TaskCard.tsx        # 任务卡片
│   │   ├── ProgressBar.tsx     # 进度条
│   │   ├── IgnoreReasonModal.tsx # 忽略原因弹窗
│   │   └── RegenReasonModal.tsx  # 重生成原因弹窗
│   ├── store/
│   │   └── appStore.ts         # Zustand 全局状态
│   ├── mock/
│   │   └── data.ts             # Mock 数据
│   └── theme/
│       └── colors.ts           # 主题色
├── assets/                     # 静态资源
├── 文档/                        # 产品文档
│   ├── 时律PRD1.1.md           # 产品需求文档
│   └── 前端开发1.1.md           # 前端开发说明
└── 第一版原型 stitch/            # 原型设计稿
```

## 快速开始

### 环境要求

- Node.js >= 18
- Expo CLI
- iOS: Xcode (macOS)
- Android: Android Studio

### 安装与运行

```bash
# 进入项目目录
cd shilv-app

# 安装依赖
npm install

# 启动开发服务
npm start

# 运行 iOS
npm run ios

# 运行 Android
npm run android
```

### 构建

```bash
# Android APK (预览版)
npm run build:apk

# Android Release
npm run android:release
```

## 页面流转

```
启动页
 ├── 无目标 → 新建入口页 → AI 五问 → 规划结果 → 任务页
 ├── 有目标 + 需确认 → 次日确认页 → 任务页
 └── 有目标 + 无需确认 → 任务页

底部导航：任务 | 日历 | 我的
```

## 开发阶段

当前处于 **MVP 内测阶段**，仅通过 TestFlight 和 Android Internal Testing 分发。

## 许可证

[Apache License 2.0](LICENSE)

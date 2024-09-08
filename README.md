## 部落格Project介绍 :

<p align=center>
   以前端Vue + 後端Springboot 開發的前後端分離部落格
</p>

<p align="center">
   <a target="_blank" href="https://github.com/X1192176811/blog">
      <img src="https://img.shields.io/badge/JDK-17-red"/>
      <img src="https://img.shields.io/badge/springboot-3.2.6-red"/>
      <img src="https://img.shields.io/badge/vue-2.5.2-red"/>
      <img src="https://img.shields.io/badge/mysql-8.4.0-red"/>
      <img src="https://img.shields.io/badge/redis-5.0.14.1-red"/>
      <img src="https://img.shields.io/badge/easyexcel-3.3.3-red"/>
      <img src="https://img.shields.io/badge/springdoc--openapi--starter--webmvc--ui-2.0.3-red"/>
      <img src="https://img.shields.io/badge/minio-8.5.10-red">
   </a>
</p>

## 目錄結構 :

```
AkiBlogProject
├── aki-blog-frontend          -- 前端服務
│   ├── aki-blog-vue           -- 前台 (部落格文章頁面顯示)
│   └── aki-vue-admin          -- 後台 (後台管理系統CMS)
├── aki-blog-parent            -- 後端服務
│   ├── aki-blog               -- 前台後端服務
│   │   ├── config             -- 組件配置
│   │   ├── controller         -- 控制器
│   │   ├── filter             -- 認證Token過濾器
│   │   ├── job                -- 定時任務 (刷新文章viewCount)
│   │   └── runner             -- 應用啟動預載入 (載入文章viewCount)
│   ├── aki-admin              -- 後台後端服務
│   │   ├── config             -- 組件配置
│   │   ├── controller         -- 控制器
│   │   └── filter             -- 認證Token過濾器
│   └── aki-framework-common   -- 前後台通用組件
│       ├── annotation         -- 自定義註解 (打印指定事務資訊)
│       ├── aspect             -- 切面AOP模組
│       ├── config             -- 組件配置
│       ├── connectionTest     -- 連接測試 (Redis)
│       ├── constant           -- 常量定義
│       ├── converter          -- 轉換器
│       ├── customEnum         -- 自定義響應資訊枚舉
│       ├── domain             -- 對象域
│       │   ├── dto            -- 資料傳輸對象類
│       │   ├── entity         -- 實體對象類
│       │   ├── vo             -- 視圖對象類
│       │   ├── LoginUser      -- 用戶詳情對象類
│       │   └── ResponseResult -- 自定義響應對象類
│       ├── exception          -- 例外處理
│       ├── generator          -- 生成器
│       ├── handler            -- 處理器 (訪問拒絕處理器 + 身分驗證處理器)
│       ├── interceptor        -- 請求攔截器
│       ├── repository         -- 資料庫映射模組
│       ├── service            -- 服務模組
│       └── util               -- 工具類
└── deploy                     -- 部署資料 (volume指定之本地目錄)
    ├── minio                  -- 對象儲存服務Minio Data
    ├── mysql                  -- 資料庫與配置
    ├── nginx                  -- 反向代理配置與LOG
    └── redis                  -- Redis配置與儲存資料
```

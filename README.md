## 部落格Project介绍 :

<p align=center>
   以前端Vue + 後端Springboot 開發的前後端分離個人部落格專案
</p>

<p align="center">
   <a target="_blank" href="https://github.com/X1192176811/blog">
      <img src="https://img.shields.io/badge/JDK-17-red"/>
      <img src="https://img.shields.io/badge/springboot-3.2.6-red"/>
      <img src="https://img.shields.io/badge/vue-2.5.2-red"/>
      <img src="https://img.shields.io/badge/mysql-8.0.19-red"/>
      <img src="https://img.shields.io/badge/redis-6.0.8-red"/>
      <img src="https://img.shields.io/badge/easyexcel-3.3.3-red"/>
      <img src="https://img.shields.io/badge/springdoc--openapi--starter--webmvc--ui-2.0.3-red"/>
      <img src="https://img.shields.io/badge/minio-8.5.10-red">
   </a>
</p>

## 專案特點 :

### 整體 : 
- 前後端分離, 透過 Docker Compose 部署
- 採用 RESTful 風格設計 API, Swagger 註解清楚
- 自定義回傳主體 : ResponseResult 類 ( HttpCode + HttpCodeDescription + Data )
- 確實封裝 DTO、VO
- 引入 Validation 參數驗證框架
- 使用 MinIO 雲端物件儲存服務, 處理文章縮圖與使用者大頭貼

### 前台 :
- 熱門文章區塊呈現
- 對文章可發布留言、回覆留言、使用留言表情圖案, 且最新留言能置頂顯示
- 友情連結 ( 交換連結 ) 之展示
- 帳號註冊、登入、三階段個人資料驗證之密碼重設功能
- 回到網頁頂端按鈕

### 後台 :
- 參考 element-admin 排版設計
- 後台人員操作採 RBAC 設計
- 動態角色權限修改與動態菜單顯示
- 文章可儲存為草稿形式
- 審核友情連結 ( 交換連結 )
- 採用 Markdown 文章編輯器
- 整合 EasyExcel, 導出後台資料

## 使用技術介紹 :
| 前端技術 | 後端技術 | 
|:--------:|:--------:| 
| Vue2 | SpringBoot | 
| Vue Router | Spring Security |
| Axios | SpringData JPA |
| Element UI | MySQL |
| Mavon Editor | Mail |
| JS-Cookie | JJWT |
| | Spring Validation |
| | Lombok |
| | Easy Excel |
| | Redis |
| | MinIO |
| | Swagger |
| | Nginx |
| | Docker |

## 開發環境 :

| 開發工具 | 工具說明 |
|:-----------------------:|:--------------------:|
| IntelliJ IDEA | JAVA, SpringBoot 開發工具 IDE |
| VSCode | Vue 開發工具 IDE |
| Redis Desktop Manager | Redis緩存 可視化管理工具 |
| MySQL Workbench | 資料庫可視化設計及管理工具 |
| Docker Desktop | Docker 的圖形介面管理工具 |
| Postman | API測試工具 |
| JMeter | 請求壓力與效能測試工具 | 

| 應用與服務相關環境 | 版本 | 
|:-------------:|:------:|
| OpenJDK | 17 |
| SpringBoot | 3.2.6 |
| MySQL | 8.0.19 |
| Redis | 6.0.8 |
| Nginx | 1.18.0 |
| MinIO | 8.5.10 |
| SpringDOC | 2.0.3 |
| EasyExcel | 3.3.3 |
| JakartaMail | 2.0.1 |

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

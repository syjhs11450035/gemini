@echo off
REM 安裝依賴
call npm install

REM 創建環境變數文件
copy .env.example .env

REM 初始化 git
call git init

echo ✓ 項目初始化完成
echo ✓ 請編輯 .env 文件配置 API 密鑰
echo ✓ 運行 'npm run dev' 啟動開發服務器

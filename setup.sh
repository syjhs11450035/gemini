#!/bin/bash

# 安裝依賴
npm install

# 創建環境變數文件
cp .env.example .env

# 初始化 git
git init

echo "✓ 項目初始化完成"
echo "✓ 請編輯 .env 文件配置 API 密鑰"
echo "✓ 運行 'npm run dev' 啟動開發服務器"

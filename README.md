# fast Chat

本專案是一個使用 Vite、Vue 3、Pinia、Google Firebase 和 Google Auth 等其他套件開發的聊天網站。此網站旨在提供即時聊天功能，用戶可以註冊、登入並與其他用戶進行實時交流。


## 技術說明

Vite：作為構建工具，提供快速的開發和構建速度。
Vue 3：前端框架，使用 <script setup> 語法進行組件開發。
Pinia：狀態管理工具，用於管理應用狀態。
Google Firebase：
Firebase Firestore：用於存儲聊天消息和用戶資料。
Firebase Storage：用於存儲用戶上傳的照片。
Google Auth：用於實現用戶認證，支持 Google 帳號快速登入。
功能特點
用戶註冊與登入：使用 Google Auth 提供便捷的註冊與登入功能。
即時聊天：使用 Firebase Firestore 實現即時消息傳輸，確保用戶可以即時接收到新消息。
圖片上傳：用戶可以上傳並分享照片，照片會存儲在 Firebase Storage 中。

<p align="right"><a href="README.md">English</a> | <b>繁體中文</b></p>

# 林芳義（Fang-Yi Lin）

**資料／AI 工程師。** 我把資料與 LLM 串成每天自動執行的系統。

作品集：[yiyiscode.github.io](https://yiyiscode.github.io) · Email：[az045317@gmail.com](mailto:az045317@gmail.com)

## 目前在做

**[104 職缺日報](https://github.com/yiyiscode/104-job-finder)**（個人專案，獨立開發，2026/08 起）：每日 08:00 排程擷取職缺，經規則層去重與過濾，再以兩階段 LLM 評分，把最符合的職缺推播到 Telegram。

- 將每日約 1 小時的人工篩選，縮短為約 4 分鐘的全自動流程。
- 先量測再定門檻：同資料重跑深評雜訊約 ±8 分，因此把絕對門檻改為當日排名前 N 名並保留低標。
- 風險護欄：每次請求硬上限 40、遇封鎖訊號即熔斷、絕不登入帳號。
- 截至 2026-10-15：累計處理 2,433 筆不重複職缺（1,385 家公司），668 個離線測試。
- 以 Claude Code 協作開發（截至 2026-10-15，111 個 commit 中 104 個由 AI 共同撰寫）。

## 精選專案

| 專案 | 重點 |
|---|---|
| **半導體晶圓缺陷分類**（自學專案，以 Codex 協作開發） | 5,000 筆製程資料、缺陷僅 0.14%；評估由 Accuracy 轉向 Recall／FNR；Holdout FNR 由 100% 降至 0%；20 次重複切分平均 Recall 0.90；SHAP 與 BI Dashboard |
| **RAG 資安文件問答系統** | FastAPI 地端部署；僅依檢索片段回答、證據不足時回覆無法判斷，並附 file name、page、chunk id 引用 |
| **兩階段羽球擊球動作分類**（碩士論文） | AlphaPose 骨架關鍵點融合擊球軌跡；第一階段 89.70%、整體 79.23%，較基準方法提升 12.05%（10 組隨機種子） |

## 經歷

- **國泰人壽**，資安大數據分析實習生（CAP 計畫），2025/02–2025/06：重構 PyTorch 訓練流程，效率提升 6 倍；BERT + CNN 惡意網址分類，準確率 99.84%。
- **臺北富邦銀行**，技術助理（產學合作案），2024：協助將識詐模型佈署至多家銀行，提供技術諮詢與教育訓練；以 LIME 開發模型解釋工具。
- **學歷：** 國立臺灣科技大學 資訊管理系碩士（2023–2025）；國立臺北大學 統計學系學士（2019–2022）。

## 技術

- **程式語言：** Python、SQL、R、SAS、JavaScript
- **ML／LLM：** PyTorch、Scikit-learn、XGBoost、SHAP、LangChain、RAG、Ollama、Claude
- **資料工程：** Pandas、SQLite、MySQL、PySpark、pytest
- **後端／雲端：** FastAPI、Pydantic、AWS、Git
- **BI：** Power BI、Tableau、Streamlit、Plotly、Folium、R Shiny

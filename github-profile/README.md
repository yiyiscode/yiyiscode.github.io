<p align="right"><b>English</b> | <a href="README.zh-TW.md">繁體中文</a></p>

# Fang-Yi Lin

**Data & AI Engineer.** I turn data and LLMs into systems that run on their own, every day.

Portfolio: [yiyiscode.github.io](https://yiyiscode.github.io) · Email: [az045317@gmail.com](mailto:az045317@gmail.com)

## What I'm working on

**[104 Job Finder](https://github.com/yiyiscode/104-job-finder)** (personal project, sole developer, since Aug 2026): a daily 08:00 pipeline that fetches job postings, dedupes and filters them with rules, scores them with a two-stage LLM, and pushes the best matches to Telegram.

- Cut ~1 hour of daily manual screening to a ~4-minute automated run.
- Measured before setting thresholds: re-scoring showed ±8 noise, so the cut-off became a daily top-N with a floor.
- Guardrails: a hard cap of 40 requests per run, a circuit breaker on any block signal, and it never logs in.
- As of 2026-10-15: 2,433 unique postings from 1,385 companies processed, 668 offline tests.
- Built with Claude Code as an AI pair programmer (104 of 111 commits co-authored with AI, as of 2026-10-15).

## Selected projects

| Project | What it shows |
|---|---|
| **Semiconductor Wafer Defect Classification** (self-directed, built with Codex) | 5,000 process records with 0.14% defects; moved from accuracy to Recall/FNR; holdout FNR 100% → 0%; mean Recall 0.90 over 20 repeated splits; SHAP and a BI dashboard |
| **RAG Cybersecurity Document Q&A** | On-premise FastAPI system; answers only from retrieved chunks, declines when evidence is thin, cites file, page and chunk id |
| **Two-Stage Badminton Stroke Classification** (M.S. thesis) | AlphaPose keypoints fused with shuttle trajectories; 89.70% stage-1 and 79.23% overall accuracy, +12.05% over baseline (10 random seeds) |

## Experience

- **Cathay Life Insurance**, Big Data Analysis & Cybersecurity Intern (CAP Program), Feb–Jun 2025: 6x training efficiency from a streamlined PyTorch pipeline; BERT + CNN malicious-URL classifier at 99.84% accuracy.
- **Taipei Fubon Bank**, Technical Assistant (industry-academia collaboration), 2024: assisted deploying an anti-fraud model to multiple banks, with technical consultation and training; built LIME explainability tools.
- **Education:** M.S. in Management Information Systems, NTUST (2023–2025); B.S. in Statistics, National Taipei University (2019–2022).

## Tech

- **Languages:** Python, SQL, R, SAS, JavaScript
- **ML / LLM:** PyTorch, Scikit-learn, XGBoost, SHAP, LangChain, RAG, Ollama, Claude
- **Data engineering:** Pandas, SQLite, MySQL, PySpark, pytest
- **Backend / cloud:** FastAPI, Pydantic, AWS, Git
- **BI:** Power BI, Tableau, Streamlit, Plotly, Folium, R Shiny

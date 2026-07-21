# ForgeIQ
### AI-Powered Industrial Knowledge Intelligence Platform
#### Unified Asset & Operations Brain

> **Transform fragmented industrial documents into a unified, intelligent knowledge ecosystem powered by AI, Knowledge Graphs, RAG, and Multi-Agent Intelligence.**

<p align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)
![Neo4j](https://img.shields.io/badge/Neo4j-Knowledge_Graph-018BFF)
![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-red)
![RAG](https://img.shields.io/badge/RAG-Enabled-success)

</p>

## Overview

**ForgeIQ** is an AI-powered **Industrial Knowledge Intelligence Platform** that transforms fragmented industrial documents into a centralized, searchable, and continuously evolving knowledge ecosystem.

Industrial organizations generate enormous amounts of engineering drawings, maintenance logs, SOPs, inspection reports, regulatory documents, emails, and work orders. Unfortunately, these documents remain scattered across disconnected systems, making information retrieval slow, inefficient, and error-prone.

ForgeIQ solves this challenge by combining **Document Intelligence, OCR, Knowledge Graphs, Retrieval-Augmented Generation (RAG), and Agentic AI** to create a unified operational brain for industrial enterprises.

Instead of searching through hundreds of files, engineers simply ask questions in natural language and receive context-aware answers backed by source citations.


## Features

### 1. Universal Document Ingestion

- PDF
- DOCX
- Excel
- CSV
- P&ID Drawings
- CAD Files
- Images
- Scanned Documents
- Emails
- Batch Upload


### 2. OCR & Document Intelligence

- OCR for scanned documents
- Layout Detection
- Table Extraction
- Metadata Generation
- Entity Recognition
- Engineering Drawing Parsing


### 3. Industrial Knowledge Graph

Automatically links:

- Equipment
- Assets
- SOPs
- Work Orders
- Inspection Reports
- Maintenance History
- Incident Reports
- Regulations
- Personnel

into a single connected knowledge graph.


### 4. AI Knowledge Copilot

Ask questions like:

- Why did Pump P-102 fail repeatedly?
- Show maintenance history of Boiler-05.
- Which SOP applies to Valve V203?
- Find inspection reports for Compressor-C07.

Features:

- Natural Language Search
- Source Citations
- Confidence Score
- Related Documents
- Asset History
- Mobile Support

### 5. Maintenance Intelligence

- Predictive Maintenance
- Root Cause Analysis (RCA)
- Failure Pattern Detection
- Remaining Useful Life Estimation
- Maintenance Recommendations

### 6. Compliance Intelligence

Supports

- Factory Act
- OISD
- PESO
- ISO Standards
- Environmental Regulations

Automatically detects compliance gaps and prepares audit-ready reports.

### 7. Lessons Learned Engine

Analyzes:

- Near Miss Reports
- Incident Reports
- Audit Findings
- Failure History

to proactively recommend preventive actions.

# System Architecture

```text
                Multiple Data Sources
                        │
 ┌─────────────────────────────────────────┐
 │ PDFs │ P&IDs │ Excel │ Emails │ Images │
 └─────────────────────────────────────────┘
                        │
              Document Ingestion Engine
                        │
               OCR + Computer Vision
                        │
           NLP Entity Extraction
                        │
      Industrial Knowledge Graph Builder
                        │
      Vector Database + Graph Database
                        │
     Retrieval-Augmented Generation
                        │
         Multi-Agent AI Framework
                        │
AI Copilot │ Maintenance │ Compliance
                        │
         Web & Mobile Dashboard
```

---

# AI Workflow

```text
Document Upload
        │
OCR + Layout Detection
        │
Entity Extraction
        │
Metadata Generation
        │
Knowledge Graph Construction
        │
Vector Embedding Generation
        │
Vector Database
        │
User Query
        │
Hybrid Search (Graph + Vector)
        │
LLM + RAG
        │
AI Response with Sources
```

# Core Modules

| Module | Description |
|---------|-------------|
| 📂 Document Intelligence | OCR, parsing, metadata extraction |
| 🧠 Knowledge Graph | Relationship mapping across documents |
| 🔍 Semantic Search | Hybrid Graph + Vector Retrieval |
| 🤖 AI Copilot | Conversational engineering assistant |
| ⚙️ Maintenance Intelligence | Predictive maintenance & RCA |
| 🛡 Compliance Intelligence | Audit & regulation management |
| 📈 Incident Intelligence | Lessons learned & failure analysis |
| 📊 Analytics Dashboard | KPIs & operational insights |


# Expected Impact

| Metric | Improvement |
|---------|-------------|
| Search Time | ⬇️ 80% |
| Maintenance Decision Time | ⬇️ 60% |
| Compliance Preparation | ⬇️ 70% |
| Equipment Downtime | ⬇️ 20% |
| Knowledge Accessibility | ⬆️ 5× |
| Operational Efficiency | ⬆️ 35–45% |

---

# Screenshots



# Roadmap

- [x] Interactive Dashboard
- [x] Document Upload Pipeline
- [x] OCR & Metadata Extraction
- [x] Knowledge Graph
- [x] AI Copilot
- [x] Maintenance Intelligence

# Acknowledgements

Developed for **ET AI Hackathon**

**Problem Statement**

> AI for Industrial Knowledge Intelligence: Unified Asset & Operations Brain

Team Members:
- Jatin Vishwakarma
- Nisarg Wath
- Shruti Thakur
- Rajat Petkar


# License

Distributed under the **MIT License**.



# CampusOS TITAN X

A unified AI-powered campus infrastructure platform that transforms any college into a self-sustaining digital economy.

## 🚀 Ecosystem Overview

- **Marketplace**: Buy/Sell used goods, electronics, books.
- **Logistics**: Gig-economy delivery by students for students.
- **SkillSwap**: Offer your skills (tutoring, design) for money or barter.
- **Hostel / PG ERP**: Find rooms, pay rent, log maintenance.
- **Food Canteen**: Order ahead, manage mess subscriptions.
- **Social**: Feed, chat, and event management.
- **Fintech**: Integrated Campus Coins & Rupee wallet with Escrow.

## 🏗️ Architecture

This is a production-ready monorepo powered by **Turborepo** and **pnpm**.

- **Frontend**: Next.js 14, Tailwind CSS v3 (Glassmorphism, Dark UI)
- **Backend Services**: Node.js 20, Express, Socket.IO
- **AI Engine**: Python FastAPI, scikit-learn
- **Databases**: MongoDB (Primary), PostgreSQL (Transactions), Redis (Caching)
- **Infra**: Docker Compose

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- Python 3.11+ (for AI Engine)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Copy environment file:
```bash
cp .env.example .env.local
```

3. Start databases via Docker:
```bash
pnpm run docker:up
```

4. Start the monorepo in dev mode:
```bash
pnpm run dev
```

The unified ecosystem will now be running at:
- Web App: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3100`
- Core Services: ports `3001` - `3008`
- AI Engine: port `8000`

---
*Built as a high-fidelity startup command center.*

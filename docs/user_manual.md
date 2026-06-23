# CampusOS TITAN X — User Manual

Welcome to the User Manual for **CampusOS TITAN X**. This document provides detailed, step-by-step instructions on setting up, running, exploring, and debugging the monorepo platform.

---

## 1. System Requirements & Environment

### Prerequisites
* **Node.js**: v20.0.0 or higher.
* **pnpm**: v8.0.0 or higher (available via `npx pnpm` if not installed globally).
* **Python**: v3.11 or higher (optional, required for the FastAPI AI engine).

---

## 2. Installation & Quick Start

Follow these commands to install dependencies, compile services, and start the development servers:

```bash
# 1. Install workspace dependencies
npx pnpm install

# 2. Build all modules and services
npx pnpm build

# 3. Start the dev server (frontends and backend services in parallel)
npx pnpm dev
```

### Local Dev Ports Mapping
Once running, you can access individual modules:
* 🌐 **Student Web Application**: [http://localhost:3000](http://localhost:3000)
* 📊 **Admin Command Center**: [http://localhost:3100](http://localhost:3100)
* 📡 **Auth Node**: [http://localhost:3001](http://localhost:3001)
* 🛍️ **Marketplace Node**: [http://localhost:3002](http://localhost:3002)
* 🛵 **Logistics Node**: [http://localhost:3003](http://localhost:3003)
* 💳 **Payment/Wallet Node**: [http://localhost:3004](http://localhost:3004)
* 🏠 **Hostel/PG Node**: [http://localhost:3005](http://localhost:3005)
* 🍽️ **Food Canteen Node**: [http://localhost:3006](http://localhost:3006)
* 🧠 **SkillSwap Node**: [http://localhost:3007](http://localhost:3007)
* 👤 **User Profile Node**: [http://localhost:3008](http://localhost:3008)

---

## 3. Core Features Walkthrough

### 🚀 Interactive Landing Page
* Visit [http://localhost:3000](http://localhost:3000).
* Interact with the **Live System HUD** grid in the center of the screen to view simulated live counts.
* Toggle between the different **Ecosystem Tour Tabs** to inspect details on the super-app capabilities.
* Click **Launch Portal** to go to the biometric scanner login page.

### 🛡️ Biometric Login Gate
* Enter any username and password (pre-filled fields work).
* Click **Verify Secret Phrase** to initiate the holographic biometric eye-scanner animation.
* Upon validation, you will be redirected automatically to the `/home` dashboard.

### 🧠 Student Dashboard & Aura HUD
* Navigate around the tabs in the sidebar: Home, Marketplace, SkillSwap, Food, Hostel, Logistics, Wallet, and Social.
* View your **Neural Aura Diagnostic** rating card on the Home Page, visualizing your live helpfulness index and reputation multipliers.
* Match skills using the natural language matching input box in the **SkillSwap** tab.

### 🛰️ API Visualizer Explore Page
* Visit `/explore` (or click "Explore Features" on the landing page).
* View the **Architectural Relay HUD** Canvas. The connection path glows and speeds up connection packet animations when you select a different microservice module.
* Read the exact **JSON Data Payloads** and mock **Service Console Output Logs** on the right side of the screen.

---

## 4. Operational & Degraded Modes

If MongoDB or Redis is not running locally, services log a warning and automatically launch in **degraded mode**:
* Mock data Map collections are generated in-memory.
* API calls automatically serve mock responses instead of throwing 500 errors.
* This allows you to demo and prototype all frontend functionalities without needing a local database instance.

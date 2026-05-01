# 🗳️ ElectED — Election Process Education Assistant

<div align="center">
  <img src="public/vite.svg" width="100" height="100" alt="ElectED Logo" />
  <h3>Empowering every citizen with knowledge through high-fidelity interactivity.</h3>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=google-cloud)](https://election-assistant-213441558688.us-central1.run.app)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://aistudio.google.com/)
</div>

---

## ✨ Overview

**ElectED** is a premium, "editorial-style" web application designed to demystify the democratic process. By combining **Google Gemini AI** with an immersive **3D Glassmorphic UI**, we turn complex civic requirements into an engaging, cinematic experience.

> [!IMPORTANT]
> This platform is non-partisan and built purely for educational empowerment.

---

## 🚀 Key Features

| Feature | Description | Icon |
| :--- | :--- | :---: |
| **AI Assistant** | Real-time election guidance powered by Gemini Flash. | 🤖 |
| **3D Timeline** | A cinematic 7-stage walkthrough of the election lifecycle. | 📅 |
| **Smart Checker** | Personalized voter eligibility verification in seconds. | ✅ |
| **Gamified Learning** | Interactive flip-cards and quiz modules with badge rewards. | 🎓 |
| **Global Access** | Full support for English, Español, हिन्दी, and اردو. | 🌍 |
| **Glassmorphism** | A stunning, atmospheric UI with dynamic ambient lighting. | 🌗 |

---

## 🛠️ Architecture & Tech

### Core Stack
*   **Frontend:** React 19 + Vite
*   **Intelligence:** Google Generative AI (Gemini)
*   **Styling:** Pure CSS (Custom Token System)
*   **Infrastructure:** Google Cloud Run + Cloud Build

### Design Language
*   **3D Environment:** Deep perspective mesh background with floating ambient orbs.
*   **Editorial Layout:** High-contrast typography and fluid, responsive grids.
*   **Micro-Animations:** Spring-based transitions and hover-state logic for every component.

---

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/MdSaifAli063/Election-Process-Education-Assistant.git
    cd Election-Process-Education-Assistant
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```bash
    VITE_GEMINI_API_KEY=your_google_ai_studio_key_here
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

---

## ☁️ Deployment

This project is optimized for **Google Cloud Run**. To deploy your own instance:

```bash
# Authenticate
gcloud auth login

# Submit Build & Deploy
gcloud builds submit --config cloudbuild.yaml --substitutions=_VITE_GEMINI_API_KEY="YOUR_KEY"
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  Built with ❤️ for a more informed democracy.
</div>

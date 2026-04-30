# 🗳️ ElectED — Election Process Education Assistant

**ElectED** is a premium, highly interactive web application designed to educate citizens about the democratic election process. Built with modern web technologies, it simplifies complex political and electoral concepts into an engaging, accessible, and personalized learning experience.

![Hero Banner preview placeholder](public/vite.svg) *(App features a stunning glassmorphic UI with dynamic ambient lighting).*

---

## ✨ Key Features

- **🤖 AI-Powered Chatbot:** Integrated with the **Google Gemini API**, our floating assistant can answer *any* complex question about elections, voting laws, or political history in real-time.
- **📅 Interactive Election Timeline:** A detailed 7-stage walkthrough of the election process (from Voter Registration to Inauguration) featuring expandable pro-tips and dynamic filtering.
- **✅ Smart Eligibility Checker:** A personalized, multi-step questionnaire that guides users through voting requirements based on age, citizenship, and residency.
- **🎓 Learn & Quiz Hub:** Gamified educational modules with interactive flip-cards and a dynamic quiz system that rewards users with badges for civic knowledge.
- **🌍 Multilingual Support:** Fully translated UI supporting **English, Spanish, Hindi, and Urdu** to ensure accessibility for diverse populations.
- **🌗 Premium UI/UX:** Built from scratch using modern CSS tokens, featuring Dark/Light mode persistence, "noise texture" global overlays, and 3D glassmorphic cards.

---

## 🛠️ Technology Stack

- **Framework:** React.js + Vite (for lightning-fast HMR and building)
- **Routing:** React Router v6
- **Styling:** Custom CSS with robust CSS variables (No Tailwind required!)
- **AI Integration:** `@google/generative-ai` (Gemini Flash Model)
- **Icons:** `lucide-react`

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository (or extract the project folder) and install the dependencies:

```bash
cd "Election Assistant"
npm install
```

### 3. Setup Environment Variables
To unlock the full "large data brain" of the AI Chatbot, you will need a free Google Gemini API key.

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Create a file named `.env` in the root directory of the project.
3. Add your key to the file like this:
```env
VITE_GEMINI_API_KEY=your_copied_api_key_here
```

### 4. Run the Development Server
Start the local Vite server:

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to explore ElectED!

---

## 📁 Project Structure

```text
/src
 ├── /components     # Reusable UI components (Navbar, Footer, Chatbot)
 ├── /contexts       # React Context providers (ThemeContext, LanguageContext)
 ├── /pages          # Main route components (Home, Timeline, Eligibility, Learn)
 ├── App.jsx         # App routing and layout wrapper
 ├── index.css       # Global design system, CSS variables, and glassmorphic utilities
 └── main.jsx        # React entry point
```

---

*Built with ❤️ to empower voters and strengthen democracy through education.*

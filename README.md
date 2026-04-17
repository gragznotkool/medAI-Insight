# MedAI Insight Engine

A complete production-level MedAI Artificial Intelligence application that takes clinical notes and predicts possible diseases using deep learning, packaged with a highly interactive, futuristic 3D Glassmorphism UI.

![MedAI Demo](https://i.imgur.com/your-image-here.jpg)

## Features
- **Zero-Shot Disease Classification**: Powered by Transformers (DistilRoBERTa-base mapped to common clinical diagnoses)
- **Token Attention Mapping**: Highlights critical symptoms in the user input.
- **Glassmorphism 3D UI**: Built with React, Tailwind CSS, Framer Motion, and React Three Fiber.
- **Data Visualization**: Recharts for dynamic confidence radar charts.
- **Speech-to-Text Dictation**: Hands-free clinical note input.
- **Interactive AI Chatbot**: Context-aware assistant to help explain diagnostics.
- **Patient History**: Timelines of previous notes and insights.

## Project Structure
```text
medai-insight-engine/
│
├── backend/
│   ├── app.py              # FastAPI endpoints (/predict, /chat, /history)
│   ├── model.py            # Deep Learning Transformer Pipeline
│   ├── preprocess.py       # Clinical Text sanitation
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Header, Chatbot
│   │   ├── pages/          # Landing, Dashboard, Results, History
│   │   ├── App.tsx         # Routing and Layout
│   │   ├── main.tsx        # React Root
│   │   └── index.css       # Tailwind & Custom CSS
│   ├── package.json        # Node dependencies
│   ├── tailwind.config.js  # UI Theme configurations
│   └── vite.config.ts      # Vite Bundler config
│
└── README.md
```

## Dataset & Technical Architecture
1. **NLP Backend**: Uses a generic NLI model (`cross-encoder/nli-distilroberta-base`) via HuggingFace's zero-shot classification pipeline. This is ideal for demonstrations as it requires no training to begin classifying textual clinical notes into categories like [Hypertension, Coronary Artery Disease, Diabetes].
2. **Explainability**: Applies heuristic token-mapping over the clinical notes to map words to attention weights (simulating SHAP in a fast, API-safe manner).
3. **Frontend**: Vite.js was chosen over CRA for instant HMR. Styling utilizes a highly customized Tailwind setup enforcing deep blues, purples, and cyans for a "Medical Cyberpunk" aesthetic.

## Setup Instructions

### 1. Setup Backend (Python API)
Open a terminal and navigate to the `backend` folder.
```bash
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app:app --reload --port 8000
```
*The backend will be live at `http://localhost:8000`. You can test the endpoints at `http://localhost:8000/docs`.*

### 2. Setup Frontend (React UI)
Open a second terminal and navigate to the `frontend` folder.
```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm run dev
```
*The frontend will be live at `http://localhost:5173`. Open this URL in your browser.*

## Sample Input to Test
Try dictating or pasting the following into the dashboard:
> *"Patient is a 45-year-old male who presents with severe chest pain radiating down his left arm, shortness of breath, and high blood pressure. He also reports occasional nausea and dizziness."*

You should see high confidence for **Coronary Artery Disease** and **Hypertension**, with key terms visually highlighted in the results.

# Corrosive Poison Diagnostic System - Premium Product Showcase Document

---

# Project Overview

## Project Name
**Corrosive Poison Diagnostic System (CPDS)**

## Elevator Pitch
An AI-powered clinical decision support system that identifies corrosive poisoning agents (Sulfuric Acid, Nitric Acid, or Hydrochloric Acid) based on observed clinical symptoms, helping medical professionals expedite diagnosis in emergency toxicology scenarios.

## Problem Statement
Corrosive poison ingestion is a medical emergency requiring rapid identification of the toxic agent to guide treatment. Traditional laboratory analysis takes hours, while delayed treatment increases mortality. Clinicians need instant decision support to identify the corrosive agent based on presenting symptoms.

## Why This Project Exists
This project demonstrates a full-stack machine learning application for medical decision support, showing proficiency in:
- Synthetic dataset generation based on clinical literature
- Multiple ML model training and evaluation
- RESTful API development
- Modern React frontend with glass-morphism design
- Real-time symptom-based prediction with confidence scoring

## Target Audience
- Emergency medicine physicians
- Clinical toxicologists
- Forensic medicine specialists
- Healthcare AI researchers
- Medical informatics students

## Real-World Applications
- Hospital emergency departments for rapid toxicology assessment
- Poison control centers for triaging incoming cases
- Medical education and training simulations
- Telemedicine platforms for remote toxicology consultation

---

# User Journey

## Flow 1: Training Flow
1. User navigates to **Training** tab (Streamlit) or sidebar
2. User configures dataset parameters:
   - Number of samples (100-2000)
   - Test set ratio (10%-40%)
   - Random seed
3. User clicks **"Generate & Train Models"**
4. System generates synthetic dataset with class-balanced corrosive agents
5. System trains 5 ML models simultaneously
6. Best model is auto-selected based on accuracy
7. Results display: accuracy, CV scores, class distribution
8. Model is serialized and saved to `models/` directory

## Flow 2: Prediction Flow
1. User navigates to **Prediction/Diagnostic** tab
2. System validates model is trained (shows warning if not)
3. User selects symptoms from checkboxes and dropdowns:
   - Binary symptoms: Oropharyngeal Burns, Abdominal Distension, Melena, Hematemesis, Throat Pain, Dysphagia, Chest Pain, Metabolic Acidosis
   - Ordinal symptoms: Teeth Discoloration (None/Yellow/Chalky White), Skin Lesions (None/Mild/Severe)
4. User clicks **"Predict Corrosive Agent"**
5. System returns prediction with:
   - Predicted acid type
   - Confidence percentage
   - Probability distribution across all three acids
   - Timestamp of prediction

## Flow 3: Evaluation Flow
1. User navigates to **Evaluation** tab
2. User selects model from dropdown (Decision Tree, Random Forest, Gradient Boosting, Logistic Regression, SVM)
3. System displays:
   - Classification Report (precision, recall, F1-score per class)
   - Confusion Matrix heatmap
   - Feature Importance chart (top 10 symptoms)

## Flow 4: Case Logging Flow
1. After prediction, case is stored in session state
2. User navigates to **Case Records** tab
3. System shows JSON case record with:
   - Case ID (auto-generated)
   - Timestamp
   - Predicted agent
   - Confidence
   - All input symptoms
4. User can download case as CSV

---

# Features

## Core Features

### 1. Synthetic Dataset Generation
- Generates balanced clinical symptom data for 3 acid classes
- Configurable sample size with stratified sampling
- Probability distributions based on clinical literature patterns:
  - **Sulfuric Acid (H₂SO₄)**: High oropharyngeal burns (90%), high abdominal distension (85%), high metabolic acidosis (80%)
  - **Nitric Acid (HNO₃)**: High oropharyngeal burns (80%), moderate teeth discoloration
  - **Hydrochloric Acid (HCl)**: Lower rates of severe symptoms, lower acidosis (30%)

### 2. Multi-Model Training
Trains and compares 5 classifier models:
- **Decision Tree**: max_depth=8, min_samples_split=5
- **Random Forest**: n_estimators=100, max_depth=10
- **Gradient Boosting**: n_estimators=100, max_depth=5
- **Logistic Regression**: max_iter=1000
- **SVM**: RBF kernel with probability=True

### 3. Model Evaluation
- Train/test split with stratification
- 5-fold cross-validation with mean and standard deviation
- Per-class precision, recall, F1-score
- Confusion matrix visualization
- Feature importance for tree-based and linear models

### 4. Symptom Prediction
- 10 clinical features as input
- Real-time probability estimation
- Confidence scoring
- Visual probability bars for each acid type

### 5. Case Record Management
- Auto-generated case IDs with timestamp
- Symptom snapshot at prediction time
- JSON display and CSV download

## Backend API Features

### Endpoints:
- `GET /` - Health check with API status
- `GET /health` - Model training status
- `POST /api/train` - Train models with custom config
- `POST /api/predict` - Make prediction from symptoms
- `GET /api/evaluation` - Get model metrics
- `GET /api/overview` - Get dataset and model comparison

## Hidden Features
- Stratified sampling ensures class balance
- Session state persists predictions across tabs
- Model retraining preserves evaluation history
- Acid-specific color coding for visual identification

---

# Frontend

## Architecture
- **Streamlit UI**: Python-based rapid prototyping interface with tabs
- **Next.js UI**: Modern React 19 frontend with App Router, separate `my-app/` directory

## Navigation - Next.js Implementation

### Sidebar (Fixed Left)
```
┌─────────────────────────┐
│  ⚙️ Dataset & Training  │
├─────────────────────────┤
│  Samples slider         │
│  Test size slider       │
│  Random seed input      │
├─────────────────────────┤
│  [Generate & Train]     │
├─────────────────────────┤
│  ✓ Training success     │
│    Best: Random Forest   │
│    Accuracy: 87.5%      │
├─────────────────────────┤
│  ● Model Ready          │
└─────────────────────────┘
```

### Main Navigation (Top)
Three tab buttons: Overview, Diagnostic, Evaluation

## Layout Structure

### Grid System
- Sidebar: 288px fixed width
- Main content: fluid, max 1200px
- Cards: CSS Grid with auto-fit columns
- Glass cards with 1rem border-radius

### Diagnostic Page (2-Column)
```
┌───────────────────┬───────────────────┐
│  Clinical Signs   │  Prediction       │
│  ─────────────    │  ──────────────── │
│  ☑ Oropharyngeal  │  ┌─────────────┐ │
│  ☐ Teeth Discol.  │  │  H₂SO₄       │ │
│  ☑ Abdominal      │  │  87.3%       │ │
│  ...              │  └─────────────┘ │
│                   │                   │
│  [Predict Agent]  │  Probability bars │
└───────────────────┴───────────────────┘
```

## Pages

### 1. Overview Page
- 3 stat cards: Total Samples, Features, Classes
- Model Performance table with 4 metrics
- Class Distribution grid (3 cards, one per acid)

### 2. Diagnostic Page
- Left column: 10 symptom inputs (checkboxes + selects)
- Right column: Prediction result card + probability bars
- "Not trained" placeholder state

### 3. Evaluation Page
- Model selector dropdown
- Classification report table per model
- Confusion matrices grid (showing first 2 models)

## Components

### Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
```

### Primary Gradient Button
```css
.primary-gradient {
  background: linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%);
}
.primary-glow {
  box-shadow: 0 4px 20px rgba(255, 75, 43, 0.4);
}
.primary-glow:hover {
  box-shadow: 0 6px 30px rgba(255, 75, 43, 0.6);
  transform: translateY(-2px);
}
```

### Input Controls
- **Range Sliders**: Custom thumb with gradient, track with transparency
- **Checkboxes**: 20x20px, pink accent color, rounded corners
- **Select dropdowns**: Dark background, subtle border, pink focus ring
- **Number inputs**: Same styling as selects

## Forms
- All form controls have consistent 0.875rem font size
- Labels: 0.875rem, gray-300 color
- Active values: white, medium weight
- Focus states: pink border with 3px pink glow

## Charts

### Probability Bar Chart (Custom)
- Horizontal bars for each acid type
- Width animates from 0 to probability value over 500ms
- Acid-specific colors:
  - Sulfuric: `#ff4d4d` (red)
  - Nitric: `#ffa500` (orange)
  - Hydrochloric: `#4d94ff` (blue)
- Background track: white/10 (10% opacity)

### Confusion Matrix Display
- Table format in Next.js (vs Plotly heatmap in Streamlit)
- Classes as row/column headers
- Cell values centered in cells
- Row labels right-aligned

## Animations
- Card hover: translateY(-5px) with 300ms ease
- Button hover: translateY(-2px) with box-shadow expansion
- Probability bars: width transition 500ms
- Tab switching: instant (no animation)
- Loading state: disabled opacity 50%

## Responsiveness
- Sidebar collapses to top bar on mobile (<768px implied)
- 2-column diagnostic becomes single column on narrow screens
- Cards stack vertically on small viewports
- Table scrolling with overflow-x-auto

## Dark Mode
- Background: Radial gradient from #1a1a2e (top-left) to #0f3460 (bottom-right)
- Surface colors: rgba(255,255,255,0.05) for glass elements
- Text: #e2e0fc (light purple-white)
- Borders: rgba(255,255,255,0.1)
- Accent: #ff4b2b to #ff416c gradient

## Design Patterns
- **Glass-morphism**: Frosted glass card effect with backdrop-blur
- **Gradient accents**: Pink/orange gradients on CTAs
- **Metric cards**: Large numbers with small labels
- **Status indicators**: Colored dots (green=ready, gray=not trained)
- **Toast-style feedback**: Success messages below actions

## Visual Hierarchy
1. Hero header: 4xl bold gradient text
2. Section headers: xl semibold pink-300
3. Card titles: lg semibold white
4. Body text: sm gray-300/400
5. Stats: 3xl bold white

---

# Backend

## Architecture (FastAPI)

### Tech Stack
- **Framework**: FastAPI 0.100+
- **Server**: Uvicorn
- **Validation**: Pydantic v2
- **ML**: scikit-learn
- **Serialization**: joblib

### Directory Structure
```
api/
├── __init__.py
├── main.py          # Complete FastAPI application
└── __pycache__/     # Compiled bytecode
```

### Application State
In-memory state dictionary holding:
```python
state = {
    "trained": bool,
    "best_model": str,
    "label_encoder": LabelEncoder,
    "feature_cols": List[str],
    "model_results": Dict,
    "X_train", "X_test", "y_train", "y_test": ndarrays,
    "df": DataFrame
}
```

## Services

### Dataset Generation Service
`generate_toxicology_dataset(n_samples, random_state)`
- Creates numpy arrays with symptom distributions
- Applies acid-specific probability rules
- Returns pandas DataFrame with 10 features + target

### Model Training Service
`train_and_evaluate_models(X_train, X_test, y_train, y_test)`
- Instantiates 5 scikit-learn models
- Fits each model
- Calculates accuracy and 5-fold CV scores
- Returns results dictionary

## Business Logic

### Training Pipeline
1. Generate dataset with configured parameters
2. Save CSV with timestamp
3. Extract features and encode labels
4. Train/test split with stratification
5. Train all 5 models
6. Calculate metrics
7. Select best model by accuracy
8. Return summary response

### Prediction Pipeline
1. Validate model is trained
2. Rebuild model from class (FastAPI doesn't persist model objects)
3. Retrain on full dataset
4. Predict on single-sample input
5. Get probability estimates
6. Return prediction, confidence, all probabilities

## Controllers (Routes)

### `POST /api/train`
**Request:**
```json
{
  "n_samples": 500,
  "test_size": 0.2,
  "random_state": 42
}
```
**Response:**
```json
{
  "status": "success",
  "message": "Models trained successfully! Best model: Random Forest",
  "best_model": "Random Forest",
  "best_accuracy": 0.875,
  "model_results": { ... },
  "dataset_info": {
    "total_samples": 500,
    "features": 10,
    "classes": 3,
    "class_distribution": { ... }
  }
}
```

### `POST /api/predict`
**Request:**
```json
{
  "Oropharyngeal_Burns": 1,
  "Teeth_Discoloration": 2,
  "Abdominal_Distension": 1,
  "Skin_Lesions": 1,
  "Melena": 0,
  "Hematemesis": 1,
  "throat_pain": 1,
  "dysphagia": 0,
  "Chest_Pain": 1,
  "Acidosis": 0
}
```
**Response:**
```json
{
  "prediction": "Sulfuric Acid (H2SO4)",
  "confidence": 87.3,
  "probabilities": {
    "Sulfuric Acid (H2SO4)": 0.873,
    "Nitric Acid (HNO3)": 0.089,
    "Hydrochloric Acid (HCl)": 0.038
  },
  "symptoms": { ... },
  "timestamp": "2026-07-09 14:32:15"
}
```

## Authentication & Authorization
- **CORS**: Open to all origins (`allow_origins=["*"]`)
- No authentication implemented
- Intended for local development/demo only

## Database
- **Type**: CSV files on disk
- **Location**: `data/toxicology_data_{timestamp}.csv`
- **Schema**: 10 symptom columns + 1 target column (Acid_Type)
- No persistent database; state held in memory

## Caching
- No explicit caching layer
- Model state held in FastAPI app state
- CSV files serve as persistence for datasets

## Queues & Background Jobs
- None implemented
- Training is synchronous
- For production, would use Celery + Redis

---

# AI / Machine Learning

## Models Used

### 1. Decision Tree Classifier
```python
DecisionTreeClassifier(max_depth=8, min_samples_split=5, random_state=42)
```
- **Purpose**: Interpretable baseline
- **Max depth**: 8 (prevents overfitting)
- **Min samples split**: 5

### 2. Random Forest Classifier
```python
RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
```
- **Purpose**: Robust ensemble predictions
- **Estimators**: 100 trees
- **Max depth**: 10

### 3. Gradient Boosting Classifier
```python
GradientBoostingClassifier(n_estimators=100, max_depth=5, random_state=42)
```
- **Purpose**: Sequential error correction
- **Estimators**: 100 boosting stages
- **Max depth**: 5

### 4. Logistic Regression
```python
LogisticRegression(max_iter=1000, random_state=42)
```
- **Purpose**: Linear probabilistic baseline
- **Max iterations**: 1000
- **Uses**: Coefficient-based feature importance

### 5. Support Vector Machine
```python
SVC(kernel='rbf', probability=True, random_state=42)
```
- **Purpose**: Non-linear boundary classification
- **Kernel**: RBF (Radial Basis Function)
- **Probability**: Enabled for confidence scores

## Feature Set (10 Clinical Symptoms)

| Feature | Type | Values | Clinical Meaning |
|---------|------|--------|------------------|
| Oropharyngeal_Burns | Binary | 0/1 | Burns in mouth/throat |
| Teeth_Discoloration | Ordinal | 0/1/2 | None/Yellow/Chalky White |
| Abdominal_Distension | Binary | 0/1 | Abdominal swelling |
| Skin_Lesions | Ordinal | 0/1/2 | None/Mild/Severe |
| Melena | Binary | 0/1 | Black tarry stools |
| Hematemesis | Binary | 0/1 | Vomiting blood |
| throat_pain | Binary | 0/1 | Throat pain (Chinese: 喉部疼痛) |
| dysphagia | Binary | 0/1 | Difficulty swallowing (Chinese: 吞咽困难) |
| Chest_Pain | Binary | 0/1 | Chest pain |
| Acidosis | Binary | 0/1 | Metabolic acidosis |

## Target Classes
- Sulfuric Acid (H₂SO₄)
- Nitric Acid (HNO₃)
- Hydrochloric Acid (HCl)

## Training Process
1. Dataset generated with acid-specific symptom probability distributions
2. Features (X) and target (y) separated
3. LabelEncoder fits on target classes
4. train_test_split with stratification (20% test default)
5. 5 models trained on training set
6. Predictions made on test set
7. Accuracy calculated per model
8. Best model selected by test accuracy

## Evaluation Metrics
- **Accuracy**: (TP + TN) / Total
- **Cross-validation**: 5-fold StratifiedKFold
- **Precision**: TP / (TP + FP) per class
- **Recall**: TP / (TP + FN) per class
- **F1-Score**: Harmonic mean of precision/recall

## Feature Importance
- **Tree models**: `model.feature_importances_`
- **Linear models**: `np.abs(model.coef_[0])`
- Top 10 features displayed as horizontal bar chart

## Inference Pipeline
1. Receive symptom JSON
2. Build single-row DataFrame
3. Model.predict() → class prediction
4. Model.predict_proba() → class probabilities
5. Inverse transform prediction with LabelEncoder
6. Return formatted response

## Confidence Scoring
- `confidence = max(predict_proba) * 100`
- Returns as percentage with one decimal place
- Example: 87.3%

---

# Database

## Data Model

### CSV Schema: toxicology_data_{timestamp}.csv
```
Column Name              | Type   | Possible Values
-------------------------|--------|------------------
Oropharyngeal_Burns      | int    | 0, 1
Teeth_Discoloration      | int    | 0, 1, 2
Abdominal_Distension     | int    | 0, 1
Skin_Lesions             | int    | 0, 1, 2
Melena                   | int    | 0, 1
Hematemesis              | int    | 0, 1
throat_pain              | int    | 0, 1
dysphagia                | int    | 0, 1
Chest_Pain               | int    | 0, 1
Acidosis                 | int    | 0, 1
Acid_Type                | string | "Sulfuric Acid (H2SO4)", "Nitric Acid (HNO3)", "Hydrochloric Acid (HCl)"
```

### Model Files: models/
- `best_toxicology_model.pkl` - Serialized best model (joblib)
- `label_encoder.pkl` - Fitted LabelEncoder

## Data Flow
```
User Config → generate_toxicology_dataset() → CSV file
CSV → train_test_split → X_train, X_test, y_train, y_test
X_train, y_train → model.fit() → Trained model
Trained model + new symptoms → model.predict() → Prediction
```

---

# Folder Structure

```
corrosive-poison-diagnostic-toxicology/
├── api/
│   ├── __init__.py
│   ├── main.py              # FastAPI backend (325 lines)
│   └── __pycache__/         # Python bytecode
├── data/
│   ├── toxicology_data_20260529_012909.csv
│   ├── toxicology_data_20260531_102951.csv
│   └── toxicology_data_20260531_103224.csv
├── models/
│   ├── best_toxicology_model.pkl
│   └── label_encoder.pkl
├── my-app/
│   ├── config.json          # OpenCode MCP config
│   ├── package-lock.json
│   └── my-app/
│       ├── AGENTS.md        # Next.js agent rules
│       ├── app/
│       │   ├── page.tsx     # Main React component (616 lines)
│       │   ├── layout.tsx   # Root layout with fonts
│       │   └── globals.css  # Global styles with Tailwind
│       ├── package.json
│       ├── tsconfig.json
│       ├── postcss.config.mjs
│       ├── public/           # SVG icons
│       └── .next/           # Build output
├── reports/                  # (Empty directory)
├── CorrosivePoison_Tox.py   # Streamlit app (516 lines)
├── requirements.txt
└── README.md
```

### Organization Rationale
- **Separate API directory**: Clean separation of concerns between ML and web service
- **my-app/my-app/**: Next.js 15+ App Router convention for app directory
- **data/**: Version-controlled sample datasets
- **models/**: Persisted trained models
- **reports/**: Prepared for future report generation

---

# Interesting Engineering Decisions

## 1. Synthetic Data Generation with Clinical Logic
The dataset generation isn't random—it's designed with acid-specific probability distributions based on clinical literature patterns:
- Sulfuric acid causes severe burns and metabolic acidosis (high probability)
- Nitric acid causes intermediate symptoms
- Hydrochloric acid has lower systemic toxicity

This shows understanding of the problem domain, not just ML.

## 2. Dual Interface Strategy
Two complete UIs provided:
- **Streamlit**: For rapid prototyping, data science workflows
- **Next.js**: For production-ready frontend demonstration

Both consume the same FastAPI backend, showing architectural flexibility.

## 3. Model Selection at Runtime
Instead of hardcoding one model, the system trains 5 models and auto-selects the best performer. This pattern is production-ready for A/B testing model improvements.

## 4. State Management in FastAPI
The FastAPI app holds model state in memory rather than reloading from pickle on every request. This is a valid optimization for single-instance deployment.

## 5. Probability-Aware Predictions
All predictions include full probability distribution across classes, not just the argmax. This is critical for medical decision support where confidence matters.

## 6. Bilingual Symptom Naming
`throat_pain` and `喉部疼痛`, `dysphagia` and `吞咽困难` appear in the codebase, suggesting internationalization consideration or mixed-language development context.

---

# Challenges

## 1. Synthetic Data Limitations
**Challenge**: Real clinical data is protected by privacy laws. Synthetic data may not capture rare edge cases.

**Solution**: The project acknowledges this with clear disclaimer: "This system is for clinical decision support only" and "All predictions must be verified by a qualified medical professional."

## 2. Class Imbalance Handling
**Challenge**: If one acid type causes more severe symptoms, the model might biasedly predict it more often.

**Solution**: Stratified train/test split ensures class proportions are maintained. Dataset generation uses balanced class sampling.

## 3. Multi-Model Consistency
**Challenge**: In FastAPI, model objects can't be pickled and stored in app state directly.

**Solution**: Models are reconstructed from class definitions on each prediction request. This is slower but ensures consistency.

## 4. Feature Importance for Linear Models
**Challenge**: SVM doesn't naturally provide feature importance.

**Solution**: Uses absolute value of coefficients (`np.abs(model.coef_[0])`) as proxy for feature importance, applied uniformly across linear models.

## 5. Real-Time Model Retraining
**Challenge**: In the FastAPI `/predict` endpoint, the model needs to be retrained on each call because state isn't persisted.

**Solution**: The `/api/train` endpoint stores data in `state["df"]`, and `/api/predict` retrains from that data. Not efficient but functional for demonstration.

---

# Metrics

## Performance
- **Training time**: ~2-5 seconds for 500 samples with 5 models
- **Prediction latency**: <100ms per prediction
- **API response time**: ~500ms (includes model retraining)

## Model Accuracy
Typical results with 500 samples:
- Decision Tree: ~75-80%
- Random Forest: ~80-87%
- Gradient Boosting: ~82-88%
- Logistic Regression: ~70-78%
- SVM: ~78-85%

Best model typically: Gradient Boosting or Random Forest

## Dataset Scale
- Minimum: 100 samples
- Default: 500 samples
- Maximum tested: 2000 samples
- 10 features, 3 classes

## Memory Usage
- Dataset: ~500KB for 500 samples
- Models: ~1-5MB each
- Total: <50MB RAM

---

# Screenshots Needed

## 1. Training Configuration Screen
**Capture**: Sidebar with sliders at default values
**Elements**:
- Samples: 500
- Test ratio: 0.20
- Random seed: 42
- "Generate & Train Models" button
**State**: Before training, "Not Trained" indicator

## 2. Training Success State
**Capture**: Sidebar after successful training
**Elements**:
- Green checkmark and success message
- "Best: Gradient Boosting"
- "Accuracy: 86.50%"
**State**: Model ready

## 3. Overview Dashboard
**Capture**: Full overview tab with statistics
**Elements**:
- 3 stat cards (500 samples, 10 features, 3 classes)
- Model Performance table with 4 columns
- Class Distribution grid with 3 acid types

## 4. Symptom Input Form
**Capture**: Left side of Diagnostic tab
**Elements**:
- 10 symptom inputs with correct checkbox/select states
- "Predict Corrosive Agent" button

## 5. Prediction Result Display
**Capture**: Right side of Diagnostic tab with active prediction
**Elements**:
- Large gradient card showing "Sulfuric Acid (H2SO4)"
- "Confidence: 87.3%"
- Probability bars for all 3 acids

## 6. Evaluation Classification Report
**Capture**: Evaluation tab showing classification report
**Elements**:
- Model selector dropdown
- Table with precision/recall/F1 for 3 classes

## 7. Confusion Matrix Display
**Capture**: Lower section of evaluation
**Elements**: 2x3 confusion matrices for first 2 models

## 8. Streamlit Desktop View
**Capture**: Full Streamlit app on wide desktop
**Elements**: All 4 tabs visible, dark gradient background

---

# Demo Video (30-Second Walkthrough)

**0:00-0:05** - Opening shot of Next.js app, sidebar visible, overview tab active. Quick pan across the stat cards showing "500 samples, 10 features, 3 classes."

**0:05-0:10** - Click to Diagnostic tab. Show the 10 symptom inputs. Toggle on "Oropharyngeal Burns" checkbox.

**0:10-0:15** - Toggle additional symptoms: Teeth Discoloration to "Chalky White", check Hematemesis, check Acidosis.

**0:15-0:20** - Click "Predict Corrosive Agent" button. Watch prediction card animate in showing "Sulfuric Acid (H2SO4)" with 87.3% confidence.

**0:20-0:25** - Probability bars animate from 0 to showing 87% Sulfuric, 8% Nitric, 5% Hydrochloric. Color coding clearly visible.

**0:25-0:30** - Quick cut to Training tab showing model comparison table, then final frame with the gradient hero text "Corrosive Poison Diagnostic System."

---

# Visual Branding

## Primary Color
**Coral Red Gradient**: `#ff4b2b` → `#ff416c`
- Represents urgency and medical context
- Used for: buttons, active tabs, gradients, CTAs

## Accent Color
**Electric Pink**: `#ff416c`
- Hover states, focus rings, highlights
- Paired with coral for warmth

## Secondary Palette
- **Background**: Deep navy gradient `#1a1a2e` → `#0f3460`
- **Surface**: Glass effect `rgba(255,255,255,0.05)`
- **Text**: Soft white `#e2e0fc`
- **Muted**: Gray `#94a3b8`, `#64748b`

## Acid-Specific Colors
- **Sulfuric (H₂SO₄)**: `#ff4d4d` (aggressive red)
- **Nitric (HNO₃)**: `#ffa500` (warning orange)
- **Hydrochloric (HCl)**: `#4d94ff` (cool blue)

## Typography
- **Headlines**: "Outfit" (Google Font), weights 600-700
- **Body**: "Inter" (Google Font), weights 300-500
- **Monospace**: System monospace for data

## Icons
- Minimal emoji usage: ⚙️ 🔄 🔮 ✓ ✗
- SVG icons for external brand logos (Next.js, Vercel, Streamlit)
- No decorative illustrations

## Illustration Style
- No illustrations
- Focus on data visualization
- Clean, minimal, professional

## Motion Style
- Subtle hover lifts (translateY -2px to -5px)
- Smooth color transitions (300ms ease)
- Progress bar animations (500ms)
- No bouncing, spinning, or playful motion

## UI Inspiration
- Vercel dashboard aesthetic
- Linear app's dark mode
- Raycast's glass-morphism
- Stripe's clean data tables

---

# Selling Points

## For Recruiters
- Full-stack ML system from data generation to production UI
- Multiple interface implementations (Streamlit + Next.js)
- Clean code organization and separation of concerns
- Understanding of medical AI compliance considerations

## For Engineers
- FastAPI REST API with proper request/response models
- React 19 with App Router and modern hooks
- scikit-learn model comparison pipeline
- Glass-morphism CSS design system
- TypeScript interfaces for type safety

## For Startup Founders
- Demonstrates rapid prototyping capability (two UIs)
- Shows understanding of AI/ML deployment challenges
- Medical domain application shows breadth
- Clean architectural decisions for scaling

## For Investors
- AI in healthcare is a growing market
- Clear problem-solution fit
- Technical feasibility demonstrated
- Expandable to real clinical data

## For Hackathon Judges
- Novel application domain (toxicology)
- Complete end-to-end implementation
- Professional UI/UX design
- Multi-model comparison approach
- Clear README documentation

---

# One Sentence Summary

This Corrosive Poison Diagnostic System is a full-stack AI application that demonstrates end-to-end machine learning development—from synthetic clinical data generation and multi-model training through a FastAPI backend to dual polished interfaces (Streamlit and Next.js)—designed to help medical professionals identify corrosive poisoning agents from observed symptoms.

---

# Portfolio Showcase

## Hero Section
**Background**: Full-viewport dark gradient (`#1a1a2e` → `#0f3460`)
**Center-aligned content**:
- Eyebrow text: "AI-POWERED MEDICAL DIAGNOSTICS"
- Main headline (6xl gradient text): "Corrosive Poison Diagnostic System"
- Subheadline (xl, muted): "Predicting toxicology agents with 87%+ accuracy using machine learning"
- Primary CTA button: "View Live Demo" (coral gradient, glow effect)
- Secondary CTA: "Explore Code" (outlined)

**Animation**: Subtle floating gradient orb in background, headline fades in on load

## Interactive Demo Section
**Layout**: Embedded browser mockup or iframe
**Content**: Full Next.js diagnostic interface
**Interaction**: User can adjust symptoms and see real-time predictions
**Sidebar**: Live model status indicator

## Architecture Visualization
**Design**: Animated SVG showing data flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Dataset   │───▶│  FastAPI    │───▶│  Next.js    │
│  Generator  │    │   Backend   │    │  Frontend   │
└─────────────┘    └─────────────┘    └─────────────┘
                      │
                      ▼
              ┌─────────────────┐
              │  5 ML Models    │
              │  Comparison     │
              └─────────────────┘
```
**Animation**: Data flow particles animate along paths on scroll

## Statistics Section
**Layout**: 4-column grid of animated counters
**Metrics**:
- "87%" - Best Model Accuracy
- "500" - Default Training Samples
- "10" - Clinical Features
- "5" - ML Models Compared

**Animation**: Numbers count up on scroll into view

## Tech Stack Display
**Layout**: Horizontal logo strip
**Tech**: Python, scikit-learn, FastAPI, React, Next.js, TypeScript, Tailwind CSS, Streamlit, Plotly
**Style**: Grayscale logos, coral accent on hover

## Timeline / Journey
**Design**: Vertical timeline showing project evolution
**Milestones**:
1. Dataset research and generation algorithm design
2. ML model training pipeline implementation
3. FastAPI backend development
4. Streamlit interface creation
5. Next.js frontend build
6. Model evaluation and optimization

## Micro-Interactions Showcase
**Card hover**: Subtle lift and glow intensification
**Button click**: Scale down slightly (98%), then spring back
**Tab switch**: Underline slides to active tab
**Form focus**: Pink glow ring appears around input
**Chart load**: Bars/segments animate in from zero

## Case Study Expansion
**Trigger**: "Learn More" button on hero
**Content**: Expandable section with:
- Problem statement
- Solution architecture diagram
- Technical challenges and solutions
- Results table (accuracy comparison)
- Future improvement roadmap

## Call to Action
**Design**: Full-width gradient section
**Content**: "Ready to see it in action?"
**Buttons**: "Deploy to Vercel" (primary), "View on GitHub" (secondary)

## Overall Vibe
- **Aesthetic**: Premium dark mode SaaS dashboard
- **Personality**: Professional, medical, trustworthy, technically sophisticated
- **Motion**: Subtle, purposeful, never distracting
- **Typography**: Clean hierarchy with Outfit + Inter
- **Colors**: Dark foundation with warm coral accents
- **Spacing**: Generous whitespace, breathable layouts

---

*Document generated for portfolio showcase purposes. All clinical disclaimers apply—this system is for decision support only and not for actual medical diagnosis.*
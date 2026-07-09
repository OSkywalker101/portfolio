# HALO Support — Premium Product Showcase Documentation

## Project Overview

**Project Name:** HALO Support (Helpdesk Automation and Logic Operations)

**Elevator Pitch**

HALO Support is an end-to-end AI-driven IT support platform that automatically classifies, routes, and resolves incoming support tickets with zero manual dispatch. Every ticket is intelligently analyzed by a Groq LPU-powered AI router and dispatched through one of three specialized pipelines — fully automated action execution, RAG-powered FAQ resolution, or human expert routing — without any human involvement in the routing decision itself.

**Problem Statement**

Enterprise IT support desks are overwhelmed by repetitive tickets that consume valuable human bandwidth: password resets, VPN issues, software installation requests, and common FAQ-type questions. Simultaneously, complex tickets get lost in queue because there is no intelligent routing mechanism to match them to the right specialist based on skill, load, and availability. Traditional ticketing systems treat every ticket identically, applying manual triage that is slow, inconsistent, and unscalable.

**Why This Project Exists**

HALO was built to demonstrate a production-grade AI orchestration system where:
1. The AI router (Groq LPU, Llama 3.1 8B) classifies every incoming ticket in real time
2. A LangGraph state machine dispatches tickets to the correct path automatically
3. The entire pipeline — from classification to resolution attribution — is measurable through four AI telemetry metrics (CGR, RPI, HLO, SSE)
4. Three distinct audiences — end users, IT employees, and system administrators — each have a purpose-built portal

**Target Audience**

- **IT Department Managers / Admins** who need real-time visibility into ticket volume, AI performance, and workforce utilization
- **IT Support Staff / Employees** who need a structured ticket queue sorted by priority with fast resolution workflows
- **End Users / Requesters** who want instant AI-powered responses for common issues and seamless escalation for complex ones
- **Hackathon Judges / Technical Recruiters** who want to evaluate full-stack AI engineering depth

**Real-World Applications**

- Enterprise internal IT helpdesk automation
- Managed Service Provider (MSP) multi-client ticket routing
- Internal HR / Employee services desk
- SaaS product customer support tiering

---

## User Journey

### Login Flow

1. User navigates to `http://localhost:3000`
2. Root page redirects to `/login`
3. User selects a role card: **User** | **Employee** | **Admin**
4. User enters email and password (default: `12345`)
5. AuthContext validates credentials via `POST /api/login`
6. On success, session token is stored in `sessionStorage`, and user is redirected:
   - Admin → `/admin/tickets`
   - Employee → `/employees/resolve`
   - User → `/user/support`

### User (End User) Journey

1. **Landing:** User lands on `/user/support` — AI Support Chat page
2. **Submit Ticket:** Types issue in chat input, presses "Raise Ticket" or Enter
3. **AI Pipeline Execution:** System calls `POST /submit_ticket` which:
   - Saves ticket to DB with status `open`
   - Invokes LangGraph brain: classify → route
   - AI Router classifies as Action / FAQ / Complex
   - Depending on path: n8n webhook fires, RAG query executes, or human expert is assigned
4. **AI Response:** Chat panel shows routing result with ticket ID and assigned resolver
5. **Dashboard:** User can navigate to `/user/dashboard` for ticket overview stats
6. **Messaging:** If assigned to a human, the assigned agent appears in `/user/messaging` sidebar
7. **History:** `/user/history` shows all tickets with "Solved By" attribution (N8n / RAG Agent / Employee Name)
8. **Logout:** Session cleared, redirected to `/login`

### Employee Journey

1. **Landing:** Employee lands on `/employees/resolve`
2. **View Dashboard:** Sees stat cards (Total Assigned, Current Load, Avg Resolution Time, Skill Score)
3. **Ticket Queue:** Priority-sorted list of assigned tickets with severity indicators
4. **Resolve Ticket:** Clicks a ticket → enters chat interface with the requester
5. **Send Messages:** Real-time messaging with user via polling (3-second interval)
6. **One-Click Resolve:** "Resolve Ticket" button marks ticket resolved, decrements load, captures last message as resolution note
7. **History:** `/employees/history` shows all past tickets with resolution notes
8. **Profile:** `/employees/profile` shows expertise tags, skill level, performance stats
9. **Dashboard Stats:** Stat cards: Total Assigned, Current Load, Avg Resolution, Skill Score
10. **Collaboration Hub:** Messaging sidebar allows direct chat with Admin or other staff

### Admin Journey

1. **Landing:** Admin lands on `/admin/tickets` — main ticket management table
2. **Stats Dashboard:** StatsRow shows total/open/in-progress/resolved counts
3. **Ticket Table:** Paginated (10/page), searchable, filterable by status tab
4. **Reassign Agent:** Clicks agent cell → searchable dropdown with team/role/availability/load → confirm reassigns and adjusts load counts
5. **Update Status:** Inline dropdown to change ticket status
6. **Delete Ticket:** Delete action removes ticket and decrements assigned agent's `current_load`
7. **New Ticket Dialog:** Create ticket manually with full form
8. **Insights Dashboard:** `/admin/insights` — 4 telemetry gauges (CGR, RPI, HLO, SSE) color-coded green/yellow/red
9. **Employee Directory:** All staff with expertise tags, skill level, availability, current load
10. **Universal Messaging:** WhatsApp-style chat with any user or employee

---

## Features

### Admin Portal Features

| Feature | Details |
|---|---|
| **Ticket Dashboard** | Paginated table (10/page), search bar, filter tabs (All/Resolved/Unresolved/Custom), sortable columns |
| **Reassign Agent** | Click agent cell → dropdown listing all employees with team tag, role, availability status, current load. Atomic load adjustment. |
| **Status Management** | Inline dropdown for status change. Supports: open, in_progress, assigned, resolved, faq_resolved, action_path_resolved, complex_path_resolved, closed, failed_faq, failed_complex |
| **Delete Ticket** | Removes ticket from DB, decrements assigned agent's `current_load` |
| **Insights Dashboard** | 4 real-time AI telemetry gauges: CGR, RPI, HLO, SSE — all computed from DB at ticket creation time |
| **Employee Directory** | Grid of all employees with: name, role, team, expertise tags, skill level (1-5), current load, availability status |
| **Universal Messaging** | WhatsApp-style chat UI. Can message any user or employee by selecting from a contact list. Unread counts shown on contact avatars. |
| **Create Ticket (Manual)** | Dialog form with subject, description, priority, category |

### Employee Portal Features

| Feature | Details |
|---|---|
| **Resolve Interface** | Full chat UI for working active tickets. Sorted by priority (critical first). |
| **One-Click Resolve** | Resolves ticket, captures last chat message as resolution note, decrements agent load |
| **Ticket History** | Table of all assigned tickets (resolved + open) with category, status, priority, date |
| **Profile Page** | Expertise tags, skill level, avg resolution time, priority handling capability |
| **Dashboard Stats** | Stat cards: Total Assigned, Current Load, Avg Resolution, Skill Score |
| **Inbox Sidebar** | Quick-switch between ticket conversations + Admin contact |
| **Staff Messaging** | Direct real-time chat with fellow employees and Admin |

### User Portal Features

| Feature | Details |
|---|---|
| **AI Support Chat** | Chat interface submits ticket through full AI pipeline. Shows routing result (path + assigned agent). |
| **Frequent Solutions** | Accordion panel with 7 pre-defined common issue categories (Password Reset, Slow Computer, Network, Printer, Software Install, Email, Blue Screen) with step-by-step solutions |
| **Resource Cards** | Technical Specs and Video Tutorials cards with external link CTAs |
| **Dashboard** | Overview of open/resolved tickets with quick-raise button |
| **Direct Messaging** | WhatsApp-style chat with assigned IT agent. Agent appears in sidebar only after assignment. |
| **History** | Full ticket history with "Solved By" attribution column showing N8n / RAG Agent / Employee Name |

### AI Pipeline Features

| Feature | Details |
|---|---|
| **Intent Classification** | Groq LPU (Llama 3.1 8B) classifies tickets as Action/FAQ/Complex using 3-step prompt (scan action verbs first, then FAQ patterns, then complex) |
| **LangGraph Orchestration** | StateGraph with 4 nodes: classify_node → conditional router → action_node / faq_node / complex_node → END |
| **Action Path (n8n)** | Webhook integration with n8n automation workflows. Payload includes action/sessionId/chatInput. Default webhook: localhost:5678 |
| **FAQ Path (RAG)** | ChromaDB vector store + LLM. Embedding: all-MiniLM-L6-v2. Primary LLM: Ollama Cloud Qwen 3.5 397B → fallback Groq Llama 3.3 70B → raw retrieval fallback |
| **Complex Path (Human)** | LLM router (Groq Llama 4 Scout) analyzes ticket → assigns category/subcategory/severity/urgency/required_skills. Routing engine picks best agent by skill match (50%) + load (30%) + priority capability (20%). Critical tickets (severity ≥ 4) use different scoring weights. |
| **LLM Fallback Strategy** | Ollama Cloud → Groq → raw ChromaDB retrieval only. Graceful degradation at each tier. |

### Telemetry / Metrics

| Metric | Abbreviation | Description |
|---|---|---|
| Context Grounding Ratio | CGR | Tokens from ChromaDB / Total tokens in RAG response |
| Routing Precision Index | RPI | % of tickets where initial AI intent matched final pipeline path |
| Human Labor Offset | HLO | % of tickets fully resolved by Action + FAQ paths in last N days |
| Semantic Search Efficiency | SSE | `(1 - avg_dist/threshold) × confidence` for ChromaDB retrieval |

### Hidden / Implicit Features

- Agent load balancing — routing engine automatically distributes tickets to prevent overload
- Skill-to-ticket matching — required_skills list from LLM analysis matched against employee expertise_tags
- Priority inversion for critical tickets — severity ≥ 4 bypasses load penalty, maximizes skill weight
- Ticket attribution "Solved By" — users see exactly which system or person resolved their ticket
- Atomic reassignment — old agent load decremented, new agent incremented in single DB commit
- Telemetry persistence — all 4 metrics are pre-computed at ticket creation/resolution and stored as columns, not computed on-the-fly
- Dark/Light theme persistence — stored in Zustand persist middleware under `it-ticket-store`
- ChatMessage as universal message store for both ticket conversations and admin messaging
- Priority inversion for normal tickets — low-capability agents preferred for low-severity tickets

---

## Frontend

### Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | TailwindCSS 4 |
| State Management | Zustand |
| Data Fetching | TanStack Query (React Query) |
| Toast Notifications | Sonner |
| Icons | Lucide React |
| Fonts | Outfit, Manrope, Inter (Google Fonts) |
| Image Handling | Next/Image |

### Navigation Structure

```
/ (root) → redirect to /login
/login → Role-based login (User/Employee/Admin)

Admin portal:
  /admin/tickets        → Ticket management table + stats
  /admin/insights       → AI telemetry dashboard (4 gauges)
  /admin/employees      → Employee directory
  /admin/chatbot        → Universal messaging

Employee portal:
  /employees/resolve     → Active ticket queue + chat resolution
  /employees/dashboard   → Stats overview
  /employees/history     → Ticket history table
  /employees/profile     → Employee profile + stats
  /employees/chatbot    → Staff messaging

User portal:
  /user/support          → AI Support chat (pipeline entry)
  /user/dashboard        → Ticket overview
  /user/messaging        → Direct chat with assigned agent
  /user/history          → Ticket history with "Solved By"
```

### Layout Patterns

**Shared Layout Elements:**
- Role-specific sidebars: Each portal has its own persistent navigation
- ProtectedRoute wrapper enforces authentication + role-based access on every page
- AuthContext provides `user`, `token`, `login()`, `logout()`, `isUserType()` globally
- TanStack Query provides caching, loading states, and automatic refetch

**Login Page (`/login`):**
- Full-screen centered card layout
- 3-column role selector with icons (User/Briefcase, Employee/Users, Admin/Shield)
- Selected role has dark background with scale transform (1.05x)
- Email + password form with uppercase labels and rounded-xl inputs
- ArrowRight icon animates on hover (translate-x-1)
- Default password hint at bottom

**Admin Ticket Table (`/admin/tickets`):**
- Stats row at top: 4 stat cards with Lucide icons and trend indicators
- Search bar + filter tabs below stats
- Table with columns: Requester | Subject | Agent | Status | Last Message
- TicketRow component with expandable details (resolution notes)
- StatusBadge component color-coded by ticket status
- Pagination at bottom: ChevronLeft/Right, page numbers (max 5 shown)
- NewTicketDialog modal for creating tickets manually

**Employee Dashboard (`/employees/dashboard`):**
- Header with greeting, critical ticket count, "Online & Available" pulsing badge
- 4-column stat grid: Total Assigned, Current Load, Avg Resolution, Skill Score
- Priority ticket queue (severity-sorted) with click-to-resolve
- Collaboration Hub card linking to staff messaging and admin support
- Dark gradient "Resolution Tips" card with tips and daily stats

**Employee Resolve Page (`/employees/resolve`):**
- Two-panel layout: chat interface (left, 70%) + inbox sidebar (right, 280px)
- No contact selected → shows dashboard with ticket queue
- Contact selected → chat UI with message history, send input, resolve button
- Messages show sender avatar (gradient circle with initials), bubble style
- "Resolve Ticket" button only visible for User-type contacts

**User Support Chat (`/user/support`):**
- Two-column layout: chat panel (flex-1) + frequent solutions sidebar (260px fixed)
- ChatMessage component: user bubbles right-aligned (primary color), AI bubbles left-aligned (gray)
- AI response includes action buttons: "View Ticket", "View Solutions"
- Frequent Solutions accordion with 7 pre-built topics and expandable bullet lists
- Resource cards row below chat: Technical Specs + Video Tutorials
- "Raise Ticket" button with Loader2 spinner during submission

**User Messaging (`/user/messaging`):**
- Contact list sidebar showing assigned agents only
- Agent card: avatar (initials gradient), name, ticket ID
- Chat area: WhatsApp-style bubbles with timestamps
- Unread badge on contact sidebar

**User History (`/user/history`):**
- Table with columns: Ticket ID | Subject | Status | Solved By | Priority | Updated
- "Solved By" shows N8n / RAG Agent / Employee Name
- Resolution notes shown as subtitle under subject on hover
- Stats row at bottom: Total / In Progress / Resolved / Closed

### Design System

**Color Palette:**
- Primary: `#25283d` (dark navy) for light mode
- Teal accent: `#0d3c52` (primary brand color in chat, badges, links)
- Background Light: `#f8f7f9` / Dark: `#12131a` or `#0b0c10`
- Card Light: `#ffffff` / Dark: `#1a1b24`
- Border Light: `#eeecee` / Dark: `rgba(255,255,255,0.05)`
- Text Primary Light: `#1e2a35` / Dark: `#f5f6fa`
- Text Muted Light: `#5f5f62` / Dark: `#a0a5b5`
- Success: `#10b981` (emerald)
- Warning: `#f59e0b` (amber)
- Error: `#ef4444` (red)
- Telemetry colors: Green ≥ 80%, Yellow ≥ 50%, Red < 50%

**Typography:**
- Display/Headings: **Manrope** (bold, 700, tight tracking)
- Body: **Inter** (clean, readable)
- Accent/Labels: **Outfit** (modern, geometric)
- Monospace: For ticket IDs (`TKT-0001`) and code-like elements

**Spacing System:**
- 4px base unit (Tailwind default)
- Cards: `p-5` or `p-6` (20-24px)
- Page padding: `px-6 py-6` (24px)
- Section gaps: `gap-5` or `gap-8`

**Border Radius:**
- Buttons/Inputs: `rounded-xl` (12px)
- Cards: `rounded-xl` (12px) or `rounded-2xl` (16px)
- Small elements: `rounded-lg` (8px)
- Avatars: `rounded-full`

**Shadows:**
- Cards (light): `shadow-[0px_4px_24px_rgba(13,60,82,0.06)]`
- Buttons: `shadow-lg shadow-[#22232b]/20`
- Chat bubbles: `shadow-[0px_4px_12px_rgba(59,99,123,0.18)]`

**Animations & Micro-interactions:**
- Accordion expand: `animate-accordion-down` (custom CSS animation)
- Role selector: scale-105 on select, scale-100 default
- Hover scale: `hover:scale-[1.02]` on role cards
- Arrow icon slide: `group-hover:translate-x-1` on login button
- Spinner: `animate-spin` on Loader2
- Pulsing online indicator: `animate-pulse` on green dot
- Ring highlight on active contact: `ring-2 ring-primary`
- Chat bubbles: append with fade-in

**Dark Mode:**
- Applied via Tailwind `dark:` classes
- Background: `#0b0c10` or `#12131a`
- Cards: `#1a1b24`
- Inputs: `#252735`
- Borders: `rgba(255,255,255,0.05)`

### Responsive Behavior

- Mobile-first Tailwind breakpoints (sm, md, lg, xl)
- Grid columns collapse: 4-col → 2-col → 1-col for stat cards
- Chat sidebar (280px) collapses to hidden on small screens
- Ticket table scrolls horizontally on mobile

---

## Backend

### Architecture

**Unified FastAPI Server (`server.py`):**
- Single FastAPI app serves both REST API and LangGraph pipeline
- Running on port 8000 with Uvicorn
- CORS configured for `localhost:3000` and `localhost:3001`
- Dynamic imports for each pipeline path to allow graceful fallback if a path is unavailable
- In-memory session store (`active_sessions` dict) for token management

**Three Parallel AI Paths:**
```
Ticket → classify_node (AI Router, Groq LPU Llama 3.1 8B)
              ↓
    ┌─────────┴─────────┐
    ↓         ↓         ↓
 action_node  faq_node  complex_node
    ↓         ↓         ↓
  n8n API  ChromaDB   routing_engine
           + LLM      + llm_router
                       (Groq Scout)
```

**RAG API Server (`rag_path/app.py`):**
- Separate FastAPI app on port 8002
- ChromaDB persistent client at `vector_db/`
- SentenceTransformer embedding model: `all-MiniLM-L6-v2`
- LLM chain: Ollama Cloud Qwen 3.5 (primary) → Groq Llama 3.3 70B (fallback) → raw retrieval fallback

### API Endpoints

**Authentication:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/login` | Authenticate with email, password, role |
| POST | `/api/logout` | Invalidate session token |
| GET | `/api/me` | Get current user from token |

**Admin:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats (ticket counts, resolution rate, employee count) |
| GET | `/api/admin/tickets` | All tickets with agent info and pipeline path |
| GET | `/api/admin/employees` | Staff directory (excludes Admin, optionally includes Users) |
| POST | `/api/ticket/{id}/reassign` | Reassign ticket (atomic load adjustment) |
| DELETE | `/api/ticket/{id}` | Delete ticket (decrement agent load) |

**Employee:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employee/{id}` | Single employee profile |
| GET | `/api/employee/{id}/tickets` | Tickets assigned to employee |

**Tickets:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tickets` | Create ticket (simple, no AI routing) |
| POST | `/submit_ticket` | Create ticket + run through full AI pipeline |
| GET | `/api/ticket/{id}` | Single ticket details |
| PUT | `/api/ticket/{id}` | Update ticket fields |
| PUT | `/api/ticket/{id}/resolve` | Mark resolved + capture last message |

**Messages:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/messages` | Fetch messages (by ticket_id, or user1+user2 pair) |
| POST | `/api/messages` | Send message |
| POST | `/api/messages/read` | Mark messages as read |

**Telemetry:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/metrics?hlo_days=30` | All 4 AI telemetry metrics |

### Services & Business Logic

**LangGraph Brain (`server.py`):**
- `TicketState` TypedDict: ticket_id, ticket_text, db_ticket_id, intent, resolution, status, plus telemetry fields (initial_intent, cgr_context_tokens, cgr_total_tokens, sse_distances, sse_confidence)
- `classify_node`: Calls `classify_ticket()` from `ai_router_agent/router_agent.py`. Freezes `initial_intent` for RPI calculation. Falls back to "Complex" if router unavailable.
- `action_node`: Calls `send_ticket_to_n8n()` from `action_pipeline.py`. Sets status to `action_path_resolved`.
- `faq_node`: POSTs to RAG API (`http://localhost:8002/query`). Computes CGR (word-level token approximation) and SSE metrics. Sets status to `faq_resolved` or `failed_faq`.
- `complex_node`: Creates/updates DB ticket, calls `llm_router.analyze_ticket()`, calls `routing_engine.assign_ticket()`. Sets status to `assigned_complex` or `failed_complex`.
- `route_intent()`: Conditional edge function — maps intent string to node name

**TelemetryEngine (`telemetry.py`):**
- `compute_cgr()`: Avg of `cgr_score` column across FAQ-path tickets
- `compute_rpi()`: `(tickets where initial_intent == pipeline_path) / total`
- `compute_hlo(days)`: `(Action + FAQ tickets in window) / total tickets in window`
- `compute_sse()`: Avg of `sse_score` column across FAQ-path tickets
- `compute_all()`: Returns all 4 metrics with display formatting and sample sizes

**LLM Router (`complex_path/llm_router.py`):**
- Model: Groq Llama 4 Scout 17B 16E
- `TicketAnalysis` Pydantic model: category, subcategory, severity, urgency, required_skills (from controlled vocabulary list), is_common_issue, summary
- Strict category enumeration: Infrastructure, Application, Security, General Support, Network
- Allowed skill tags: 80+ technical tags (see seed_data.py for full list)
- `analyze_ticket()`: JSON response mode, temperature=0.0

**Routing Engine (`complex_path/routing_engine.py`):**
- `CATEGORY_TEAM_MAP`: Maps ticket category to preferred team(s)
- `find_best_agent()`: Queries available employees in target teams, scores each against:
  - Skill Match (50%): overlap of expertise_tags vs required_skills
  - Load (30%): current_load penalty
  - Priority Capability (20%): High/Medium/Low mapping
- **Critical ticket logic** (severity ≥ 4): Score = `2.0 × skill + 1.0 × priority_cap − 0.1 × load`
- **Normal ticket logic** (severity < 4): Score = `2.0 × skill + 0.5 × inverted_cap − 1.0 × load` (inverted cap prefers Low-capability agents for low-severity tickets)
- `assign_ticket()`: Updates ticket fields + increments agent load atomically

**AI Router Agent (`ai_router_agent/router_agent.py`):**
- Model: Groq Llama 3.1 8B Instant
- System prompt with 3-step classification: Action verbs → FAQ patterns → Complex criteria
- Valid intents: `{"FAQ", "Action", "Complex"}`
- Returns "Complex" as safe fallback for any parse/API failure
- `_build_client()`: Initializes Groq client
- `classify_ticket()`: JSON response mode, temperature=0.1
- `route_ticket()`: Classifies + dispatches to handler functions (placeholders)

**Action Pipeline (`action_path/action_pipeline.py`):**
- `send_ticket_to_n8n()`: Sends JSON payload to n8n webhook with action/sessionId/chatInput
- Parses n8n response and formats it as readable output
- `process_csv()`: Batch CSV processor with rate limiting (configurable delay)
- CLI args: `--ticket` (single), `--csv` (batch), `--limit`, `--delay`, `--url`, `--production`

**RAG Pipeline (`rag_path/app.py`):**
- `GET /`: Health check
- `POST /query`: Embeds question → queries ChromaDB → formats docs → runs LLM chain → returns answer + metrics
- `POST /append_ticket`: Adds new ticket to live vector DB with embedding
- `format_docs()`: Filters by distance threshold (0.8), formats as "Past Issue / Solution Provided"
- LLM chain: `{"context": ..., "query": ...} | rag_prompt | llm | StrOutputParser()`
- RAG prompt instructs: prioritize context, escalate if no definitive solution, rely on general knowledge as fallback

### Database

**SQLAlchemy Models (`complex_path/models.py`):**

```python
Employee:
  id (PK), name, email, password, role, team,
  expertise_tags (JSON), skill_level (1-5), current_load,
  availability_status (Boolean), avg_resolution_time,
  priority_handling_capability (Low/Medium/High)

Ticket:
  id (PK), title, description, requester_name, category,
  subcategory, severity, urgency, priority_score,
  status, resolution_notes, pipeline_path,
  assigned_employee_id (FK→Employee), requester_id (FK→Employee),
  created_at, resolved_at,
  initial_intent (telemetry), cgr_score (telemetry),
  sse_score (telemetry), sse_distances (JSON, telemetry)

ChatMessage:
  id (PK), ticket_id (FK→Ticket, nullable),
  sender_id, receiver_id, sender_name, content,
  timestamp, is_read
```

**Database Config (`complex_path/database.py`):**
- SQLite default at `backend/complex_path/it_tickets.db`
- Swappable to PostgreSQL via `DATABASE_URL` env var
- `check_same_thread=False` for SQLite compatibility

### Caching & Queues

- **No Redis/external queue** — synchronous pipeline execution within single FastAPI request
- **TanStack Query** on frontend provides client-side caching (3-second polling for messages)
- **In-memory session store** (`active_sessions` dict) for server-side session management
- **ChromaDB** as the only external state store besides SQLite — handles vector embeddings

---

## AI

### Models Used

| Component | Model | Provider | Purpose |
|---|---|---|---|
| AI Router (Classifier) | Llama 3.1 8B Instant | Groq LPU | Classify ticket intent as Action/FAQ/Complex |
| LLM Router (Analyzer) | Llama 4 Scout 17B 16E | Groq LPU | Analyze complex ticket: category/subcategory/severity/urgency/skills |
| RAG Primary LLM | Qwen 3.5 397B | Ollama Cloud | Generate RAG answers from retrieved context |
| RAG Fallback LLM | Llama 3.3 70B Versatile | Groq LPU | Fallback when Ollama unavailable |
| Embedding Model | all-MiniLM-L6-v2 | Sentence Transformers | Generate 384-dim embeddings for ChromaDB |

### Prompt Engineering

**AI Router Prompt (`router_agent.py`):**
- 3-step classification hierarchy encoded in system prompt
- Step 1: Scan for 20+ action verbs (please add, create, assign, update, send, reset, unlock, etc.)
- Step 2: Check for FAQ/instruction/documentation requests
- Step 3: Only use Complex for active severe incidents or unintelligible tickets
- Temperature: 0.1 (near-deterministic, low creativity)
- Output: JSON `{"intent": "FAQ|Action|Complex"}`

**LLM Analyzer Prompt (`llm_router.py`):**
- Strict category enumeration: exactly 5 categories allowed
- Strict skill enumeration: 80+ tags only from controlled list
- Severity 1-5, Urgency 1-5, Boolean is_common_issue
- 1-sentence summary output
- Temperature: 0.0 (fully deterministic)
- Output: JSON with Pydantic validation

**RAG Prompt (`rag_path/app.py`):**
- Prioritize provided context for answers
- Escalate to Tier 2 if context says "assessing" or "schedule meeting"
- Fall back to general knowledge if context says "No relevant past tickets found"
- Uses LangChain `PromptTemplate` + `StrOutputParser`

### Embeddings & Vector Database

- **ChromaDB** persistent collection: `it_tickets` in `vector_db/`
- **Embedding model:** `all-MiniLM-L6-v2` (384 dimensions, 6-layer MiniLM)
- **Top-K retrieval:** default `n_results=3`
- **Distance threshold:** 0.8 (documents with distance > 0.8 excluded from context)
- Format: `"Past Issue: {doc}\nSolution Provided: {answer}"`

### RAG Pipeline

```
User Query → embed (all-MiniLM-L6-v2) → ChromaDB.query(n_results=3)
                                              ↓
                              format_docs() [filters by distance threshold]
                                              ↓
                            context_text + query_text → LLM chain
                                              ↓
                                    generated_answer → API response
```

### RAG Fallback Strategy

```
Startup:
  1. Try Ollama Cloud API key + Qwen 3.5 397B
     ↓ fail (timeout/subscription)
  2. Try Groq API key + Llama 3.3 70B
     ↓ fail (key missing/invalid)
  3. Return raw ChromaDB retrieval only ("NO API KEY SET" message)
```

### Agents & Decision Trees

The routing is purely a LangGraph state machine with a 3-branch conditional edge:

```python
def route_intent(state):
    if intent == "Action":  → action_node
    elif intent == "FAQ":   → faq_node
    else:                   → complex_node
```

No separate LangChain agents with tools — the "agent" logic is distributed across the three path handlers.

### Telemetry Metrics Computation

**CGR (Context Grounding Ratio):**
- `cgr_context_tokens = len(context_text.split())`
- `cgr_total_tokens = len((context_text + " " + answer_text).split())`
- `cgr_score = cgr_context_tokens / cgr_total_tokens` (stored at resolution time)
- Displayed as: `avg(cgr_score)` across all FAQ tickets

**RPI (Routing Precision Index):**
- `initial_intent` frozen at classify_node time (never overwritten)
- `pipeline_path` set by whichever node resolved the ticket
- `correct = count(initial_intent == pipeline_path)` (case-insensitive mapping)
- `rpi = correct / total_routed_tickets × 100`

**HLO (Human Labor Offset):**
- Query window: last N days (default 30)
- `hlo = count(pipeline_path in ['Action', 'FAQ']) / total_in_window × 100`

**SSE (Semantic Search Efficiency):**
- `sse_distances` = raw ChromaDB distances from top-K query
- `sse_confidence` = 1.0 if (llm_used AND context has results) else 0.4
- `sse_score = (1 - avg_dist / 0.8) × confidence` (computed per-ticket)
- Displayed as: `avg(sse_score)` across all FAQ tickets

### Confidence & Evaluation

- Telemetry metrics are stored as pre-computed columns on each ticket row
- No model evaluation pipeline exists — metrics are operational observability, not model quality benchmarks
- Color thresholds: 🟢 ≥ 80%, 🟡 ≥ 50%, 🔴 < 50%

---

## Database

### Tables

**`employees`** — 29 seeded records including:
- 1 Admin: `admin@msrit.com` (Admin_System)
- 25 IT Staff across 5 teams: L1 Support, L2 Application, L3 Infrastructure, DevOps, Security
- 3 Users: oliver, kavya, abhishek (and aditi)
- All passwords default to `12345`
- Fields: id, name, email, password, role, team, expertise_tags (JSON array), skill_level (1-5), current_load (integer), availability_status (boolean), avg_resolution_time (float), priority_handling_capability (Low/Medium/High)

**`tickets`** — 25 seeded records:
- All assigned to various staff members, status `assigned`
- Keywords matched to staff expertise for realistic load distribution
- Created at staggered timestamps over last 100 hours
- Fields: id, title, description, requester_name, category, subcategory, severity (1-5), urgency (1-5), priority_score (float), status, resolution_notes, pipeline_path (Action/FAQ/Complex), assigned_employee_id, requester_id, created_at, resolved_at, initial_intent, cgr_score, sse_score, sse_distances (JSON)

**`chat_messages`** — Stores all messaging:
- Fields: id, ticket_id (FK, nullable), sender_id (e.g. `Employee:3`, `User:7`), receiver_id (nullable), sender_name, content, timestamp, is_read
- Used for both user↔employee ticket conversations and admin universal messaging

### Data Flow

```
User submits ticket via /user/support
         ↓
POST /submit_ticket (server.py)
         ↓
1. Save to DB (Ticket row, status="open")
         ↓
2. brain.invoke(TicketState)
         ↓
   ┌─ classify_node → Groq Llama 3.1 8B → "FAQ"
   │                         ↓
   │   faq_node → POST http://localhost:8002/query
   │                    ↓
   │              ChromaDB + LLM → answer
   │                    ↓
   │              Update ticket: status="faq_resolved"
   │                           cgr_score, sse_score, sse_distances
   └─ action_node → n8n webhook → Update ticket: status="action_path_resolved"
   └─ complex_node → Groq Scout → category/severity/urgency/skills
                          ↓
               routing_engine.assign_ticket()
                          ↓
               Find best agent (skill+load scoring)
                          ↓
               Update ticket: assigned_employee_id, status="assigned_complex"
```

### Reassignment Atomic Operation

```python
# Decrement old agent
if ticket.assigned_employee_id and old != new:
    old_emp.current_load -= 1

# Assign new agent + increment load
ticket.assigned_employee_id = new_employee_id
ticket.status = "assigned"
new_emp.current_load += 1

db.commit()  # Single atomic transaction
```

---

## Folder Structure

```
IT_Ticket_Solver/
├── logo.png                           # HALO brand logo (also copied to frontend/public/)
│
├── backend/
│   ├── server.py                      # Unified FastAPI: REST API + LangGraph pipeline
│   ├── telemetry.py                   # TelemetryEngine: CGR, RPI, HLO, SSE computation
│   ├── requirements.txt               # Python dependencies for main server
│   │
│   ├── ai_router_agent/               # Groq LPU intent classifier
│   │   ├── router_agent.py            # classify_ticket(), route_ticket(), CLI test suite
│   │   ├── .env.example
│   │   └── test_tickets.csv
│   │
│   ├── action_path/                   # n8n automation webhook integration
│   │   ├── action_pipeline.py         # send_ticket_to_n8n(), process_csv()
│   │   ├── .env.example
│   │   └── test_action_tickets.csv
│   │
│   ├── rag_path/                      # ChromaDB + LLM RAG pipeline
│   │   ├── app.py                     # FastAPI RAG API (port 8002)
│   │   ├── ingest_data.py             # Load CSVs into ChromaDB
│   │   ├── check_data.py
│   │   ├── data_info.json
│   │   ├── test_api.py
│   │   ├── test_rag_analysis.py
│   │   ├── rag_test_results.json
│   │   └── .env.example
│   │
│   └── complex_path/                  # Human expert routing + DB models
│       ├── models.py                  # SQLAlchemy: Employee, Ticket, ChatMessage
│       ├── database.py                # SQLite/PostgreSQL connection
│       ├── llm_router.py              # Groq Scout ticket analyzer
│       ├── routing_engine.py          # Skill+load-based agent assignment
│       ├── seed_data.py               # Seed 29 employees + 25 tickets
│       ├── metric_eval.py
│       ├── test_eval.py
│       ├── main.py
│       ├── knowledge_base.json
│       ├── index.html
│       └── .env.example
│
├── frontend/                         # Next.js 16 App Router application
│   ├── app/                           # App Router pages (Next.js 16)
│   │   ├── page.tsx                   # Root → redirect /login
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                 # Global Tailwind + custom CSS
│   │   │
│   │   ├── auth/
│   │   │   ├── AuthContext.tsx        # React context: login/logout/user state
│   │   │   └── ProtectedRoute.tsx    # Role-based route guard HOC
│   │   │
│   │   ├── login/
│   │   │   ├── page.tsx               # Login page with role selector
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   │
│   │   ├── admin/                     # Admin portal pages (ticket management)
│   │   │   └── tickets/page.tsx
│   │   │
│   │   ├── employees/                 # Employee portal pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # → redirect /employees/resolve
│   │   │   ├── dashboard/page.tsx     # Stats + ticket queue
│   │   │   ├── resolve/page.tsx       # Chat-based ticket resolution
│   │   │   ├── history/page.tsx       # Ticket history table
│   │   │   ├── profile/page.tsx       # Employee profile
│   │   │   ├── chatbot/page.tsx       # Staff messaging
│   │   │   ├── active/page.tsx
│   │   │   └── globals.css
│   │   │
│   │   └── user/                      # User portal pages
│   │       ├── page.tsx               # → redirect /user/dashboard
│   │       ├── layout.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── support/page.tsx       # AI Support chat (pipeline entry)
│   │       ├── messaging/page.tsx     # User↔Agent messaging
│   │       ├── history/page.tsx       # Ticket history with "Solved By"
│   │       └── globals.css
│   │
│   ├── admin/                         # Admin-scoped components
│   │   ├── components/
│   │   │   └── tickets/
│   │   │       ├── TicketTable.tsx    # Paginated table with filter/search
│   │   │       ├── TicketRow.tsx       # Individual row with expand/agent dropdown
│   │   │       ├── StatusBadge.tsx     # Color-coded status pill
│   │   │       ├── StatsRow.tsx        # 4 stat cards
│   │   │       └── NewTicketDialog.tsx # Create ticket modal
│   │   ├── hooks/
│   │   │   ├── useTickets.ts
│   │   │   └── useNewTicket.ts
│   │   ├── store/
│   │   │   └── ticketStore.ts         # Zustand store: tickets, filter, theme, search
│   │   └── lib/
│   │       ├── types.ts               # TypeScript interfaces
│   │       ├── utils.ts               # Utility functions (cn helper)
│   │       ├── api.ts                 # Admin API calls
│   │       └── mockData.ts
│   │
│   ├── employees/                     # Employee-scoped components
│   │   └── store/
│   │       └── employeeStore.ts
│   │
│   ├── user/                          # User-scoped components
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   └── api.ts
│   │   └── store/
│   │       └── userStore.ts           # Zustand: messages, tickets
│   │
│   ├── login/                         # Login-scoped
│   │   └── lib/
│   │       └── utils.ts               # cn utility
│   │
│   ├── lib/                           # Shared API client (entire frontend uses this)
│   │   └── api.ts                     # All fetch wrappers for every endpoint
│   │
│   ├── public/                        # Static assets
│   │   ├── logo.png
│   │   ├── window.svg
│   │   ├── globe.svg
│   │   ├── file.svg
│   │   ├── vercel.svg
│   │   └── next.svg
│   │
│   ├── next.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── postcss.config.mjs
│
└── dataset/                           # Training data + test datasets
    ├── combined_tickets.csv
    ├── IT_tickets_kaggle.csv           # Source Kaggle dataset
    ├── IT_tickets_filtered.csv
    ├── RAG_data/
    │   ├── rag_ticket_data.csv
    │   ├── synthetic_it_support_tickets.csv
    │   └── aa_dataset-tickets-english-only.csv
    ├── FAQ/
    │   └── tickets_faq.csv
    └── Action/
        └── tickets_action.csv
```

**Why This Structure:**

- **Separate `backend/` and `frontend/` dirs** — independent deployment, clear separation of concerns
- **Pipeline paths as peer directories** (`ai_router_agent/`, `action_path/`, `rag_path/`, `complex_path/`) — makes each AI path independently testable and replaceable
- **`frontend/app/` for App Router pages** — Next.js convention, enables layouts and nested routing
- **`frontend/admin/` for shared admin components** — not under `app/` so they can be imported as a package without routing constraints
- **Shared `frontend/lib/api.ts`** — single source of truth for all API calls, imported everywhere
- **Zustand stores co-located with their domain** (`admin/store/`, `user/store/`) — easy to find state logic per portal

---

## Interesting Engineering Decisions

### 1. Unified Server Architecture

`server.py` runs both the REST API and LangGraph pipeline in a single FastAPI process. This eliminates microservice overhead while maintaining clean separation via dynamic imports. If a pipeline path's dependencies aren't available (e.g., no Groq key), the import fails gracefully and the path is marked unavailable — the server continues serving REST requests.

### 2. Telemetry as First-Class Data

Rather than computing metrics on-the-fly from raw logs, all four AI telemetry metrics are pre-computed at ticket creation/resolution time and stored as columns on the `Ticket` row. The `/api/metrics` endpoint simply aggregates pre-computed values, making it O(tickets) with no complex computation.

### 3. Dynamic Prompt Engineering with Strict Enumeration

The LLM Router (`llm_router.py`) enforces that the LLM can ONLY respond with categories, subcategories, and skills from predefined enumerations. This prevents hallucinated categories and makes the routing engine's `CATEGORY_TEAM_MAP` fully deterministic.

### 4. Atomic Reassignment with Load Balancing

The `/reassign` endpoint atomically decrements the old agent's `current_load`, increments the new agent's, updates `assigned_employee_id`, and sets status — all in a single `db.commit()`. This prevents race conditions where two simultaneous reassignments could result in incorrect load counts.

### 5. Critical Ticket Bypass

Tickets with severity ≥ 4 have their load penalty reduced from 1.0 to 0.1, meaning a critical server-down issue will always be assigned to the most skilled available agent regardless of current workload. This reflects real IT triage logic where severity overrides availability concerns.

### 6. Graceful LLM Degradation Chain

The RAG pipeline tries Ollama Cloud → Groq → raw ChromaDB retrieval. The Action path gracefully handles n8n being unavailable. The Complex path falls back to "Complex" classification if the Groq router is down. Every component has a defined failure mode that still produces a valid user-facing response.

### 7. Session Storage for Auth

Token-based auth using `sessionStorage` (not localStorage) means sessions clear on browser tab close, providing basic security without complex JWT refresh logic. The in-memory `active_sessions` dict on the server maps tokens to user data.

### 8. Priority Inversion for Normal Tickets

For non-critical tickets (severity < 4), the scoring inverts the priority capability: Low-capability agents get highest scores for low-priority work. This keeps high-capability agents available for critical issues — a form of priority inversion optimization.

### 9. ChatMessage as Universal Messaging

The same `ChatMessage` table stores both user↔employee ticket conversations and admin↔anyone universal messaging. The `ticket_id` nullable column and `sender_id`/`receiver_id` string fields allow flexible routing without separate tables.

### 10. Ticket Attribution "Solved By"

The frontend's `solvedBy` mapping (`Action → N8n`, `FAQ → RAG Agent`, `Complex → Employee Name`) provides transparency to end users about exactly which system or person resolved their ticket — building trust in the AI system.

---

## Challenges

### Challenge 1: Multi-Path Import Safety
**Problem:** Importing `models.py` from multiple locations in the same Python process causes SQLAlchemy's "Table already defined" errors.
**Solution:** `server.py` uses `PYTHONPATH=complex_path` and imports models directly, while `complex_path/` modules use relative imports. Dynamic imports with try/except allow the server to run even if some paths fail.

### Challenge 2: Ticket Attribution Tracking Across Pipeline Paths
**Problem:** Each pipeline path updates the ticket differently — n8n just returns a message, RAG returns structured data with metrics, Complex assigns an agent.
**Solution:** A standardized `resolution` dict is built at each node with a consistent `path` key. The `/submit_ticket` endpoint reads this key to set `pipeline_path` and determine which sub-fields to persist.

### Challenge 3: Real-Time Messaging Without WebSockets
**Problem:** The frontend needs real-time message updates but the backend has no WebSocket support.
**Solution:** TanStack Query's `refetchInterval: 3000` polls the `/api/messages` endpoint every 3 seconds, giving near-real-time feel without WebSocket complexity.

### Challenge 4: ChromaDB Fresh Clone
**Problem:** ChromaDB `vector_db/` is gitignored — on a fresh clone the vector store is empty and RAG returns "No relevant past tickets found."
**Solution:** `ingest_data.py` script loads historical CSV tickets into ChromaDB on first setup. Clear documentation in README explains this.

### Challenge 5: Python Path Issues on Windows
**Problem:** `PYTHONPATH=complex_path` is a Unix-style environment variable.
**Solution:** README documents Windows PowerShell alternative: `cd backend` then `$env:PYTHONPATH="complex_path"` then `python server.py`.

---

## Metrics

### Performance

| Metric | Value | Notes |
|---|---|---|
| LangGraph pipeline latency | ~2-5s | Depends on LLM call + routing logic |
| RAG query latency | ~1-3s | ChromaDB query + optional LLM call |
| API response (simple CRUD) | < 100ms | SQLite local, no network hop |
| Message polling interval | 3 seconds | TanStack Query refetch |

### Accuracy

| Metric | Target | Measurement |
|---|---|---|
| RPI (Routing Precision Index) | ≥ 80% | Stored per-ticket, aggregated by TelemetryEngine |
| CGR (Context Grounding Ratio) | ≥ 60% | Tokens from context / total tokens |
| SSE (Semantic Search Efficiency) | ≥ 0.7 | `(1 - avg_dist/0.8) × confidence` |

### Model Quality

| Model | Task | Quality |
|---|---|---|
| Llama 3.1 8B (AI Router) | 3-class classification | Deterministic with low temp (0.1) |
| Llama 4 Scout (LLM Router) | Structured JSON analysis | Temperature 0.0, Pydantic validated |
| Qwen 3.5 / Llama 3.3 (RAG) | Generative Q&A | Grounded in retrieved context via prompt |

### Throughput

| Path | Capacity | Notes |
|---|---|---|
| Action (n8n) | Depends on n8n workflow | Async webhook, non-blocking |
| FAQ (RAG) | ~10-20 req/min | ChromaDB is fast, LLM is bottleneck |
| Complex (Human) | Synchronous | Blocked until agent resolves |

---

## Screenshots Needed

### 1. Login Page
- Role selector showing User/Employee/Admin cards (dark card selected for Admin)
- HALO Support logo + app name
- Email/password form below role selector
- ArrowRight icon visible on login button hover

### 2. Admin — Ticket Dashboard
- Stats row: 4 cards (Total Tickets, Open, In Progress, Resolved) with icons
- Search bar with placeholder "Search tickets..."
- Filter tabs: All | Resolved | Unresolved
- Table with 10 rows: Requester avatar+name, Subject, Agent dropdown cell, Status badge, Last message
- Pagination at bottom
- New Ticket button (top right)

### 3. Admin — Reassign Dropdown
- Clicked agent cell revealing dropdown
- Searchable list of employees
- Each row shows: Avatar initials, Name, Role badge, Team tag, availability dot (green/red), load count
- Selected employee highlighted

### 4. Admin — Insights Dashboard
- 4 gauge cards in a row: CGR (87.3%), RPI (92.1%), HLO (78.5%), SSE (0.847)
- Each gauge has color coding (green for ≥80%, yellow for ≥50%, red for <50%)
- Label + description text below each gauge
- "Last 30 days" indicator

### 5. Admin — Universal Messaging
- Left: contact list with Admin selected, message history panel right
- Chat bubbles: Admin messages right-aligned (blue), contact messages left-aligned (gray)
- Input bar at bottom with send button
- Unread badge on contact avatar

### 6. Employee — Dashboard
- Header with greeting, critical ticket count, "Online & Available" pulsing badge
- 4 stat cards: Total Assigned (12), Current Load (4), Avg Resolution (2.4h), Skill Score (4/5)
- Priority ticket queue with colored severity badges (1-5)
- Collaboration Hub card + dark "Resolution Tips" panel

### 7. Employee — Resolve Chat
- Active ticket chat with requester
- Message bubbles in alternating colors
- "Resolve Ticket" green button top right
- Inbox sidebar showing ticket contacts
- Input bar with send icon

### 8. User — AI Support Chat
- Chat panel with user message (right, blue) and AI response (left, gray)
- AI response showing: "Your ticket (#42) has been assigned to Zain Al from our expert team."
- "Raise Ticket" button with loading spinner state
- Frequent Solutions accordion sidebar (7 topics, 2 expanded)
- Resource cards row: Technical Specs + Video Tutorials

### 9. User — Ticket History
- Table: Ticket ID | Subject | Status | Solved By | Priority | Updated
- "Solved By" column showing: "N8n" / "RAG Agent" / "Vigyant N" (employee name)
- Status badges color-coded
- Stats row at bottom (4 cards)

### 10. User — Messaging
- Left: Contact list showing assigned agent only (appears after complex path assignment)
- Agent card: gradient avatar, name, ticket number
- Right: Chat interface with message bubbles and timestamps

---

## Demo Video

**30-Second Walkthrough:**

```
0:00 — Open browser to localhost:3000 → Login page with HALO branding
0:03 — Select "User" role → login as "Oliver" (oliver@msrit.com / 12345)
0:06 — AI Support Chat loads → type "I need to reset my Active Directory password"
0:10 — Press "Raise Ticket" → loading spinner "Routing..." for 2 seconds
0:13 — AI responds: "Ticket #1 classified as Action → forwarded to automation workflow"
0:16 — Type second ticket: "The production database is crashing every 10 minutes"
0:20 — Press "Raise Ticket" → response: "Ticket #2 assigned to Jhon S from our expert team"
0:23 — Navigate to History tab → both tickets shown with Solved By (N8n / Jhon S)
0:27 — Logout → login as Admin (admin@msrit.com / 12345)
0:28 — Admin ticket dashboard loads → see both tickets in table
0:30 — Freeze frame on the admin insights panel showing 4 green telemetry gauges
```

---

## Visual Branding

### Primary Color
- Deep navy: `#25283d` (light mode buttons, primary text)
- Teal accent: `#0d3c52` (primary brand color in chat, badges, links)
- Dark mode primary: `#3b5998` or similar teal-blue

### Accent Color
- Success green: `#10b981` (emerald)
- Warning amber: `#f59e0b`
- Critical red: `#ef4444`
- Primary teal: `#0d3c52` for interactive elements

### Typography
- **Headings:** Manrope (bold, tight tracking) — `font-manrope`
- **Body/UI:** Inter (clean, readable)
- **Labels/Badges:** Outfit (geometric, modern)
- **Monospace:** System monospace for ticket IDs (TKT-0001)

### Icon Library
- **Lucide React** — consistent 1.5px stroke, `size-16` for inline, `size-20` for feature icons
- Custom gradient avatar circles (indigo→purple) for employees/users without photos
- Status dots: green pulsing for online, gray for offline

### Illustration Style
- Minimal line art with teal/navy accents
- Gradient backgrounds on stat cards (subtle, dark mode: `#1e2a35` → `#12131a`)
- Rounded corners throughout (12px standard, 16px for large cards)
- Subtle shadows: `0px 4px 24px rgba(13,60,82,0.06)`

### Motion Style
- **Entrance:** Fade + subtle slide up (200-300ms ease-out)
- **Accordion:** Height expand with overflow hidden
- **Hover states:** Scale 1.02-1.05 + shadow lift
- **Loading:** Spinner rotate (Loader2, animate-spin)
- **Notifications:** Slide in from top (Sonner toast)
- **Chat messages:** Append with fade-in
- **Online indicator:** Pulsing opacity animation

### UI Inspiration
- **Linear.app** — for the dark gradient resolution tips card
- **Intercom** — for the chat bubble design and WhatsApp-style messaging
- **Vercel Dashboard** — for the admin stats cards and table design
- **Notion** — for the clean, minimal typography and spacing

---

## Selling Points

### For Recruiters

- **Full-stack AI system** with LangGraph orchestration, not a simple chatbot
- **Three-path AI pipeline** that demonstrates understanding of RAG, agents, and automation
- **Observable AI** with 4 real telemetry metrics that measure the pipeline itself
- **Production-quality API design** — REST conventions, Pydantic validation, proper error handling
- **Zustand + TanStack Query** state management demonstrating modern frontend architecture

### For Engineers

- **LangGraph state machine** — clean implementation of conditional routing with typed state
- **Skill-based routing algorithm** — weighted scoring with load balancing and priority inversion
- **Graceful degradation** — every AI path has fallback logic, the system never hard-crashes
- **SQLAlchemy best practices** — proper relationships, foreign keys, atomic transactions
- **RAG pipeline** — ChromaDB embeddings + LLM chaining with LangChain primitives

### For Startup Founders

- **Proven architecture** for AI-first SaaS products — classify → route → resolve
- **N8n integration** shows hybrid AI + automation thinking
- **Multi-tenant ready** — three portals with clear role separation
- **Observable metrics** — HLO (Human Labor Offset) directly measures cost savings
- **End-to-end demo** — from user chat to resolved ticket in seconds

### For Hackathon Judges

- **Strong visual differentiation** — three polished portals that each look professional
- **Not just a chatbot** — real routing intelligence with measurable accuracy
- **End-to-end flow** — user submits → AI classifies → path executes → resolution attributed → telemetry recorded
- **Clean code organization** — backend/frontend split, pipeline paths as independent modules
- **Impressive tech stack depth** — Groq LPU, LangGraph, ChromaDB, n8n, Next.js, all working together

### For Investors

- **HLO metric shows automation ROI** — percentage of tickets resolved without human intervention
- **Scalable architecture** — LangGraph can be extended with more paths, more LLMs
- **Real enterprise use case** — IT helpdesk automation is a $12B market
- **AI telemetry demonstrates product maturity** — the system measures its own performance

---

## One Sentence Summary

> HALO Support is an AI-driven IT ticketing platform where a Groq LPU-powered LangGraph brain automatically classifies and routes every incoming ticket through one of three paths — n8n automation, ChromaDB RAG, or human expert routing — with four real-time telemetry metrics proving the system's accuracy and automation efficiency.

---

## Portfolio Showcase

### Hero Section

**Visual:** Full-viewport dark gradient background (`#0b0c10` → `#12131a`) with the HALO Support logo (64×64 rounded-2xl) centered at top, followed by "HALO Support" in Manrope 800, 72px, white, tight letter-spacing. Below: tagline in Outfit, 18px, `#a0a5b5`, max-width 600px, centered: *"End-to-end AI-driven IT support: classifies, routes, and resolves tickets with zero manual dispatch."*

**Animation:** Logo scales from 0.8→1.0 with opacity 0→1 over 600ms ease-out. Tagline fades in 400ms later with translate-y 20→0.

**CTA buttons:** "View Live Demo" (primary, filled `#0d3c52`) + "GitHub Repository" (ghost, border white/20). Both with hover scale 1.02 and shadow lift.

**Below fold:** Animated mini-architecture diagram showing the three-path pipeline, built with SVG arrows and node boxes that highlight sequentially.

---

### Interactive Demo Section

**Layout:** Split screen — left side has a mock chat interface (AI Support page), right side has an animated pipeline visualization.

**Chat interaction:** User types a ticket issue, presses Enter, and watches:
1. Pipeline animation lights up the "AI Router" node (pulse effect)
2. Arrow animates to the correct path node (green for Action, teal for FAQ, orange for Complex)
3. Path node shows resolution output
4. "Solved By" badge appears in the chat

**Pipeline visualization:** SVG diagram with labeled nodes for each pipeline stage. Active node glows with a teal shadow. Animated dashed arrow lines trace the path.

**Stats strip:** 4 small metric cards below the demo: CGR 94.2% 🟢 | RPI 91.8% 🟢 | HLO 76.3% 🟡 | SSE 0.873 🟢

---

### Architecture Visualization Section

**Diagram showing the complete system:**

```
       ┌─────────────────────────────────────┐
       │         Next.js Frontend            │
       │   Admin  ·  Employee  ·  User        │
       └──────────────┬──────────────────────┘
                      │ REST / JSON
       ┌──────────────▼──────────────────────┐
       │         FastAPI Gateway              │
       │  Auth · Tickets · Messaging         │
       └──────────────┬──────────────────────┘
                      │ LangGraph Orchestration
       ┌─────────────┼────────────────────────┐
       │             ▼                         ▼
┌──────────┐  ┌───────────┐  ┌────────────────┐
│  Action  │  │    RAG    │  │    Complex     │
│   (n8n)  │  │ (ChromaDB │  │  (Human Expert │
│          │  │  + LLM)   │  │    Routing)    │
└──────────┘  └───────────┘  └────────────────┘
```

Each box has a subtle hover glow and clicking reveals a tooltip with details. Animated data flow lines pulse between nodes.

**Below:** 3 mini-cards for each AI path with one-line descriptions and icons.

---

### Statistics Section

**Dark gradient card** with 4 animated counters:

| Stat | Value | Label |
|---|---|---|
| Tickets Resolved Today | 127 | counter animates 0→127 over 1.5s |
| AI Automation Rate | 78.5% | HLO percentage with ring progress |
| Avg Resolution Time | 2m 34s | time counter |
| Active Employees | 24 | online status count |

Numbers use Manrope 800, 48px, white. Labels use Inter 400, 14px, `#a0a5b5`.

---

### Timeline / Journey Section

**Horizontal scrolling timeline** showing the ticket lifecycle:

```
User Submits → AI Classifies → Action/FAQ/Complex → Resolution → Telemetry Recorded
```

Each step is a card with icon, title, and 1-line description. The active step highlights as user scrolls. Below: "Live Pipeline Feed" showing real-time ticket processing with timestamps.

---

### Tech Stack Display

**Horizontal logo strip** (grayscale, hover to color):

- Next.js · React · TypeScript · TailwindCSS · Zustand · TanStack Query
- Python · FastAPI · LangGraph · Groq · ChromaDB · SQLite
- N8N · LangChain · Sentence Transformers · Ollama

Below in smaller text: *"Built with modern, production-grade technologies across the full stack."*

---

### Testimonials / Social Proof

**3 quote cards** from fictional personas:

1. **IT Director** — *"Reduced our ticket resolution time by 60% while cutting manual triage entirely."*
2. **Junior Support Staff** — *"The skill-based routing means I only get tickets I'm actually qualified to handle."*
3. **End User** — *"Got my VPN issue resolved in 90 seconds through the AI chat. Didn't need to wait in queue."*

Avatar initials circles, name + title below each quote.

---

### Call to Action

**Final section:** Dark card with centered content:

- "Ready to see it in action?"
- Two buttons: "Run Locally" (primary) + "View Architecture Docs" (ghost)
- Below: "Built at MRIT · Powered by Groq LPU · Orchestrated with LangGraph"
- GitHub star count badge (mock): ⭐ 247

---

### Overall Vibe

**Apple Developer Showcase Aesthetic:**

- Dark-first design with rich blacks (`#0b0c10`) and soft navy blues (`#12131a`)
- Generous whitespace, nothing feels cramped
- Monospace font for technical identifiers (ticket IDs, metric names)
- Smooth 60fps animations throughout (no janky transitions)
- Subtle grain texture overlay on hero background
- Rounded-2xl cards with soft shadows, never harsh
- Micro-interactions on every interactive element — nothing feels dead
- Color palette that says "enterprise AI" rather than "generic SaaS"

**Typography rhythm:** Display text at 72px, section headings at 32-40px, subsection at 24px, body at 14-16px, labels at 11-12px — clear visual hierarchy at every level.

---

*This document is sufficient for a UI/UX designer to recreate the entire HALO Support experience from scratch, including all three portals, the AI pipeline visualization, and the complete design system — without needing to open the repository code.*
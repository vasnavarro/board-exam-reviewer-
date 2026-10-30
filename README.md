# Dr. Leane's DLE Board Exam Reviewer & LeaneNotes 🦷💜✨
> **Dedicated to Leane • Made with all my love by Angelo**

A comprehensive, high-aesthetic web application crafted specifically for **Leane**'s upcoming **November Philippine Dentist Licensure Examination (DLE)**. Built with a gorgeous purple design system (Leane's favorite color!), instant Light/Dark mode switching, a high-yield Q&A review engine with right-vs-wrong rationales, and **LeaneNotes** — a full-featured tablet replica of GoodNotes!

---

## 🌟 Key Features

### 1. ⚡ Authentic DLE Q&A with In-Depth Rationales
* **Directly compiled from review materials** across 10 core DLE board domains:
  - 🦷 **Restorative Dentistry (Operative Dentistry)**
  - 🔬 **Oral Pathology & Clinical Diagnosis**
  - 📏 **Oral Anatomy & Occlusion**
  - 🏛️ **Dental Jurisprudence (RA 9484) & Practice Management**
  - 💊 **Pharmacology & Dental Anesthesiology**
  - 📐 **Orthodontics & Pediatric Dentistry**
  - 🦠 **General Histology & Microbiology**
  - 🧬 **Oral Histology & Embryology**
  - 🩺 **General Anatomy & Physiology**
  - 🌐 **Community Dentistry & Public Health**
* **Comprehensive Rationale Engine**:
  - ✅ **Why the right answer is correct**: In-depth clinical explanation based on official DLE coaching keys.
  - ❌ **Distractor Analysis**: Clear breakdown explaining why every other option is incorrect or ruled out.
  - 💡 **Clinical Pearl / Memory Hook**: High-yield mnemonics to guarantee long-term exam recall.
* **Instant Filtering & Palette Jumper**: Filter by specific subject or drill all questions, with shuffle toggle and question jumping.

### 2. 📓 LeaneNotes — GoodNotes Tablet Replica
* **Tablet-First Stylus & Touch Canvas**:
  - Full Apple Pencil & Android stylus support with pressure-sensitive strokes, smooth line interpolation, and palm rejection (`touch-action: none`).
* **Writing & Sketching Tools**:
  - ✒️ **Ballpoint Pen**: Clean, crisp line drawing.
  - 🖋️ **Fountain Pen**: Dynamic calligraphic strokes.
  - 🖍️ **Highlighter**: Semi-transparent, glowing highlighter that overlays handwriting and diagrams.
  - 🧽 **Precision Eraser**: Radius stroke erasing & one-click page clearing.
  - 📐 **Shape & Arrow Tools**: Straight lines, arrows, rectangles, and circles for anatomical structures and cavity prep margins.
  - 📌 **Pastel Sticky Notes**: Insert typed floating sticky notes anywhere on the page.
* **Aesthetic Paper Templates**:
  - 📝 **Ruled Lined Paper** (College ruled)
  - ⚬ **Dotted Grid Paper** (Bullet journal style)
  - ▦ **Graph Paper / Grid** (Structural drawings)
  - 📐 **Cornell Notes Template** (Topic Cues, Detailed Notes, Summary Box)
  - 🦷 **Dental Odontogram / Tooth Chart** (Pre-rendered maxillary and mandibular dental arches ready to chart restorations, cavity classifications Class I–VI, and canal treatments!)
  - 📄 **Blank Canvas**
* **Digital Notebook Manager**:
  - Create multiple custom notebooks with multi-page navigation (`Page X of Y`, `+ Add Page`, `Delete Page`).
  - **Export as High-Resolution PNG**: One-click download of notes and tooth drawings.
  - **100% Client-Side Auto-Save**: Preserves every stroke in `localStorage` so Leane never loses her notes when switching tabs or closing her tablet browser.

### 3. 💜 Purple Aesthetic Theme & Light / Dark Mode
* **Aesthetic Purple Palette**: Lavender, lilac, royal purple, and soft rose gold accents.
* **Instant Light/Dark Mode Switcher**:
  - 🌙 **Dark Mode**: Midnight purple space with glowing neon lilac accents for night-time review without eye strain.
  - ☀️ **Light Mode**: Crisp, dreamy pastel lilac paper feel with high-contrast text and soft purple borders.
* Preserves theme preference automatically in `localStorage`.

### 4. 💖 Built with Love by Angelo
* **Personalized Dashboard**: Dedicated countdown clock to the November Dentist Licensure Examination, daily study streak tracker, motivational cheer, and inspirational dental quotes.
* **Timed Mock Board Exam**: Realistic PRC board exam simulation with countdown timer, question palette, flagging system, and score diagnostics.
* **3D Flashcards**: Flip-to-reveal cards with spaced-repetition ratings (Again, Hard, Good, Easy) for active recall.
* **Weakness Focus Mode**: Isolates missed or flagged questions until 100% mastery is achieved.
* **Settings Modal**: Customize Leane's name, love note, exam date, and passing score benchmark.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📤 How to Upload to GitHub

Follow these quick steps to push the project to your GitHub account:

```bash
# 1. Check git status
git status

# 2. Add all files and commit
git add .
git commit -m "feat: complete Dr. Leane DLE board exam reviewer with LeaneNotes GoodNotes replica and purple theme"

# 3. Rename branch to main (if not already)
git branch -M main

# 4. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push to GitHub
git push -u origin main
```

---

## 🌐 Free 1-Click Tablet Hosting Options

To let Leane access this directly on her tablet:
1. **Vercel** (Recommended):
   - Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
   - Click **Add New Project**, import your `board-exam-reviewer` repository, and click **Deploy**.
   - You will get a free live URL (e.g. `https://dr-leane-reviewer.vercel.app`) that she can bookmark on her tablet home screen!
2. **Netlify**:
   - Go to [netlify.com](https://netlify.com/) and link your repository for continuous deployment.
3. **GitHub Pages**:
   - Enable GitHub Pages in repository settings under **Pages** > Source: GitHub Actions.

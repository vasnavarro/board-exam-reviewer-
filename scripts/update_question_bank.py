with open('src/components/QuestionBank.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import RationaleBreakdown & BookOpen if missing
if 'import { RationaleBreakdown }' not in content:
    content = 'import { RationaleBreakdown } from "./RationaleBreakdown";\n' + content

# Add expanded state inside QuestionBank function
import re
state_hook = '  const [expandedRationales, setExpandedRationales] = useState({});\n'
content = re.sub(r'(export function QuestionBank[^{]*\{)', r'\1\n' + state_hook, content)

# Add toggle handler
toggle_fn = '''  const toggleRationale = (id) => {
    setExpandedRationales(prev => ({ ...prev, [id]: !prev[id] }));
  };
'''
content = re.sub(r'(const categories = [^;]*;)', r'\1\n' + toggle_fn, content)

# Replace the takeaway paragraph with takeaway + rationale toggle and RationaleBreakdown
old_takeaway = r'<p style=\{\{ fontSize: "0\.85rem", color: "var\(--text-muted\)" \}\}>\s*<strong style=\{\{ color: "var\(--text-secondary\)" \}\}>Key Takeaway:<\/strong>\s*\{q\.keyTakeaway\}\s*<\/p>'

new_block = '''<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                <strong style={{ color: "var(--text-secondary)" }}>Key Takeaway:</strong> {q.keyTakeaway}
              </p>
              <button
                onClick={() => toggleRationale(q.id)}
                className="btn btn-secondary"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}
              >
                {expandedRationales[q.id] ? "Hide Rationale" : "📖 Full Rationale & Distractor Breakdown"}
              </button>
            </div>

            {expandedRationales[q.id] && (
              <RationaleBreakdown question={q} isCorrect={null} />
            )}'''

content = re.sub(old_takeaway, new_block, content)

with open('src/components/QuestionBank.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("QuestionBank.jsx updated successfully!")

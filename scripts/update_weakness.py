with open('src/components/WeaknessFocus.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import RationaleBreakdown
if 'import { RationaleBreakdown }' not in content:
    content = 'import { RationaleBreakdown } from "./RationaleBreakdown";\n' + content

# Replace rationale reveal with RationaleBreakdown
import re
pattern = r'\{\/\*\s*Rationale Reveal\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\)\}'
replacement = '''{/* Rationale Breakdown */}
        {isAnswered && (
          <RationaleBreakdown 
            question={currentQ} 
            selectedOption={selectedOption} 
            isCorrect={selectedOption === currentQ.correctIndex} 
          />
        )}'''

new_content = re.sub(pattern, replacement, content)
with open('src/components/WeaknessFocus.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("WeaknessFocus.jsx updated with RationaleBreakdown!")

with open('src/components/MockExam.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import RationaleBreakdown
if 'import { RationaleBreakdown }' not in content:
    content = 'import { RationaleBreakdown } from "./RationaleBreakdown";\n' + content

# Replace the simple Explanation Box with RationaleBreakdown
import re
pattern = r'\{\/\*\s*Explanation Box\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\);\s*\}\)\}\s*<\/div>'
replacement = '''{/* Comprehensive Rationale & Distractor Breakdown */}
                <RationaleBreakdown 
                  question={q} 
                  selectedOption={userChoice} 
                  isCorrect={isCorrect} 
                />
              </div>
            );
          })}
        </div>'''

new_content = re.sub(pattern, replacement, content)
with open('src/components/MockExam.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("MockExam.jsx updated with RationaleBreakdown!")

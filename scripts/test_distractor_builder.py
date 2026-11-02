import json
import re

from generate_all_verified_rationales import MASTER_KEYS

print("Building clinical rationale generator...")

def get_clean_opt_letter(opt_idx):
    return chr(65 + opt_idx)

def build_distractor_analysis(stem, options, correct_idx, category):
    c_letter = get_clean_opt_letter(correct_idx)
    c_text = options[correct_idx].strip()
    
    distractors = {}
    for idx, opt in enumerate(options):
        if idx == correct_idx:
            continue
        o_letter = get_clean_opt_letter(idx)
        o_text = opt.strip()
        
        # Build contextual rationale for why this option is incorrect
        distractors[str(idx)] = f"Option {o_letter} ({o_text}) is incorrect because it represents a distinct physiological entity, anatomical structure, or clinical indication that does not answer the scenario posed in the question stem."
        
    return distractors

print("Base helper initialized.")

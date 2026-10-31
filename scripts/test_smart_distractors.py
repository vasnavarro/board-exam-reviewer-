import json, re

# Test medical & dental rationale generator for various question types
def generate_clinical_distractor(stem, correct_opt, opt_letter, opt_text, category):
    s = stem.lower()
    o = opt_text.strip()
    ol = o.lower()
    c = correct_opt.strip()
    cl = c.lower()
    
    # 1. Edema & Fluid dynamics
    if "edema" in s:
        if "decreased plasma protein" in ol:
            return f"Option {opt_letter} ({o}) is the primary Starling force abnormality: hypoalbuminemia decreases plasma oncotic pressure, driving fluid extravasation into interstitial spaces."
        elif "increased lymph flow" in ol:
            return f"Option {opt_letter} ({o}) is a protective compensatory mechanism that drains excess fluid back into the venous system; only impaired or obstructed lymphatics result in lymphedema."
        elif "increased ecf volume" in ol:
            return f"Option {opt_letter} ({o}) represents generalized fluid expansion (e.g., renal failure, volume overload), but edema specifically requires transcapillary fluid shift into interstitial spaces."
        elif "increased plasma protein" in ol:
            return f"Option {opt_letter} ({o}) increases intravascular colloidal oncotic pressure, which retains and draws water into the vascular lumen, directly preventing edema."

    # 2. Receptors & Mechanoreceptors
    if "corpuscle" in ol or "merkel" in ol or "pacinian" in ol or "meissner" in ol or "ruffini" in ol:
        if "pacinian" in ol:
            return f"Option {opt_letter} ({o}) specializes in detecting deep pressure changes and high-frequency vibrations in the deep dermis and joints."
        elif "meissner" in ol:
            return f"Option {opt_letter} ({o}) is responsible for fine tactile discriminative touch and low-frequency flutter in superficial dermal papillae."
        elif "merkel" in ol:
            return f"Option {opt_letter} ({o}) functions as a slow-adapting mechanoreceptor for sustained light touch, edges, and surface texture."
        elif "ruffini" in ol:
            return f"Option {opt_letter} ({o}) detects skin stretch, joint angle alteration, and sustained mechanical tension in the deep reticular dermis."
        elif "free nerve ending" in ol:
            return f"Option {opt_letter} ({o}) are unmyelinated nociceptors and thermoreceptors that transmit pain and temperature, not specialized encapsulated mechanoreception."

    # 3. Muscles of Mastication & Movements
    if "pterygoid" in ol or "masseter" in ol or "temporalis" in ol or "digastric" in ol:
        if "lateral pterygoid" in ol or "external pterygoid" in ol:
            return f"Option {opt_letter} ({o}) primarily protrudes and depresses the mandible and controls lateral excursion to the contralateral side."
        elif "medial pterygoid" in ol or "internal pterygoid" in ol:
            return f"Option {opt_letter} ({o}) elevates the mandible and assists in lateral grinding movements along with the masseter."
        elif "temporalis" in ol:
            return f"Option {opt_letter} ({o}) functions as a powerful mandibular elevator, with posterior fibers retracting the mandible into centric relation."
        elif "masseter" in ol:
            return f"Option {opt_letter} ({o}) provides heavy masticatory crushing forces by elevating the mandible against the maxilla."
        elif "digastric" in ol:
            return f"Option {opt_letter} ({o}) acts as a suprahyoid accessory muscle to depress the mandible and elevate the hyoid bone during swallowing."

    # 4. Two-statement / True-False questions
    if "first statement is true" in ol:
        return f"Option {opt_letter} ({o}) is incorrect because the evaluated statements do not follow a true-then-false pattern under established board benchmarks."
    if "first statement is false" in ol:
        return f"Option {opt_letter} ({o}) is incorrect because the clinical validity of the statements differs from this false-then-true configuration."
    if "both statements are true" in ol:
        return f"Option {opt_letter} ({o}) is incorrect because at least one of the propositions contains a scientifically inaccurate or contraindicated premise."
    if "both statements are false" in ol:
        return f"Option {opt_letter} ({o}) is incorrect because the clinical facts presented in the stem contain verified valid scientific assertions."

    # 5. Dental materials & restovative
    if "amalgam" in ol or "composite" in ol or "glass ionomer" in ol or "zinc phosphate" in ol:
        if "glass ionomer" in ol or "gic" in ol:
            return f"Option {opt_letter} ({o}) provides chemical adhesion to enamel/dentin and long-term fluoride release, but has lower tensile and fracture strength under heavy occlusal stress."
        elif "composite" in ol:
            return f"Option {opt_letter} ({o}) provides optimal esthetics and micro-mechanical retention via acid-etch bonding, but suffers from polymerization shrinkage."
        elif "amalgam" in ol:
            return f"Option {opt_letter} ({o}) offers high compressive strength and self-sealing corrosion products, but lacks esthetics and requires mechanical retention (undercuts)."
        elif "zinc phosphate" in ol:
            return f"Option {opt_letter} ({o}) provides rigid mechanical luting with high compressive strength, but causes initial pulpal irritation due to acidic phosphoric acid."

    # 6. Default intelligent clinical contrasting distractor
    return f"Option {opt_letter} ({o}) is ruled out because it represents a distinct clinical parameter or alternative entity that does not meet the specific functional, anatomical, or diagnostic requirements defined for {c}."

# Test on dle-gp-006
stem = "Cause of edema can be described as"
opts = [
    "Decreased plasma protein concentration",
    "Increased lymph flow",
    "Increased ECF volume",
    "Increased plasma protein concentration"
]
for i in range(1, 4):
    print(f"Distractor {i}:", generate_clinical_distractor(stem, opts[0], chr(65+i), opts[i], "General Pathology"))

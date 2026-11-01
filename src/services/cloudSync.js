// Cloud Synchronization Service for Dr. Leane's DLE Reviewer
// Enables seamless real-time syncing between Laptop and iPad

const KVDB_BUCKET = "7eqz38xrdPbpp51xeVYMf2";
const KVDB_DIRECT_BASE = `https://kvdb.io/${KVDB_BUCKET}`;
const DEFAULT_SYNC_KEY = "leane";

/**
 * Detects whether the current device is Leane's iPad, Laptop, or Phone
 */
export function getDeviceName() {
  if (typeof navigator === "undefined") return "Web Browser";
  const ua = navigator.userAgent || "";
  const isIPad = (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || /iPad/i.test(ua);
  if (isIPad) return "iPad";
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "Laptop (Windows)";
  if (/Android/i.test(ua)) return "Android Device";
  return "Mobile Device";
}

/**
 * Gets the active personal sync key
 */
export function getSyncKey() {
  return localStorage.getItem("pb_sync_key") || DEFAULT_SYNC_KEY;
}

/**
 * Sets the active personal sync key
 */
export function setSyncKey(key) {
  const sanitized = (key || DEFAULT_SYNC_KEY).trim().toLowerCase().replace(/[^a-z0-9_\-]/g, "_");
  localStorage.setItem("pb_sync_key", sanitized);
  return sanitized;
}

/**
 * Collects all sticky note items from localStorage
 */
function collectStickies() {
  const stickies = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("leane_sticky_")) {
      try {
        stickies[k] = JSON.parse(localStorage.getItem(k));
      } catch (e) {
        stickies[k] = localStorage.getItem(k);
      }
    }
  }
  return stickies;
}

/**
 * Restores stickies into localStorage
 */
function restoreStickies(stickies) {
  if (!stickies || typeof stickies !== "object") return;
  Object.entries(stickies).forEach(([k, v]) => {
    try {
      localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
    } catch (e) {}
  });
}

/**
 * Gathers current device state for cloud persistence
 */
export function collectLocalProfile() {
  let examHistory = [];
  try {
    const raw = localStorage.getItem("pb_history");
    if (raw) examHistory = JSON.parse(raw);
  } catch (e) {}

  let flaggedQuestions = [];
  try {
    const raw = localStorage.getItem("pb_flagged");
    if (raw) flaggedQuestions = JSON.parse(raw);
  } catch (e) {}

  let leaneNotebooks = [];
  try {
    const raw = localStorage.getItem("leane_notes_notebooks");
    if (raw) leaneNotebooks = JSON.parse(raw);
  } catch (e) {}

  return {
    version: "2.0",
    updatedAt: localStorage.getItem("pb_sync_updated_at") || new Date().toISOString(),
    device: getDeviceName(),
    streak: Number(localStorage.getItem("pb_streak")) || 1,
    lastLogin: localStorage.getItem("pb_last_login") || new Date().toDateString(),
    examHistory,
    flaggedQuestions,
    notes: localStorage.getItem("pb_notes") || "",
    leaneNotebooks,
    leaneCurNb: localStorage.getItem("leane_notes_cur_nb") || "",
    stickies: collectStickies(),
    settings: {
      girlfriendName: localStorage.getItem("pb_name") || "Leane",
      examDate: localStorage.getItem("pb_date") || "2026-11-22",
      personalMessage: localStorage.getItem("pb_msg") || "",
      passingScore: Number(localStorage.getItem("pb_passing")) || 75,
      theme: localStorage.getItem("pb_theme") || "dark"
    }
  };
}

/**
 * Fetches profile from cloud (tries /api/sync first, falls back to direct KVdb)
 */
export async function fetchCloudProfile(syncKey = getSyncKey()) {
  const sanitizedKey = syncKey.replace(/[^a-zA-Z0-9_\-]/g, "_");

  // Attempt 1: Vercel Serverless Function
  try {
    const res = await fetch(`/api/sync?key=${sanitizedKey}`, {
      method: "GET",
      headers: { Accept: "application/json" }
    });
    if (res.ok) {
      const result = await res.json();
      if (result.found && result.data) {
        return result.data;
      }
      if (result.found === false) {
        return null; // Empty cloud record
      }
    }
  } catch (e) {
    // Pass through to direct KVdb
  }

  // Attempt 2: Direct KVdb endpoint fallback
  try {
    const directRes = await fetch(`${KVDB_DIRECT_BASE}/${sanitizedKey}`, {
      method: "GET",
      headers: { Accept: "application/json" }
    });
    if (directRes.status === 404) {
      return null;
    }
    if (directRes.ok) {
      const data = await directRes.json();
      return data;
    }
  } catch (err) {
    console.warn("Direct KVdb fetch warning:", err);
  }

  return null;
}

/**
 * Saves profile to cloud (tries /api/sync first, falls back to direct KVdb)
 */
export async function saveCloudProfile(data = null, syncKey = getSyncKey()) {
  const sanitizedKey = syncKey.replace(/[^a-zA-Z0-9_\-]/g, "_");
  const payload = data || collectLocalProfile();

  payload.updatedAt = new Date().toISOString();
  payload.device = getDeviceName();

  const serialized = JSON.stringify(payload);

  let success = false;

  // Attempt 1: /api/sync
  try {
    const res = await fetch(`/api/sync?key=${sanitizedKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: serialized
    });
    if (res.ok) {
      success = true;
    }
  } catch (e) {
    // Pass through to direct KVdb
  }

  // Attempt 2: Direct KVdb fallback
  if (!success) {
    try {
      const directRes = await fetch(`${KVDB_DIRECT_BASE}/${sanitizedKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: serialized
      });
      if (directRes.ok) {
        success = true;
      }
    } catch (err) {
      console.error("Direct KVdb save error:", err);
    }
  }

  if (success) {
    localStorage.setItem("pb_sync_updated_at", payload.updatedAt);
    localStorage.setItem("pb_sync_last_device", payload.device);
    return { success: true, updatedAt: payload.updatedAt, device: payload.device };
  } else {
    throw new Error("Unable to reach cloud sync server. Progress saved locally.");
  }
}

/**
 * Intelligently merges cloud profile into local storage
 * Guaranteed never to overwrite higher streak or delete exam history
 */
export function mergeProfiles(localProfile, cloudProfile) {
  if (!cloudProfile) return localProfile;

  // 1. Streak: Always honor highest streak achieved
  const mergedStreak = Math.max(localProfile.streak || 1, cloudProfile.streak || 1);

  // 2. Exam History: Union of distinct exams
  const examMap = new Map();
  // Cloud exams first
  (cloudProfile.examHistory || []).forEach(ex => {
    const key = ex.id || `${ex.date}_${ex.score}_${ex.total}`;
    examMap.set(key, ex);
  });
  // Local exams merged
  (localProfile.examHistory || []).forEach(ex => {
    const key = ex.id || `${ex.date}_${ex.score}_${ex.total}`;
    examMap.set(key, ex);
  });
  const mergedHistory = Array.from(examMap.values()).sort((a, b) => {
    return new Date(b.date || 0) - new Date(a.date || 0);
  });

  // 3. Flagged Questions for Review: Set union
  const mergedFlagged = Array.from(
    new Set([...(localProfile.flaggedQuestions || []), ...(cloudProfile.flaggedQuestions || [])])
  );

  // 4. Notes & Notebooks: Timestamp-based with fallback to non-empty
  const localTime = new Date(localProfile.updatedAt || 0).getTime();
  const cloudTime = new Date(cloudProfile.updatedAt || 0).getTime();

  let mergedNotes = localProfile.notes;
  if (!mergedNotes || cloudTime > localTime) {
    if (cloudProfile.notes) mergedNotes = cloudProfile.notes;
  }

  let mergedNotebooks = localProfile.leaneNotebooks;
  if (!mergedNotebooks || mergedNotebooks.length === 0 || cloudTime > localTime) {
    if (cloudProfile.leaneNotebooks && cloudProfile.leaneNotebooks.length > 0) {
      mergedNotebooks = cloudProfile.leaneNotebooks;
    }
  }

  // 5. Stickies: Merge dictionaries
  const mergedStickies = {
    ...(cloudProfile.stickies || {}),
    ...(localProfile.stickies || {})
  };

  // 6. Settings
  let mergedSettings = localProfile.settings;
  if (cloudTime > localTime && cloudProfile.settings) {
    mergedSettings = { ...localProfile.settings, ...cloudProfile.settings };
  }

  const merged = {
    version: "2.0",
    updatedAt: cloudTime > localTime ? cloudProfile.updatedAt : localProfile.updatedAt,
    device: cloudTime > localTime ? (cloudProfile.device || "iPad") : localProfile.device,
    streak: mergedStreak,
    lastLogin: cloudProfile.lastLogin || localProfile.lastLogin,
    examHistory: mergedHistory,
    flaggedQuestions: mergedFlagged,
    notes: mergedNotes,
    leaneNotebooks: mergedNotebooks,
    leaneCurNb: cloudProfile.leaneCurNb || localProfile.leaneCurNb,
    stickies: mergedStickies,
    settings: mergedSettings
  };

  // Persist merged profile directly to localStorage
  try {
    localStorage.setItem("pb_streak", String(merged.streak));
    localStorage.setItem("pb_history", JSON.stringify(merged.examHistory));
    localStorage.setItem("pb_flagged", JSON.stringify(merged.flaggedQuestions));
    if (merged.notes) localStorage.setItem("pb_notes", merged.notes);
    if (merged.leaneNotebooks) localStorage.setItem("leane_notes_notebooks", JSON.stringify(merged.leaneNotebooks));
    if (merged.leaneCurNb) localStorage.setItem("leane_notes_cur_nb", merged.leaneCurNb);
    restoreStickies(merged.stickies);

    if (merged.settings) {
      if (merged.settings.girlfriendName) localStorage.setItem("pb_name", merged.settings.girlfriendName);
      if (merged.settings.examDate) localStorage.setItem("pb_date", merged.settings.examDate);
      if (merged.settings.personalMessage) localStorage.setItem("pb_msg", merged.settings.personalMessage);
      if (merged.settings.passingScore) localStorage.setItem("pb_passing", String(merged.settings.passingScore));
      if (merged.settings.theme) localStorage.setItem("pb_theme", merged.settings.theme);
    }
    localStorage.setItem("pb_sync_updated_at", merged.updatedAt);
  } catch (err) {
    console.error("Error saving merged profile to localStorage:", err);
  }

  return merged;
}

// Debounce timer for auto-save
let debounceTimer = null;

/**
 * Triggers a debounced cloud sync (1.5 second wait for smooth typing/actions)
 */
export function scheduleAutoSync(callback = null) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    try {
      const res = await saveCloudProfile();
      if (callback) callback({ success: true, res });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  }, 1200);
}

// =======================================
// PREMIERSHIP OF DARTS
// SHARED STORAGE — SUPABASE
// VERSION 2.0
// =======================================
//
// Was localStorage (version 1.0) — meant every result only ever lived on one
// person's browser. Now backed by a shared database so everyone sees the
// same tournament, on any device.
//
// This lives in Max's own Supabase project (the same one behind Chalkboard
// and Ralph's Day) — set up once, no dependency on anyone else's login.

const SUPABASE_URL = "https://chtlhdjzadjemudgksxm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNodGxoZGp6YWRqZW11ZGdrc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MzczMzAsImV4cCI6MjA5OTExMzMzMH0.D1d1LyF91YSpGIs1mgNKT2PMu_C8glboJXXSSNlZl98";

// One row per named competition, holding the whole competition object as
// JSON — deliberately mirrors the old whole-object localStorage save/load
// so none of the app's existing logic (groups, fixtures, knockout) needed
// to change at all, only how it gets persisted.
const COMPETITION_ID = "double-trouble";

async function dbFetch(path, opts = {}) {
    const headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
        ...(opts.headers || {})
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...opts, headers });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const contentType = res.headers.get("content-type") || "";
    if (res.status === 204 || contentType.indexOf("application/json") === -1) return null;
    return res.json();
}

// =======================================
// SAVE COMPETITION
// =======================================

async function saveCompetition() {
    try {
        await dbFetch("cup_competitions", {
            method: "POST",
            headers: { "Prefer": "resolution=merge-duplicates" },
            body: JSON.stringify({
                id: COMPETITION_ID,
                data: competition,
                updated_at: new Date().toISOString()
            })
        });
    } catch (e) {
        console.error("Failed to save competition:", e);
        showSaveError();
    }
}

// =======================================
// LOAD COMPETITION
// =======================================

async function loadCompetition() {
    try {
        const rows = await dbFetch(`cup_competitions?id=eq.${COMPETITION_ID}&select=data`);
        if (rows && rows.length && rows[0].data) {
            Object.assign(competition, rows[0].data);
        }
    } catch (e) {
        console.error("Failed to load competition:", e);
        showSaveError();
    }
}

// =======================================
// RESET COMPETITION
// =======================================

function resetCompetition() {
    if (confirm("Reset Double Trouble Cup? All results will be removed for everyone.")) {
        dbFetch(`cup_competitions?id=eq.${COMPETITION_ID}`, { method: "DELETE" })
            .then(() => location.reload())
            .catch(e => {
                console.error("Failed to reset:", e);
                alert("Failed to reset — check your connection and try again.");
            });
    }
}

// =======================================
// CONNECTION STATUS — small, unobtrusive banner if a save/load fails
// =======================================

function showSaveError() {
    let el = document.getElementById("cupConnError");
    if (!el) {
        el = document.createElement("div");
        el.id = "cupConnError";
        el.style.cssText = "position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#dc2626;color:#fff;padding:10px 18px;border-radius:6px;font-family:'Inter',sans-serif;font-size:13px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,.3);";
        document.body.appendChild(el);
    }
    el.textContent = "Connection issue — your last change may not have saved. Check your internet and refresh.";
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => el.remove(), 6000);
}

import { useState, useEffect } from "react";

const LANGUAGES = [
  { label: "JavaScript", value: "javascript", color: "#f7df1e", bg: "#2a2500" },
  { label: "Python", value: "python", color: "#4ec9b0", bg: "#002a26" },
  { label: "TypeScript", value: "typescript", color: "#5b9bd5", bg: "#001a2e" },
  { label: "C++", value: "c%2B%2B", color: "#f48fb1", bg: "#2a0015" },
  { label: "Rust", value: "rust", color: "#ff8a50", bg: "#2a1000" },
  { label: "Go", value: "go", color: "#79dce8", bg: "#002a2e" },
  { label: "Java", value: "java", color: "#ffcc80", bg: "#2a1f00" },
  { label: "HTML", value: "html", color: "#ef9a9a", bg: "#2a0a00" },
];

const LABEL_COLORS = {
  "good first issue": { bg: "#002a1a", color: "#4caf50", border: "#1b5e20" },
  "bug": { bg: "#2a0000", color: "#ef5350", border: "#7f0000" },
  "documentation": { bg: "#0a1a2a", color: "#64b5f6", border: "#0d47a1" },
  "enhancement": { bg: "#1a0a2a", color: "#ce93d8", border: "#4a148c" },
  "help wanted": { bg: "#1a1a00", color: "#fff176", border: "#827717" },
  "feature": { bg: "#002a1a", color: "#80cbc4", border: "#004d40" },
};

function getLabelStyle(name) {
  const key = name.toLowerCase();
  return LABEL_COLORS[key] || { bg: "#1a1a2e", color: "#90caf9", border: "#283593" };
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function getRepoName(repositoryUrl) {
  const parts = (repositoryUrl || "").split("/");
  return parts.slice(-2).join("/");
}

function SkeletonCard() {
  return (
    <div style={{
      background: "#0d1421",
      border: "1px solid #1e2d45",
      borderRadius: 12,
      padding: "20px 22px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}>
      <div style={{ height: 12, width: "55%", background: "#1a2840", borderRadius: 6, marginBottom: 14 }} />
      <div style={{ height: 16, width: "90%", background: "#1e3050", borderRadius: 6, marginBottom: 8 }} />
      <div style={{ height: 16, width: "70%", background: "#1e3050", borderRadius: 6, marginBottom: 18 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ height: 22, width: 90, background: "#152035", borderRadius: 20 }} />
        <div style={{ height: 22, width: 70, background: "#152035", borderRadius: 20 }} />
      </div>
    </div>
  );
}

function IssueCard({ issue, index }) {
  const repo = getRepoName(issue.repository_url);
  const [owner, repoName] = repo.split("/");
  const visibleLabels = (issue.labels || []).filter(l => l.name.toLowerCase() !== "good first issue").slice(0, 3);

  return (
    <div
      className="issue-card"
      style={{
        background: "#0b1220",
        border: "1px solid #1b2d45",
        borderRadius: 12,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        cursor: "default",
        animationDelay: `${index * 60}ms`,
        animationName: "cardIn",
        animationDuration: "0.4s",
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#00d4aa44";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px #00d4aa12";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#1b2d45";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Repo name */}
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="#00d4aa88">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
        </svg>
        <span style={{ fontSize: 11, color: "#4a7fa5", fontFamily: "'Space Mono', monospace", letterSpacing: "0.02em" }}>
          <span style={{ color: "#6b9cbf" }}>{owner}</span>
          <span style={{ color: "#2a4a65" }}>/</span>
          <span style={{ color: "#00d4aa99" }}>{repoName}</span>
        </span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#2e4a65", fontFamily: "'Space Mono', monospace" }}>
          {timeAgo(issue.updated_at)}
        </span>
      </div>

      {/* Issue title */}
      <p style={{
        margin: 0,
        fontSize: 13.5,
        lineHeight: 1.55,
        color: "#c8dff0",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {issue.title}
      </p>

      {/* Labels + meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        {visibleLabels.map(label => {
          const s = getLabelStyle(label.name);
          return (
            <span key={label.id} style={{
              fontSize: 10,
              padding: "2px 9px",
              borderRadius: 20,
              background: s.bg,
              color: s.color,
              border: `1px solid ${s.border}`,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.03em",
            }}>
              {label.name}
            </span>
          );
        })}
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#3a5a78" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"/>
          </svg>
          {issue.comments}
        </span>
      </div>

      {/* View button */}
      <a
        href={issue.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 2,
          padding: "7px 14px",
          borderRadius: 7,
          background: "#001a14",
          border: "1px solid #00d4aa33",
          color: "#00d4aa",
          fontSize: 11,
          fontFamily: "'Space Mono', monospace",
          textDecoration: "none",
          width: "fit-content",
          transition: "background 0.15s, border-color 0.15s",
          letterSpacing: "0.05em",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#00d4aa18";
          e.currentTarget.style.borderColor = "#00d4aa88";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "#001a14";
          e.currentTarget.style.borderColor = "#00d4aa33";
        }}
      >
        View Issue
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.75 2h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-3.5a.75.75 0 011.5 0v3.5A1.75 1.75 0 0112.25 14h-8.5A1.75 1.75 0 012 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link2);

    const style = document.createElement("style");
    style.textContent = `
      @keyframes cardIn {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes scanline {
        0% { top: 0; }
        100% { top: 100%; }
      }
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #070d18; }
      ::-webkit-scrollbar-thumb { background: #1b3050; border-radius: 3px; }
      body { margin: 0; background: #070d18; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    fetchIssues(selectedLang);
    setSearch("");
  }, [selectedLang]);

  const fetchIssues = async (lang) => {
    setLoading(true);
    setError(null);
    setIssues([]);
    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=label:%22good+first+issue%22+language:${lang}+state:open&sort=updated&order=desc&per_page=15`
      );
      if (res.status === 403) throw new Error("GitHub API rate limit hit. Wait a minute and try again.");
      if (!res.ok) throw new Error("Failed to fetch issues. Check your connection.");
      const data = await res.json();
      setIssues(data.items || []);
      setTotal(data.total_count || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = issues.filter(issue => {
    const q = search.toLowerCase();
    return (
      issue.title.toLowerCase().includes(q) ||
      getRepoName(issue.repository_url).toLowerCase().includes(q)
    );
  });

  const currentLang = LANGUAGES.find(l => l.value === selectedLang);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#070d18",
      fontFamily: "'DM Sans', sans-serif",
      color: "#c8dff0",
    }}>
      {/* Grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "52px 0 36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#001a14", border: "1px solid #00d4aa22",
            borderRadius: 20, padding: "4px 14px", marginBottom: 20,
            fontSize: 11, color: "#00d4aa88", fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.1em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4aa", display: "inline-block", boxShadow: "0 0 6px #00d4aa" }} />
            OPEN SOURCE EXPLORER
          </div>

          <h1 style={{
            margin: "0 0 12px",
            fontSize: "clamp(28px, 5vw, 46px)",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            color: "#e8f4ff",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            First Contribution<br />
            <span style={{ color: "#00d4aa" }}>Finder</span>
          </h1>

          <p style={{
            margin: 0, fontSize: 14, color: "#4a7fa5",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
          }}>
            Find <code style={{ color: "#00d4aa88", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>good-first-issue</code> tickets from real open source repos — sorted by latest activity.
          </p>
        </div>

        {/* Language pills */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          justifyContent: "center", marginBottom: 28,
        }}>
          {LANGUAGES.map(lang => {
            const active = lang.value === selectedLang;
            return (
              <button
                key={lang.value}
                onClick={() => setSelectedLang(lang.value)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 8,
                  border: active ? `1px solid ${lang.color}55` : "1px solid #1b2d45",
                  background: active ? lang.bg : "#0b1220",
                  color: active ? lang.color : "#4a7fa5",
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontWeight: active ? 700 : 400,
                  letterSpacing: "0.03em",
                }}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

        {/* Search + stats bar */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              width="14" height="14" viewBox="0 0 16 16" fill="#2e4a65">
              <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.099zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by title or repo..."
              style={{
                width: "100%",
                background: "#0b1220",
                border: "1px solid #1b2d45",
                borderRadius: 8,
                padding: "9px 12px 9px 34px",
                color: "#c8dff0",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
          </div>
          {!loading && issues.length > 0 && (
            <span style={{
              fontSize: 11, color: "#2e4a65",
              fontFamily: "'Space Mono', monospace",
              whiteSpace: "nowrap",
            }}>
              {filtered.length} of {issues.length} shown
            </span>
          )}
          {!loading && total > 0 && (
            <span style={{
              fontSize: 11, color: "#00d4aa44",
              fontFamily: "'Space Mono', monospace",
              whiteSpace: "nowrap",
            }}>
              ~{total.toLocaleString()} total
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#1a0000", border: "1px solid #ff444433",
            borderRadius: 10, padding: "14px 18px",
            color: "#ff7070", fontSize: 13, marginBottom: 24,
            fontFamily: "'Space Mono', monospace",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}>
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
            ? filtered.map((issue, i) => <IssueCard key={issue.id} issue={issue} index={i} />)
            : !error && (
              <div style={{
                gridColumn: "1/-1", textAlign: "center",
                padding: "60px 20px", color: "#2e4a65",
                fontFamily: "'Space Mono', monospace", fontSize: 13,
              }}>
                No issues match your filter.
              </div>
            )
          }
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 48,
          fontSize: 11, color: "#1e3248",
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.05em",
        }}>
          POWERED BY GITHUB SEARCH API · DATA REFRESHES EACH QUERY
        </div>
      </div>
    </div>
  );
}
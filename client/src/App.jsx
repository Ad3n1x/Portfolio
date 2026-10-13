import { useEffect, useState } from "react";

const GITHUB = "https://github.com/Ad3n1x";
const featuredOverrides = [
  {
    name: "UNI-TRACK",
    type: "PRODUCTIVITY / WEB APP",
    description: "A privacy-first productivity and tracking ecosystem designed to help users organise activities, keep daily goals visible, and build a clearer picture of their progress through a straightforward digital experience.",
    details: "UNI-TRACK brings everyday tracking and productivity workflows into one accessible web experience. Its aim is to help users organise activities, review progress, and approach daily goals with more structure, while keeping the interface practical and the product privacy-conscious. Rather than adding complexity for its own sake, the project explores how useful tools can support real routines and make personal productivity easier to manage. It reflects an interest in building digital experiences that balance clarity, usefulness, and thoughtful product design.",
    focus: ["Productivity workflows", "Progress tracking", "Privacy-conscious design", "User experience"],
    stack: ["React", "JavaScript", "Vite"],
    live: "https://unitrack-app.vercel.app/unitrack",
    repo: "https://github.com/Ad3n1x/UNI-TRACK",
    code: "01"
  },
  {
    name: "QuickCart",
    type: "FULL-STACK LEARNING PROJECT",
    description: "A WhatsApp-first commerce MVP exploring how digital storefronts and product catalogues can help businesses organise online selling and make it easier for customers to move from product discovery to an order.",
    details: "QuickCart explores a practical bridge between messaging-based commerce and a structured online shopping experience. The project’s full-stack direction combines a React-based interface with a Node.js, Express, and MongoDB backend, creating a foundation for product data, API-driven workflows, and commerce functionality. Its central idea is to reduce friction between discovering a product and starting a purchase, especially for businesses that already communicate with customers through WhatsApp. The concept also leaves room for future seller-side tools and more organised order management as the project develops.",
    focus: ["E-commerce workflows", "WhatsApp-first commerce", "API development", "Full-stack architecture"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://quick-cart-adeniran-victor-adebowales-projects.vercel.app",
    repo: "https://github.com/Ad3n1x/QuickCart",
    code: "02"
  },
  {
    name: "Quiz App",
    type: "EDUCATION / INTERACTIVE WEB APP",
    description: "An interactive quiz experience for testing knowledge across different subjects, with a simple way for learners to challenge themselves and practise what they know.",
    details: "Quiz App is a subject-based learning project built around quick knowledge checks. It gives users a place to explore questions across topics and test their understanding through an interactive web experience. The project reflects an interest in building useful, accessible tools for learning and engagement.",
    focus: ["Interactive learning", "Knowledge checks", "Subject-based quizzes", "User experience"],
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://quiz-app-henna-omega.vercel.app",
    repo: "https://github.com/Ad3n1x/Quiz-App",
    code: "03"
  },
];

const capabilities = [
  { n: "01", title: "Interface development", body: "Semantic HTML, responsive CSS, accessible patterns, and purposeful interactions." },
  { n: "02", title: "JavaScript foundations", body: "DOM interaction, application logic, events, arrays, functions, and debugging." },
  { n: "03", title: "React in practice", body: "Components, props, state, and building interfaces with Vite." },
  { n: "04", title: "Full-stack exploration", body: "Learning Node.js, Express, APIs, MongoDB, and how frontend and backend fit together." },
  { n: "05", title: "Python", body: "Current learning focus — building programming skills and problem-solving through practice." },
  { n: "06", title: "TypeScript", body: "Planned next step — adding static typing to JavaScript projects." }
];

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

function getProjectMark(name = "") {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalized === "unitrack") return "U/";
  if (normalized === "quickcart") return "Q+";
  if (normalized.includes("piggyvest")) return "PV";
  if (normalized.includes("mixlr")) return "MX";
  if (normalized.includes("blog")) return "B/";
  if (normalized.includes("quiz")) return "QZ";
  const words = name.trim().split(/[\\s_-]+/).filter(Boolean);
  return words.length > 1
    ? words.slice(0, 2).map((word) => word[0]).join("").toUpperCase()
    : (words[0] || "PR").slice(0, 2).toUpperCase();
}

function CopyButton({ label, value, onCopy, className = "" }) {
  return <button className={`copy-email ${className}`.trim()} onClick={() => onCopy(value)}>{label} <span>⧉</span></button>;
}

function ProjectCard({ project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return <article className="project-card">
    <div className="project-card-top"><span>SELECTED BUILD / {project.code}</span><span className="project-signal"><i /> PROJECT</span></div>
    <div className="project-art" aria-hidden="true"><span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" /><span className="art-mark">{getProjectMark(project.name)}</span><span className="art-index">{project.code}</span></div>
    <div className="project-content"><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p className="project-description">{project.description}</p>
      <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <button className="case-study-toggle" type="button" aria-expanded={detailsOpen} onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? "CLOSE CASE STUDY −" : "EXPLORE CASE STUDY +"}<span>{detailsOpen ? "LESS" : "OVERVIEW"}</span></button>
      {detailsOpen && <div className="case-study-details"><p>{project.details}</p><h4>PROJECT FOCUS</h4><ul>{project.focus.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      <div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">OPEN PROJECT <Arrow /></a>}<a href={project.repo} target="_blank" rel="noreferrer">VIEW SOURCE <Arrow /></a></div>
    </div>
  </article>;
}


function LivePreviewCard({ project, index }) {
  const [previewState, setPreviewState] = useState("loading");
  const waitForQuickCart = /quickcart/i.test(project.name);
  const screenshotUrl = "https://image.thum.io/get/width/1200/crop/720/" + (waitForQuickCart ? "wait/15/" : "") + project.live;

  return <article className="live-preview-card">
    <a className="live-preview-image" href={project.live} target="_blank" rel="noreferrer" aria-label={"Open " + project.name + " live website"}>
      {previewState !== "error" && <img src={screenshotUrl} alt={project.name + " website preview"} loading={waitForQuickCart ? "eager" : "lazy"} onLoad={() => setPreviewState("ready")} onError={() => setPreviewState("error")} />}
      {previewState === "loading" && <span className="preview-state">CAPTURING LIVE PREVIEW<span className="preview-dots">…</span></span>}
      {previewState === "error" && <span className="preview-fallback"><b>{getProjectMark(project.name)}</b><small>Preview unavailable</small></span>}
      {previewState === "ready" && <span className="preview-ready">PREVIEW READY <i /></span>}
      <span className="preview-open">OPEN LIVE ↗</span>
    </a>
    <div className="live-preview-info">
      <div><span className="preview-number">{String(index + 1).padStart(2, "0")}</span><h3>{project.name}</h3></div>
      <p>{project.description}</p>
      <div className="live-preview-bottom"><span>{project.stack?.slice(0, 3).join(" · ") || "WEB PROJECT"}</span><a href={project.repo} target="_blank" rel="noreferrer">SOURCE ↗</a></div>
    </div>
  </article>;
}

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [repoState, setRepoState] = useState("loading");
  const [repoRetry, setRepoRetry] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [repoQuery, setRepoQuery] = useState("");
  const [repositoryLanguages, setRepositoryLanguages] = useState({});
  const [showIntroLoader, setShowIntroLoader] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setShowIntroLoader(false), reducedMotion ? 250 : 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let hasCachedRepositories = false;
    try {
      const cached = JSON.parse(window.localStorage.getItem("ad3n1x-public-repositories") || "null");
      if (Array.isArray(cached) && cached.length) {
        const publicCached = cached.filter((repo) => repo && repo.private !== true && !repo.fork && !/west\\s*citi/i.test(repo.name || ""));
        hasCachedRepositories = publicCached.length > 0;
        if (publicCached.length) setRepositories(publicCached);
        setRepoState("ready");
      }
    } catch {
      // Storage can be unavailable in private browsing; the live request still runs.
    }

    fetch("https://api.github.com/users/Ad3n1x/repos?per_page=100&sort=updated", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" }
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 403 ? "GitHub rate limit reached" : "GitHub unavailable");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Unexpected GitHub response");
        const sorted = data.filter((repo) => repo.private !== true && !repo.fork && !/west\s*citi/i.test(repo.name))
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepositories(sorted);
        setRepoState("ready");
        try {
          window.localStorage.setItem("ad3n1x-public-repositories", JSON.stringify(sorted));
        } catch {
          // Keep the live list usable when storage is full or disabled.
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        if (!hasCachedRepositories) {
          setRepositories([]);
          setRepoState("offline");
        }
      });
    return () => controller.abort();
  }, [repoRetry]);

  useEffect(() => {
    if (!repositories.length) return;
    // Load language details only for visible rows; the repository list must not
    // depend on a second API request for every repository.
    const visibleRepositories = showAll ? repositories : repositories.slice(0, 8);
    const missingLanguageData = visibleRepositories.filter((repo) =>
      !Object.prototype.hasOwnProperty.call(repositoryLanguages, repo.id)
    );
    if (!missingLanguageData.length) return;
    let cancelled = false;
    const loadLanguages = async () => {
      const entries = [];
      // Small batches avoid exhausting GitHub's unauthenticated API rate limit.
      for (let start = 0; start < missingLanguageData.length; start += 6) {
        const batch = missingLanguageData.slice(start, start + 6);
        const results = await Promise.all(batch.map(async (repo) => {
          try {
            const response = await fetch(repo.languages_url);
            if (!response.ok) throw new Error("Language data unavailable");
            return [repo.id, await response.json()];
          } catch {
            return [repo.id, repo.language ? { [repo.language]: 1 } : {}];
          }
        }));
        entries.push(...results);
        if (cancelled) return;
      }
      if (!cancelled) setRepositoryLanguages((current) => ({ ...current, ...Object.fromEntries(entries) }));
    };
    loadLanguages();
    return () => { cancelled = true; };
  }, [repositories, showAll, repositoryLanguages]);

  const copyContact = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.prompt("Copy this contact information:", value);
    }
  };

  const allContactInfo = "AD3N1X — CONTACT INFORMATION\\nEmail: adenix271@gmail.com\\nAlternate email: adeniranabe@outlook.com\\nPhone: 0703 923 7610\\nPhone: 0901 695 3597\\nWhatsApp: 0703 923 7610\\nWhatsApp link: https://wa.me/2347039237610\\nGitHub: https://github.com/Ad3n1x";

  const pinnedRepoNames = new Set(featuredOverrides.map((project) => project.repo.split("/").pop().toLowerCase()));
  const autoFeatured = repositories
    .filter((repo) => !repo.fork && !repo.archived && !/west\s*citi|portfolio/i.test(repo.name))
    .filter((repo) => !pinnedRepoNames.has(repo.name.toLowerCase()))
    .filter((repo) => typeof repo.homepage === "string" && /^https?:\/\//i.test(repo.homepage.trim()))
    .filter((repo) => Boolean(repo.description && repo.description.trim()))
    .map((repo, index) => {
      const cloneBrand = /piggyvest/i.test(repo.name) ? "PiggyVest" : /mixlr/i.test(repo.name) ? "Mixlr" : null;
      const isClone = Boolean(cloneBrand);
      return {
        name: cloneBrand ? `${cloneBrand} Clone` : repo.name.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
        type: isClone ? "FRONT-END CLONE / PRACTICE PROJECT" : `${repo.language || "WEB"} / COMMUNITY PROJECT`,
        description: `${repo.description.trim()}${isClone ? ` Independent recreation for learning and portfolio demonstration; not the official ${cloneBrand} product.` : ""}`,
        details: `${repo.description.trim()} This project was discovered automatically from the public AD3N1X GitHub repositories. ${isClone ? `It is an independent clone created for practice and is not affiliated with or endorsed by ${cloneBrand}. ` : ""}Visit the live project to explore it, or inspect the source to see how it was built.`,
        focus: isClone
          ? ["Website recreation", "Frontend practice", "Independent, unofficial project"]
          : ["Automatically discovered from GitHub", repo.language ? `${repo.language} development` : "Web development", "Independent project"],
        stack: repo.language ? [repo.language] : ["Web project"],
        live: repo.homepage.trim(),
        repo: repo.html_url,
        code: String(featuredOverrides.length + index + 1).padStart(2, "0"),
        autoDiscovered: true,
        updatedAt: repo.updated_at
      };
    });
  const projectsToFeature = [
    ...featuredOverrides,
    ...autoFeatured.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  ];
  const liveProjects = [...new Map(projectsToFeature.filter((project) => project.live && !/west\s*citi|portfolio/i.test(project.name)).map((project) => [project.live.replace(/\/$/, ""), project])).values()];
  // Show repositories as soon as GitHub returns them; language metadata is optional.
  const projectsToShow = showAll ? repositories : repositories.slice(0, 8);
  const isRepoListAvailable = repoState === "ready";
  const filteredRepositories = projectsToShow.filter((repo) => {
    const languages = Object.keys(repositoryLanguages[repo.id] || {}).join(" ");
    return `${repo.name} ${repo.description || ""} ${languages}`.toLowerCase().includes(repoQuery.trim().toLowerCase());
  });

  return <div className="site-shell">
    {showIntroLoader && <div className="boot-loader" role="status" aria-label="Loading portfolio">
      <div className="boot-loader-grid" aria-hidden="true" />
      <div className="boot-loader-core">
        <span className="boot-loader-label">INITIALIZING PORTFOLIO</span>
        <div className="boot-loader-mark" aria-hidden="true"><span>AD</span><b>3</b><span>N1X</span><i>_</i></div>
        <div className="boot-loader-track"><span /></div>
        <span className="boot-loader-status">THINK <b>→</b> BUILD <b>→</b> REFINE</span>
      </div>
      <span className="boot-loader-index">SYS.BOOT / 001</span>
    </div>}
    <div className="ambient" aria-hidden="true" />
    <header className="header">
      <a className="brand" href="#home" aria-label="AD3N1X home">AD<span>3</span>N1X<span className="brand-cursor">_</span></a>
      <nav id="main-navigation" className={`nav ${mobileMenuOpen ? "nav-open" : ""}`} aria-label="Main navigation"><a onClick={() => setMobileMenuOpen(false)} href="#work">WORK <span>01</span></a><a onClick={() => setMobileMenuOpen(false)} href="#approach">APPROACH <span>02</span></a><a onClick={() => setMobileMenuOpen(false)} href="#stack">STACK <span>03</span></a></nav>
      <div className="header-actions"><a className="header-contact" onClick={() => setMobileMenuOpen(false)} href="#contact">CONTACT <Arrow /></a><button className="menu-toggle" type="button" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-controls="main-navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? "CLOSE −" : "MENU +"}</button></div>
    </header>

    <main id="home">
      <section className="hero page-width">
        <div className="hero-main">
          <div className="hero-kicker"><span className="pulse" /> JUNIOR FRONT-END DEVELOPER · NIGERIA</div>
          <h1>Curious by nature.<br /><span>Built to figure</span><br />things out<span className="acid">.</span></h1>
          <p className="hero-intro">I'm AD3N1X — a developer-in-progress who likes understanding how things work, solving problems, and turning ideas into useful digital experiences.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#work">EXPLORE MY WORK <span>↓</span></a><a className="btn btn-quiet" href={GITHUB} target="_blank" rel="noreferrer">GITHUB PROFILE <Arrow /></a></div>
          <div className="hero-meta"><span>BASED IN OSOGBO, NIGERIA</span><span>LEARN / BUILD / REFINE</span></div>
        </div>
        <aside className="identity-card" aria-label="Developer profile">
          <div className="identity-head"><span>PERSONALITY.SYS</span><span>BUILD 2026.10</span></div>
          <div className="identity-symbol"><span>AD</span><b>3</b><span>N1X</span><i>_</i></div>
          <div className="identity-rule" />
          <div className="identity-line"><span>DEFAULT MODE</span><strong>CURIOUS</strong></div>
          <div className="identity-line"><span>WORKFLOW</span><strong>THINK → BUILD → TEST</strong></div>
          <div className="identity-line"><span>CORE BELIEF</span><strong>USEFUL OVER NOISY</strong></div>
          <div className="identity-bottom"><span><i /> CURRENTLY LEARNING</span><span>0xAD3N1X</span></div>
          <div className="card-caption">LESS POSTURING.<br />MORE PROGRESS.</div>
        </aside>
        <div className="hero-index">PORTFOLIO / 001—026</div>
      </section>

      <div className="ticker" aria-label="Areas of focus"><div>FRONT-END DEVELOPMENT <b>✳</b> JAVASCRIPT <b>✳</b> REACT <b>✳</b> RESPONSIVE UI <b>✳</b> DEBUGGING <b>✳</b> KEEP LEARNING <b>✳</b> FRONT-END DEVELOPMENT <b>✳</b> JAVASCRIPT <b>✳</b> REACT <b>✳</b></div></div>

      <section id="work" className="section page-width">
        <div className="section-head"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Made to be<br /><span>explored.</span></h2></div><p className="section-note">Two featured builds, chosen to lead with product thinking and practical engineering. Open the live experience or inspect the source.</p></div>
        <div className="featured-grid featured-grid-top">{projectsToFeature.slice(0, 2).map((project) => <ProjectCard key={project.repo} project={project} />)}</div>
        <p className="section-note auto-feature-note">Featured work is curated; the live gallery below discovers public projects from GitHub automatically.</p>
        <div className="live-work-head"><div><p className="eyebrow">LIVE ON THE WEB</p><h3>See it in action<span>.</span></h3></div><p>Real site previews, live links, and source code in one place. WestCiti and the portfolio itself are intentionally excluded.</p></div>
        <div className="live-preview-grid">{liveProjects.map((project, index) => <LivePreviewCard key={project.live} project={project} index={index} />)}</div>
        {repoState === "ready" && <p className="live-gallery-footnote">{liveProjects.length} live project link{liveProjects.length === 1 ? "" : "s"} found from curated builds and public GitHub repositories. Preview availability is checked in your browser as each screenshot loads.</p>}
      </section>

      <section id="approach" className="approach-section">
        <div className="page-width approach-layout"><div className="approach-heading"><p className="eyebrow">02 / HOW I WORK</p><h2>I don't need<br />to know it all.<br /><span>I need to learn<br />what's next.</span></h2></div>
          <div className="approach-copy"><p className="approach-lead">I learn best by making things, finding the parts that break, and understanding why.</p><p>My focus is on building a strong web-development foundation through practical projects, thoughtful iteration, and steady learning. I value clear interfaces, honest communication, and solutions that serve a real purpose.</p><p>I'm currently studying and growing my skills; this portfolio is a snapshot of that process, not a claim to know everything.</p>
            <div className="principles"><div><span>01</span><strong>ASK WHY</strong><p>Understand the logic, not just the steps.</p></div><div><span>02</span><strong>SHIP SOMETHING</strong><p>Turn ideas into working experiments.</p></div><div><span>03</span><strong>REFINE HONESTLY</strong><p>Use feedback to make the next version better.</p></div></div>
          </div>
        </div>
      </section>

      <section id="stack" className="section page-width stack-section">
        <div className="section-head"><div><p className="eyebrow">03 / TOOLKIT IN PROGRESS</p><h2>Learning the<br /><span>language.</span></h2></div><p className="section-note">A grounded view of my current toolkit — with a distinction between foundations I use and technologies I'm actively developing.</p></div>
        <div className="capability-list">{capabilities.map((item) => <article className="capability" key={item.n}><span className="capability-number">{item.n}</span><div><h3>{item.title}</h3><p>{item.body}</p></div><span className="capability-arrow">↗</span></article>)}</div>
        <div className="education-card"><div><p className="eyebrow">CURRENT LEARNING</p><h3>Software engineering & web development</h3><p>SQI College of ICT · Levels 1–3 completed · Preparing for Level 4</p><p className="learning-detail">Python: current learning focus · TypeScript: planned next step</p></div><span className="learning-pill"><i /> IN PROGRESS</span></div>
      </section>

      <section className="github-section"><div className="page-width github-layout"><div><p className="eyebrow">04 / THE REPOSITORY SHELF</p><h2>Open tabs.<br /><span>Open source.</span></h2><p className="github-intro">A live directory pulled from my public GitHub profile. Some repositories are experiments and practice projects; not every repository is a finished product.</p><a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">ALL REPOSITORIES <Arrow /></a><p className="sync-state"><i className={repoState === "ready" ? "online" : ""} /> {repoState === "ready" ? "GITHUB DATA CONNECTED" : repoState === "offline" ? "GITHUB TEMPORARILY UNAVAILABLE" : "CONNECTING TO GITHUB"}</p></div>
          <div className="repo-panel"><div className="repo-panel-head"><span>AD3N1X / PUBLIC REPOSITORIES</span><span>{isRepoListAvailable ? String(repositories.length).padStart(2, "0") : "—"}</span></div>
            {isRepoListAvailable && projectsToShow.length > 0 ? <><div className="repo-search-wrap"><label htmlFor="repo-search">FIND A REPOSITORY</label><input id="repo-search" className="repo-search" type="search" placeholder="Search name, description, language…" value={repoQuery} onChange={(event) => setRepoQuery(event.target.value)} /><span>{filteredRepositories.length} MATCH{filteredRepositories.length === 1 ? "" : "ES"}</span></div><div className="repo-list">{filteredRepositories.length ? filteredRepositories.map((repo) => <a className="repo-row" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><span className="repo-glyph">⌘</span><span className="repo-name"><strong>{repo.name}</strong><small>{repo.description || "Independent project / experiment"}</small></span><span className="repo-language-list" aria-label="Languages used">{Object.keys(repositoryLanguages[repo.id] || (repo.language ? { [repo.language]: 1 } : {})).map((language) => <span className="repo-language" key={language}>{language}</span>)}</span><Arrow /></a>) : <p className="repo-no-results">No repositories match that search. Try another keyword.</p>}</div></> : <div className="repo-empty"><span>⌁</span><p>{repoState === "offline" ? "Couldn't load the live list right now. You can still browse the GitHub profile directly." : "Loading public repositories…"}</p><a href={GITHUB} target="_blank" rel="noreferrer">OPEN GITHUB PROFILE ↗</a>{repoState === "offline" && <button className="show-more repo-retry" type="button" onClick={() => { setRepoState("loading"); setRepoRetry((value) => value + 1); }}>RETRY CONNECTION ↻</button>}</div>}
            {isRepoListAvailable && repositories.length > 8 && <button className="show-more" onClick={() => setShowAll(!showAll)}>{showAll ? "SHOW LESS ↑" : "SHOW MORE REPOSITORIES ↓"}</button>}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section"><div className="page-width contact-layout"><div><p className="eyebrow">05 / OPEN CHANNEL</p><h2>Have a useful<br />problem to solve<span>?</span></h2><p className="contact-intro">Open to junior opportunities, internships, thoughtful collaborations, and projects where I can contribute while learning.</p></div>
        <div className="contact-card"><span className="contact-label">START A CONVERSATION</span><a className="contact-email" href="mailto:adenix271@gmail.com">adenix271@gmail.com <Arrow /></a><CopyButton label="COPY EMAIL" value="adenix271@gmail.com" onCopy={copyContact} /><a className="contact-social" href="mailto:adeniranabe@outlook.com"><span>ALTERNATE EMAIL</span><strong>adeniranabe@outlook.com</strong><Arrow /></a><CopyButton label="COPY ALTERNATE EMAIL" value="adeniranabe@outlook.com" onCopy={copyContact} /><div className="contact-divider" /><a className="contact-social" href="tel:+2347039237610"><span>PHONE</span><strong>0703 923 7610</strong><Arrow /></a><CopyButton label="COPY PHONE NUMBER" value="0703 923 7610" onCopy={copyContact} /><a className="contact-social" href="tel:+2349016953597"><span>PHONE</span><strong>0901 695 3597</strong><Arrow /></a><CopyButton label="COPY PHONE NUMBER" value="0901 695 3597" onCopy={copyContact} /><a className="contact-social" href="https://wa.me/2347039237610" target="_blank" rel="noreferrer"><span>WHATSAPP</span><strong>0703 923 7610</strong><Arrow /></a><CopyButton label="COPY WHATSAPP NUMBER" value="0703 923 7610" onCopy={copyContact} /><div className="contact-divider" /><a className="contact-social" href={GITHUB} target="_blank" rel="noreferrer"><span>GITHUB</span><strong>@Ad3n1x</strong><Arrow /></a><a className="contact-social" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Find me professionally</strong><Arrow /></a><CopyButton label="COPY ALL CONTACT INFO" value={allContactInfo} onCopy={copyContact} className="copy-all-contact" /></div>
      </div></section>
    </main>
    <footer className="footer page-width"><a className="brand" href="#home">AD<span>3</span>N1X<span className="brand-cursor">_</span></a><p>Built with curiosity. Refined through practice.</p><a href="#home">BACK TO TOP ↑</a><span>© AD3N1X · 2026</span></footer>
  </div>;
}

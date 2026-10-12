import { useEffect, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const fallbackProjects = [
  { _id: "unitrack", number: "001", title: "UNI-TRACK", kind: "LIVE PRODUCT / PRODUCTIVITY", description: "A privacy-first tracking and productivity ecosystem built around personal workflows and useful daily progress.", technologies: ["JAVASCRIPT", "PRODUCT DESIGN", "WEB APP"], url: "https://unitrack-app.vercel.app/unitrack", sourceUrl: "https://github.com/Ad3n1x/UNI-TRACK", image: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://unitrack-app.vercel.app/unitrack" },
  { _id: "quickcart", number: "002", title: "QuickCart", kind: "FULL-STACK COMMERCE / SAAS", description: "A WhatsApp-first storefront for independent sellers, with product catalogues, orders, customers, seller tools, and a MongoDB-backed API.", technologies: ["REACT", "NODE.JS", "EXPRESS", "MONGODB"], url: "https://quick-cart-adeniran-victor-adebowales-projects.vercel.app", sourceUrl: "https://github.com/Ad3n1x/QuickCart", image: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://quick-cart-adeniran-victor-adebowales-projects.vercel.app" },
];

const skills = [
  ["01", "HTML5 / CSS3", "Semantic structure, responsive layout & visual systems", "IN USE"],
  ["02", "JavaScript", "ES6+, DOM interaction & application logic", "IN USE"],
  ["03", "React", "Component-based interfaces & state", "BUILDING"],
  ["04", "Node.js / Express", "REST APIs & server-side application logic", "BUILDING"],
  ["05", "MongoDB", "Document models & persistence with Mongoose", "BUILDING"],
  ["06", "Git / GitHub", "Version control, collaboration & deployment workflow", "IN USE"]
];

function ProjectCard({ project, index }) {
  const number = String(index + 1).padStart(3, "0");
  return <a className="project-card" href={project.url} target="_blank" rel="noreferrer">
    <div className="project-visual">
      {project.image ? <img src={project.image} alt={`${project.title} preview`} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="thought-art"><span>IDEAS</span><span className="thought-arrow">↘</span><span>INTO<br />INTERFACES<span className="accent">.</span></span></div>}
      <span className="project-index">PROJECT / {project.number || number}</span><span className="project-open">↗</span><span className="project-overlay">OPEN PROJECT ↗</span>
    </div>
    <div className="project-info"><div><p className="project-kind">{project.kind || "FRONT-END PROJECT"}</p><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-arrow">↗</span></div>
    <div className="tag-row">{(project.technologies || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
  </a>;
}

export default function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [apiStatus, setApiStatus] = useState("connecting");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubStatus, setGithubStatus] = useState("syncing");
  const [githubLastSynced, setGithubLastSynced] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/projects`)
      .then((response) => { if (!response.ok) throw new Error("API unavailable"); return response.json(); })
      .then((data) => { if (active && Array.isArray(data.projects) && data.projects.length) { setProjects(fallbackProjects.map((featured) => { const match = data.projects.find((item) => (item.title || "").toLowerCase() === featured.title.toLowerCase() || item.url === featured.url); return { ...featured, ...(match || {}), image: match?.image || featured.image, sourceUrl: match?.sourceUrl || featured.sourceUrl }; })); } if (active) setApiStatus("connected"); })
      .catch(() => { if (active) setApiStatus("offline"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const syncPublicRepos = async () => {
      if (active) setGithubStatus("syncing");
      try {
        const response = await fetch("https://api.github.com/users/Ad3n1x/repos?type=public&sort=updated&per_page=100", {
          headers: { Accept: "application/vnd.github+json" }
        });
        if (!response.ok) throw new Error("GitHub API request failed");
        const data = await response.json();
        const knownLiveSites = [
          { _id: "live-unitrack", title: "UNI-TRACK", url: "https://unitrack-app.vercel.app/unitrack", sourceUrl: "https://github.com/Ad3n1x/UNI-TRACK", image: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://unitrack-app.vercel.app/unitrack", description: "A privacy-first tracking and productivity ecosystem.", technologies: ["JAVASCRIPT", "PRODUCTIVITY", "LIVE WEBSITE"], kind: "LIVE PRODUCT / PRODUCTIVITY" },
          { _id: "live-quickcart", title: "QuickCart", url: "https://quick-cart-adeniran-victor-adebowales-projects.vercel.app", sourceUrl: "https://github.com/Ad3n1x/QuickCart", image: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://quick-cart-adeniran-victor-adebowales-projects.vercel.app", description: "A WhatsApp-first storefront for independent sellers with catalogues, orders, customer flows, and seller tools.", technologies: ["REACT", "NODE.JS", "MONGODB", "LIVE WEBSITE"], kind: "FULL-STACK COMMERCE / SAAS" }
        ];
        const homepageSites = data
          .filter((repo) => !repo.fork && !repo.archived && repo.name.toLowerCase() !== "portfolio" && repo.name.toLowerCase() !== "westciti" && typeof repo.homepage === "string" && /^https?:\/\//i.test(repo.homepage.trim()))
          .map((repo) => ({
            _id: `github-live-${repo.id}`,
            title: repo.name.replace(/[-_]/g, " "),
            kind: repo.language ? `LIVE WEBSITE / ${repo.language.toUpperCase()}` : "LIVE WEBSITE",
            description: repo.description || `A public AD3N1X project. Visit the live website.`,
            technologies: [repo.language, "LIVE WEBSITE"].filter(Boolean),
            url: repo.homepage.trim(),
            updatedAt: repo.updated_at
          }));
        const combined = [...knownLiveSites];
        for (const site of homepageSites) {
          if (!combined.some((known) => known.url.replace(/\/$/, "").toLowerCase() === site.url.replace(/\/$/, "").toLowerCase())) combined.push(site);
        }
        const liveSites = combined.map((site, index) => ({ ...site, number: String(index + 1).padStart(3, "0") }));
        if (active) {
          setGithubRepos(liveSites);
          setGithubStatus("synced");
          setGithubLastSynced(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
      } catch {
        if (active) setGithubStatus("offline");
      }
    };
    syncPublicRepos();
    const interval = window.setInterval(syncPublicRepos, 5 * 60 * 1000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setNotice("");
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Couldn't send that message. Please try again.");
      setNotice("Message received. Thanks for reaching out — I'll get back to you.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setNotice("The contact API isn't connected yet. You can email me directly at adeniranabe@outlook.com.");
    } finally { setSending(false); }
  }

  return <>
    <div className="ambient-grid" aria-hidden="true" />
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="AD3N1X home">AD<span>3</span>N1X<span className="wordmark-cursor">_</span></a>
      <nav aria-label="Main navigation"><a href="#work">WORK<span>01</span></a><a href="#github">GITHUB<span>02</span></a><a href="#about">MINDSET<span>03</span></a><a href="#skills">STACK<span>03</span></a></nav>
      <a className="header-cta" href="#contact">LET'S CONNECT <span>↗</span></a>
    </header>
    <main id="home">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> INDEPENDENT MIND / DEVELOPER IN PROGRESS</p>
          <h1>I observe.<br />I build.<br /><span className="accent-line">I figure it out<span className="period">.</span></span></h1>
          <p className="intro">I'm <strong>AD3N1X</strong> — a front-end developer who likes understanding how things work, solving the awkward little problems, and turning ideas into clean, useful interfaces.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">VIEW SELECTED WORK <span>↓</span></a><a className="text-link" href="#contact">START A CONVERSATION ↗</a></div>
          <div className="hero-bottomline"><span>HTML / CSS / JAVASCRIPT</span><span>OSOGBO, NIGERIA</span><span>SYS.ID — AX001</span></div>
        </div>
        <div className="hero-console" aria-label="AD3N1X developer identity graphic">
          <div className="console-top"><span className="console-lights"><i /><i /><i /></span><span>identity.core</span><span>v.01</span></div>
          <div className="console-body"><p className="console-comment">// personality profile</p><div className="console-logo">AD<span>3</span>N1X<span className="cursor">_</span></div><div className="console-rule" />
            <div className="console-row"><span>MODE</span><strong>CURIOUS / OBSERVANT</strong></div><div className="console-row"><span>PROCESS</span><strong>THINK → BUILD → REFINE</strong></div><div className="console-row"><span>DEFAULT</span><strong>FIGURE IT OUT</strong></div>
            <div className="console-footer"><span className="status-dot" /> ALL SYSTEMS LEARNING <span className="console-code">0xAD3N1X</span></div>
          </div><div className="console-stamp">LESS NOISE.<br />MORE SIGNAL.</div><span className="decor-cross cross-a">+</span><span className="decor-cross cross-b">+</span>
        </div>
      </section>
      <div className="ticker"><div>BUILD WITH INTENT <b>✳</b> HTML5 <b>✳</b> CSS3 <b>✳</b> BOOTSTRAP <b>✳</b> JAVASCRIPT <b>✳</b> DEBUG / LEARN / REPEAT <b>✳</b> BUILD WITH INTENT <b>✳</b> HTML5 <b>✳</b> CSS3 <b>✳</b> BOOTSTRAP <b>✳</b> JAVASCRIPT <b>✳</b></div></div>
      <section id="work" className="section-wrap section-block">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED BUILDS</p><h2>Proof of work<span className="accent">.</span><br /><span className="muted-heading">Not just talk.</span></h2></div><p className="section-side">Small projects. Real practice. Each build teaches me something new about layout, responsiveness, and how the web behaves.</p></div>
        <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project._id || project.url || project.title} project={project} index={index} />)}</div>
        <p className="project-note"><span>*</span> These are independent practice projects and recreations, not official products or brand affiliations.</p>
        <p className="api-note"><span className={`api-dot ${apiStatus}`} /> PROJECT DATA: {apiStatus === "connected" ? "CONNECTED TO API" : apiStatus === "offline" ? "SHOWING LOCAL FALLBACK" : "CONNECTING TO API"}</p>
      </section>
      <section id="github" className="section-wrap section-block github-section">
        <div className="section-heading"><div><p className="eyebrow">LIVE WEBSITES / GITHUB AUTO-SYNC</p><h2>Live on<br /><span className="muted-heading">the web.</span></h2></div><div className="github-sync-tools"><p className="section-side">I judged the live projects for product usefulness, technical range, and how well they represent your current skills. These are the two I would lead with.</p></div></div>
        <p className="api-note"><span className={`api-dot ${githubStatus === "synced" ? "connected" : githubStatus === "offline" ? "offline" : ""}`} /> FEATURED SHORTLIST: {githubStatus === "synced" ? `UPDATED · LAST CHECK ${githubLastSynced}` : githubStatus === "offline" ? "UNAVAILABLE · TRY AGAIN" : "FETCHING LIVE WEBSITE LINKS"}</p>
        {githubRepos.length ? <div className="project-grid github-project-grid">{githubRepos.map((project, index) => <ProjectCard key={project._id} project={project} index={index} />)}</div> : <p className="github-empty">{githubStatus === "offline" ? "GitHub couldn't be reached right now. Your selected live projects above remain available." : "Loading public repositories from GitHub…"}</p>}
        <p className="project-note"><span>*</span> Only configured live-site URLs and the two verified live projects are shown here. WestCiti is intentionally excluded; private repositories are never displayed.</p>
      </section>
      <section id="about" className="about-section"><div className="section-wrap about-layout">
        <div className="about-heading"><p className="eyebrow">02 / HOW I THINK</p><h2>Curiosity is<br />my starting<br /><span className="accent">point.</span></h2><div className="about-index">[ HUMAN.EXE ]</div></div>
        <div className="about-copy"><p className="about-lead">I like pulling things apart mentally, finding the logic, and making them work better.</p><p>That applies to code, interfaces, and troubleshooting. I'm building my foundation through hands-on projects and the Full-Stack Software Engineering Program at SQI College of ICT.</p><p>I'm still learning, and I keep it honest. I value useful feedback, steady improvement, and work that solves an actual problem.</p>
          <div className="principles"><div><span>01</span><strong>STAY CURIOUS</strong><p>Ask why before copying how.</p></div><div><span>02</span><strong>MAKE IT WORK</strong><p>Useful beats unnecessary noise.</p></div><div><span>03</span><strong>KEEP REFINING</strong><p>Every bug has something to teach.</p></div></div>
          <div className="about-facts"><div><span>LOCATION</span><strong>Osogbo, Nigeria</strong></div><div><span>EDUCATION</span><strong>SQI College of ICT · In progress</strong></div></div>
        </div>
      </div></section>
      <section id="skills" className="section-wrap section-block skills-section"><div className="section-heading"><div><p className="eyebrow">03 / CURRENT TOOLKIT</p><h2>My working<br /><span className="muted-heading">vocabulary.</span></h2></div><p className="section-side">The tools and foundations I currently practise while building front-end interfaces. Always learning; never pretending.</p></div>
        <div className="skills-list">{skills.map(([number, name, description, status]) => <div className="skill-row" key={number}><span className="skill-number">{number}</span><h3>{name}</h3><p>{description}</p><span className="skill-status">{status}</span></div>)}</div>
        <div className="education-strip"><div><p className="eyebrow">CURRENTLY STUDYING</p><h3>Full-Stack Software Engineering</h3><p>SQI College of ICT</p></div><span className="education-status"><i /> IN PROGRESS</span></div>
      </section>
      <section id="contact" className="contact-section"><div className="section-wrap contact-inner"><p className="eyebrow">04 / OPEN CHANNEL</p><h2>Got something<br />worth building<span className="contact-dot">?</span></h2><p>Open to junior front-end opportunities, thoughtful collaborations, and projects where I can contribute while getting better.</p>
        <form className="contact-form" onSubmit={handleSubmit}><div className="form-pair"><label>Your name<input name="name" value={form.name} onChange={updateField} required minLength="2" maxLength="80" placeholder="What should I call you?" /></label><label>Your email<input name="email" type="email" value={form.email} onChange={updateField} required maxLength="254" placeholder="you@example.com" /></label></div><label>Subject <input name="subject" value={form.subject} onChange={updateField} maxLength="120" placeholder="Project, opportunity, or just saying hello" /></label><label>Your message<textarea name="message" value={form.message} onChange={updateField} required minLength="10" maxLength="3000" rows="4" placeholder="Tell me what's on your mind..." /></label><button className="button button-contact" disabled={sending} type="submit">{sending ? "SENDING..." : "SEND A SIGNAL"} <span>↗</span></button>{notice && <p className="form-notice" role="status">{notice}</p>}</form>
        <div className="contact-details"><a href="mailto:adeniranabe@outlook.com">ADENIRANABE@OUTLOOK.COM</a><a href="https://github.com/Ad3n1x" target="_blank" rel="noreferrer">GITHUB / AD3N1X ↗</a><span>OSOGBO, NIGERIA</span></div>
      </div></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#home">AD<span>3</span>N1X<span className="wordmark-cursor">_</span></a><p>Built with curiosity. Refined through practice.</p><a href="#home">BACK TO TOP ↑</a><span className="footer-code">© AD3N1X / 2026</span></footer>
  </>;
}

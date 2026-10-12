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
  { n: "04", title: "Full-stack exploration", body: "Learning Node.js, Express, APIs, MongoDB, and how frontend and backend fit together." }
];

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

function ProjectCard({ project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return <article className="project-card">
    <div className="project-card-top"><span>SELECTED BUILD / {project.code}</span><span className="project-signal"><i /> PROJECT</span></div>
    <div className="project-art" aria-hidden="true"><span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" /><span className="art-mark">{project.name === "UNI-TRACK" ? "U/" : project.name === "QuickCart" ? "Q+" : "Q?"}</span><span className="art-index">{project.code}</span></div>
    <div className="project-content"><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p className="project-description">{project.description}</p>
      <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <button className="case-study-toggle" type="button" aria-expanded={detailsOpen} onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? "CLOSE CASE STUDY −" : "EXPLORE CASE STUDY +"}<span>{detailsOpen ? "LESS" : "OVERVIEW"}</span></button>
      {detailsOpen && <div className="case-study-details"><p>{project.details}</p><h4>PROJECT FOCUS</h4><ul>{project.focus.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      <div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">OPEN PROJECT <Arrow /></a>}<a href={project.repo} target="_blank" rel="noreferrer">VIEW SOURCE <Arrow /></a></div>
    </div>
  </article>;
}

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [repoState, setRepoState] = useState("loading");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/Ad3n1x/repos?per_page=100&sort=updated", { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error("GitHub unavailable"); return res.json(); })
      .then((data) => {
        const sorted = data.filter((repo) => !repo.fork && !/west\s*citi/i.test(repo.name))
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepositories(sorted);
        setRepoState("ready");
      })
      .catch((error) => { if (error.name !== "AbortError") setRepoState("offline"); });
    return () => controller.abort();
  }, []);

  const copyContact = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.prompt("Copy this contact information:", value);
    }
  };

  const copyEmail = () => copyContact("adenix271@gmail.com");

  const allContactInfo = "AD3N1X — CONTACT INFORMATION\\nEmail: adenix271@gmail.com\\nAlternate email: adeniranabe@outlook.com\\nPhone: 0703 923 7610\\nPhone: 0901 695 3597\\nWhatsApp: 0703 923 7610\\nWhatsApp link: https://wa.me/2347039237610\\nGitHub: https://github.com/Ad3n1x";

  const pinnedRepoNames = new Set(featuredOverrides.map((project) => project.repo.split("/").pop().toLowerCase()));
  const autoFeatured = repositories
    .filter((repo) => !repo.fork && !repo.archived && !/west\s*citi|portfolio/i.test(repo.name))
    .filter((repo) => !pinnedRepoNames.has(repo.name.toLowerCase()))
    .filter((repo) => typeof repo.homepage === "string" && /^https?:\/\//i.test(repo.homepage.trim()))
    .filter((repo) => Boolean(repo.description && repo.description.trim()))
    .map((repo, index) => ({
      name: repo.name.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
      type: `${repo.language || "WEB"} / COMMUNITY PROJECT`,
      description: repo.description.trim(),
      details: `${repo.description.trim()} This project was discovered automatically from the public AD3N1X GitHub repositories. Visit the live project to explore it, or inspect the source to see how it was built.`,
      focus: ["Automatically discovered from GitHub", repo.language ? `${repo.language} development` : "Web development", "Independent project"],
      stack: repo.language ? [repo.language] : ["Web project"],
      live: repo.homepage.trim(),
      repo: repo.html_url,
      code: String(featuredOverrides.length + index + 1).padStart(2, "0"),
      autoDiscovered: true,
      updatedAt: repo.updated_at
    }));
  const projectsToFeature = [
    ...featuredOverrides,
    ...autoFeatured.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  ];
  const projectsToShow = showAll ? repositories : repositories.slice(0, 8);

  return <div className="site-shell">
    <div className="ambient" aria-hidden="true" />
    <header className="header">
      <a className="brand" href="#home" aria-label="AD3N1X home">AD<span>3</span>N1X<span className="brand-cursor">_</span></a>
      <nav className="nav" aria-label="Main navigation"><a href="#work">WORK <span>01</span></a><a href="#approach">APPROACH <span>02</span></a><a href="#stack">STACK <span>03</span></a></nav>
      <a className="header-contact" href="#contact">CONTACT <Arrow /></a>
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
        <div className="section-head"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Made to be<br /><span>explored.</span></h2></div><p className="section-note">A few projects that reflect what I'm learning and building. Open the live experience or inspect the source — the work should speak for itself.</p></div>
        <div className="featured-grid">{projectsToFeature.map((project) => <ProjectCard key={project.repo} project={project} />)}</div>
        <p className="section-note auto-feature-note">{repoState === "ready" ? `${featuredOverrides.length} curated projects · ${autoFeatured.length} additional projects discovered from GitHub` : "Curated projects are shown while GitHub projects load."}</p>
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
        <div className="education-card"><div><p className="eyebrow">CURRENT LEARNING</p><h3>Software engineering & web development</h3><p>SQI College of ICT · JavaScript learning track</p></div><span className="learning-pill"><i /> IN PROGRESS</span></div>
      </section>

      <section className="github-section"><div className="page-width github-layout"><div><p className="eyebrow">04 / THE REPOSITORY SHELF</p><h2>Open tabs.<br /><span>Open source.</span></h2><p className="github-intro">A live directory pulled from my public GitHub profile. Some repositories are experiments and practice projects; not every repository is a finished product.</p><a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">ALL REPOSITORIES <Arrow /></a><p className="sync-state"><i className={repoState === "ready" ? "online" : ""} /> {repoState === "ready" ? "GITHUB DATA CONNECTED" : repoState === "offline" ? "GITHUB TEMPORARILY UNAVAILABLE" : "CONNECTING TO GITHUB"}</p></div>
          <div className="repo-panel"><div className="repo-panel-head"><span>AD3N1X / PUBLIC REPOSITORIES</span><span>{repoState === "ready" ? String(repositories.length).padStart(2, "0") : "—"}</span></div>
            {repoState === "ready" && projectsToShow.length > 0 ? <div className="repo-list">{projectsToShow.map((repo) => <a className="repo-row" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><span className="repo-glyph">⌘</span><span className="repo-name"><strong>{repo.name}</strong><small>{repo.description || "Independent project / experiment"}</small></span><span className="repo-language">{repo.language || "PROJECT"}</span><Arrow /></a>)}</div> : <div className="repo-empty"><span>⌁</span><p>{repoState === "offline" ? "Couldn't load the live list right now. You can still browse the GitHub profile directly." : "Loading public repositories…"}</p><a href={GITHUB} target="_blank" rel="noreferrer">OPEN GITHUB PROFILE ↗</a></div>}
            {repoState === "ready" && repositories.length > 8 && <button className="show-more" onClick={() => setShowAll(!showAll)}>{showAll ? "SHOW LESS ↑" : "SHOW MORE REPOSITORIES ↓"}</button>}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section"><div className="page-width contact-layout"><div><p className="eyebrow">05 / OPEN CHANNEL</p><h2>Have a useful<br />problem to solve<span>?</span></h2><p className="contact-intro">Open to junior opportunities, internships, thoughtful collaborations, and projects where I can contribute while learning.</p></div>
        <div className="contact-card"><span className="contact-label">START A CONVERSATION</span><a className="contact-email" href="mailto:adenix271@gmail.com">adenix271@gmail.com <Arrow /></a><button className="copy-email" onClick={() => copyContact("adenix271@gmail.com")}>COPY EMAIL <span>⧉</span></button><a className="contact-social" href="mailto:adeniranabe@outlook.com"><span>ALTERNATE EMAIL</span><strong>adeniranabe@outlook.com</strong><Arrow /></a><button className="copy-email" onClick={() => copyContact("adeniranabe@outlook.com")}>COPY ALTERNATE EMAIL <span>⧉</span></button><div className="contact-divider" /><a className="contact-social" href="tel:+2347039237610"><span>PHONE</span><strong>0703 923 7610</strong><Arrow /></a><button className="copy-email" onClick={() => copyContact("0703 923 7610")}>COPY PHONE NUMBER <span>⧉</span></button><a className="contact-social" href="tel:+2349016953597"><span>PHONE</span><strong>0901 695 3597</strong><Arrow /></a><button className="copy-email" onClick={() => copyContact("0901 695 3597")}>COPY PHONE NUMBER <span>⧉</span></button><a className="contact-social" href="https://wa.me/2347039237610" target="_blank" rel="noreferrer"><span>WHATSAPP</span><strong>0703 923 7610</strong><Arrow /></a><button className="copy-email" onClick={() => copyContact("0703 923 7610")}>COPY WHATSAPP NUMBER <span>⧉</span></button><div className="contact-divider" /><a className="contact-social" href={GITHUB} target="_blank" rel="noreferrer"><span>GITHUB</span><strong>@Ad3n1x</strong><Arrow /></a><a className="contact-social" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Find me professionally</strong><Arrow /></a><button className="copy-email copy-all-contact" onClick={() => copyContact(allContactInfo)}>COPY ALL CONTACT INFO <span>⧉</span></button></div>
      </div></section>
    </main>
    <footer className="footer page-width"><a className="brand" href="#home">AD<span>3</span>N1X<span className="brand-cursor">_</span></a><p>Built with curiosity. Refined through practice.</p><a href="#home">BACK TO TOP ↑</a><span>© AD3N1X · 2026</span></footer>
  </div>;
}

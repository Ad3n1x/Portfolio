(() => {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;

  const username = 'Ad3n1x';
  const featured = [
    {
      repo: 'UNI-TRACK',
      title: 'UNI-TRACK',
      kind: 'PRODUCTIVITY WEB APP',
      description: 'A privacy-first tracking and productivity ecosystem built to help people organise their work and daily progress.',
      live: 'https://unitrack-app.vercel.app/unitrack',
      tags: ['PRODUCTIVITY', 'WEB APP']
    },
    {
      repo: 'QuickCart',
      title: 'QuickCart',
      kind: 'COMMERCE / FULL-STACK',
      description: 'A commerce experience focused on making product discovery and WhatsApp-based checkout more practical.',
      live: '',
      tags: ['JAVASCRIPT', 'COMMERCE']
    },
    {
      repo: 'AI-CONV-HELP',
      title: 'AI Conversation Helper',
      kind: 'AI-ASSISTED TOOL',
      description: 'An AI-assisted conversation project exploring context-aware support and useful reply suggestions.',
      live: '',
      tags: ['AI', 'JAVASCRIPT']
    },
    {
      repo: 'westciti',
      title: 'WestCiti Restaurant & Lounge',
      kind: 'CLIENT WEBSITE / HOSPITALITY',
      description: 'A digital presence for a restaurant and lounge, designed around its dining, events and nightlife experience.',
      live: '',
      tags: ['WEB DESIGN', 'RESPONSIVE UI']
    },
    {
      repo: 'lv3node',
      title: 'LV3 Node',
      kind: 'BACK-END / LEARNING PROJECT',
      description: 'A substantial Node.js learning and development repository demonstrating continued exploration beyond the front end.',
      live: '',
      tags: ['NODE.JS', 'BACK-END']
    }
  ];

  const esc = (value = '') => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  const tagList = (tags = []) => tags.slice(0, 3).map(tag => '<span>' + esc(tag) + '</span>').join('');
  const visualClass = index => ['visual-human', 'visual-piggy', 'visual-thought'][index % 3];

  function card(item, index) {
    const href = item.live || item.html_url;
    const description = item.description || 'An open-source project from the AD3N1X GitHub workspace.';
    const tags = item.tags?.length ? item.tags : [item.language || 'GITHUB PROJECT'];
    return `
      <a class="project-card ${index === 0 || index === 3 ? 'project-card-wide' : ''}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">
        <div class="project-visual ${visualClass(index)}">
          <div class="thought-art"><span>AD3N1X / ${String(index + 1).padStart(2, '0')}</span><span class="thought-arrow">↗</span><span>${esc(item.title).replace(/\s+/g, '<br>')}<span class="accent">.</span></span></div>
          <span class="project-index">GITHUB / ${String(index + 1).padStart(3, '0')}</span>
          <span class="project-open">↗</span>
          <span class="project-overlay">EXPLORE PROJECT ↗</span>
        </div>
        <div class="project-info"><div><p class="project-kind">${esc(item.kind || 'GITHUB PROJECT')}</p><h3>${esc(item.title)}</h3><p>${esc(description)}</p></div><span class="project-arrow">↗</span></div>
        <div class="tag-row">${tagList(tags)}</div>
      </a>`;
  }

  async function syncProjects() {
    const response = await fetch('https://api.github.com/users/' + username + '/repos?sort=updated&per_page=100', {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) throw new Error('GitHub returned ' + response.status);
    const repos = await response.json();
    const byName = new Map(repos.map(repo => [repo.name.toLowerCase(), repo]));

    const pinned = featured.map(item => {
      const repo = byName.get(item.repo.toLowerCase());
      return repo ? {
        ...repo,
        title: item.title,
        kind: item.kind,
        description: item.description,
        live: item.live || repo.homepage || '',
        tags: item.tags
      } : null;
    }).filter(Boolean);

    const pinnedNames = new Set(pinned.map(repo => repo.name.toLowerCase()));
    const recent = repos
      .filter(repo => !repo.fork && !repo.archived && !pinnedNames.has(repo.name.toLowerCase()))
      .filter(repo => !['portfolio', 'javascript-overview', 'javascript-basics', 'multiplication-table', 'word-counter'].includes(repo.name.toLowerCase()))
      .slice(0, 3)
      .map(repo => ({
        ...repo,
        title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
        kind: 'RECENT GITHUB PROJECT',
        description: repo.description || 'A project from my public GitHub workspace. Open the repository to inspect the code and implementation.',
        live: repo.homepage || '',
        tags: [repo.language || 'SOURCE CODE', 'OPEN SOURCE']
      }));

    const selected = [...pinned, ...recent].slice(0, 6);
    if (!selected.length) throw new Error('No public repositories found');
    grid.innerHTML = selected.map(card).join('');
    grid.setAttribute('aria-live', 'polite');

    const note = document.querySelector('.project-note');
    if (note) note.innerHTML = '<span>↻</span> Synced live from <a href="https://github.com/' + username + '" target="_blank" rel="noopener noreferrer">GitHub / ' + username + '</a>. Repository names, languages, descriptions and update activity refresh when this page loads. Featured projects are curated; live demos appear when available.';
  }

  syncProjects().catch(error => {
    console.warn('GitHub project sync unavailable; keeping the portfolio fallback projects.', error);
    const note = document.querySelector('.project-note');
    if (note) note.innerHTML = '<span>*</span> Showing the saved project selection. Live GitHub sync will retry on your next visit.';
  });
})();
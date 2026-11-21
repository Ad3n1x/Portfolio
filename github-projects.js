(() => {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;

  const username = 'Ad3n1x';
  const featured = [
    { repo: 'ADVERSE', title: 'ADVERSE', kind: 'PUBLIC-SOURCE SEARCH / RESEARCH', description: 'An intent-first public-source search and research workspace for discovering destinations, checking links and tracing evidence to its origin.', live: 'https://adverse-web.onrender.com/', preview: 'adverse' },
    { repo: 'UNI-TRACK', title: 'UNI-TRACK', kind: 'PRODUCTIVITY WEB APP', description: 'A privacy-first tracking and productivity ecosystem for organising habits, tasks, goals and daily progress.', live: 'https://unitrack-app.vercel.app/', preview: 'unitrack' },
    { repo: 'QuickCart', title: 'QuickCart', kind: 'COMMERCE / FULL-STACK', description: 'A Nigeria-first commerce platform helping small businesses manage storefronts, products and customer orders.', live: 'https://quick-cart-three-chi.vercel.app/', preview: 'quickcart' },
    { repo: 'AI-CONV-HELP', title: 'AI Conversation Helper', kind: 'AI-ASSISTED TOOL', description: 'An AI-assisted conversation project exploring context-aware support and useful reply suggestions.', live: 'https://ai-conv-help.vercel.app/', tags: ['AI', 'JAVASCRIPT'] },
    { repo: 'Quiz-App', title: 'Quiz App', kind: 'INTERACTIVE LEARNING APP', description: 'A quiz application for interactive learning and STEM practice.', live: 'https://quiz-app-henna-omega.vercel.app/', tags: ['JAVASCRIPT', 'EDUCATION'] }
  ];

  const excluded = new Set(['portfolio', 'javascript-overview', 'javascript-basics', 'multiplication-table', 'word-counter', 'westciti']);
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const tags = item => (item.tags?.length ? item.tags : [item.language || 'SOURCE CODE', 'GITHUB']).slice(0, 3).map(tag => '<span>' + esc(tag) + '</span>').join('');

  function card(item, index) {
    const href = item.live || item.html_url;
    const preview = item.preview
      ? '<img class="live-project-preview" src="./multimedia/previews/' + esc(item.preview) + '.png?v=' + Date.now() + '" alt="Latest captured live preview of ' + esc(item.title) + '" loading="lazy" onerror="this.remove();">'
      : '<div class="thought-art"><span>AD3N1X / ' + String(index + 1).padStart(2, '0') + '</span><span class="thought-arrow">↗</span><span>' + esc(item.title).replace(/\s+/g, '<br>') + '<span class="accent">.</span></span></div>';
    return `
      <a class="project-card ${index < 3 ? 'project-card-wide' : ''}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">
        <div class="project-visual live-preview-visual">
          ${preview}
          <span class="project-index">${esc(item.kind || 'GITHUB PROJECT')}</span>
          <span class="project-open">↗</span>
          <span class="project-overlay">EXPLORE PROJECT ↗</span>
        </div>
        <div class="project-info"><div><p class="project-kind">${esc(item.kind || 'GITHUB PROJECT')}</p><h3>${esc(item.title)}</h3><p>${esc(item.description || 'An open-source project from the AD3N1X GitHub workspace.')}</p></div><span class="project-arrow">↗</span></div>
        <div class="tag-row">${tags(item)}</div>
      </a>`;
  }

  async function syncProjects() {
    const response = await fetch('https://api.github.com/users/' + username + '/repos?sort=updated&per_page=100', { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error('GitHub returned ' + response.status);
    const repos = await response.json();
    const byName = new Map(repos.map(repo => [repo.name.toLowerCase(), repo]));

    const pinned = featured.map(item => {
      const repo = byName.get(item.repo.toLowerCase());
      return repo ? { ...repo, ...item, live: item.live || repo.homepage || '' } : null;
    }).filter(Boolean);
    const pinnedNames = new Set(pinned.map(repo => repo.name.toLowerCase()));
    const recent = repos
      .filter(repo => !repo.fork && !repo.archived && !excluded.has(repo.name.toLowerCase()) && !pinnedNames.has(repo.name.toLowerCase()))
      .slice(0, 2)
      .map(repo => ({
        ...repo,
        title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
        kind: 'RECENT GITHUB PROJECT',
        description: repo.description || 'A project from my public GitHub workspace. Open the repository to inspect the code and implementation.',
        live: repo.homepage || '',
        tags: [repo.language || 'SOURCE CODE', 'OPEN SOURCE']
      }));

    const selected = [...pinned, ...recent].slice(0, 7);
    if (!selected.length) throw new Error('No public repositories found');
    grid.innerHTML = selected.map(card).join('');
    grid.setAttribute('aria-live', 'polite');
    const note = document.querySelector('.project-note');
    if (note) note.innerHTML = '<span>↻</span> Live project previews are refreshed automatically from deployed applications. Repository details sync from <a href="https://github.com/' + username + '" target="_blank" rel="noopener noreferrer">GitHub / ' + username + '</a>.';
  }

  syncProjects().catch(error => {
    console.warn('GitHub project sync unavailable; keeping the portfolio fallback projects.', error);
  });
})();
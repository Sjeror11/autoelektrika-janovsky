(() => {
  const searchInput = document.getElementById('caseSearch');
  const makeFilter = document.getElementById('caseMake');
  const statusFilter = document.getElementById('caseStatus');
  const resultCount = document.getElementById('caseResultCount');
  const emptyState = document.getElementById('caseEmpty');
  const cards = Array.from(document.querySelectorAll('.case-card'));

  if (!searchInput || !makeFilter || !statusFilter || !resultCount || !cards.length) return;

  const normalize = (value) => String(value || '')
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const makes = [...new Set(cards.map(card => card.dataset.make).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'cs'));
  makes.forEach(make => {
    const option = document.createElement('option');
    option.value = make;
    option.textContent = make;
    makeFilter.appendChild(option);
  });

  const statuses = [...new Set(cards.map(card => card.dataset.status).filter(Boolean))];
  statuses.forEach(status => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = status;
    statusFilter.appendChild(option);
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('q')) searchInput.value = params.get('q');
  if (params.get('make')) makeFilter.value = params.get('make');
  if (params.get('status')) statusFilter.value = params.get('status');

  const filterCases = () => {
    const query = normalize(searchInput.value);
    const make = makeFilter.value;
    const status = statusFilter.value;
    let visible = 0;

    cards.forEach(card => {
      const haystack = normalize(card.textContent + ' ' + (card.dataset.search || ''));
      const matchesQuery = !query || query.split(/\s+/).every(term => haystack.includes(term));
      const matchesMake = !make || card.dataset.make === make;
      const matchesStatus = !status || card.dataset.status === status;
      const show = matchesQuery && matchesMake && matchesStatus;
      card.hidden = !show;
      if (show) visible += 1;
    });

    resultCount.textContent = visible === 1 ? '1 nalezený případ' : `${visible} nalezených případů`;
    if (emptyState) emptyState.hidden = visible !== 0;

    const next = new URLSearchParams();
    if (searchInput.value.trim()) next.set('q', searchInput.value.trim());
    if (make) next.set('make', make);
    if (status) next.set('status', status);
    const queryString = next.toString();
    history.replaceState(null, '', queryString ? `${location.pathname}?${queryString}` : location.pathname);
  };

  searchInput.addEventListener('input', filterCases);
  makeFilter.addEventListener('change', filterCases);
  statusFilter.addEventListener('change', filterCases);

  document.querySelectorAll('[data-case-query]').forEach(button => {
    button.addEventListener('click', () => {
      searchInput.value = button.dataset.caseQuery || '';
      filterCases();
      searchInput.focus();
    });
  });

  filterCases();
})();

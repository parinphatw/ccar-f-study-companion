/* Progressive enhancement only: original content and navigation work without JS. */
(() => {
  if (location.pathname.endsWith('/print.html')) return;
  const main = document.querySelector('main');
  if (!main) return;
  const headings = [...main.querySelectorAll('h2[id]')];
  if (headings.length < 2) return;
  const outline = document.createElement('nav');
  outline.className = 'page-outline';
  outline.setAttribute('aria-label', 'On this page');
  const label = document.createElement('p');
  label.textContent = 'On this page';
  outline.append(label);
  for (const heading of headings) {
    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    outline.append(link);
  }
  document.querySelector('.page-wrapper').append(outline);
})();

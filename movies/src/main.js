import slugify from '@sindresorhus/slugify';

(() => {
  const _$ = {};

  /**
   * @param  {object} config
   * @param  {string} config.title
   * @param  {string} config.date
   * @param  {string} config.rating
   * @param  {string} config.comment
   */
  function _markdown(config) {
    const {
      title,
      date,
      rating,
      comment
    } = config;

    return `
---
type: movie
title: "${title}"
date: "${date}"
name: "${title}"
season:
episode:
rating: ${+rating}
ratingEmoji: ${'⭐️'.repeat(+rating)}
share: true
---

${comment ? comment : ''}
`.trim();
  }

  function _setElements() {
    _$.form = document.querySelector('form');
  }

  function _formatDate() {
    const now = new Date();

    function _fixNumber(number) {
      if (number < 10) number = `0${number}`;
      return number;
    }

    const day = _fixNumber(now.getDate());
    const month = _fixNumber(now.getMonth() + 1);
    const hours = _fixNumber(now.getHours());
    const minutes = _fixNumber(now.getMinutes());
    const seconds = _fixNumber(now.getSeconds());

    return `${now.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  function _handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const rating = formData.get('rating');
    const comment = formData.get('comment');

    const titleSlug = slugify(title);
    const content = _markdown({
      title,
      date: _formatDate(),
      rating,
      comment
    });

    const URL = `https://github.com/quicoto/reviews/new/master/content/blog/movies/?filename=${titleSlug}/index.md`;

    navigator.clipboard.writeText(content);
    window.location.href = URL;
  }

  function _addEventListeners() {
    _$.form.addEventListener('submit', _handleSubmit);
  }

  function _init() {
    _setElements();
    _addEventListeners();
  }

  _init();
})();

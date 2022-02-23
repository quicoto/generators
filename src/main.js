(() => {
  const _$ = {};

  /**
   * @param  {object} config
   * @param  {string} config.show
   * @param  {string} config.season
   * @param  {string} config.episode
   * @param  {string} config.date
   * @param  {string} config.rating
   * @param  {string} config.comment
   * @param  {string} config.share
   */
  function _markdown(config) {
    const {
      show,
      season,
      episode,
      date,
      rating,
      comment,
      share
    } = config

    return `
---
type: series
title: "${show} ${season}x${episode}"
date: "${date}"
name: "${show}"
season: ${+season}
episode: ${+episode}
rating: ${+rating}
ratingEmoji: ${'⭐️'.repeat(+rating)}
share: ${share === 'true' ? 'true' : 'false'}
---

${comment ? comment : '*[No review was written for this episode]*'}
`.trim();
  }


  function _setElements() {
    _$.form = document.querySelector('form');
  }

  function _formatDate() {
     const now = new Date();

      function _fixNumber(number) {
        if (number < 10) number = `0${number}`;

        return number
      }

      const day = _fixNumber(now.getDate());
      const month = _fixNumber(now.getMonth() + 1);
      const hours = _fixNumber(now.getHours());
      const minutes = _fixNumber(now.getMinutes());
      const seconds = _fixNumber(now.getSeconds());

      return `${now.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }

  function _handleSubmit(event) {
    let URL = 'https://github.com/quicoto/reviews/new/master/content/blog/tv-shows/?filename=tv-shows/%SHOW%/%SEASON%x%EPISODE%/index.md';

    event.preventDefault();

    const formData = new FormData(event.target);
    const show = formData.get('show');
    const season = formData.get('season');
    const episode = formData.get('episode');
    const rating = formData.get('rating');
    const comment = formData.get('comment');
    const share = formData.get('share');
    const content = _markdown({
      show,
      season,
      episode,
      date: _formatDate(),
      rating,
      comment,
      share
    });

    URL = URL.replace('%SHOW%', show);
    URL = URL.replace('%SEASON%', season);
    URL = URL.replace('%EPISODE%', episode);

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

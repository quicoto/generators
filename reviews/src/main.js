(() => {
  const _$ = {};

  /**
   * @param  {object} config
   * @param  {string} config.showFormatted
   * @param  {string} config.season
   * @param  {string} config.episode
   * @param  {string} config.date
   * @param  {string} config.rating
   * @param  {string} config.comment
   * @param  {string} config.share
   */
  function _markdown(config) {
    const {
      type,
      showFormatted,
      season,
      episode,
      volume,
      date,
      rating,
      comment,
      share
    } = config

    function episodeOrVolume() {
      let text = '';

      if (+season) {
        text += `season: ${+season}`
      }

      if (+episode) {
        text += `\nepisode: ${+episode}`
      }

      if (+volume) {
        text += `volume: ${+volume}`
      }

      return text
    }

    function titleFormatted() {
      let title = showFormatted

      if (type !== 'manga') {
        title += `${season}x${episode}`
      }
    }

    return `
---
type: ${type === 'manga' ? 'manga' : 'series'}
title: "${titleFormatted()}"
date: "${date}"
name: "${showFormatted}"
${episodeOrVolume()}
rating: ${+rating}
ratingEmoji: ${'⭐️'.repeat(+rating)}
share: ${share === 'true' ? 'true' : 'false'}
---

${comment ? comment : `*[No review was written for this ${type === 'manga' ? 'volume' : 'episode'}]*`}
`.trim();
  }


  function _setElements() {
    _$.form = document.querySelector('form');
    _$.show = document.querySelector("[name='show']");
    _$.seasonWrapper = document.querySelector('#season-wrapper');
    _$.episodeWrapper = document.querySelector('#episode-wrapper');
    _$.volumeWrapper = document.querySelector('#volume-wrapper');
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
    event.preventDefault();

    const formData = new FormData(event.target);
    const show = formData.get('show');
    const selectedShow = document.querySelector("[name='show']").selectedOptions[0]
    const commonPath = "https://github.com/quicoto/reviews/new/master/content/blog/"
    const folder = selectedShow.dataset.type === 'manga' ? '%VOLUME%' : '%SEASON%x%EPISODE%';
    let URL = `${commonPath}${selectedShow.dataset.type}/?filename=${selectedShow.dataset.type}/%SHOW%/${folder}/index.md`;
    const showFormatted = selectedShow.innerText;
    const season = formData.get('season');
    const episode = formData.get('episode');
    const volume = formData.get('volume');
    const rating = formData.get('rating');
    const comment = formData.get('comment');
    const share = formData.get('share');
    const content = _markdown({
      showFormatted,
      type: selectedShow.dataset.type,
      season,
      episode,
      volume,
      date: _formatDate(),
      rating,
      comment,
      share
    });

    URL = URL.replace('%SHOW%', show);
    URL = URL.replace('%SEASON%', season);
    URL = URL.replace('%EPISODE%', episode);
    URL = URL.replace('%VOLUME%', volume);

    navigator.clipboard.writeText(content);

    window.location.href = URL;
  }

  function _handleChange() {
    const show = document.querySelector("[name='show']").selectedOptions[0];

    if (show.dataset.type === 'manga') {
      _$.seasonWrapper.setAttribute('hidden', true);
      _$.episodeWrapper.setAttribute('hidden', true);
      _$.volumeWrapper.removeAttribute('hidden');
    } else if (show.dataset.type === 'tv-shows') {
      _$.seasonWrapper.removeAttribute('hidden');
      _$.episodeWrapper.removeAttribute('hidden');
      _$.volumeWrapper.setAttribute('hidden', true);
    }
  }

  function _addEventListeners() {
    _$.form.addEventListener('submit', _handleSubmit);
    _$.show.addEventListener('change', _handleChange);
  }

  function _init() {
    _setElements();
    _addEventListeners();
  }

  _init();
})();

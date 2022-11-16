(() => {
  const _$ = {};

  /**
   * @param  {object} config
   * @param  {string} config.title
   * @param  {string} config.tags
   * @param  {string} config.description
   * @param  {string} config.language
   * @param  {string} config.code
   * @param  {string} config.date
   */
  function _markdown(config) {
    const {
      title,
      tags,
      description,
      language,
      code,
      date
    } = config

    let customTags = '';

    if (tags.length !== 0) {
      customTags = `
tags: `;

      tags.split(' ').forEach((tag) => {
        customTags += `\n- ${tag.toLowerCase()}`;
      })
    }

    return `
---
title: "${title}"
date: "${date}"
${customTags}
---

${description ? description : ''}

{{< highlight ${language} >}}
${code}
{{< /highlight >}}
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

      return `${now.getFullYear()}-${month}-${day}`
  }

  function _handleSubmit(event) {
    let URL = 'https://github.com/quicoto/gists/new/main/content/writing/?filename=writing/%DATE%.md';

    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const tags = formData.get('tags');
    const language = formData.get('language');
    const code = formData.get('code');
    const date = _formatDate();
    const content = _markdown({
      title,
      tags,
      description,
      language,
      code,
      date
    });

    URL = URL.replace('%DATE%', date);


    // eslint-disable-next-line no-console
    console.log(content)
    // eslint-disable-next-line
    debugger

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

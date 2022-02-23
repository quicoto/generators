(() => {
  const _$ = {};


  function _setElements() {
    _$.form = document.querySelector('form');
  }

  function _handleSubmit(event) {
    let URL = 'https://github.com/quicoto/reviews/new/master/content/blog/tv-shows/?filename=tv-shows/${show}/${season}x${episode}/index.md';

    event.preventDefault();

    const formData = new FormData(event.target);

    URL = URL.replace('${show}', formData.get('show'));
    URL = URL.replace('${season}', formData.get('season'));
    URL = URL.replace('${episode}', formData.get('episode'));

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




// var app = new Vue({
//   el: '#app',
//   data: {
//     rating: 3,
//     episode: null,
//     season: null,
//     share: 0,
//     comment: '',
//     show: '0',
//     loading: true
//   },
//   mounted: function() {
//     this.loading = false;
//   },
//   methods: {
//     copy: function (event) {

//       event.preventDefault();
//       const $el = document.querySelector('[name="markdown"]');

//       $el.select();
//       document.execCommand("copy");
//       this.$refs['github-link'].click();
//     }
//   },
//   computed: {
//     prettyShow: function () {
//       return SindresorhusSlugify.default(this.show)
//     },
//     date: function () {
//         const now = new Date();

//         function _fixNumber(number) {
//           if (number < 10) number = `0${number}`;

//           return number
//         }

//         const day = _fixNumber(now.getDate());
//         const month = _fixNumber(now.getMonth() + 1);
//         const hours = _fixNumber(now.getHours());
//         const minutes = _fixNumber(now.getMinutes());
//         const seconds = _fixNumber(now.getSeconds());

//         return `${now.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`
//     }
//   }
// })

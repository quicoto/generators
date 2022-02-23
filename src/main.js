import * as SindresorhusSlugify from "https://cdn.skypack.dev/@sindresorhus/slugify@2.1.0";

var app = new Vue({
  el: '#app',
  data: {
    rating: 3,
    episode: null,
    season: null,
    share: 0,
    comment: '',
    show: '0',
    loading: true
  },
  mounted: function() {
    this.loading = false;
  },
  methods: {
    copy: function (event) {

      event.preventDefault();
      const $el = document.querySelector('[name="markdown"]');

      $el.select();
      document.execCommand("copy");
      this.$refs['github-link'].click();
    }
  },
  computed: {
    prettyShow: function () {
      return SindresorhusSlugify.default(this.show)
    },
    date: function () {
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
  }
})

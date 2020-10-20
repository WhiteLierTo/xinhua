module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '新华日报财经',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: '新华日报财经', name: '新华日报财经', content: "新华日报财经"}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@/main.css',
    '@/video.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/register.js',
      ssr: true
    },
    {
      src: '@/plugins/vue-awesome-swiper.js',
      ssr: false
    },
    {
      src: '@/plugins/device.js',
      ssr: true
    },
    {
      src: '@/plugins/axios.js',
      ssr: true
    },
    {
      src: '@/plugins/filters.js',
      ssr: true
    },
    {
      src: '@/plugins/wx.js',
      ssr: true
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  router: {
    middleware: "redirect"
  },
};

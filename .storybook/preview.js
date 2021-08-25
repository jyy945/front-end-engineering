const ElementPlus = require("element-plus");
const Vue = require('@storybook/vue3')
require("element-plus/lib/theme-chalk/index.css")
Vue.app.use(ElementPlus.ElInfiniteScroll).use(ElementPlus.ElLoading)

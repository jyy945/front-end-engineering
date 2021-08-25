# checc-element-plus

> 基于element-plus的vue3组件库


## 安装

```sh
yarn add checc-element-plus
```

## 使用方法

```js
import { createApp } from 'vue'
import App from './App.vue'
import CheccElementPlus from 'checc-element-plus'
import 'checc-element-plus/lib/index.esm.css'

createApp(App).use(CheccElementPlus).mount('#app')
```

```vue
<template>
  <cel-button/>
</template>
```

## 开发项目

nodejs ^12

开始

```bash
yarn install
yarn sb
```
打开`http://localhost:6006/`

添加组件包

```bash
yarn package:add <packageName>
```

删除组件包

```bash
yarn package:remove <packageName>
```

代码提交

```bash
yarn commit
```

更新提交日志

```bash
yarn changelog
```

发布组件库(需先确保yarn源为私服地址，且需已注册账号)

```bash
yarn build
yarn publish
```

组件预览及文档地址
`http://10.25.183.251:100/`

## License

[MIT](http://opensource.org/licenses/MIT)

---
title: vite+ts+vue3
---

# Vite+ts+vue3

::: tip

使用 pnpm 代替 npm，pnpm 速度更快

:::

```bash
npm i pnpm -g
```

```bash
pnpm install    
pnpm run dev  //测试效果
```

## 初始化项目

使用vue-ts模版

```bash
pnpm create vite learn-vite --template vue-ts
```

## 工程化组件

### .nvmrc文件

避免每次切换项目都手动切换 node 版本

```bash
v21
```

### Sass

```bash
pnpm install sass -D
```

新建common.scss，并在main.ts中引入

::: code-group

```ts[common.scss]
// 随便写个样式
a{
    color:red;
}
```

```ts[main.ts]
import { createApp } from 'vue'
import './style.css'
import './common.scss'// [!code ++]
import App from './App.vue'

createApp(App).mount('#app')
```

:::

### Autoprefixer

> autoprefixer 是postcss的功能插件，给 web 项目自动增加 css 前缀，兼容各种浏览器

```bash
pnpm install autoprefixer -D
```

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'// [!code ++]
 
// https://vitejs.dev/config/
export default defineConfig({
  css: {// [!code ++]
    postcss: {// [!code ++]
      plugins: [// [!code ++]
        autoprefixer({// [!code ++]
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],// [!code ++]
        })// [!code ++]
      ]// [!code ++]
    }// [!code ++]
  },// [!code ++]
  plugins: [vue()],
```

### windicss

```bash
pnpm i vite-plugin-windicss windicss -D
```

::: code-group

```ts[vite-config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import WindiCSS from 'vite-plugin-windicss'// [!code ++]

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        })
      ]
    }
  },
  plugins: [vue()],// [!code --]
  plugins: [vue(),WindiCSS()],// [!code ++]
})
```

```ts[main.ts]
import { createApp } from 'vue'
import './style.css'
import './common.scss'
import 'virtual:windi.css'// [!code ++]
import App from './App.vue'

createApp(App).mount('#app')
```

```ts[windi.config.ts]
import { defineConfig } from 'vite-plugin-windicss'
 
export default defineConfig({
    attributify: true
})
```

:::

在`App.vue`调用，并测试windicss 

```vue[app.vue]
……
<template>

<div class="text-red-500">text windicss</div>// [!code focus]
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
……
```

![](/vue/截屏2024-05-2006.15.33.png)

### Antd组件库

> vue2 中我们经常使用 element-ui，但是升级到 vue3，虽然可以使用 element-plus 依旧会有很多兼容性问题

```bash
pnpm i ant-design-vue
```

> 引用antd样式，并在App.vue测试

::: code-group

```ts[main.ts]
import { createApp } from 'vue'
import './style.css'
import './common.scss'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'

createApp(App).mount('#app')
```

```vue[App.vue]
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {Button} from 'ant-design-vue'// [!code ++]
</script>

<template>
<Button type="primary">Test</Button>// [!code ++]
<div class="text-red-500">text windicss</div>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
……
```

:::

### Pinia

> Pinia是Vue 的专属状态管理库，基本可以满足小型项目的需求

```bash
pnpm i pinia
```
`main.ts`中引入pinia

```ts
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import './common.scss'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'

createApp(App).mount('#app')// [!code --]
const app = createApp(App)// [!code ++]
app.use(createPinia())// [!code ++]
app.mount('#app')// [!code ++]
```

:file_folder: `src`新建store/index.ts

```ts
import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = defineStore({
    id: "index",
    state: () => ({
        name: "old name",
    }),
    getters: {
        myName: (state) => {
            return `getters ${state.name}`
        }
    },
    actions: {
        changeName(name: string) {
            this.name = name
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
```

`App.vue`测试

```ts
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {Button} from 'ant-design-vue'
import {useStore} from './store/index'// [!code ++]

const store = useStore()// [!code ++]
function changename(): void{// [!code ++]
  store.name = 'newName'// [!code ++]
}

</script>

<template>
<Button type="primary">Test</Button>// [!code --]
<Button type="primary" @click="changename">{{ store.name }}// [!code ++]</Button>
<div class="text-red-500">text windicss</div>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
……
```

### Vue-router

```bash
pnpm i vue-router
```

#### 测试文件

:open_file_folder: `src`新建:file_folder: pages，并新建account.vue和login.vue文件

::: code-group

```vue[account.vue]
<template>
    <div @click="toLogin">toLogin</div>
    <router-view></router-view>
</template>
<script lang="ts" setup>
 
import { useRoute, useRouter } from 'vue-router'
 
const router = useRouter()
function toLogin() {
    router.push({
        name: 'login'
    })
}
</script>
```

```vue[login.vue]
<template>
    <div @click="toAccount">toAccount</div>
    <router-view></router-view>
</template>
<script lang="ts" setup>
 
import { useRoute, useRouter } from 'vue-router'
 
const router = useRouter()
function toAccount() {
    router.push({
        name: 'account'
    })
}
</script>
```

:::

在:open_file_folder: 新建 router/index.ts 

```ts
import { createRouter, createWebHistory,  } from 'vue-router'
 
export const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import("../pages/login.vue")
    },
    {
        name: 'account',
        path: '/account',
        component: () => import("../pages/account.vue")
    }
 
]
 
const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory(),
    routes,
})
 
 
router.beforeEach((to,from, next) => {
    next()
})
 
export default router
```

#### 调用

::: code-group

```ts[main.ts]
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'// [!code ++]
import './style.css'
import './common.scss'
import 'virtual:windi.css'
// import 'ant-design-vue/dist/reset.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)// [!code ++]
app.mount('#app')
```

```
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'// [!code --]
import { Button } from 'ant-design-vue'
import { useStore } from './store/index'

const store = useStore()
function changename(): void {
  store.name = 'newName'
}
</script>

<template>
<Button type="primary" @click="changename">{{store.name}}</Button>
<Button type="primary">test</Button>
<div class="text-red-500">text windicss</div>
  <div>// [!code --]
    <a href="https://vitejs.dev" target="_blank">// [!code --]
      <img src="/vite.svg" class="logo" alt="Vite logo" />// [!code --]
    </a>// [!code --]
    <a href="https://vuejs.org/" target="_blank">// [!code --]
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />// [!code --]
    </a>// [!code --]
  </div>// [!code --]
  <HelloWorld msg="Vite + Vue" />// [!code --]
  <RouterView />// [!code ++]
</template>

<style lang="scss"></style>// [!code --]

<style scoped>// [!code --]
.logo {// [!code --]
  height: 6em;// [!code --]
  padding: 1.5em;// [!code --]
  will-change: filter;// [!code --]
  transition: filter 300ms;// [!code --]
}// [!code --]

.logo:hover {// [!code --]
  filter: drop-shadow(0 0 2em #646cffaa);// [!code --]
}// [!code --]

.logo.vue:hover {// [!code --]
  filter: drop-shadow(0 0 2em #42b883aa);// [!code --]
}// [!code --]
</style>// [!code --]
```

### Types/node

> @types/node 模块在我们使用 node 方法（比如 path.resolve）时提供 ts 类型声明

```bash
pnpm i @types/node -D
```

::: code-group

```json[tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* types/node *c
    "baseUrl": "",// [!code ++]
    "paths": {// [!code ++]
      "@/*":["./src/*"]// [!code ++]
    }// [!code ++]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

```ts[vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'// [!code ++]

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        })
      ]
    }
  },
  resolve:{ // [!code ++]
    alias:[ // [!code ++]
      { [// [!code ++]
        find:'@', // [!code ++]
        replacement:resolve(__dirname,'src') // [!code ++]
      } // [!code ++]
    ] // [!code ++]
  },// [!code ++]
  plugins: [vue(),WindiCSS()],
})
```

```ts[main.ts]
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'// [!code --]
import router from '@/router/index'// [!code ++]
import './style.css'
import './common.scss'
import 'virtual:windi.css'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

:::

### Polyfill

Polifill 是 web 项目兼容低版本浏览器的插件。

```bash
pnpm i @vitejs/plugin-legacy -D 
pnpm i core-js
```

在:open_file_folder: 新建 polyfill/polyfill.ts

```ts
import 'core-js/stable'
```

::: code-group

```ts[main.ts]
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import './style.css'
import './common.scss'
import 'virtual:windi.css'
import 'ant-design-vue/dist/reset.css'
import '@/polyfill/polyfill'// [!code ++]
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

```ts[vite-config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'// [!code ++]

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        })
      ]
    }
  },
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname,'src')
      }
    ]
  },
  plugins: [vue(),WindiCSS()],// [!code --]
  plugins: [// [!code ++]
    vue(),// [!code ++]
    WindiCSS(),// [!code ++]
    legacy({// [!code ++]
      targets:["cover 99.5%"],// [!code ++]
    }),// [!code ++]
  ],// [!code ++]
  optimizeDeps:{// [!code ++]
    include:["core-js"]// [!code ++]
  }// [!code ++]
})
```

:::

### Prettier

```bash
pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-vue -D
```

> [!warning]
>
> 注意 .eslintignore、.eslintrc.js、.prettierignore、.prettierrc.js 文件放在根目录

::: code-group

```nginx[.eslintignore]
/dist
/node_modules
tsconfig.json
*.svg
*.png
*.jpg
*.jpeg
*.scss
*.gif
*.webp
*.ttf
index.html
*.md
```

```js[.eslintrc.js]
module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
	rules: {
		'vue/no-v-html': 0,
		'vue/v-on-event-hyphenation': 0,
		'vue/no-template-shadow': 0,
		'vue/multi-word-component-names': 0,
	},
}
```

```]nginx[.prettierignore
/dist
/node_modules
/deploy
*.yml
*.yaml
tsconfig.json
*.svg
*.png
*.jpg
*.jpeg
*.scss
*.gif
*.webp
*.ttf
index.html
*.md
```

```js[.prettierrc.js]
module.exports = {
	singleQuote: true, // 使用单引号代替双引号
	printWidth: 200, // 超过最大值换行
	semi: false, // 结尾不用分号
	useTabs: true, // 缩进使用tab, 不使用空格
	tabWidth: 4, // tab 样式宽度
	bracketSpacing: true, // 对象数组, 文字间加空格 {a: 1} => { a: 1 }
	arrowParens: 'avoid', // 如果可以, 自动去除括号 (x) => x 变为 x => x
	proseWrap: 'preserve',
	htmlWhitespaceSensitivity: 'ignore',
	trailingComma: 'all',
}
```

```json[package.json]
  "name": "learn-vite",
  "private": true,
  "version": "0.0.0",
  "type": "module",// [!code --]
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
@@ -17,14 +16,31 @@
  },
  "devDependencies": {
  		……
  }
  },
  "lint-staged": {// [!code ++]
    "*.vue": [// [!code ++]
      "eslint --fix",// [!code ++]
      "git add",// [!code ++]
      "echo \"hello\""// [!code ++]
    ]// [!code ++]
  },// [!code ++]
  "browserslist": [// [!code ++]
    "cover 99.5%"// [!code ++]
  ]// [!code ++]
}
```

```]ts[src/vite-env.d.ts
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
```

:::

::: important 格式化文件

pnpm eslint --fix ./src/**/*.vue

:::

报错后修改以下文件

::: code-group

```vue[app.vue]
<script setup lang="ts"></script>

<template>
	<RouterView />
</template>

<style lang="scss"></style>
```

```vue[helloWorld]
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="count++">count is {{ count }}</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code>
			to test HMR
		</p>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>
		, the official Vue + Vite starter
	</p>
	<p>
		Install
		<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
		in your IDE for a better DX
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
```



:::

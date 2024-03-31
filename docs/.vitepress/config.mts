import { defineConfig } from 'vitepress'
import { navbar } from './navbar'
import { sidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vientiane",
  lang: 'zh-CN',
  description: "Road to code",
  markdown: {
    lineNumbers: true,
    math:true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '折叠内容'
    }
  },
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  lastUpdated: true, 
  outDir: '../dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navbar,
    sidebar: sidebar,
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/passwordgloo/vientiane' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText:'退出'
            }
          }
        }
      }
    },
    footer: {
      message: 'MIT协议 | Vitepress主题驱动',
      copyright: 'Copyright © 2024-present passwordgloo'
    }
  }
})

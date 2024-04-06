---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vientiane"
  text: "Road 2 code"
  tagline: 一粒阳光照肺腑，森罗万象罗心胸
  image:
      src: /logo.svg
      alt: 'Vientiane'
  actions:
    - theme: brand
      text: 博客
      link: https://iglooblog.top
    - theme: alt
      text: 关于
      link: /about

features:
  - icon: 📝
    title: 记录
    details: 整理个人学习历程

  - icon: 🤔
    title: 练习
    details: 提供个人学习案例

  - icon: 🪞
    title: 镜像
    details: 备份CSDN、博客园、个人网站内容
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  --vp-home-hero-image-background-image:  linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  --vp-home-hero-image-filter: blur(44px);
  --vp-c-indigo-3:#08E7E7;
}



@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>

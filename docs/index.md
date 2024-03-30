---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vientiane"
  text: "Road 2 code"
  tagline: 一粒阳光照肺腑，森罗万象罗心胸
  image:
      src: /images/logo.png
      alt: 'Vientiane'
  actions:
    - theme: brand
      text: 博客
      link: https://iglooblog.top
    - theme: alt
      text: 关于
      link: /about

features:
  - icon: 📖
    title: 教程
    details: 搜罗各地编程语言教程

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
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
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


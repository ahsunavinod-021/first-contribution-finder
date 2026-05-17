![header](https://capsule-render.vercel.app/api?type=waving&color=0:0d1421,50:00d4aa,100:0d1421&height=140&section=header&text=First%20Contribution%20Finder&fontSize=28&fontColor=ffffff&fontAlignY=55&animation=fadeIn)

<div align="center">

*Find real `good-first-issue` tickets from GitHub — filtered by language, live.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-00d4aa?style=for-the-badge&logo=vercel&logoColor=0d1421)](https://first-contribution-finder.vercel.app)
[![React](https://img.shields.io/badge/React-0d1421?style=for-the-badge&logo=react&logoColor=61dafb)](https://reactjs.org)
[![GitHub API](https://img.shields.io/badge/GitHub%20API-0d1421?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

</div>

---

## what it does

A lot of developers want to contribute to open source but don't know where to start. This app solves that — it pulls real `good-first-issue` labelled tickets directly from GitHub, lets you filter by programming language, and links you straight to the issue so you can get started.

No login. No setup. Just pick a language and go.

---

## features

- 🔍 **Language filter** — JavaScript, Python, TypeScript, C++, Rust, Go, Java, HTML
- 🔎 **Search** — filter results by issue title or repo name
- 🃏 **Issue cards** — shows repo, title, labels, comment count, and time since updated
- ⚡ **Live data** — fetches directly from the GitHub Search API on every query
- 💀 **Skeleton loading** — smooth loading states while data is being fetched
- ⚠️ **Error handling** — graceful messages for API rate limits or network issues

---

## preview

> Filter by language → browse issues → click to contribute

![preview](https://capsule-render.vercel.app/api?type=rect&color=0d1421&height=60&text=live%20at%20first-contribution-finder.vercel.app&fontSize=13&fontColor=00d4aa)

---

## tech stack

| Layer | Tech |
|---|---|
| Framework | React (Create React App) |
| Data | GitHub Search API (no auth required) |
| Styling | Inline styles + CSS animations |
| Fonts | Space Mono · DM Sans (Google Fonts) |
| Deployment | Vercel |

---

## run locally

```bash
# clone the repo
git clone https://github.com/ahsunavinod-021/first-contribution-finder.git

# move into the folder
cd first-contribution-finder

# install dependencies
npm install

# start the dev server
npm start
```

Opens at `http://localhost:3000`

---

## how it works

The app uses the **GitHub Search API** to query open issues labelled `good-first-issue` filtered by the selected programming language:

```
GET https://api.github.com/search/issues
  ?q=label:"good+first+issue"+language:{lang}+state:open
  &sort=updated&order=desc&per_page=15
```

No API key needed — GitHub allows 60 unauthenticated requests per hour.

---

## notes

- GitHub's unauthenticated API allows **60 requests/hour**. If you hit the limit, wait a minute and try again.
- Results are sorted by **most recently updated** so you always see active issues.

---

## why i built this

Making your first open source contribution is intimidating — finding the right issue is half the battle. I built this to make that step easier, and as a project to sharpen my React and API integration skills.

---

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:0d1421,50:00d4aa,100:0d1421&height=80&section=footer&animation=fadeIn)
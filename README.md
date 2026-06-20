# Claude Code AI Visual Lab

A highly visual, interactive single-page app that explains Claude Code — agents/subagents, skills, MCP, tokens, workflow — plus a glossary, resources, a dev-files guide, and a bring-your-own-key AI assistant + project generator. Built with Vite + React + TypeScript + Tailwind + Framer Motion. **Installable as a standalone app (PWA)** on Android, iOS, and desktop.

## Run it

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the built app (needed to test the installable app + offline)
```

## Install as a standalone Android app (PWA)

The app ships as a Progressive Web App: a service worker (offline cache), a web manifest, and app icons.

1. Host it over HTTPS (any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages) by deploying the `dist/` folder. (For a quick LAN test, `npm run preview -- --host` and open the shown URL on your phone.)
2. On the phone, open the URL in **Chrome** → menu **⋮ → Install app / Add to Home screen**.
3. It launches full-screen with its own icon, runs offline, and behaves like a native app. The AI assistant/generator still need a network connection (they call your chosen provider directly).

## Native Android APK (Capacitor — included)

This repo already wraps the app with [Capacitor](https://capacitorjs.com/); the native project lives in `android/`. The build packages the web bundle **inside** the APK, so it runs fully offline as a normal app.

**Prerequisites:** a JDK 17+ and the Android SDK (both ship with Android Studio).

```bash
npm run build              # 1. build the web app into dist/
npx cap sync android       # 2. copy dist/ into the native project
cd android
./gradlew assembleDebug    # 3. build the APK   (Windows: .\gradlew.bat assembleDebug)
```

The APK lands at `android/app/build/outputs/apk/debug/app-debug.apk`.

**Install on your phone (sideload):** copy that `.apk` to the device, then in Android open it and allow *Install unknown apps* for your file manager/browser. App id `com.visuallab.app`, min Android 7.0.

> The **debug** APK is for personal sideloading only. For the **Play Store** you need a *release* build signed with your own keystore: open `android/` in Android Studio → **Build → Generate Signed Bundle/APK → Android App Bundle (.aab)**, create a keystore, and upload the `.aab` to the Play Console.

---

This repo started from a Claude Code project pack. Original brief: `prompts/00_MASTER_PROMPT.md`.

## Goal

Build an app that teaches AI tooling through interaction, not long text:
- visual metaphors
- animated flows
- clickable cards
- simulations
- live token/context-budget examples
- agent/team diagrams
- MCP connector maps
- skill lifecycle demos
- practical Claude Code workflow recipes

## Suggested target stack

Recommended:
- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- React Flow or similar graph library
- shadcn/ui or a custom design system
- local-only content data in JSON/TS modules first

Do not start with a backend unless there is a concrete need.

## How to use

1. Create a clean project folder.
2. Copy this entire folder into the project root.
3. Open Claude Code in the root.
4. Paste `prompts/00_MASTER_PROMPT.md`.
5. Let Claude create the implementation plan first.
6. Ask Claude to implement in phases:
   - design system + shell
   - visual learning modules
   - interactivity/simulations
   - polish
   - verification
7. Use `/run` and `/verify` after meaningful milestones.
8. Use the project agents in `.claude/agents/` when reviewing design, learning quality, and technical quality.

## Project philosophy

The app should feel like an interactive museum exhibit, not a documentation site.
Every concept should have:
- one simple metaphor
- one animated visualization
- one concrete Claude Code example
- one “try it yourself” mini interaction
- one short takeaway

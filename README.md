# Pulse Streaming Web App

A Spotify-inspired music streaming web application built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Firebase**.

## Features

- Email/password and Google OAuth authentication
- Home page with recently played, trending playlists, and recommendations
- Real-time search for songs and artists
- Full music player with shuffle, repeat, seek, and volume controls
- Sticky bottom mini-player across pages
- User library with liked songs, playlists, and recent plays
- Artist profile pages with follow CTA
- Lyrics panel powered by a public lyrics API
- Offline caching with Service Workers + IndexedDB
- Firebase Cloud Messaging web push notifications

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **State:** Zustand
- **Audio Engine:** HTML5 Audio
- **Backend:** Firebase (Auth, Firestore, Storage, Cloud Functions)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key
```

### 3) Firebase setup guide

1. Create a Firebase project.
2. Enable **Authentication** providers: Email/Password and Google.
3. Create a **Firestore** database in production or test mode.
4. Enable **Cloud Storage** for audio and artwork assets.
5. Set up **Cloud Messaging** and generate a Web Push certificate (VAPID key).
6. (Optional) Create **Cloud Functions** to notify followers when artists upload tracks.

### 4) Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5) Build for production

```bash
npm run build
npm run start
```

## Service Worker & Offline Caching

- The service worker caches key static assets and audio files in `public/sw.js`.
- IndexedDB is used for offline track blobs in `src/lib/offlineCache.ts`.

## Project Structure

```
app/
  api/lyrics/route.ts
  artist/[id]/page.tsx
  library/page.tsx
  login/page.tsx
  search/page.tsx
  signup/page.tsx
src/components/
  Player.tsx
  Sidebar.tsx
  ...
src/lib/
  firebase.ts
  notifications.ts
  offlineCache.ts
```

## Notes

- The sample data can be replaced with Firestore reads in `src/data/mockData.ts`.
- Update the fallback audio URL in `src/components/Player.tsx` with your own storage file.

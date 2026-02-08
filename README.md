# SpotifyLike Mobile App

A Spotify-inspired mobile music streaming app built with **Expo + React Native + TypeScript**. The project includes authentication, a premium dark UI, navigation, offline caching, lyrics, artist profiles, and playlist management scaffolding.

## Features

- **Authentication**: Email/password login + signup (Firebase Auth)
- **Home**: Recently played, trending playlists, and recommendations from Firestore (fallback mock data)
- **Search**: Real-time search for songs, artists, albums
- **Player**: Full-screen player with playback controls, seek bar, shuffle/repeat, and lyrics panel
- **Mini Player**: Floating global playback controls
- **Library**: Liked songs, playlists, and logout
- **Offline**: Audio caching using Expo FileSystem
- **Artist Profiles**: Artist bios, stats, and follow toggle
- **Notifications**: Expo notification registration; Firebase Cloud Messaging ready

## Project Structure

```
App.tsx
src/
  components/
  navigation/
  screens/
  services/
  store/
  types/
  utils/
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure Firebase

Create a Firebase project and enable:
- Authentication (Email/Password + Google)
- Firestore
- Cloud Storage

Then create a `.env` file in the root:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

> Update `src/services/firebase.ts` if you prefer non-env configuration.

### 3) Run the app

```bash
npm run start
```

Then open it in Expo Go on iOS/Android.

## Firebase Notes

- **Firestore Collections** expected:
  - `songs` (title, artistName, artworkUrl, audioUrl, duration, artistId)
  - `playlists` (name, artworkUrl, songIds)
  - `artists` (name, imageUrl, bio, followers, monthlyListeners)
  - `users/{uid}/library` (liked songs, recent history, playlists)

## Notifications (FCM)

For production push notifications, integrate Firebase Cloud Messaging:
1. Configure FCM in Firebase Console.
2. Add `google-services.json` and `GoogleService-Info.plist`.
3. Implement Cloud Functions for new release notifications.

## Offline Caching

Audio is cached under `FileSystem.cacheDirectory/tracks/`. Playback prioritizes local files when offline.

## Environment

- Expo SDK 50
- React Native 0.73
- TypeScript 5

## License

MIT

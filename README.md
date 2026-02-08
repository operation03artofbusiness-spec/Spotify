# Spotify-Like Mobile Music Streaming App

A Spotify-inspired mobile music streaming app built with **Expo + React Native + TypeScript**, featuring authentication, search, playlists, offline caching, lyrics, and premium dark UI.

## Features

- **Authentication**: Email/password + Google sign-in (Firebase Auth)
- **Home**: Recently played, trending playlists, recommended tracks (Firestore)
- **Search**: Live filtering for songs and artists
- **Player**: Full player with shuffle, repeat, seek display, and lyrics panel
- **Mini Player**: Floating persistent player across the app
- **Library**: Liked songs + playlists
- **Playlists**: Create, rename, and update playlists (Firestore)
- **Offline**: Download and cache songs (Expo FileSystem)
- **Artist Profile**: Follow/unfollow, bio, and top songs
- **Notifications**: Expo Notifications ready for FCM

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure Firebase

Create a Firebase project and enable:

- Authentication (Email/Password, Google)
- Firestore Database
- Storage
- Cloud Messaging

Then create a `.env` file in the project root:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID=your-expo-client-id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id
```

### 3) Run the app

```bash
npm run start
```

## Project Structure

```
src/
  components/      # Reusable UI components
  constants/       # Theme + constants
  hooks/           # Custom hooks
  navigation/      # React Navigation setup
  screens/         # Application screens
  services/        # Firebase + data services
  store/           # Zustand stores
  types/           # Shared TypeScript types
```

## Firestore Data Model (Suggested)

```
tracks/{trackId}
  - title, artist, album, audioUrl, artworkUrl, duration, artistId, keywords
artists/{artistId}
  - name, imageUrl, bio, followers, monthlyListeners, keywords
playlists/{playlistId}
  - name, trackIds, ownerId
users/{userId}/recentlyPlayed/{trackId}
users/{userId}/playlists/{playlistId}
users/{userId}/following/{artistId}
```

## Notes

- Offline cache uses `expo-file-system` and falls back to streaming when not available.
- Expo Notifications is configured for in-app alerts. For full FCM, add native credentials in Firebase and EAS.

## Scripts

- `npm run start` - start Expo
- `npm run ios` - open iOS simulator
- `npm run android` - open Android emulator


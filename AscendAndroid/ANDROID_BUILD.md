# ASCEND — Android Build & Publish Guide

## Quick Commands

### Development (debug APK)
```bash
# 1. Build web assets
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Open in Android Studio
npx cap open android

# 4. Or build debug APK from CLI
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

### Release Build (Play Store AAB)
```bash
# 1. Build web assets
npm run build

# 2. Sync to Android  
npx cap sync android

# 3. Build release AAB
cd android && ./gradlew bundleRelease
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

## First-Time Release Setup

### 1. Generate Signing Key
```bash
keytool -genkey -v -keystore ascend-release.keystore -alias ascend -keyalg RSA -keysize 2048 -validity 10000
```
- Save the keystore file in `android/` directory
- **NEVER commit this file to git**

### 2. Create `android/keystore.properties`
```properties
storeFile=../ascend-release.keystore
storePassword=YOUR_STORE_PASSWORD
keyAlias=ascend
keyPassword=YOUR_KEY_PASSWORD
```

### 3. Uncomment signing in `android/app/build.gradle`
Uncomment the signing config block and the `signingConfig` line in `buildTypes.release`.

### 4. Build Signed AAB
```bash
cd android && ./gradlew bundleRelease
```

## Play Store Listing Requirements

### App Info
- **App name**: ASCEND
- **Short description**: Play 5 minutes. Get better at life. Daily challenges that train real skills.
- **Full description**: 
  ASCEND is the daily game that levels up YOU, not just your avatar.

  🧠 Mind Challenges — Sharpen logic and memory
  💡 Life Challenges — Master communication and money sense
  ⚡ Edge Challenges — Test yourself with harder optional rounds
  🎯 Real-World Missions — Apply what you learn IRL

  Features:
  • 5-minute daily sessions — no time wasting
  • Dual XP system (Play XP + Life XP)
  • Global leaderboard with ranks (Bronze → Apex)
  • Async duels with friends
  • 7 identity paths (Thinker, Speaker, Builder, Guardian, Strategist, Closer, Sage)
  • Ethical design — no loot boxes, no infinite scrolling

- **Category**: Education > Brain Games
- **Content rating**: Everyone
- **Target audience**: 13+

### Required Assets (create in Android Studio or Figma)
- [ ] Feature graphic: 1024×500px
- [ ] Phone screenshots: 2-8 screenshots at 1080×1920px
- [ ] Icon: 512×512px (hi-res)
- [ ] Privacy policy URL

### Privacy Policy
Since ASCEND stores all data locally (localStorage) and makes NO network requests:
- No personal data collected
- No analytics
- No third-party SDKs
- No ads
- Offline-first app

## File Structure
```
AscendAndroid/
├── src/                    # React web source
├── dist/                   # Built web assets (synced to Android)
├── android/                # Native Android project
│   ├── app/
│   │   ├── build.gradle    # Build config with signing
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── res/        # Icons, splash, themes
│   │       └── assets/     # Synced web bundle
│   └── build.gradle        # Project-level config
├── capacitor.config.ts     # Capacitor settings
└── package.json
```

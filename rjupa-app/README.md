# Rjúpa – Mobilapplikasjon (`rjupa-app`)

Dette er selve mobilapplikasjonen i Rjúpa-prosjektet.  
Applikasjonen er bygget med **Expo (React Native)** og bruker **Firebase** som backend.

---

## Teknologi
- **Expo SDK**
- **React Native**
- **TypeScript** (strict)
- **Expo Router** (filbasert navigasjon)
- **Firebase**
  - Authentication
  - Firestore
  - Hosting
- **NativeWind / Tailwind**
- **ESLint**

---

## Mappestruktur
- rjupa-app/
- ├── app/ # Expo Router (skjermer & navigasjon)
- │ ├── (tabs)/ # Tab-navigasjon
- │ ├── _layout.tsx # Root layout
- │ ├── index.tsx # Startskjerm
- │ └── settings.tsx
- │
- ├── src/
- │ ├── components/ # Gjenbrukbare komponenter
- │ │ ├── RjupaHeader.tsx
- │ │ ├── RjupaDrawerContent.tsx
- │ │ └── PrimaryButton.tsx
- │ │
- │ ├── constants/ # Tema og konstanter
- │ │ └── theme.ts
- │ │
- │ ├── context/ # React Context
- │ │ └── CurrentTestContext.tsx
- │ │
- │ ├── lib/ # Firebase & utils
- │ │ ├── firebase.ts
- │ │ ├── storage.ts
- │ │ └── validate.ts
- │ │
- │ └── types/ # TypeScript-typer
- │ └── test.ts
- │
- ├── assets/ # Bilder, ikoner
- ├── .env # Miljøvariabler (lokalt)
- ├── app.json
- ├── babel.config.js
- ├── metro.config.js
- ├── tailwind.config.js
- ├── tsconfig.json
- └── package.json

---

## Miljøvariabler
Prosjektet bruker Firebase. Opprett en `.env` i root av `rjupa-app/`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=xxxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx
EXPO_PUBLIC_FIREBASE_PROJECT_ID=xxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
EXPO_PUBLIC_FIREBASE_APP_ID=xxxx
```

## Kjør prosjektet lokalt

1. Installer avhengigheter
- npm install

2. Start Expo
- npx expo start

---

## Navigasjon

Applikasjonen bruker Expo Router:
- Filstruktur = navigasjon
- app/(tabs) → tab bar
- Drawer åpnes via custom header
- RjupaHeader og RjupaDrawerContent håndterer meny

---

## UI & Design

- Sentralisert tema i src/constants/theme.ts
- NativeWind/Tailwind for konsistent styling
- Fokus på:
   - Enkel navigasjon
   - Mobil-first design
   - God lesbarhet og kontrast

---

## Utviklere
Prosjektet er utviklet som del av bachelor i IT - Frontend og mobilutvikling & Programmering.

Team:
- Benedikte Dybsjord
- Victoria Ludvigsen
- Marcus André Bekkelund
- Henrik André Hansen
- Samer Khatib

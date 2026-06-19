#!/bin/bash
set -e

PROJECT="flowboard-frontend"

echo "🚀 Criando estrutura do FlowBoard..."

mkdir -p $PROJECT/{app,components,store,hooks,lib,i18n,public}

# App structure
mkdir -p $PROJECT/app/\(auth\)/{login,signup}
mkdir -p $PROJECT/app/\(app\)/{dashboard,analytics}
mkdir -p $PROJECT/app/\(app\)/board/\[id\]
mkdir -p $PROJECT/app/\(app\)/profile/\[id\]
mkdir -p $PROJECT/app/api

# Components
mkdir -p $PROJECT/components/{board,ui,gamification,analytics}

# Lib
mkdir -p $PROJECT/lib/{api,ws}

# ─── PLACEHOLDER FILES ───────────────────────────────────────────

# app root
touch $PROJECT/app/layout.tsx
touch $PROJECT/app/\(auth\)/login/page.tsx
touch $PROJECT/app/\(auth\)/signup/page.tsx
touch $PROJECT/app/\(app\)/layout.tsx
touch $PROJECT/app/\(app\)/dashboard/page.tsx
touch $PROJECT/app/\(app\)/board/\[id\]/page.tsx
touch $PROJECT/app/\(app\)/analytics/page.tsx
touch $PROJECT/app/\(app\)/profile/\[id\]/page.tsx

# board components
touch $PROJECT/components/board/{BoardCard,ListColumn,CardModal,BoardHeader}.tsx

# ui design system (10+ componentes → Minor module)
touch $PROJECT/components/ui/{Button,Avatar,Badge,Modal,Dropdown,Input,Tooltip,Toast,Skeleton,ProgressBar}.tsx

# gamification
touch $PROJECT/components/gamification/{XPBar,BadgeCard}.tsx

# analytics
touch $PROJECT/components/analytics/{VelocityChart,BurndownChart}.tsx

# store (Zustand)
touch $PROJECT/store/{boardStore,authStore,notifStore}.ts

# hooks
touch $PROJECT/hooks/{useSocket,useDragDrop,useOptimistic}.ts

# lib/api
touch $PROJECT/lib/api/{boards,cards,users}.ts

# lib/ws
touch $PROJECT/lib/ws/socketClient.ts

# i18n
echo '{}' > $PROJECT/i18n/pt.json
echo '{}' > $PROJECT/i18n/en.json
echo '{}' > $PROJECT/i18n/fr.json

# PWA manifest
cat << 'JSON' > $PROJECT/public/manifest.json
{
  "name": "FlowBoard",
  "short_name": "FlowBoard",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6366f1",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
JSON

# .env.example
cat << 'ENV' > $PROJECT/.env.example
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
ENV

# package.json
cat << 'PKG' > $PROJECT/package.json
{
  "name": "flowboard-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "next-pwa": "^5.6.0",
    "recharts": "^2.10.0",
    "socket.io-client": "^4.7.0",
    "zustand": "^4.5.0",
    "next-i18next": "^15.3.0",
    "next-auth": "^4.24.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "14.2.0"
  }
}
PKG

# tsconfig.json
cat << 'TS' > $PROJECT/tsconfig.json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TS

# next.config.js
cat << 'NEXT' > $PROJECT/next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['pt', 'en', 'fr'],
    defaultLocale: 'pt',
  },
}

module.exports = withPWA(nextConfig)
NEXT

# tailwind.config.ts
cat << 'TW' > $PROJECT/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#0f172a',
      },
    },
  },
  plugins: [],
}

export default config
TW

# .gitignore
cat << 'GIT' > $PROJECT/.gitignore
node_modules/
.next/
.env
.env.local
out/
*.log
GIT

echo ""
echo "✅ FlowBoard criado com sucesso!"
echo ""
echo "📦 Próximo passo:"
echo "   cd $PROJECT && npm install"
echo ""
echo "📁 Estrutura:"
find $PROJECT -type f | sort
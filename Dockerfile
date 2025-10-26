# === STAGE 1: Dépendances ===
FROM node:20-alpine AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./
# Assurez-vous d'avoir un package-lock.json ou un yarn.lock pour des builds reproductibles
# COPY package-lock.json ./ 

# Installer les dépendances
RUN npm install

# === STAGE 2: Build ===
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les dépendances du stage précédent
COPY --from=deps /app/node_modules ./node_modules
# Copier le reste du code source
COPY . .

# Construire l'application Next.js
# La sortie sera optimisée grâce à l'option `output: 'standalone'` dans next.config.ts
RUN npm run build

# === STAGE 3: Production ===
FROM node:20-alpine AS runner
WORKDIR /app

# Variables d'environnement pour le mode production
ENV NODE_ENV=production
# Désactiver la télémétrie de Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers de la sortie standalone du stage de build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Définir l'utilisateur non-root
USER nextjs

# Exposer le port sur lequel l'application s'exécutera
EXPOSE 9002

# Commande pour démarrer l'application
# Le port 9002 est défini dans le script "dev" de package.json,
# mais en production, Next.js utilise le port 3000 par défaut.
# Nous utilisons l'option -p pour le changer.
CMD ["node", "server.js", "-p", "9002"]

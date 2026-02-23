FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

COPY . .

# Build Nuxt en mode production
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.output ./.output

CMD ["node", ".output/server/index.mjs"]
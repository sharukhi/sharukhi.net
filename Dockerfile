# -----------------------
# 1. Dependencies
# -----------------------
FROM node:20-slim AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --no-audit --no-fund


# -----------------------
# 2. Build stage
# -----------------------
FROM node:20-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


# -----------------------
# 3. Runtime stage
# -----------------------
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Next.js standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

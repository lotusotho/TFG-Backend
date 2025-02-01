FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

# Set the global store directory to avoid conflicts
RUN pnpm config set store-dir /app/.pnpm-store --global

RUN pnpm install

COPY . .

RUN pnpm add -D typescript tsc-alias

RUN pnpm run compile

EXPOSE 3000

CMD ["node", "dist/app.js"]
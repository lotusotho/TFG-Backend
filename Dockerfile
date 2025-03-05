FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm config set store-dir /app/.pnpm-store --global
RUN pnpm install

COPY . .

RUN pnpm run build

RUN npm install -g concurrently

RUN mkdir -p /app/logs && chown -R node:node /app

USER 1000

EXPOSE 3000

CMD ["sh", "-c", "concurrently \"node dist/app.js\" \"sleep 10 && npm run test:coverage\""]
FROM node:alpine

WORKDIR /app
RUN npm install -g bun
COPY package.json ./
COPY prisma ./prisma
RUN bun install 

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "start"]
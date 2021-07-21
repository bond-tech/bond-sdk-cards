FROM node:12.16.1-alpine AS builder
ARG NODE_ENV
WORKDIR /app
ENV NODE_ENV=$NODE_ENV
COPY . /app
RUN npm install && npm run build:dev

FROM node:12.16.1-alpine
WORKDIR /app
COPY --from=builder /app/dist ./build
COPY serveStatic.js .
COPY entrypoint.sh .
RUN npm install express
ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD ["node","./serveStatic.js"]

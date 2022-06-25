FROM node:16.15.1 as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:16.13.1-buster-slim as runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/build/ /app/build/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/package.json /app/package.json
#TODO: .env configration needs a refactor so it only loads dotenv lib when we are on testing mode so there is no need to copy the .env file
COPY --from=builder /app/.env /app/.env

CMD ["npm", "run", "start"]

EXPOSE 50001

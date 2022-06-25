FROM node:16.15.1 as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:16.13.1-buster-slim as runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST='0.0.0.0' \
    PORT='5001' \
    DB_USER='postgres' \
    DB_PASSWORD='mypassword' \
    DB_HOST='0.0.0.0' \
    DB_PORT='5432' \
    DB_DATABASE='carto2' \
    DB_SSL='0'

COPY --from=builder /app/build/ /app/build/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/package.json /app/package.json

CMD ["npm", "run", "start"]

EXPOSE 5001

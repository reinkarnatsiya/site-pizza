FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV PORT=3000
EXPOSE $PORT

CMD npx json-server --watch db.json --port $PORT --static ./dist

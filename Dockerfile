FROM node:14.16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 8080

EXPOSE $PORT

RUN node_modules/typescript/bin/tsc -p tsconfig.json

CMD node dist/src/app.js

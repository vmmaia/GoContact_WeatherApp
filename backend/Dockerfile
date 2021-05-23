FROM node:current-alpine

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm run build

EXPOSE 5000

CMD ["node", "./build/index.js"]
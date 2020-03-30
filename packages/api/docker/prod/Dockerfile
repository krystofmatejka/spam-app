FROM node:10

ENV NODE_ENV=production

WORKDIR /app

ADD . ./

RUN npm ci --dev
RUN npm run build

CMD ["npm", "run", "start"]

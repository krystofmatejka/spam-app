FROM node:10

WORKDIR /app

ADD . ./

RUN npm ci --dev
CMD ["npm", "run", "start"]

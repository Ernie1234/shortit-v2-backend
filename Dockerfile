FROM node:alpine

WORKDIR '/app'

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build 

RUN ls -la dist

CMD ["node", "dist/index.js"]

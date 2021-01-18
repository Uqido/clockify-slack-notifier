FROM node:14.15-alpine

COPY package.json package-lock.json .
RUN npm install

CMD ['npm', 'start']
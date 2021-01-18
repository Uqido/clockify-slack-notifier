FROM node:14.15-alpine

COPY package.json package-lock.json index.js /
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
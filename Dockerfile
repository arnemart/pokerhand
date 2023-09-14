FROM node:20-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm ci --omit=dev

EXPOSE 3000
ENV NODE_ENV="production"
CMD ["npm", "start"]

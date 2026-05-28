FROM node:22-alpine3.20
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
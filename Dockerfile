FROM node:18-alpine3.17
WORKDIR .
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "build"]
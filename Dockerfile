FROM node:22-alpine3.20
WORKDIR ./
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "build"]
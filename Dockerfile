FROM node:alpine
WORKDIR .
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "build"]
FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

RUN npm install -g serve

EXPOSE 4200

CMD ["serve","-s","dist/stock-frontend/browser","-l","4200"]

FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm install --global rimraf
RUN npm install --global @nestjs/cli
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

ENV DB_HOST=sweet-store-db-id.cj0mwcyusbey.us-east-1.rds.amazonaws.com
ENV DB_PORT=5432
ENV DB_DATABASE=sweet_store_db
ENV DB_USER=postgres
ENV DB_PASSWORD=wAJuthrVuvz3hdPyuncf

CMD ["node", "dist/main.js"]

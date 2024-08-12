FROM node:18 AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package.json .
RUN npm install

COPY . .
RUN npm run build:stg

FROM nginx

COPY --from=build /app/dist/xr-backoffice /usr/share/nginx/html

EXPOSE 80
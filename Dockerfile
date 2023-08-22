FROM node:16-alpine as build-stage
LABEL maintainer="Bryan van der Starre <bryanvdstarre@gmail.com>"

WORKDIR /app

COPY ./ .

RUN yarn install && yarn run vite:build

FROM nginx:1.22.0-alpine as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app/dist

COPY .env.production /app/.env

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
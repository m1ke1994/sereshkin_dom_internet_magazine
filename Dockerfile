FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_BRAND_NAME

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BRAND_NAME=$VITE_BRAND_NAME

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 4012

CMD ["nginx", "-g", "daemon off;"]

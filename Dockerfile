FROM node:22-alpine AS web-build
WORKDIR /app
COPY apps/web/package.json apps/web/package-lock.json ./apps/web/
RUN npm ci --prefix apps/web
COPY apps/web ./apps/web
RUN npm run build --prefix apps/web

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY apps/api ./apps/api
COPY --from=web-build /app/apps/web/dist ./apps/web/dist
USER node
EXPOSE 8787
CMD ["node", "apps/api/server.js"]

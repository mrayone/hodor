FROM node:alpine3.14 as builder

WORKDIR app
ENV NODE_ENV=production

COPY . .
RUN npm install -g @nestjs/cli
RUN yarn install --silent
RUN yarn build
# ----------------------------------- #

FROM node:alpine3.14 as final
ENV NODE_ENV=production

WORKDIR app
COPY --from=builder /app /app

EXPOSE 8080

ENTRYPOINT ["yarn", "start:prod"]
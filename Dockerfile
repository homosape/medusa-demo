FROM node:20.12.1-alpine AS base
ARG DISABLE_MEDUSA_ADMIN=true
ARG NODE_ENV=production
ARG MEDUSA_WORKER_MODE

USER node

RUN printenv

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node . .

FROM base AS prod-deps
#USER root
#RUN --mount=type=cache,source=/usr/local/share/.cache/yarn,target=/home/node/.cache/yarn YARN_CACHE_FOLDER=/home/node/.cache/yarn yarn install --frozen-lockfile --production
RUN yarn install --frozen-lockfile --production

FROM base AS builder
# Building the production-ready application code
#USER root
RUN yarn install --frozen-lockfile && yarn build

FROM node:20.12.1-alpine

USER node

WORKDIR /home/node/app

COPY --from=prod-deps --chown=node /home/node/app/node_modules ./node_modules
# Copying the production-ready application code, so it's one of few required artifacts
COPY --from=builder --chown=node /home/node/app/.medusa/server .
COPY tsconfig.json .

ENV DISABLE_MEDUSA_ADMIN=true
ENV NODE_ENV=production
EXPOSE 9000
CMD [ "yarn", "start" ]

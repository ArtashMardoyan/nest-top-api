FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install --production
ADD /dist .
RUN yarn build
CMD ['node', './dist/main.js']
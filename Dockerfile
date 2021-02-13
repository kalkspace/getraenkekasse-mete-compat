FROM node:12

COPY ./ ./
RUN yarn
RUN yarn build
CMD ["yarn", "start"]
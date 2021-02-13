FROM node:12

COPY ./ ./
RUN yarn
RUN yarn build

EXPOSE 3003

CMD ["yarn", "start"]

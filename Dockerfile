FROM node:18

COPY ./ ./
RUN npm i
RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start"]

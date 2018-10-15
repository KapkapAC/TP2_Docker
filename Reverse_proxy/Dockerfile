FROM node:0.12

RUN mkdir -p /www/
WORKDIR /www/

COPY ./package.json /www/package.json
RUN npm install

COPY ./ /www/

RUN npm test

# start server
CMD npm start

EXPOSE 8000

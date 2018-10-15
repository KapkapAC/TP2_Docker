FROM node:argon

WORKDIR /home/app

RUN npm install -g http-server
RUN cd /home/app

EXPOSE 8080

CMD [ "http-server" ]
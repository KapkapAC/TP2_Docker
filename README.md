# TP2_Docker
Alexandre Capbern
--------------------------------
Details
--------------------------------
This project is a web application that handle 
cryto-currencies trading.

In order to work this application needs a reverse proxy to
communicate with the Binance API.

To access all features, you need to have a private key 
and a public key available by subscribing on Binance.

Whithout keys you can't acces to User Data 
and trades(buy/sell) but you have access to public data.
 

--------------------------------
Docker
--------------------------------
You just have to run "docker-compose up" from this directory.

Docker-compose build two containers using a node-js image.

The first contains the web application turning with
a node js http-server available on localhost:8080
on the host.


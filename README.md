# Collaborative-Online-Judge

A collaborative online judge system 

In the first two weeks, I have implemented CRUD operations of the OJ problems and the collaborative ACE editor. 
The front-end is built by Angular and Bootstrap. Then back-end is implemented by Node.js and MongoDB.

![index](image1.png)
![collaborative editor](image2.png)

## Getting Started

This project is being developed on the Ubantu18.04 system. The following instruction will tell you how to prepare Angular and Node.js environment.

### Prerequisites

First, we should install Node.js and meanwhile you will get a npm as well.
you can also check this: https://github.com/nodesource/distributions/blob/master/README.md

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```
then you can use npm to install Angular-cli

```
npm install -g @angular/cli
```


### Installing

Clone this repo 

cd to the ./week1/og-client/

do

```
npm install
```

cd to the ./week1/oj-server/

do

```
npm install
```



## Running the tests

build the client code
```
cd  ./week1/og-client/
ng build --watch
```

start the server
```
cd  ./week1/oj-server/
node server.js
```

open the brower: localhost:3000/



## Authors

* **Yang Guo** 


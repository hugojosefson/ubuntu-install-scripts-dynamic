FROM ubuntu:19.04

RUN apt-get update && apt-get install -y aptitude && apt-get dist-upgrade --purge -y

RUN aptitude install -y curl git
COPY find-node-or-install/* /usr/local/bin/
RUN node --version
RUN npm install -g npm@latest
RUN npm install -g yarn@latest

# Cache npm packages
RUN mkdir -p /root/app
COPY package.json yarn.lock /root/app/
RUN cd /root/app && yarn install

# Cache apt packages
RUN apt-get install --download-only -y vim
RUN apt-get install --download-only -y links

COPY . /root/app

RUN cd /root/app && yarn test

WORKDIR /root/app
CMD ["yarn", "start", "vim", "links", "disable-unity-shopping-scopes", "enable-apt-canonical-partners-sources"]

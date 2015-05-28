FROM ubuntu:15.04

RUN echo Updated packages 2015-05-28 23:42
RUN apt-get update && apt-get install -y aptitude && aptitude dist-upgrade --purge -y

RUN echo Downloaded find-node-or-install 2015-05-28 23:42
RUN aptitude install -y curl git
RUN curl https://raw.githubusercontent.com/hugojosefson/find-node-or-install/master/find-node-or-install -o /usr/local/bin/find-node-or-install
RUN curl https://raw.githubusercontent.com/hugojosefson/find-node-or-install/master/node -o /usr/local/bin/node
RUN curl https://raw.githubusercontent.com/hugojosefson/find-node-or-install/master/npm -o /usr/local/bin/npm
RUN chmod +x /usr/local/bin/find-node-or-install /usr/local/bin/node /usr/local/bin/npm
RUN node --version

RUN mkdir -p /root/app
COPY package.json /root/app/
RUN cd /root/app && npm install

COPY . /root/app

RUN cd /root/app && npm test

WORKDIR /root/app
CMD ["./index.js", "-a", "vim"]

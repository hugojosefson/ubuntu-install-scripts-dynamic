FROM ubuntu:19.04

RUN apt-get update && apt-get install -y aptitude && apt-get dist-upgrade --purge -y

RUN aptitude install -y curl git
RUN curl https://raw.githubusercontent.com/hugojosefson/find-node-or-install/master/find-node-or-install -o /usr/local/bin/find-node-or-install
RUN curl https://raw.githubusercontent.com/hugojosefson/find-node-or-install/master/node -o /usr/local/bin/node
RUN curl https://raw.githubusercontent.com/hugojosefson/find-node-or-install/master/npm -o /usr/local/bin/npm
RUN chmod +x /usr/local/bin/find-node-or-install /usr/local/bin/node /usr/local/bin/npm
RUN node --version

# Cache npm packages
RUN mkdir -p /root/app
COPY package.json /root/app/
RUN cd /root/app && npm install

# Cache apt packages
RUN apt-get install --download-only -y vim
RUN apt-get install --download-only -y links

COPY . /root/app

RUN cd /root/app && npm test

WORKDIR /root/app
CMD ["npm", "start", "--", "vim", "links", "disable-unity-shopping-scopes", "enable-apt-canonical-partners-sources"]

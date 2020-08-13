FROM hugojosefson/popos:20.04

#COPY src/lib/find-node-or-install /usr/local/bin/
#RUN node --version
#RUN npm install -g npm@latest
#RUN npm install -g yarn@latest
#
## Cache npm packages
#RUN mkdir -p /app
#COPY package.json yarn.lock /app/
#RUN cd /app && yarn install

# Cache apt packages
RUN apt-get install --download-only -y vim
RUN apt-get install --download-only -y links

COPY . /app

#RUN cd /app && yarn test

WORKDIR /app
RUN src/lib/find-node-or-install/yarn
CMD ["src/lib/find-node-or-install/yarn", "start", "vim", "links"]

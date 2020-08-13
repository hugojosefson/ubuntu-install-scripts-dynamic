FROM hugojosefson/popos:20.04
WORKDIR /app

# Cache node, yarn
COPY src/lib/find-node-or-install /app/src/lib/find-node-or-install/
COPY .nvmrc /app/
RUN src/lib/find-node-or-install/yarn --version

# Cache deps
COPY package.json yarn.lock /app/
RUN src/lib/find-node-or-install/yarn --ignore-scripts install

# Run tests
COPY . /app/
RUN src/lib/find-node-or-install/yarn install
RUN src/lib/find-node-or-install/yarn test


############################################################################
FROM hugojosefson/popos:20.04
WORKDIR /app

# Cache node, yarn
COPY src/lib/find-node-or-install /app/src/lib/find-node-or-install/
COPY .nvmrc /app/
RUN src/lib/find-node-or-install/yarn --version

# Cache deps
COPY package.json yarn.lock /app/
RUN src/lib/find-node-or-install/yarn --ignore-scripts install

# Cache apt packages
RUN apt-get install --download-only -y vim
RUN apt-get install --download-only -y links

# Set up for docker-run
COPY . /app/
RUN src/lib/find-node-or-install/yarn install
CMD ["src/lib/find-node-or-install/yarn", "start", "vim", "links"]

FROM hugojosefson/popos:20.04

# Copy code
WORKDIR /app
COPY . /app

# Install and cache deps
RUN src/lib/find-node-or-install/yarn install

# Run tests
RUN src/lib/find-node-or-install/yarn test


############################################################################
FROM hugojosefson/popos:20.04

# Copy code
WORKDIR /app
COPY . /app

# Install and cache deps
RUN src/lib/find-node-or-install/yarn install

# Cache apt packages
RUN apt-get install --download-only -y vim
RUN apt-get install --download-only -y links

# Set up for docker-run
CMD ["src/lib/find-node-or-install/yarn", "start", "vim", "links"]

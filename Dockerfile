#FROM hugojosefson/popos:20.04
#WORKDIR /app
#
## Cache node, yarn
#COPY src/lib/find-node-or-install /app/src/lib/find-node-or-install/
#COPY .nvmrc /app/
#RUN src/lib/find-node-or-install/yarn --version
#
## Cache deps
#COPY package.json yarn.lock /app/
#RUN src/lib/find-node-or-install/yarn --ignore-scripts install
#
## Run tests
#COPY . /app/
#RUN src/lib/find-node-or-install/yarn install
#RUN src/lib/find-node-or-install/yarn test
#

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
RUN apt-get update && apt-get full-upgrade -y --purge --auto-remove
RUN apt-get install --download-only -y vim
RUN apt-get install --download-only -y links
RUN apt-get install --download-only -y aptitude
RUN apt-get install --download-only -y flip
RUN apt-get install --download-only -y jq
RUN apt-get install --download-only -y ncdu
RUN apt-get install --download-only -y network-manager-openvpn-gnome
RUN apt-get install --download-only -y solaar
RUN apt-get install --download-only -y ssh
RUN apt-get install --download-only -y tree
RUN apt-get install --download-only -y byobu
RUN apt-get install --download-only -y tmux
RUN apt-get install --download-only -y tmuxinator
RUN apt-get install --download-only -y alacritty
RUN apt-get install --download-only -y xsel
RUN apt-get install --download-only -y build-essential
RUN apt-get install --download-only -y git
RUN apt-get install --download-only -y libxft-dev
RUN apt-get install --download-only -y alacritty
RUN apt-get install --download-only -y coreutils
RUN apt-get install --download-only -y procps
RUN apt-get install --download-only -y xdotool

# Set up for docker-run
COPY . /app/
RUN src/lib/find-node-or-install/yarn install
CMD ["src/lib/find-node-or-install/yarn", "start", "vim", "links", "disable-unity-shopping-scopes"]

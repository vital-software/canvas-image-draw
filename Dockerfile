FROM quay.io/vital/node:lts

# Install common dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y \
    ca-certificates \
    git \
    openssl \
    build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
    tzdata && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Set timezone
ENV TZ=Pacific/Auckland

# Add npm-auth-env helper
RUN echo -e "#/bin/bash\necho \"//registry.npmjs.org/:_authToken=\\\${NPM_TOKEN}\" > /app/.npmrc" > /usr/local/bin/npm-auth-env && \
    chmod +x /usr/local/bin/npm-auth-env

RUN mkdir -p /app
WORKDIR /app
ENV PATH=./node_modules/.bin:$PATH

ADD package.json yarn.lock /app/
ADD . /app

# Install deps
RUN yarn install --ignore-optional

# Build lib/ folder
RUN yarn build

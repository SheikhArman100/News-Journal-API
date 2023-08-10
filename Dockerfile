FROM ghcr.io/puppeteer/puppeteer:21.0.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=node_modules\@puppeteer\browsers\src\browser-data\chrome.ts

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "src/app.js"]
node_modules\@puppeteer\browsers\src\browser-data\chrome.ts
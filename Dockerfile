FROM node:6
MAINTAINER Derek P Sifford <dereksifford@gmail.com>

RUN mkdir /app && npm install -g pm2
WORKDIR /app

COPY package.json .
RUN npm install --production

COPY . .

EXPOSE 5000
CMD ["pm2", "start", "--no-daemon", "process.yml"]

FROM node:12-slim

ADD ./dist/ /srv/
WORKDIR /srv

ENV NODE_ENV=production
ENV APP_PORT=8080
ENV MICRO="https://micro-dot-alamar-298818.uc.r.appspot.com"

EXPOSE 8080
ENTRYPOINT [ "node", "app.js" ]

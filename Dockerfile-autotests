FROM node:18-alpine

ENV WORK_DIR=/home/tests

WORKDIR ${WORK_DIR}

COPY --chown=tests . ${WORK_DIR}

RUN npm i -y --legacy-peer-deps

CMD npm test
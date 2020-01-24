FROM node:12.14.1

WORKDIR /usr/src/smart-brain-api

COPY  ./  ./

RUN yarn

CMD ["/bin/bash"]
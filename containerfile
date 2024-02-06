FROM registry.access.redhat.com/ubi8/nodejs-18
COPY . .
RUN npm install
CMD npm start
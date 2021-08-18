# # # # # # # # # # # # # # # # # # # # 
# Docker image with Cypress dependencies
#
# RUN steps: 
#
#   install cypress, copy config files, run
#
# # # # # # # # # # # # # # # # # # # # 
FROM cypress/included:8.2.0
COPY package.json .
RUN npm install

COPY cypress cypress
COPY cypress.json .
ENTRYPOINT ["npx","cypress","run"]
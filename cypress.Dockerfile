# # # # # # # # # # # # # # # # # # # # 
# Docker image with Cypress dependencies
# 
# RUN steps: 
# 	
# 	install cypress, copy config files, run
# 
# # # # # # # # # # # # # # # # # # # # 
FROM cypress/included:7.5.0
COPY package.json .
RUN npm install

COPY cypress cypress
COPY cypress.json .
CMD ["npx","cypress","run","--headless","--browser", "chrome","--record","--key","${CYPRESS_RECORD_KEY}","--ci-build-id","${CIRCLE_BUILD_NUM}","--parallel"]

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
CMD ["npx","cypress","run","--headless","--browser", "chrome", "--record","--key","$CYPRESS_SDK_CARDS_RECORD_KEYS", "--parallel", "--ci-build-id", "$COMMIT_INFO_SHA"]
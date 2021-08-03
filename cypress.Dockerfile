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
CMD ["npx","cypress","run","--headless","--browser", "chrome", "--record","--key","$SDK_CARDS_CYPRESS_RECORD_KEY", "--parallel", "--ci-build-id", "$COMMIT_INFO_SHA"]
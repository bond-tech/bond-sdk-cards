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
CMD ["npx","cypress","run","--headless","--browser", "chrome","--record","--key","d88e9357-758a-4bad-9485-8cf21b7e1643"]

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV OPENAI_ORG=org-fg4wSLbcBuCZ186o4ULYmed9
ENV OPENAI_API=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

CMD ["npm", "run", "start"]
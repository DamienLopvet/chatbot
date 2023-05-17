FROM node:18-alpine as dev

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT [ "" ]


## repo uri is public.ecr.aws/k2m2m9w6/chatbot-api
## get token to your repo with :
## aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/k2m2m9w6
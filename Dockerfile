FROM node:lts-bookworm

WORKDIR /FRONT

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

ARG ARG_API_URL
ENV API_URL ${ARG_API_URL}

COPY . .

EXPOSE 3000

CMD ["npm", "start", "--", "--port", "3000"]
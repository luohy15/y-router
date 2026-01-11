FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN npm install -g wrangler@4

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8787

RUN chown -R node:node /app
USER node

CMD ["npm", "run", "dev", "--", "--ip", "0.0.0.0"] 
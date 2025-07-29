FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN npm install -g wrangler

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8787

CMD ["npm", "run", "dev", "--", "--ip", "0.0.0.0"] 
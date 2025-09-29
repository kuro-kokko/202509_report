FROM node:18-alpine

WORKDIR /app

# package.jsonをコピーしてnpm install
COPY package.json ./
RUN npm install

# TypeScript設定をコピー
COPY tsconfig.json ./

# ソースコードをコピー
COPY src ./src/

# TypeScriptをビルド
RUN npm run build

# 不要なdevDependenciesを削除
RUN npm prune --production

EXPOSE 3000
CMD ["npm", "start"]

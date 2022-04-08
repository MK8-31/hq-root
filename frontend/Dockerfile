FROM node:16-alpine as build-stage

# カレントワーキングディレクトリとして 'frontend' フォルダを指定する
WORKDIR /frontend

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

# `package.json` と `package-lock.json` （あれば）を両方コピーする
COPY package*.json /frontend

# プロジェクトの依存ライブラリをインストールする
RUN apk update && \
    npm install && \
    npm install -g npm && \
    npm install -g @vue/cli

# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . /frontend

# 本番向けに圧縮しながらアプリケーションをビルドする
RUN npm run build

# 確認用
# RUN vue --version
# RUN node -v
# RUN ls -a


# COPY confirmation_command.sh /confirmation_command.sh
# RUN chmod 744 /confirmation_command.sh
# CMD ["/confirmation_command.sh"]


# EXPOSE 3000

# CMD ["npm", "run", "serve"]
# CMD ["vue", "--version"]

# ENTRYPOINT ["entrypoint.sh"]


# docker-compose run frontend sh

FROM nginx:stable-alpine as production-stage

RUN mkdir /app
COPY --from=build-stage /frontend/dist /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

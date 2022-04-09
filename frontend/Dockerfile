FROM node:16-alpine as build-stage

# カレントワーキングディレクトリとして 'app' フォルダを指定する
WORKDIR /app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

# `package.json` と `package-lock.json` （あれば）を両方コピーする
COPY package*.json /app

# プロジェクトの依存ライブラリをインストールする
RUN apk update && \
    npm install && \
    npm install -g npm && \
    npm install -g @vue/cli

# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . /app

# 本番向けに圧縮しながらアプリケーションをビルドする
RUN npm run prod-build

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


# docker-compose run app sh

FROM nginx:stable-alpine as production-stage

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

FROM node:16-alpine

RUN mkdir /frontend

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
# RUN npm run build


# docker-compose run frontend sh

FROM ruby:3.1.1
# ベースにするイメージを指定

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs default-mysql-client vim
# RailsのインストールやMySQLへの接続に必要なパッケージをインストール

########################################################################
# yarnパッケージ管理ツールをインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn
#######################################################################

RUN apt install git

RUN mkdir /backend
# コンテナ内にbackendディレクトリを作成

WORKDIR /backend
# 作成したbackendディレクトリを作業用ディレクトリとして設定

COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock
# ローカルの Gemfile と Gemfile.lock をコンテナ内のbackend配下にコピー

RUN bundle install
# コンテナ内にコピーした Gemfile の bundle install

COPY . /backend
# ローカルのbackend配下のファイルをコンテナ内のbackend配下にコピー

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
# EXPOSE 3000

# # nginx
# RUN groupadd nginx
# RUN useradd -g nginx nginx
# ADD nginx/nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# RUN chmod +x /backend/entrypoint.sh

# CMD ["/backend/entrypoint.sh"]


# docker-compose run web rails new . --webpack=vue --force --database=mysql --skip-bundle
# docker-compose run web rails new . --force --database=mysql --skip-bundle
# docker-compose build
# database.yml を編集
# username: root password: docker-composeのやつ host: db
# docker-compose run rails webpacker:install
# docker-compose up
# docker-compose exec web rails db:create

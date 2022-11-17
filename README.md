![rubyVersion](https://img.shields.io/badge/ruby-3.1.1-red)
![railsVersion](https://img.shields.io/badge/rails-6.1.5-red)
![nodeVersion](https://img.shields.io/badge/node-16-success)
![vueVersion](https://img.shields.io/badge/vue-2.6.14-success)

# 習慣化クエスト

### 状態: 現在公開中

# URL
URL: https://habituation-quest.tk

# お試しログイン
ログインページのお試しログインからお試しいただけます。

ログインページURL： https://habituation-quest.tk/login

![お試しログイン解説](https://user-images.githubusercontent.com/68171652/202418276-4d195e35-3870-492e-81f8-e0d39caa774b.png)


# アーキテクチャ図
開発初期はAWS(ECS)で運用していましたが、コスト面を考慮しGCP(Cloud Run)に移行しました。
![hq-gcp drawio (1)](https://user-images.githubusercontent.com/68171652/192149339-4d7f8765-4df1-4bc9-b065-b24ff89eaa79.png)

# モデル図
![習慣化アプリモデル図 drawio](https://user-images.githubusercontent.com/68171652/173063953-25ad35c4-e84d-49c4-832e-629908304943.png)


# 使用技術
* Ruby
* rails
* Rspec
* Vue
* Vuetify
* Jest
* Docker
* Nginx
* AWS(ECR/ECS) -> GCP(Artifact Registory/Cloud Run)
* CircleCI -> Cloud Build
 
# トップページ
 
 ![スクリーンショット 2022-06-10 21 34 08](https://user-images.githubusercontent.com/68171652/173065184-416a7ae5-1197-4fd3-973c-dbdf608707e0.png)

 
# 使い方


* 習慣化したいタスクを登録
* そのタスクをクリアしたらクリックまたはタップで記録
* 記録による経験値獲得、レベルアップを確認して自分の成長を実感
* それを毎日繰り返して六週間継続し、習慣化を達成
* 習慣化を増やして自分を成長させよう！！

 
# スクリーンショット

タスクリスト
![スクリーンショット 2022-06-27 10 49 32](https://user-images.githubusercontent.com/68171652/175845592-9e977c72-e2af-4316-9a5f-7bf15765fe02.png)

記録
![スクリーンショット 2022-06-27 10 49 50](https://user-images.githubusercontent.com/68171652/175845597-52a25bed-3142-414b-8b19-74a3bf01f886.png)

記録を見る
![スクリーンショット 2022-06-27 10 50 03](https://user-images.githubusercontent.com/68171652/175845605-32b14955-943c-4f24-acfa-81e404a3ad84.png)
 
 
# 必要なもの
 
## backend
* ruby '3.1.1'
* gem 'rails', '~> 6.1.5'
* gem "devise"
* gem "devise_token_auth"
* gem 'rspec-rails'
* etc...

## frontend
* node16-alpine
* "vue": "^2.6.14"
* "vuetify": "^2.6.0"
* "jest": "^27.0.5"
* etc...
 
# Author
 
* 大野幹人
* 芝浦工業大学・学部3年

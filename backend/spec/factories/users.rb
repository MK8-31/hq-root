FactoryBot.define do
  factory :user do #factory :testuser, class: User do のようにクラスを明示すればモデル名以外のデータも作れます。
    sequence(:nickname) { |n| "test#{n}" }
    sequence(:email) { |n| "TEST#{n}@example.com" }
    password { 'password' }
  end
end

FactoryBot.define do
  factory :task do
    name { "MyString" }
    day { 1 }
    week { 1 }
    days_a_week { 1 }
    running_days { 1 }
    running_weeks { 1 }
    last_time { "2022-05-04" }
    user { nil }
  end
end

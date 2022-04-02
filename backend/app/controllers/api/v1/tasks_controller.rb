class Api::V1::TasksController < ApplicationController
  def index
    # この辺りはかなり簡略化しています。
    # 本来であれば seeds.rb を作成した方が良いです...
    if Task.count.zero?
      [
        { id: 1, task: 'aaa', done: false },
        { id: 2, task: 'bbb', done: false },
        { id: 3, task: 'ccc', done: true },
      ].each do |hash|
        Task.create!(id: hash[:id], task: hash[:task], done: hash[:done])
      end
    end

    # この辺りも本来であればきちんとシリアライズした方が良いです...
    render json: { tasks: Task.all }
  end
end

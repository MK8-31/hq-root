class Api::V1::TaskRecordsController < ApplicationController
  # before_action :authenticate_api_v1_user!
  before_action :set_task, only: %i[create]

  def create
    latest_task_record = @task.task_records.order(created_at: :desc).limit(1)[0]

    if latest_task_record && latest_task_record.created_at.today?
      render json: { status: 'ERROR', message: 'すでに記録済みです' }
      return
    end

    task_record = @task.task_records.build

    # 同じ日に記録がないかを確認する
    if task_record.save
      # taskのlast_timeを更新
      @task.update(last_time: task_record.created_at)

      # 経験値を更新

      render json: { status: 'SUCCESS', data: task_record }
    else
      render json: { status: 'ERROR', data: task_record.errors }
    end
  end

  def destroy
    task = Task.find(params[:id])

    # 今日の日付の範囲
    # range = Date.today.beginning_of_day..Date.today.end_of_day

    # 今日記録されたタスクレコード
    task_record = task.task_records.where(created_at: Time.zone.now.all_day)[0]

    if task_record.nil?
      render json: {
               status: 'ERROR',
               message: '今日記録したタスクレコードはありません。',
               data: task_record,
             },
             status: 401
      return
    end

    if task_record.destroy
      # 前回のタスクレコードを取得する
      latest_task_record =
        task.task_records.order(created_at: :desc).limit(1)[0]

      # taskのlast_timeを更新
      if latest_task_record.present?
        task.update(last_time: latest_task_record.created_at)
      else
        task.update(last_time: nil)
      end

      # 経験値を更新

      render json: {
               status: 'SUCCESS',
               message: 'タスクレコードを削除しました。',
               data: task_record,
             }
    else
      render json: {
               status: 'ERROR',
               message: 'タスクレコードの削除に失敗しました。',
               data: task_record,
             }
    end
  end

  private

  def set_task
    @task = Task.find_by(task_record_params)
  end

  def task_record_params
    params.require(:task).permit(:id)
  end
end

require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:task) { described_class.new(id: id, task: task_content, done: done) }
  let(:id) { 1 }
  let(:task_content) { 'eee' }
  let(:done) { true }

  describe '#valid?' do
    subject { task.valid? }

    context 'タスクの中身が入っている場合' do
      it { is_expected.to be_truthy }
    end

    context 'タスクの中身がnilの場合' do
      let(:task_content) { nil }

      it { is_expected.to be_falsy }
    end
  end
end

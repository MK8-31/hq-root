# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable

  #  :confirmable
  include DeviseTokenAuth::Concerns::User

  # validates :nickname, presence: true
  # validates :email, presence: true
  # validates :password, presence: true
end
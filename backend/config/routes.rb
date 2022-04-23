Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  namespace :api do
    namespace :v1 do
      resources :tasks, only: :index
      get :health_check, to: 'health_check#index'
      mount_devise_token_auth_for 'User',
                                  at: 'auth',
                                  controllers: {
                                    registrations: 'api/v1/auth/registrations',
                                  }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

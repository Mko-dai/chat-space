Rails.application.routes.draw do
  # devise_for :views
  devise_for :users
  root to: 'groups#index'
  resources :users, only: [:index, :edit, :new, :update]
  resources :groups, only: [:index,:new, :create, :edit, :update] do
    resources :chats, only: [:index, :create]
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :chats, only: :index, defaults: { format: 'json' }
  end
  end
end
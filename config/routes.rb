Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :menus do
      resources :menu_items
    end
  end

  # NO ROUTES BELOW THIS!!! Step 5 in terminal
  get '*unmatched_route', to: 'home#index'
end

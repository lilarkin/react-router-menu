class MenuItem < ApplicationRecord
  validates_presence_of :name, :description, :price
  validates_uniqueness_of :name, scope: :menu

  belongs_to :menu
end

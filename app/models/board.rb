class Board < ApplicationRecord
  belongs_to :problem

  validates :layout, presence: true
end

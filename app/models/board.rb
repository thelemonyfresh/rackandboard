class Board < ApplicationRecord
  #serialize :layout, Array

  belongs_to :problem

  validates :layout, presence: true
end

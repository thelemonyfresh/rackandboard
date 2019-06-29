class LetterRack < ApplicationRecord
  #serialize :letters, Array

  belongs_to :problem

  validates :letters, presence: true
end

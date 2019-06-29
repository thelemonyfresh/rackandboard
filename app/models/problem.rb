class Problem < ApplicationRecord
  has_one :board
  has_one :letter_rack

  accepts_nested_attributes_for :board, :letter_rack
end

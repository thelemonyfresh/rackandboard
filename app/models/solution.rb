class Solution < ApplicationRecord
  belongs_to :problem

  validates :layout, presence: true
  #validate is correct solution
end

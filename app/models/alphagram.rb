# == Schema Information
#
# Table name: alphagrams
#
#  id         :integer          not null, primary key
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Alphagram < ApplicationRecord
  has_many :words
end

# == Schema Information
#
# Table name: words
#
#  id           :integer          not null, primary key
#  text         :string
#  alphagram_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Word < ApplicationRecord
  belongs_to :alphagram
end

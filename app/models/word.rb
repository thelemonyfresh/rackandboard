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

  def self.initialize_from_file(file_path)
    File.readlines(file_path).each do |word_string|
      chomped_string = word_string.chomp
      word = find_or_create_by(text: chomped_string)
      sorted_letters  = word.text.split('').sort.join
      anagram = Anagram.find_or_create_by(sorted_letters: sorted_letters)
      word.anagram = anagram
      word.save
    end
  end

  def anagrams
    anagram.words
  end
end

class Solution < ApplicationRecord
  belongs_to :problem

  validates :layout, presence: true
  validate :not_empty
  validate :dimension_matches
  validate :all_words_playable

  #
  # VALIDATIONS.
  #

  private def not_empty
    puts "validating empty"
    if layout.flatten.all?(&:blank?)
      errors.add(:solution, "can't be empty.")
    end
  end

  private def dimension_matches
    # check it's rectangular
    widths = solution.layout.map(&:length).uniq

    if widths.count != 1
      errors.add(:solution, 'must be rectangular')
      return
    end

    # check dimensions match problem
    widths_match = solution.layout.first.length == problem.board.layout.first.length
    heights_match = solution.layout.length == problem.board.layout.length

    unless widths_match && heights_match
      errors.add(:solution, 'must match problem dimension')
    end
  end

  private def all_words_playable
    # combine board and solution layouts -- on the problem level?

    # parse out all words created

    # check each word is playable per the word list

    errors.add("asdf", "is not a word")
  end
end

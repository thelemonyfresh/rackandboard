class WordListInitializer
  attr_accessor :words
  attr_accessor :anagrams

  def initialize(file_path)
    File.readlines(file_path).each do |line|
      word_text = line.chomp
      ag = Alphagram.find_or_create_by(text: alphagram_for_word(word_text))
      Word.create(text: word_text, alphagram: ag)
    end
  end

  def alphagram_for_word(word)
    word.chars.sort.join
  end

  def words_for_letters_exact(letters)
    @anagrams[anagram_key(letters)]
  end

  def words_for_letters(letters)
    found_words = []
    letters.length.times do |n|
      puts n
      possible_combinations = letters.split('').combination(n+1).map(&:sort).uniq

      puts "pc #{possible_combinations}"
      possible_combinations.each do |combi|
        ana = @anagrams[anagram_key(combi.join)]
        #puts "#{combi.join} - #{ana}"
        found_words += ana
      end
    end
    found_words.uniq
  end

  private def anagram_key(word)
    word.chars.sort.join
  end
end

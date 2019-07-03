class WordList
  def initialize(file_path)
    # first read all records into memory
    alphagrams_hash = Hash.new([])

    words = File.readlines(file_path).map do |line|
      word = line.chomp
      alphagrams_hash[alphagram(word)] += [word]
      word
    end

    time = Time.now

    # create alphagrams
    alphagrams_for_db =  alphagrams_hash.keys.map do |ag_text|
      "('#{ag_text}','#{time}','#{time}')"
    end.join(',')

    ActiveRecord::Base.connection.execute(
      "INSERT INTO alphagrams(text,created_at,updated_at) VALUES #{alphagrams_for_db}"
    )

    alphagram_ids = {}

    Alphagram.all.each do |ag|
      alphagram_ids[ag.text] = ag.id
    end

    # create words
    words_for_db = words.map do |word_text|
      alphagram_id = alphagram_ids[alphagram(word_text)]
      "('#{word_text}',#{alphagram_id},'#{time}','#{time}')"
    end.join(',')

    ActiveRecord::Base.connection.execute(
      "INSERT INTO words(text,alphagram_id,created_at,updated_at) VALUES #{words_for_db}"
    )
  end
end

class CreateAlphagrams < ActiveRecord::Migration[5.2]
  def change
    create_table :alphagrams do |t|
      t.string 'text'

      t.timestamps
    end
    add_index :alphagrams, :text
  end
end

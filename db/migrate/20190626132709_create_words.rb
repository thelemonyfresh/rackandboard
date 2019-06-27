class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string :text
      t.integer :alphagram_id

      t.timestamps
    end
    add_index :words, :text
    add_index :words, :alphagram_id
  end
end

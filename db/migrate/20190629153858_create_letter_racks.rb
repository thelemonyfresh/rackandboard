class CreateLetterRacks < ActiveRecord::Migration[5.2]
  def change
    create_table :letter_racks do |t|
      t.text :letters, array: true
      t.integer :problem_id

      t.timestamps
    end
    add_index :letter_racks, :problem_id
  end
end

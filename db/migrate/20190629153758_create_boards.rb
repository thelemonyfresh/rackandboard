class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.text :layout, array: true
      t.integer :problem_id

      t.timestamps
    end
    add_index :boards, :problem_id
  end
end

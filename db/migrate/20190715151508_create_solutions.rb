class CreateSolutions < ActiveRecord::Migration[5.2]
  def change
    create_table :solutions do |t|
      t.text :layout, array: true
      t.integer :problem_id

      t.timestamps
    end
  end
end

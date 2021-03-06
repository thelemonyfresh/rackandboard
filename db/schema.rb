# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_29_153858) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alphagrams", force: :cascade do |t|
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["text"], name: "index_alphagrams_on_text"
  end

  create_table "boards", force: :cascade do |t|
    t.text "layout", array: true
    t.integer "problem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["problem_id"], name: "index_boards_on_problem_id"
  end

  create_table "letter_racks", force: :cascade do |t|
    t.text "letters", array: true
    t.integer "problem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["problem_id"], name: "index_letter_racks_on_problem_id"
  end

  create_table "problems", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "words", force: :cascade do |t|
    t.string "text"
    t.integer "alphagram_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alphagram_id"], name: "index_words_on_alphagram_id"
    t.index ["text"], name: "index_words_on_text"
  end

end

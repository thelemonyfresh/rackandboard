class ProblemsController < ApplicationController
  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])
  end

  def new
  end

  def create
    puts problem_params
    puts parsed_problem_params = setup_array_params(problem_params)
    p = Problem.create(parsed_problem_params)
    puts p.errors.to_h
  end

  private def setup_array_params(param_hash)
    param_hash[:board_attributes][:layout] = JSON.parse(
      param_hash[:board_attributes][:layout]
    )
    param_hash[:letter_rack_attributes][:letters] = JSON.parse(
      param_hash[:letter_rack_attributes][:letters]
    )
    param_hash
  end

  private def problem_params
    params.require(:problem).permit(
      board_attributes: [:layout],
      letter_rack_attributes: [:letters]
    )
  end
end

class SolutionsController < ApplicationController
  before_action :find_problem

  def create
    solution = @problem.solutions.new(solution_params)

    if solution.save
      puts "yay"
    else
      puts "boooo"
    end
  end

  private def find_problem
    @problem = Problem.find(solution_params[:problem_id])
  end

  private def solution_params
    params.require(:solution).permit(:problem_id, :layout)
  end
end

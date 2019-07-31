class SolutionsController < ApplicationController
  before_action :find_problem

  def create
    solution = @problem.solutions.new(solution_params)

    if solution.save
      puts "yay"
    else
      puts "boooo"
      puts solution.errors.full_messages
    end
  end

  private def find_problem
    @problem = Problem.find(solution_params[:problem_id])
  end

  private def solution_params
    #prms = params.require[:solution].permit(:problem_id, :layout)
    prms = request.parameters[:solution].slice(:problem_id, :layout)
    puts prms
    prms
  end
end

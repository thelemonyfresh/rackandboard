class ProblemsController < ApplicationController
  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])
    @solution = Solution.new
  end

  def new
  end

  def create
    puts problem_params
    puts parsed_problem_params = setup_array_params(problem_params)
    problem = Problem.new(parsed_problem_params)

    if problem.save
      redirect_to problems_path, flash: { success: "Problem created successfully." }
    else
      puts problem.errors.full_messages
      redirect_to new_problem_path, flash: {
                    error: problem.errors.full_messages.join('. ')
                  }
    end
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

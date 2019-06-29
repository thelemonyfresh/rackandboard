class ProblemsController < ApplicationController
  def show
    @problem = Problem.first
  end
end

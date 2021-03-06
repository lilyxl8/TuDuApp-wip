class Api::TodosController < ApplicationController
  before_action :require_logged_in

  def index
    @todos = Todo.all
    render :index
  end

  def new
    @todo = Todo.new
  end

  def create
    @todo = current_user.todos.new(todo_params)
    if @todo.save
      date = todo_params[:date]
      if date
        CalDate.find_or_create(current_user, date)
      end
      render :show
    else
      render json: {errors: @todo.errors.full_messages}, status: 422
    end
  end

  def update
    @todo = current_user.todos.find(params[:id])
    if @todo.update(todo_params)
      render :show
    else
      render json: {errors: @todo.errors.full_messages}, status: 422
    end
  end

  def toggle_done
    @todo = current_user.todos.find(params[:todo_id])
    if @todo.toggle!(:done)
      render :show
    else
      render json: {errors: @todo.errors.full_messages}, status: 422
    end
  end

  def destroy
    @todo = current_user.todos.find(params[:id])
    if @todo.destroy
      render json: { message: 'destroyed' }
    else
      render json: {errors: @todo.errors.full_messages}, status: 422
    end
  end

  def show
    @todo = Todo.find(params[:id])
    render :show
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :list_id, :date, :done)
  end

end

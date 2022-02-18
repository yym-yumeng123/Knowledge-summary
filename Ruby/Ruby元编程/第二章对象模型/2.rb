class MyClass
  def my_method
    @v = 1
  end
end

obj = MyClass.new
obj.class # MyClass
obj.my_method
obj.instance_variables # [:@v]

obj.methods.grep(/my/)
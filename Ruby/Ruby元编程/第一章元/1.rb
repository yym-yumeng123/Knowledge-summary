class Greeting
  def initialize(text)
    @text = text
  end

  def welcome
    @text
  end
end

my_object = Greeting.new('Hello') # Greeting

my_object.class

# 类有哪些实例方法
# 参数 flase 我只要自己的方法, 不要它继承来的方法
my_object.class.instance_methods(false) # [:welcome, :initiallize]

# 对象 实例变量
my_object.instance_variables # [:@text]



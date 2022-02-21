module MyModule
  MyConstant = 'outer constants'

  class MyClass
    MyConstant = 'inner constnats'
  end
end

module M
  class C
    X= 'a constants'
  end  
  C::X
end
M::C::X

Y = 'a root-level constants'
module M
  Y = 'a constnas'
  Y
  ::Y
end

module M
  class C
    module M2
      Module.nesting # [M::C::M2, M::C, M]
    end
  end  
end

class MyClass
  def testing_self
    @var = 10
    my_method()
    self
  end

  def my_method
    @var += 1
  end
end
obj = MyClass.new
obj.testing_self

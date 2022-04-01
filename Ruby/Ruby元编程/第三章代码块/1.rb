def a_method(a, b)
  a + yield(a, b)
end

puts a_method(1, 2) { |x, y| ( x + y ) * 3 }

def a1_method
  return yield if block_given?
  'no block'
end

puts a1_method # => no block
puts a1_method { 'here is a block' } # => here is a block

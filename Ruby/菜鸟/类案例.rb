class Customer
  @@no_of_customers = 0
  def initialize(id, name, addr)
    @cust_id = id
    @cust_name = name
    @cust_addr = addr
  end

  # 显示用户的详细信息
  def display_details
    puts "Customer id #{@cust_id}"
    puts "Customer id #{@cust_name}"
    puts "Customer id #{@cust_addr}"
  end

  # 创建的客户总数量
  def total_no_of_customers
    @@no_of_customers += 1
    puts "Total number of customers: # @@no_of_customers"
  end
end

cust1=Customer.new("1", "John", "Wisdom Apartments, Ludhiya")
cust2=Customer.new("2", "Poul", "New Empire road, Khandala")

# 对象名称后面总是跟着一个点号, 接着是方法名称或数据成员
cust1.display_details()
cust1.total_no_of_customers()
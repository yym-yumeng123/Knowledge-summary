class Entity
  attr_reader :table, :ident

  def initialize table, ident
    @table = table
    @ident = ident
    Database.sql "INSERT INFO #{@table} id VALUES (#{@ident})"
  end

  def set col, val
    Database.sql ''
  end
  def get col
    Database.sql
  end
end

class Movie < Entriy
  def initialize ident
    super 'movies', ident
  end
end

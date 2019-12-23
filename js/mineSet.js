var random09 = function(){
  var x = Math.random()
  x = 10*x
  x = Math.floor(x)
  x = x % 2
  x = x % 9
  log('random09',x)
  return x
}

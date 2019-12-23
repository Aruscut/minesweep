/*
写输出N*N扫雷方阵函数
*/
const random09 = function(){
  var x = Math.random()
  x = 10*x
  x = Math.floor(x)
  x = x % 2
  x = x * 9
  //log('random09',x)
  return x
}

const randomline09 = function(n) {
  var line = []
  for (var i = 0; i < n; i++) {
    let x = random09()
    line.push(x)
  }
  return line
}

const randomSquare09 = function(n) {
  var square = []
  for (let i = 0; i < n; i++) {
    let line = randomline09(n)
    square.push(line)
  }
  return square
}
//生成09方阵

const plus1 = function(square, i, j) {
  var len = square.length
  if(i >= 0 && i < len && j >= 0 && j < len) {
    if(square[i][j] !== 9) {
      square[i][j] += 1
    }
  }
}

const squareAdd = function(square, x, y) {
  plus1(square, x-1, y)
  plus1(square, x-1, y+1)
  plus1(square, x-1, y-1)
  plus1(square, x, y+1)
  plus1(square, x, y-1)
  plus1(square, x+1, y+1)
  plus1(square, x+1, y)
  plus1(square, x+1, y-1)
}

const markMine = function(square) {
  var len = square.length
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if(square[i][j] === 9)
      squareAdd(square, i, j)
    }
  }
  return square
}

const creatMine = function(n) {
  var square = randomSquare09(n)
  var mine = markMine(square)
  return mine
}

/*
写输出N*N扫雷方阵函数
*/
const square0 = function(n) {
  var square = []
  var row = []
  for (var i = 0; i < n; i++) {
    row.push(0)
  }
  for (var i = 0; i < n; i++) {
    var array = arrayCopy(row)
    square.push(array)
  }
  return square
}
//生成N*N的矩阵方块

const randomSquare09 = function(n) {
  var square = square0(n)
  log('ranSquare0', square)
  var all = n * n
  var bombNum = Math.floor(all * 0.3)
  for (var i = 0; i < bombNum; i++) {
    let x = randomInt(n-1)
    let y = randomInt(n-1)
    while(square[x][y] === 9) {
      x = randomInt(n-1)
      y = randomInt(n-1)
      log(x, y)
    }
    square[x][y] = 9
  }
  log('bomber num', bombNum)
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
  log('creatMine', square)
  return mine
}

const rowTemp = function(array, n) {
  var len = array.length
  var t = `<div class="tableRow">`
  for (var i = 0; i < array.length; i++) {
    var s = `<div class="tableCell cover" data-value=${array[i]} data-i=${n} data-j=${i}></div>`
    t += s
  }
  t += `</div>`
  return t
}

const squareTemp = function(array) {
  var t = ``
  var len = array.length
  for (let i = 0; i < len; i++) {
    let s = rowTemp(array[i], i)
    t += s
  }
  return t
}

const insertTemp = function(t) {
  var table = e('.tableContainer')
  table.innerHTML = t
}

const creatTable = function(n) {
  var mine = creatMine(n)
  var t = squareTemp(mine)
  insertTemp(t)
}

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

const changeClass = function(target, class1, class2='') {
  var bool = target.classList.contains(class1)
  if(bool == true) {
    if (class2 == '') {
      target.classList.toggle(class1)
    } else {
      target.classList.toggle(class1)
      target.classList.toggle(class2)
    }
  }
  /*
  if(class2 == '' && bool == true) {
    target.classList.toggle(class1)
    //log('removedClass', target.classList, class1)
  } else if (bool == true) {
    target.classList.toggle(class1)
    target.classList.toggle(class2)
    //log('changeClass ', target.classList)
  }
  */
}

const bindLeftClick = function() {
  bindAll('.tableCell', 'click', function(event) {
    var target = event.target
    var n = parseInt(target.dataset.value)
    var flag = target.classList.contains('flag')
    if(n === 9) {
      changeClass(target, 'cover', 'boom')
      //target.innerHTML = ' <img src="image/bomb.jpg" alt="bomb">'
    } else {
      changeClass(target, 'cover')
      if(flag == false)
      target.innerHTML = n
      if(n === 0) {
        spread(target)
      }
    }
  })
}

//右键标记功能
/*1.右键添加/移除。flag类√
2.禁用右键菜单✔
3.添加后禁用click
4。移除cover后不能标记。✔
*/
const bindRightClick = function() {
  bindAll('.tableCell', 'mousedown', function(event) {
    var target = event.target
    var cover = target.classList.contains('cover')
    var flag = target.classList.contains('flag')
    target.oncontextmenu = function(event) {
      return false
    }//禁用右键菜单
    if(event.button == 2 && cover == true) {
      changeClass(target, 'cover', 'flag')
    } else if (event.button == 2 && flag == true) {
      changeClass(target, 'flag', 'cover')
    }
  })
}

//点零扩散功能
/*1.去除特定cover的函数
2.去除后扩散功能
*/
const tableCells = function() {
  var all = eAll('.tableCell')
  var len = all.length
  var n = Math.sqrt(len)
  log('allCell.n = ', n)
  var row = []
  var square = []
  for (let i = 0; i < len; i++) {
    row.push(all[i])
    if(i % n == (n-1)) {
      square.push(row)
      row = []
    }
  }
  return square
}
//获取按行数个数排列的数组

const open1 = function(square, i, j) {
  var len = square.length
  if(i >= 0 && i < len && j >= 0 && j < len) {
    var cell = square[i][j]
    var value = cell.dataset.value
    var cover = cell.classList.contains('cover')
    var flag = cell.classList.contains('flag')
    if(value === '9' || flag === true || cover === false) {
      return null
    }
    if(value === '0') {
      openAround(square, i, j)
      return null
    }
    changeClass(cell, 'cover')
    cell.innerHTML = value
  }
}

const openAround = function(square, x, y) {
  log('openAround', x, y)
  open1(square, x-1, y)
  open1(square, x-1, y+1)
  open1(square, x-1, y-1)
  open1(square, x, y+1)
  open1(square, x, y-1)
  open1(square, x+1, y+1)
  open1(square, x+1, y)
  open1(square, x+1, y-1)
}

const spread = function(target) {
  var i = parseInt(target.dataset.i)
  var j = parseInt(target.dataset.j)
  log('type of i, j ', typeof i, typeof j)
  var cells = tableCells()
  openAround(cells, i, j)
}
//最终成果spread()

//test
const testMine = function(n) {
  var square = randomSquare09(n)
  log('creatMine', square)
  return square
}

const testTable = function(n) {
  var mine = testMine(n)
  var t = squareTemp(mine)
  insertTemp(t)
}

const main = function() {
  //creatTable(10)
  testTable(10)
  bindLeftClick()
  bindRightClick()
}

/*
var bindAll = function(selector, trigger, callback) {
  var target = document.querySelectorAll(selector)
  for (var i = 0; i < target.length; i++) {
    target[i].addEventListener(trigger, callback)
  }
}
*/
//隐藏高度的方法，以及table标签
main()

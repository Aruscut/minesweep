
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
      showBomb()
      //target.innerHTML = ' <img src="image/bomb.jpg" alt="bomb">'
    } else {
      changeClass(target, 'cover')
      if(flag == false)
      target.innerHTML = n
      log('taget.classList', target.classList)
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

//掀开bomb模块
const showBomb = function() {
  var cells = tableCells()
  var len = cells.length
  var bombs = []
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      var cell = cells[i][j]
      if (cell.dataset.value === '9') {
        bombs.push(cell)
        //cell.classList.value = 'tableCell boom'
      }
    }
  }
  for (let i = 0; i < bombs.length; i++) {
    setTimeout(function(){
      bombs[i].classList.value = 'tableCell boom'
      log('bombs[i] = ', bombs[i])
    }, 1000)
  }
}

//点零扩散功能
/*1.去除特定cover的函数
2.去除后扩散功能
*/
const tableCells = function() {
  var all = eAll('.tableCell')
  var len = all.length
  var n = Math.sqrt(len)
  //log('allCell.n = ', n)
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
    if(value === '9' || flag === true) {
      return null
    }
    if(cover === true) {
      changeClass(cell, 'cover')
      cell.innerHTML = value
      if(value === '0') {
        //log('value', value, 'cover', cover)
        openAround(square, i, j)
        return null
      }
    }
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

const setRestart = function(n) {
  let target = e('.restart')
  target.dataset.row = String(n)
}
//设置restart的dataset

const bindButtons = function() {
  bind('.junior', 'click', function() {
    resetTable(6)
    setRestart(6)
  })//bindJunior
  bind('.middle', 'click', function() {
    resetTable(9)
    setRestart(9)
  })
  bind('.master', 'click', function() {
    resetTable(12)
    setRestart(12)
  })
  bind('.restart', 'click', function(event) {
    let target = event.target
    let n = target.dataset.row
    log('n', typeof n, n)
    n = parseInt(n)
    log('n', typeof n, n)
    resetTable(n)
  })
}

const resetTable = function(n) {
  log('resetTable', n)
  creatTable(n)
  bindLeftClick()
  bindRightClick()
}

const main = function() {
  resetTable(9)
  bindButtons()
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

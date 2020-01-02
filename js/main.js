//victory alert 模块
var templateAlert = function(message) {
  var alert = [{message : message}]
  if(message === 'YOU WIN!!!') {
    var result = 'win'
  } else {
    var result = 'lose'
  }
  var t1 = `
      <div class="alert-content">
        <div class="alert-mask"></div>
        <div class="alert-cell ${result} ">
          <div id="alert1-message">${alert[0].message}</div>
          <div class='alert1-button'>OK</div>
        </div>
      </div>
      `
  return t1
}

var insertAlert = function(string) {
  var target = e('body')
  var alert = templateAlert(string)
  appendHtml(target, alert)
  log('inserted')
}

var alert = function(message) {
  bindAlert1(deleteAlert)
  insertAlert(message)
}

var deleteAlert = function() {
  var t = event.target
  log('bindDelete', t)
  var alert1 = t.classList.contains("alert1-button")
  if(alert1) {
    log('alert1-button clicked')
    resetTable(num.rows)
    var p = e('.alert-content')
    p.remove()
    var b = e('body')
    b.removeEventListener('click', deleteAlert)//回收f
  }
}

var bindAlert1 = function(deleteAlert) {
  bind('body', 'click', deleteAlert)
}

//获胜条件判断
const victory = function() {
  alert('YOU WIN!!!')
  log('YOU WIN!!')
}

const failure = function() {
  alert('YOU LOSE!!!')
  log('YOU FAILED')
}

const showResult = function(s='') {
  log('num.bomb', num.bomb, 'num.noBomb', num.noBomb)
  var k = num.bomb === 0 || num.noBomb === 0
  if(s === 'fail') {
    failure()
  }
  if(k === true) {
    victory()
  }
}

var clickBomb = function() {
  num.bomb--
  showResult()
}

var clickNoBomb = function() {
  num.noBomb--
  showResult()
}
//

//左键标记功能
const bindLeftClick = function() {
  bindAll('.tableCell', 'click', function(event) {
    var target = event.target
    var n = parseInt(target.dataset.value)
    var flag = target.classList.contains('flag')
    var boom = target.classList.contains('boom')
    var cover = target.classList.contains('cover')
    if(flag === false && cover === true) {
      if(n === 9) {
        showBomb()
        changeClass(target, 'cover', 'boom')
      } else {
        changeClass(target, 'cover')
        if(flag == false)
        target.innerHTML = n
        log('taget.classList', target.classList)
        if(n === 0) {
          spread(target)
        }
        clickNoBomb()
      }
    }
  })
}

//右键标记功能
/*1.右键添加/移除。flag类√
2.禁用右键菜单✔
3.添加后禁用click✔
4。移除cover后不能标记。✔
*/
const bindRightClick = function() {
  bindAll('.tableCell', 'mousedown', function(event) {
    var target = event.target
    var n = parseInt(target.dataset.value)
    var cover = target.classList.contains('cover')
    var flag = target.classList.contains('flag')
    target.oncontextmenu = function(event) {
      return false
    }//禁用右键菜单
    if(event.button == 2 && cover == true) {
      changeClass(target, 'cover', 'flag')
      if(n === 9) {
        clickBomb()
      }
    } else if (event.button == 2 && flag == true) {
      changeClass(target, 'flag', 'cover')
      if(n === 9) {
        num.bomb++
      }
    }
  })
}
//

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
  timer(bombs)
}
//

//计时动画功能
const timer = function(bombs) {
  var k = 0
  var t = setInterval(function() {
    log('setTimeout', k)
    bombs[k].classList.value = 'tableCell boom'
    //log('bombs[i] = ', bombs[i])
    k++
    if(k >= bombs.length){
      showResult('fail')
      clearInterval(t)
    }
  }, 50)
}

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

//点零扩散功能
const open1 = function(square, i, j) {
  var len = square.length
  if(i >= 0 && i < len && j >= 0 && j < len) {
    var cell = square[i][j]
    var value = cell.dataset.value
    var cover = cell.classList.contains('cover')
    var flag = cell.classList.contains('flag')
    if(value === '9' || flag === true) {
      clickBomb()
      return null
    }
    if(cover === true) {
      changeClass(cell, 'cover')
      cell.innerHTML = value
      if(value === '0') {
        //log('value', value, 'cover', cover)
        openAround(square, i, j)
        clickNoBomb()
        return null
      }
      clickNoBomb()
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
//点零扩散功能end

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

//按键功能
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
    //log('n', typeof n, n)
    n = parseInt(n)
    //log('n', typeof n, n)
    resetTable(n)
  })
}
//

const resetTable = function(n) {
  log('resetTable', n)
  creatTable(n)
  bindLeftClick()
  bindRightClick()
  log('num', num)
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

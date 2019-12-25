const rowTemp = function(array) {
  var len = array.length
  var t = `<div class="tableRow">`
  for (var i = 0; i < array.length; i++) {
    var s = `<div class="tableCell cover" data-value=${array[i]} data-mark=0></div>`
    t += s
  }
  t += `</div>`
  return t
}

const squareTemp = function(array) {
  var t = ``
  var len = array.length
  for (let i = 0; i < len; i++) {
    let s = rowTemp(array[i])
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
  if(class2 == '' && bool == true) {
    target.classList.toggle(class1)
    //log('removedClass', target.classList, class1)
  } else if (bool == true) {
    target.classList.toggle(class1)
    target.classList.toggle(class2)
    //log('changeClass ', target.classList)
  }
}

const bindLeftClick = function() {
  bindAll('.tableCell', 'click', function(event) {
    var target = event.target
    var n = parseInt(target.dataset.value)
    if(n === 9) {
      changeClass(target, 'cover', 'boom')
      //target.innerHTML = ' <img src="image/bomb.jpg" alt="bomb">'
    } else {
      target.innerHTML = n
      changeClass(target, 'cover')
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

const main = function() {
  creatTable(6)
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

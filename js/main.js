const rowTemp = function(array) {
  var len = array.length
  var t = `<div class="tableRow">`
  for (var i = 0; i < array.length; i++) {
    var s = `<div class="tableCell cover" data-value=${array[i]}>${array[i]}</div>`
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

const bindClickAll= function() {
  bindAll('.tableCell', 'click', function(event) {
    var target = event.target
    target.classList.toggle('cover', false)
  })
}

const main = function() {
  creatTable(6)
  bindClickAll()
}

/*
var bindAll = function(selector, trigger, callback) {
  var target = document.querySelectorAll(selector)
  for (var i = 0; i < target.length; i++) {
    target[i].addEventListener(trigger, callback)
  }
}
*/

main()

const rowTemp = function(array) {
  var len = array.length
  var t = `<div class="tableRow">`
  for (var i = 0; i < array.length; i++) {
    var s = `<div class="tableCell">${array[i]}</div>`
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
  //table.insertAdjacentHTML('beforeend', t)
}

const creatTable = function(n) {
  var mine = creatMine(n)
  var t = squareTemp(mine)
  insertTemp(t)
}

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

const insertTemp = function(t) {
  var table = e('.tableRow')
  table.insertAdjacentHTML('beforeend', t)
}

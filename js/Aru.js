var log = function(){
  console.log.apply(console , arguments)
}

var ajax = function(method, path, headers, data, response){
  var r = new XMLHttpRequest()
  // 设置请求方法和请求地址
  r.open(method, path, true)
  // 设置发送的数据的格式
  r.setRequestHeader('Content-Type', 'application/json')//headers
  // 注册响应函数
  r.onreadystatechange = function() {
    if(r.readyState === 4){
      response(r)
    }
  }
}

var e = function(input){
  var target = document.querySelector(input)
  log('querySelector', input, target)
  return target
}

var eAll = function(input){
  //log('eAll', document.querySelectorAll(input))
  return document.querySelectorAll(input)
}

var setAttri = function(target, atri, newvalue) {
  target.setAttribute(atri, newvalue)
}

var removeAttri = function(target, attri) {
  target.removeAttribute(attri)
}

var time = function(){
  var d = new Date()
  var year = d.getFullYear()
  var mon = d.getMonth()+1
  var date = d.getDate()
  var hour = d.getHours()
  var min = d.getMinutes()
  var day = d.getDay()
  if(day == 7){day = '日'}
  var time = `${year}/${mon}/${date} ${hour}:${min}`
  return time
}

var appendHtml = function(target, string){
  target.insertAdjacentHTML('beforeend', string)
}//在目标末尾插入string

var find = function(target, selector) {
  var find = target.querySelector(selector)
  return find
}

var findAll = function(target, string) {
  var findAll = target.querySelectorAll(string)
  return findAll
}

var bind = function(selector,trigger,callback) {
  var target = e(selector)
  target.addEventListener(trigger,callback)
}

var bindAll = function(selector, trigger, callback) {
  var target = document.querySelectorAll(selector)
  for (var i = 0; i < target.length; i++) {
    target[i].addEventListener(trigger, callback)
  }
}

var toggle = function(target, classname) {
  var bool = target.classList.contains(classname)
  if(bool === true) {
    target.classList.remove(classname)
    log('remove', classname, target)
  } else {
    target.classList.add(classname)
    log('add', classname, target)
  }
}
//为target 添加/删除 classname代表的css

var classRemove = function(target, classname) {
    var x = target
    if(x.classList.contains(classname)){
      x.classList.remove(classname)
      log('classRemove', x)
  }
}

var classRemoveAll = function(target, classname) {
  var len = target.length
  log('classRemove', len)
  for (var i = 0; i < len; i++) {
    var x = target[i]
    if(x.classList.contains(classname)){
      x.classList.remove(classname)
      log('classRemove', x)
    }
  }
}
//为全体target加上classname,target至少要有两个元素

var classAdd = function(target, classname) {
    var x = target
    if(!x.classList.contains(classname)){
      x.classList.add(classname)
      log('classAdd', x)
  }
}

var classAddAll = function(target,classname) {
  var len = target.length
  for (var i = 0; i < len; i++) {
    var x = target[i]
    if(!x.classList.contains(classname)) {
      x.classList.add(classname)
      log('classAdd', x)
    }
  }
}
//为全体target移除classname，target至少要有两个元素

var randomInt = function(n) {
  var x = Math.random()
  var j = n + 1
  x = x * 10 * j
  x = Math.floor(x)
  x = x % j
  //log('random0~n',x)
  return x
}
//生成 0~N 的随机数

var randomInt_test = function(n) {
  var chances =[]
  for (var i = 0; i < (n + 1); i++) {
    var k = 0
    for (var j = 0; j < 100000; j++) {
      var x = randomInt(n)
      if( x === i){ k++ }
    }
    var chance = k / 1000
    chances.push(chance)
  }
  log('chances', chances)
}
//测试randomInt


/*
数字在数列中平移问题的完美解决方案：
对于0 ~ N 中的某数k，平移x位后的坐标是
[k + x + （N + 1）] % (N + 1)
k + x 为负时 (N + 1) 可变成 N 倍
*/

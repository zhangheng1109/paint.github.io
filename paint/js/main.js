var yyy = document.getElementById('myCanvas');
var context = yyy.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false

$(document).ready(function() {
	$('#colorSelectDiv').farbtastic('#ipt_defult');
});
$("#ipt_defult").on("change",function(){
	var selectColor = $("#ipt_defult").attr("value");;
	
	context.fillStyle = selectColor;
  	context.strokeStyle = selectColor;
});

pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height);
}
download.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画儿'
  a.target = '_blank'
  a.click()
}

var slider = new Slider('#ex1', {
	formatter: function(value) {
		lineWidth = value*1.5;
		return '宽度: ' + value;
	}
});

$("#hideImg").click(function(){
	var type = $(this).attr("type");
	if(type == "hide"){
		$(this).attr("src","img/indent.png");
		$(this).attr("type","show")
		$("#menu").css("width","0px");
		$("#menu").hide();
		$("#hideDiv").css("left",'0px');
	}else if(type == "show"){
		$(this).attr("src","img/outdent.png");
		$(this).attr("type","hide")
		$("#menu").css("width","220px");
		$("#menu").show();
		$("#hideDiv").css("left",'220px');
	}
})

var overscroll = function(el) {
  el.addEventListener('touchstart', function() {
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight;
    //If we're at the top or the bottom of the containers
    //scroll, push up or down one pixel.
    //
    //this prevents the scroll from "passing through" to
    //the body.
    if(top === 0) {
      el.scrollTop = 1;
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  });
  el.addEventListener('touchmove', function(evt) {
    //if the content is actually scrollable, i.e. the content is long enough
    //that scrolling can occur
    if(el.offsetHeight < el.scrollHeight)
      evt._isScroller = true;
  });
}
overscroll(document.querySelector('.scroll'));
document.body.addEventListener('touchmove', function(evt) {
  //In this case, the default behavior is scrolling the body, which
  //would result in an overflow.  Since we don't want that, we preventDefault.
  if(!evt._isScroller) {
    evt.preventDefault();
  }
});

/******/

function autoSetCanvasSize(canvas) {
	
  setCanvasSize()

  /*window.onresize = function() {
    setCanvasSize()
  }*/

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
		
	$("body").width(document.documentElement.clientWidth);
	$("body").height(document.documentElement.clientHeight);
		
    canvas.width = pageWidth;
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  // 特性检测
  if(document.body.ontouchstart !== undefined){
    // 触屏设备 苏菲就是个触屏设备啊哥
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x,y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(aaa){
      console.log('边摸边动')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      console.log('摸完了')
      using = false
    }
  }else{
    // 非触屏设备
    canvas.onmousedown = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(aaa) {
      using = false
    }
  }

}

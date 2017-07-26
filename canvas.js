const ctx = canvas.getContext('2d')
let x = 0;
function draw () {
  x += 1
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#f00'
  ctx.fillRect(x, 0, 50, 50)
  requestAnimationFrame(draw)
}

draw()
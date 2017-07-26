const gl = canvas.getContext('experimental-webgl')

window.gl = gl
gl.viewport(0, 0, canvas.width, canvas.height)
gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
gl.enable(gl.DEPTH_TEST)

function createShader (gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

const vertexShaderSource = document.getElementById("vert").text;
const fragmentShaderSource = document.getElementById("frag").text;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram() {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

const program = createProgram()
gl.useProgram(program)

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
gl.enableVertexAttribArray(positionAttributeLocation)

const colorAttributeLocation = gl.getAttribLocation(program, 'a_color')
gl.enableVertexAttribArray(colorAttributeLocation)

const positionBuffer = gl.createBuffer()
const colorBuffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

let positions = [
  0, 0, 0.5,
  0, 0.5, 0.5,
  0.7, 0, 0.5
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0)

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

let colors = [
  0, 0, 1,
  1, 0, 0,
  0, 1, 0
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0)

gl.drawArrays(gl.TRIANGLES, 0, 3)

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
positions = [
  -0.3, -0.3, 0.2,
  0, 0.2, 0.2,
  0.4, -0.4, 0.2
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0)

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

colors = [
  1, 0, 1,
  1, 1, 0,
  0, 1, 1
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0)

gl.drawArrays(gl.TRIANGLES, 0, 3)
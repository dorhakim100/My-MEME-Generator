'use strict'

let gElCanvas
let gCtx

let gText = 'Hello'
let gFontSize = 120

let gColor = '#000000'
let gFillColor = '#ffffff'

let gCurrentMeme

let gCanvasMiddle
let gCanvasContainerWidth

// gMeme = loadFromStorage('currentMeme')
// localStorage.removeItem('currentMeme')
function init() {
  // if (!loadFromStorage('currentMeme')) {
  //   createMeme()
  //   saveToStorage('currentMeme', gMeme)
  // }
  // if (!gMeme) {
  //   gMeme = createMeme()
  //   saveToStorage('currentMeme', gMeme)
  // }
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  drawImg()

  changeColorInput()
  displayFontSize()
}

function resizeCanvas() {
  const gElContainer = document.querySelector('.canvas-container')
  // Changing the canvas dimension clears the canvas
  gElCanvas.width = gElContainer.clientWidth
  gElCanvas.height = gElContainer.clientWidth
  gCanvasContainerWidth = gElContainer.clientWidth

  gCanvasMiddle = gElCanvas.width / 2
  console.log(gElContainer)
  console.log(gElCanvas.width, gElCanvas.height)
  drawImg(gCanvasContainerWidth)
}

function drawImg(containerWidth) {
  // console.log(loadFromStorage('currentMeme'))

  if (loadFromStorage('selected') !== true) {
    if (loadFromStorage('currentMeme')) {
      // gMeme = loadFromStorage('currentMeme')
    } else {
      gMeme = createMeme()
      gCurrentMeme = gMeme
    }
  } else {
    console.log(gMeme)
    gMeme = loadFromStorage('selectedMeme')
    // gCurrentMeme = gMeme
    saveToStorage('currentMeme', gMeme)
  }

  const img = new Image()
  if (!containerWidth) containerWidth = img.naturalWidth
  console.log(gMeme)
  const { selectedImgId } = gMeme
  img.src = `meme-imgs/${selectedImgId}.jpg`
  //   img.src = `meme-imgs/${selectedImgId}.jpg`
  console.log(img)

  const { selectedLineIdx } = gMeme

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, containerWidth, containerWidth)
    addTextt(selectedLineIdx)
  }
  saveToStorage('currentMeme', gMeme)
}

function addText(y = 100) {
  gCtx.lineWidth = 3
  gCtx.strokeStyle = gColor

  gCtx.fillStyle = gFillColor

  gCtx.font = `${gFontSize}px Arial Black`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(gText, gCanvasMiddle, y)
  gCtx.strokeText(gText, gCanvasMiddle, y)
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  // gMeme = loadFromStorage('currentMeme')
}

function onChangeMemeText() {
  //   console.log(loadFromStorage('currentMeme'))
  //   console.log(gMeme)
  //   drawImg()

  const { selectedLineIdx } = gMeme
  console.log(selectedLineIdx)
  clearCanvas()

  const elInput = document.querySelector('.text')

  gMeme.lines[selectedLineIdx].txt = elInput.value
  console.log(gMeme.lines[selectedLineIdx].txt)

  drawImg(gCanvasContainerWidth)
  //   addText(elInput.value)
}

function onDownloadMeme(elLink) {
  let imgContent
  // elLink.innerText = 'Download PNG'
  imgContent = gElCanvas.toDataURL('image/png')
  elLink.href = imgContent
}

function onClearCanvas() {
  clearCanvas()
  const { selectedLineIdx } = gMeme
  gText = ''
  gMeme.lines[selectedLineIdx].txt = ''
  drawImg(gCanvasContainerWidth)

  const elTextInput = document.querySelector('.text')
  elTextInput.value = ''
}

function changeColorInput() {
  const elColorInput = document.querySelector('.color')
  elColorInput.value = gFillColor
}

function onChangeColor(elColor) {
  gFillColor = elColor.value
  const { selectedLineIdx } = gMeme
  gMeme.lines[selectedLineIdx].color = gFillColor
  addTextt(selectedLineIdx)
}

function onChangeSize(elBtn) {
  const operator = elBtn.id

  const { selectedLineIdx } = gMeme
  gFontSize = gMeme.lines[selectedLineIdx].size
  switch (operator) {
    case 'increase':
      if (gFontSize >= 205) return
      gFontSize += 10
      break
    case 'decrease':
      if (gFontSize <= 35) return
      gFontSize -= 10
      break
  }
  console.log(gFontSize)

  gMeme.lines[selectedLineIdx].size = +gFontSize
  clearCanvas()
  drawImg(gCanvasContainerWidth)
  // addText()

  const elInputRange = document.querySelector('.size-range')
  elInputRange.value = gFontSize
  const elSizeDisplay = document.querySelector('.font-size-display')
  elSizeDisplay.innerText = gFontSize
}

function onChangeSizeRange(elInputRange) {
  const { selectedLineIdx } = gMeme
  const fontSize = elInputRange.value
  gMeme.lines[selectedLineIdx].size = +fontSize
  console.log(fontSize)
  clearCanvas()
  drawImg(gCanvasContainerWidth)
  // addText()

  displayFontSize()
  const elSizeDisplay = document.querySelector('.font-size-display')
  elSizeDisplay.innerText = gMeme.lines[selectedLineIdx].size
}

function displayFontSize() {
  const { selectedLineIdx } = gMeme
  const elInputRange = document.querySelector('.size-range')
  elInputRange.title = gMeme.lines[selectedLineIdx].size
}

function onAddLine() {
  const line = createLine()

  gMeme.lines.push(line)

  getLineOption(1)
  addText(gCanvasContainerWidth - 100)
}

function getLineOption(lineIdx) {
  gText = gMeme.lines[lineIdx].txt
  gFontSize = gMeme.lines[lineIdx].size

  gFillColor = gMeme.lines[lineIdx].color
}

function renderMeme() {}

function addTextt(line) {
  console.log(gMeme.lines[line])
  let y
  if (line === 0) y = 100
  else y = gCanvasContainerWidth - 100
  gCtx.lineWidth = 3
  gCtx.strokeStyle = gColor

  gCtx.fillStyle = gMeme.lines[line].color

  gCtx.font = `${gMeme.lines[line].size}px Arial Black`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(gMeme.lines[line].txt, gCanvasMiddle, y)
  gCtx.strokeText(gMeme.lines[line].txt, gCanvasMiddle, y)
}

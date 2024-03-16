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

function init() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  drawImg()
  saveToStorage('currentMeme', gMeme)

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
  console.log(gIsSelected)

  if (loadFromStorage('selected') !== true) {
    if (loadFromStorage('currentMeme')) {
      gMeme = loadFromStorage('currentMeme')
    } else {
      gMeme = createMeme()
      gCurrentMeme = gMeme
    }
  } else {
    gMeme = loadFromStorage('selectedMeme')
    gCurrentMeme = gMeme
  }
  //   saveToStorage('currentMeme', gCurrentMeme)
  const img = new Image()
  if (!containerWidth) containerWidth = img.naturalWidth
  console.log(gMeme)
  const { selectedImgId } = gMeme
  img.src = `meme-imgs/${selectedImgId}.jpg`
  //   img.src = `meme-imgs/${selectedImgId}.jpg`
  console.log(img)

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, containerWidth, containerWidth)
    addText()
  }
}

function addText(x = gCanvasMiddle, y = 100) {
  if (gMeme.lines.length > 1) {
    getLineOption(1)
  }

  console.log(gText)

  gCtx.lineWidth = 3
  gCtx.strokeStyle = gColor
  //   const elColorSelect = document.querySelector('.color-select')
  //   elColorSelect.value = gColor

  gCtx.fillStyle = gFillColor
  //   const elColorFillSelect = document.querySelector('.fill-color-select')
  //   elColorFillSelect.value = gFillColor

  gCtx.font = `${gFontSize}px Arial Black`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(gText, x, y)
  gCtx.strokeText(gText, x, y)

  const { selectedLineIdx } = gMeme

  console.log(selectedLineIdx)

  gMeme.lines[selectedLineIdx].txt = gText
  gMeme.lines[selectedLineIdx].size = gFontSize
  gMeme.lines[selectedLineIdx].color = gFillColor

  console.log(gMeme)
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gMeme = loadFromStorage('currentMeme')
}

function onChangeMemeText() {
  //   console.log(loadFromStorage('currentMeme'))
  //   console.log(gMeme)
  //   drawImg()

  clearCanvas()

  const elInput = document.querySelector('.text')
  gMeme.lines.txt = elInput.value
  gText = elInput.value
  console.log(gMeme.lines.txt)

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
  gText = ''
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
  addText()
}

function onChangeSize(elBtn) {
  const operator = elBtn.id
  console.log(operator)

  console.log(gFontSize)
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

  clearCanvas()
  drawImg(gCanvasContainerWidth)
  addText()

  const elInputRange = document.querySelector('.size-range')
  elInputRange.value = gFontSize
  const elSizeDisplay = document.querySelector('.font-size-display')
  elSizeDisplay.innerText = gFontSize
}

function onChangeSizeRange(elInputRange) {
  const fontSize = elInputRange.value
  console.log(fontSize)
  gFontSize = +fontSize
  clearCanvas()
  drawImg(gCanvasContainerWidth)
  addText()

  displayFontSize()
  const elSizeDisplay = document.querySelector('.font-size-display')
  elSizeDisplay.innerText = gFontSize
}

function displayFontSize() {
  const elInputRange = document.querySelector('.size-range')
  elInputRange.title = gFontSize
}

function onAddLine() {
  const line = createLine()

  gMeme.lines.push(createLine())

  getLineOption(1)
  addText(gCanvasMiddle, gCanvasContainerWidth - 100)
}

function getLineOption(lineIdx) {
  gText = gMeme.lines[lineIdx].txt
  gFontSize = gMeme.lines[lineIdx].size

  gFillColor = gMeme.lines[lineIdx].color
}

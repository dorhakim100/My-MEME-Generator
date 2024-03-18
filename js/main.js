'use strict'

let gElCanvas
let gCtx

let gText = 'Hello'
let gFontSize = 120

let gColor = '#000000'
let gFillColor = '#ffffff'

let gCurrentMeme

// let gCanvasMiddle
let gCanvasContainerWidth

let gOtherLine
let isOther = false

let gTextAlign = 'center'

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
  const elImgContainer = document.querySelector('.gallery-container')

  elImgContainer.innerHTML = getGallerySrc().join('')

  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  drawImg()

  changeColorInput()
  displayFontSize()
}

// function resizeCanvas() {
//   const gElContainer = document.querySelector('.canvas-container')
//   // Changing the canvas dimension clears the canvas
//   gElCanvas.width = gElContainer.clientWidth
//   gElCanvas.height = gElContainer.clientWidth
//   gCanvasContainerWidth = gElContainer.clientWidth

//   gCanvasMiddle = gElCanvas.width / 2
//   console.log(gElContainer)
//   console.log(gElCanvas.width, gElCanvas.height)
//   drawImg(gCanvasContainerWidth)
// }

function drawImg(containerWidth) {
  console.log(loadFromStorage('selected'))

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
    console.log(gMeme)
    // gCurrentMeme = gMeme
    saveToStorage('currentMeme', gMeme)
    saveToStorage('selected', false)
    console.log(loadFromStorage('currentMeme'))
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
    if (gMeme.lines.length > 1) {
      const otherLine = getOtherLineIdx()
      isOther = true
      console.log(otherLine)
      addTextt(otherLine)
    }
    addTextt(selectedLineIdx)
  }
  saveToStorage('currentMeme', gMeme)
}

function addTextt(line) {
  if (loadFromStorage('selected')) gMeme = loadFromStorage('selectedMeme')
  console.log(line)
  let y
  if (line === 0) y = 100
  else y = gCanvasContainerWidth - 100
  gCtx.lineWidth = 3
  gCtx.strokeStyle = gColor

  gCtx.textBaseline = 'middle'

  gCtx.textAlign = gTextAlign
  if (isOther) {
    const otherLine = getOtherLineIdx()

    gCtx.font = `${gMeme.lines[otherLine].size}px Arial Black`

    gCtx.fillStyle = gMeme.lines[otherLine].color

    gCtx.fillText(gMeme.lines[otherLine].txt, gCanvasMiddle, y)
    gCtx.strokeText(gMeme.lines[otherLine].txt, gCanvasMiddle, y)

    isOther = false
  }
  console.log(gMeme.lines[line])
  gCtx.font = `${gMeme.lines[line].size}px Arial Black`

  gCtx.fillStyle = gMeme.lines[line].color

  gCtx.fillText(gMeme.lines[line].txt, gCanvasMiddle, y)
  gCtx.strokeText(gMeme.lines[line].txt, gCanvasMiddle, y)
}

// function addText(y = 100) {
//   gCtx.lineWidth = 3
//   gCtx.strokeStyle = gColor

//   gCtx.fillStyle = gFillColor

//   gCtx.font = `${gFontSize}px Arial Black`
//   gCtx.textAlign = 'center'
//   gCtx.textBaseline = 'middle'

//   gCtx.fillText(gText, gCanvasMiddle, y)
//   gCtx.strokeText(gText, gCanvasMiddle, y)
// }

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  // gMeme = loadFromStorage('currentMeme')
}

function onChangeMemeText() {
  if (loadFromStorage('selected')) gMeme = loadFromStorage('selectedMeme')
  console.log(gMeme)
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
  const { selectedLineIdx } = gMeme
  gFillColor = gMeme.lines[selectedLineIdx].color
  const elColorInput = document.querySelector('.color')
  elColorInput.value = gFillColor
}

function onChangeColor(elColor) {
  gFillColor = elColor.value
  const { selectedLineIdx } = gMeme
  gMeme.lines[selectedLineIdx].color = gFillColor
  console.log(gMeme.lines[selectedLineIdx])
  addTextt(selectedLineIdx)
}

function onChangeSize(elBtn) {
  if (loadFromStorage('selected')) gMeme = loadFromStorage('selectedMeme')
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
  if (loadFromStorage('selected')) gMeme = loadFromStorage('selectedMeme')
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
  const elCanvas = document.querySelector('canvas')
  elCanvas.style.cursor = 'pointer'

  const line = createLine()

  gMeme.lines.push(line)

  // getLineOption(1)
  // addText(gCanvasContainerWidth - 100)
  addTextt(1)
  onSwitchLine()
}

function getLineOption(lineIdx) {
  gText = gMeme.lines[lineIdx].txt
  gFontSize = gMeme.lines[lineIdx].size

  gFillColor = gMeme.lines[lineIdx].color
}

function renderMeme() {}

function onSwitchLine() {
  if (gMeme.lines.length === 1) return
  console.log(gMeme.selectedLineIdx)
  switchLine()
  console.log(gMeme.selectedLineIdx)
}

function switchLine() {
  const { selectedLineIdx } = gMeme
  const elLineBorder = document.querySelector('.line-select')
  if (selectedLineIdx === 0) {
    gMeme.selectedLineIdx = 1

    changeColorInput()
    console.log(elLineBorder.style.top)
    console.log(elLineBorder.style.bottom)
    elLineBorder.style.display = 'block'
    elLineBorder.style.top = ''
    elLineBorder.style.bottom = '-50px'
  } else {
    gMeme.selectedLineIdx = 0

    changeColorInput()

    elLineBorder.style.top = '100px'
  }
}

function copyOtherLine() {
  let otherLine
  const { selectedLineIdx } = gMeme
  selectedLineIdx === 0 ? (otherLine = 1) : (otherLine = 0)
  console.log(gMeme.lines[otherLine])

  gOtherLine = otherLine
}

function getOtherLineIdx() {
  let otherLine
  const { selectedLineIdx } = gMeme
  selectedLineIdx === 0 ? (otherLine = 1) : (otherLine = 0)
  return otherLine
}

function onCanvasClick(ev) {
  if (gMeme.lines.length === 1) return
  const x = ev.x
  const y = ev.y

  const { selectedLineIdx } = gMeme

  console.log(gCanvasMiddle)
  if (y < gCanvasMiddle && selectedLineIdx === 1) {
    switchLine()
  } else if (y > gCanvasMiddle && selectedLineIdx === 0) {
    switchLine()
  }
  // console.log(ev.y)
}

function onAlignText(elInput) {
  console.log(elInput.value)
  switch (elInput.value) {
    case 'start':
      gTextAlign = 'end'
      break
    case 'center':
      gTextAlign = 'center'
      break
    case 'end':
      gTextAlign = 'start'
      break
  }
  clearCanvas()
  drawImg(gCanvasContainerWidth)
}

function onRenderNewMeme() {
  clearFromStorage('selected')

  window.location.reload()
}

function onOpenGallery() {
  const galleryClass = 'gallery'

  openModal(galleryClass)
}

function openModal(elClass) {
  const elDialog = document.querySelector(`.${elClass}`)

  elDialog.showModal()

  const elScreen = document.querySelector('.screen')

  elScreen.style.display = 'block'
}

function onCloseModal() {
  const galleryClass = 'gallery'

  closeModal(galleryClass)
}

function closeModal(elClass) {
  const elDialog = document.querySelector(`.${elClass}`)

  elDialog.close()

  const elScreen = document.querySelector('.screen')

  elScreen.style.display = 'none'
}

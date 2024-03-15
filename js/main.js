'use strict'

let gElCanvas
let gCtx

function init() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  drawImg()
}

function resizeCanvas() {
  const gElContainer = document.querySelector('.canvas-container')
  // Changing the canvas dimension clears the canvas
  gElCanvas.width = gElContainer.clientWidth
  gElCanvas.height = gElContainer.clientWidth

  //   console.log(gElCanvas.width, gElCanvas.height)
}

function drawImg() {
  console.log(gIsSelected)
  if (loadFromStorage('selected') !== true) {
    gMeme = createMeme()
  } else {
    gMeme = loadFromStorage('selectedMeme')
  }
  const img = new Image()
  console.log(gMeme)
  const { selectedImgId } = gMeme
  img.src = `meme-imgs/${selectedImgId}.jpg`
  //   img.src = `meme-imgs/${selectedImgId}.jpg`
  console.log(img)

  img.onload = () =>
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
}

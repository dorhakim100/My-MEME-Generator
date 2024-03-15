'use strict'

let gId = 0

let gImgs = [
  {
    id: gId++,
    url: 'meme-imgs/1.jpg',
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: gId++,
    url: 'meme-imgs/2.jpg',
    keywords: ['cute', 'animal'],
  },
  {
    id: gId++,
    url: 'meme-imgs/3.jpg',
    keywords: ['cute', 'animal'],
  },
]

let gMeme = {
  selectedImgId: getRandomIntInclusive(1, gImgs.length),
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Insert Txt',
      size: 20,
      color: 'red',
    },
  ],
}

let gKeywordSearchCountMap = { funny: 10, cute: 12, sarcasm: 5 }

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
  const img = new Image()
  const { selectedImgId } = gMeme
  img.src = `meme-imgs/${selectedImgId}.jpg`
  //   img.src = `meme-imgs/${selectedImgId}.jpg`
  console.log(img)

  img.onload = () =>
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
}

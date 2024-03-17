'use strict'

let gId = 0

let gCanvasMiddle

let gImgs = [
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['cute', 'animal'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['cute', 'animal'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['cute', 'animal'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['cute', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: `meme-imgs/${gId}.jpg`,
    keywords: ['funny', 'sarcasm'],
  },
]

let gMeme = createMeme()

let gKeywordSearchCountMap = { funny: 10, cute: 12, sarcasm: 5 }

var gIsSelected

function getImgs() {
  return gImgs
}

function createMeme(id = getRandomIntInclusive(1, gImgs.length)) {
  const meme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Hello',
        size: 120,
        color: '#ffffff',
        position: { x: gCanvasMiddle, y: 100 },
      },
    ],
  }

  return meme
}

function createLine() {
  const line = {
    txt: 'Insert Txt',
    size: 80,
    color: '#ff0000',
    position: { x: gCanvasMiddle, y: gCanvasContainerWidth - 100 },
  }

  return line
}

// function findMeme(meme) {
//   const meme = gImgs.find((img) => meme.id === img.id)
//   return meme
// }

function getMeme() {
  return gMeme
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

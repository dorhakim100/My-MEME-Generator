'use strict'

let gId = 0

let gImgs = [
  {
    id: ++gId,
    url: 'meme-imgs/1.jpg',
    keywords: ['funny', 'sarcasm'],
  },
  {
    id: ++gId,
    url: 'meme-imgs/2.jpg',
    keywords: ['cute', 'animal'],
  },
  {
    id: ++gId,
    url: 'meme-imgs/3.jpg',
    keywords: ['cute', 'animal'],
  },
]

let gMeme

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
        txt: 'Insert Txt',
        size: 20,
        color: 'red',
      },
    ],
  }

  return meme
}

// function findMeme(meme) {
//   const meme = gImgs.find((img) => meme.id === img.id)
//   return meme
// }

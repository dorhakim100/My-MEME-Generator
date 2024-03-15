'use strict'

function init() {
  const elImgContainer = document.querySelector('.gallery-container')

  elImgContainer.innerHTML = getGallerySrc()
}

function getGallerySrc() {
  const imgs = getImgs()

  let strHtmls = imgs.map(
    (img) =>
      `<img id="${img.id}" onclick="onSelectMEME(this)" src="${img.url}" alt="" style="cursor: pointer;">`
  )

  return strHtmls
}

function onSelectMEME(elImg) {
  console.log(elImg.id)

  gMeme = createMeme(+elImg.id)
  saveToStorage('selectedMeme', gMeme)
  saveToStorage('selected', true)

  console.log(loadFromStorage('selectedMeme'))
  window.location.href = 'http://127.0.0.1:5500/index.html'
}

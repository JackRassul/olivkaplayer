const player = document.querySelector('.body__player'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      playBtn = document.querySelector('.play'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      songName = document.querySelector('.song__name'),
      coverSong = document.querySelector('.cover__song'),
      imgSrc = document.querySelector('.img__src')

const songs = ['pomurchim na pososhok','pesi-pesiki malyata','sososisochka (victor meow cover)']
let songIndex = 0

//выбор трека, смена обложки и названия

function loadSong(song) {
  songName.innerHTML = song
  audio.src = `audio/${song}.mp3`
  coverSong.src = `img/img${songIndex + 1}.png`
}

loadSong(songs[songIndex])

//плей и пауза

function playSong() {
  player.classList.add('play')
  coverSong.classList.add('active')
  imgSrc.src = 'img/stop.png'
  audio.play()
}

function pauseSong() {
  player.classList.remove('play')
  coverSong.classList.remove('active')
  imgSrc.src = 'img/play.png'
  audio.pause()
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')    //проверка наличия класса play
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

//переключение треков

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = 2
  }
  loadSong(songs[songIndex])
  playSong()
}

nextBtn.addEventListener('click', () => {
  nextSong()
})

prevBtn.addEventListener('click', () => {
  prevSong()
})

//реализация прогресса

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress)

// перемотка

function setProgress(e) {
  const width = this.clientWidth //ширина контейнера
  const clickPlaceX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickPlaceX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

//автоплэй



audio.addEventListener('ended', nextSong)

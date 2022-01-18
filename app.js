const musicContainer = document.querySelector("#music-container")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const audio = document.querySelector("#audio")
const title = document.querySelector("#title")
const progress = document.querySelector("#progress")
const progressContainer = document.querySelector("#progress-container")
const cover = document.querySelector("#cover")
//songs array
const songs = ['Friend', 'scott', 'trav']
var songindex = 2;
loadsong(songs[songindex])
function loadsong(song){
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.png`;
}
function playsong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}
function pausesong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  audio.pause()
}
function prevsong(){
  songindex--
  if(songindex < 0){
    songindex = songs.length-1
  }
  loadsong(songs[songindex])
  playsong()
}
function nextsong(){
  songindex++
  if(songindex>songs.length-1){
    songindex = 0
  }
  loadsong(songs[songindex])
  playsong()
}
//what the below function does is it divides currentTime the song has run and divide by total time of song and multiples by 100 that gives a decimal
//value and what progress.style.width does it styles the width of the small progress bar upto currentTime of the song
function updateProgress(e){
  const {duration, currentTime} = e.srcElement;
  const percentProgress = currentTime/duration*100;
  progress.style.width = `${percentProgress}%`
}
function setprogress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX/width)*duration
}
playBtn.addEventListener('click', () => {
  const isplaying = musicContainer.classList.contains('play')
  if(isplaying){
    pausesong()
  }else {
    playsong()
  }
})

prevBtn.addEventListener('click', prevsong);
nextBtn.addEventListener('click', nextsong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setprogress);
audio.addEventListener('ended', nextsong)

const video = document.querySelector('video')
const playBtn = document.querySelector('#play')
const stopBtn = document.querySelector('#stop')
const timer = document.querySelector('#timestamp')
const progressBar = document.querySelector('#progress')

const toggleVideoStatus = () => video.paused ? video.play() : video.pause()

const updatePlayIcon = () => {
    let icon = playBtn.firstElementChild
    video.paused ? icon.className = 'fa fa-play fa-2x' : icon.className = 'fa fa-pause fa-2x'
}

const stopVideo = () => {
    video.currentTime = 0
    video.pause()
}

const updateProgress = () => {
    progressBar.value = (video.currentTime / video.duration) * 100

    let progressTime = video.currentTime
    let minutes = Math.floor(progressTime / 60);
    let seconds = Math.floor(progressTime - minutes * 60);
    let minuteValue;
    let secondValue;

    minutes < 10 ? minuteValue = `0${minutes}` : minuteValue = minutes
    seconds < 10 ? secondValue = `0${seconds}` : secondValue = seconds

    timer.textContent = `${minuteValue}:${secondValue}`
}

const setVideoProgress = () => {
    video.currentTime = (progress.value * video.duration) / 100
}

video.addEventListener('click', toggleVideoStatus)
playBtn.addEventListener('click', toggleVideoStatus)
stopBtn.addEventListener('click', stopVideo)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)
progressBar.addEventListener('change', setVideoProgress)
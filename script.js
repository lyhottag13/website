let bullet = 0;
let timesSpun = 0;
let childFriendlyMode = false;
let shoot = false;
let musicMuted = false;
let sfxMuted = false;
const header = document.getElementById("header");
const percent = document.getElementById("percent");
const app = document.getElementById("app");
const pullTriggerButton = document.getElementById("pullTrigger");
const spinBarrelButton = document.getElementById("spinBarrel");
const revolverImage = document.getElementById("revolver");
const checkbox = document.getElementById("checkbox");
const music = new Audio("audio/mafia.mp3");
function spinBarrel() {
  playMusic();
  shoot = false;
  playSFX("spin");
  setGunImage();
  bullet = Math.ceil(Math.random() * 6);
  timesSpun = 0;
  app.innerHTML = "Spin!";
  spinBarrelButton.innerHTML = "Spin the Barrel!";
  pullTriggerButton.disabled = false;
  calculateDeathOdds();

}
function pullTrigger() {
  if (bullet > 0) {
    bullet--;
    timesSpun++;
    if (bullet === 0) {
      stopMusic();
      playSFX("shot");
      shoot = true;
      setGunImage();
      app.innerHTML = "BANG!";
      setDeathText();
      spinBarrelButton.innerHTML = "Insert Bullet & Spin the Barrel!";
      pullTriggerButton.disabled = true;

    } else if (bullet > 0) {
      playSFX("click");
      shoot = false;
      setGunImage();
      app.innerHTML = "Click!";
      calculateDeathOdds();
    }
  }
}
function calculateDeathOdds() {
  percent.innerHTML = "You have a " + (Math.round((1 / (6 - timesSpun)) * 10000) / 100) + "% chance of dying!";
}
function setChildFriendlyMode() {
  childFriendlyMode = checkbox.checked;
  setGunImage();
  setTitle();
  setDeathText();
}
function setGunImage() {
  if (childFriendlyMode && shoot) {
    revolverImage.setAttribute("src", "images/NerfShoot.png");
  } else if (childFriendlyMode && !shoot) {
    revolverImage.setAttribute("src", "images/Nerf.png");
  } else if (!childFriendlyMode && shoot) {
    revolverImage.setAttribute("src", "images/RevolverShoot.png");
  } else if (!childFriendlyMode && !shoot) {
    revolverImage.setAttribute("src", "images/Revolver.png");
  }
}
function setTitle() {
  header.innerHTML = (childFriendlyMode) ? "Nerf Roulette Simulator!" : "Russian Roulette Simulator!"
}
function setDeathText() {
  if (shoot) {
    percent.innerHTML = (childFriendlyMode) ? "You nerf or nothinged!" : "You died!";
  }
}
function playSFX(name) {
  const fileName = (childFriendlyMode) ? "audio/nerf" + name + ".mp3" : "audio/" + name + ".mp3";
  const sfx = new Audio(fileName);
  if (!sfxMuted) {
    sfx.play();
  }
}
function muteMusic() {
  musicMuted = !musicMuted;
  document.getElementById("muteMusic").innerHTML = (musicMuted) ? "Unmute Music" : "Mute Music";
  if (!musicMuted) {
    music.volume = 1;
  } else {
    music.volume = 0;
  }
}
function muteSFX() {
  sfxMuted = !sfxMuted;
  document.getElementById("muteSFX").innerHTML = (sfxMuted) ? "Unmute SFX" : "Mute SFX";
}
function playMusic() {
  music.play();
}
function stopMusic() {
  music.pause();
  music.currentTime = 0;
}
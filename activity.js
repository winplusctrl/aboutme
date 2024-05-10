let discord;
let spotify;
const songhtml = document.getElementById("song");
const artisthtml = document.getElementById("artist");
const timehtml = document.getElementById("time")
const coverhtml = document.getElementById("cover")
const statushtml = document.getElementById("status")
const updatehtml = document.getElementById("update")
async function getstatus() {
  const response = await fetch(
    "https://api.lanyard.rest/v1/users/1204626364972670977"
  );
  discord = await response.json();
  if(discord.data.listening_to_spotify) {
    

  spotify = discord.data.spotify;
  console.log(spotify?.song);
  console.log(discord);

  songhtml.textContent = spotify?.song;
  artisthtml.textContent = spotify?.artist;
  coverhtml.src = spotify?.album_art_url;
  }
  else {
    songhtml.textContent = "nothing"
    artisthtml.textContent = "nobody"
    coverhtml.src = "winctrl.jpg"
  }

  var status = discord.data.discord_status;

  statushtml.textContent = status;

  switch (status) {
      case "idle": statushtml.style.color = "#f0b232"; break;
      case "online": statushtml.style.color = "#23a55a"; break;
      case "dnd": statushtml.style.color = "#f23f43"; break;
      case "offline": statushtml.style.color = "#71747d"; break;
      default: statushtml.style.color = "black"; break;
  }

}

getstatus(); 

function loop() {
  let seconds = 10;

  const i = setInterval(() => {
      console.log(`${seconds}`);
      updatehtml.textContent = seconds
      seconds--;
      if (seconds < 0) {
          clearInterval(i);
          getstatus();
          loop();
      }
  }, 1000);
}

loop();

async function gettime() {
  const now = new Date();
  const clock = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles' })
  timehtml.textContent = clock
}
gettime();
setInterval(gettime, 1000)

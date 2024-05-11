let discord;
let spotify;

const timehtml = document.getElementById("time")
const statushtml = document.getElementById("status")
const updatehtml = document.getElementById("update")
const songhtml = document.getElementById("song");
const artisthtml = document.getElementById("artist");
const coverhtml = document.getElementById("cover")
const codediv = document.getElementById("code");
const gamediv = document.getElementById("game");
const spotifydiv = document.getElementById("spotify");
async function getstatus() {
  const response = await fetch(
    "https://api.lanyard.rest/v1/users/1204626364972670977"
  );
  discord = await response.json();
  const activities = discord.data.activities
  
  const code = activities.find(activity => activity.name === "Code");

  if (code) {
    codediv.style.display = ""
    const detailshtml = document.getElementById("details")
    const statehtml = document.getElementById("state")
    const timestamphtml = document.getElementById("timestamp")
    const lang = document.getElementById("languagecover")

    detailshtml.textContent = code.details;
    statehtml.textContent = code.state;
    timestamphtml.textContent = code.timestamp;
    lang.src = `https://media.discordapp.net/external/${code.assets.large_image.split("mp:external/").pop()}`
  } else {
    codediv.style.display = "none"
  }

  const game = activities.find(activity => activity.name !== "Code" && activity.type === 0);
  if (game) {
    gamediv.style.display = "block"
    const detailshtml = document.getElementById("gamedetails")
    const namehtml = document.getElementById("gamename")
    const statehtml = document.getElementById("gamestate")
    const timestamphtml = document.getElementById("gametimestamp")

    namehtml.textContent = game.name
    detailshtml.textContent = game.details;
    statehtml.textContent = game.state;
    const elapsedTimeSeconds = Math.floor((Date.now() - game.timestamps.start) / 1000);
    const minutes = Math.floor(elapsedTimeSeconds / 60);
    const seconds = elapsedTimeSeconds % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timestamphtml.textContent = `${formattedTime} elapsed`;         
  } else {
    gamediv.style.display = "none"
  }

  if(discord.data.listening_to_spotify) {
    spotifydiv.style.display = ""
  spotify = discord.data.spotify;
  console.log(spotify?.song);
  console.log(discord);

  songhtml.textContent = spotify?.song;
  artisthtml.textContent = spotify?.artist;
  coverhtml.src = spotify?.album_art_url;
  }
  else {
    spotifydiv.style.display = "none"
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
      updatehtml.textContent = seconds + " seconds"
      seconds--;
      if (seconds < 0) {
          clearInterval(i);
          updatehtml.textContent = "now"
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

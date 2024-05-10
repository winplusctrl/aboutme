let x = 0;
const title = []
const words = ['win', 'plus', 'ctrl',"im cool"];
for (let word of words) {
    for (let i = 1; i <= word.length; ++i) {
        title.push(word.slice(0, i));
    }
    for (let i = word.length - 1; i > 0; --i) {
        title.push(word.slice(0, i));
    }
}
function dotitle() {
    document.getElementsByTagName('title')[0].innerHTML = title[x++ % title.length];
    setTimeout(() => dotitle(), 100)
}
dotitle()
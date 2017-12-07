// Module that gives you a fast way of binding to
// many keypress events in human readable format
//
// Returns EventEmitter which trigger event in format
// "[+|^](letter)"" where + means alt, ^ means ctrl
// and letter where letter size is related to shift
// Events are emmited only when non modification key is pressed
// Also "key" event is emmited with each key for any
// regex compability in code like custom inputs
//
// There is always attached listner to kill when sigint would be recived
// You can remove it with removeDefaultListners() but be carefull,
// you should have some way to kill app with a shortcut

const EventEmitter = require("events");
let ee = new EventEmitter();
const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on("keypress", function(chunk, key) {
  let buffer = "";
  if (key.meta) {
    buffer += "+";
  }
  if (key.ctrl) {
    buffer += "^";
  }
  if (key.shift) {
    if (key.name) buffer += key.name.toUpperCase();
  } else {
    if (key.name) buffer += key.name.toLowerCase();
  }
  ee.emit(buffer);
  ee.emit("key", key);
});
function onsig() {
  process.exit(0);
}
ee.on("^c", onsig);
ee.removeDefaultListners = () => {
  ee.removeListener("^c", onsig);
};
module.exports = ee;

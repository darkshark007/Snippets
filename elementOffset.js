function elementOffset(el) {
  const offset = {
    x: 0,
    y: 0,
  };
  let currentLevel = el;
  while (currentLevel !== null) {
    if (window.DEBUG === true) {
      console.log(`>>> [${currentLevel.offsetLeft},${currentLevel.offsetTop}] from ${currentLevel}`)
    }
    offset.x += currentLevel.offsetLeft;
    offset.y += currentLevel.offsetTop;
    currentLevel = currentLevel.offsetParent;
  }
  return offset;
}
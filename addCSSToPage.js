// From Liam Newmarch
//   * https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript

/**
 * Utility function to add replaceable CSS.
 * @param {string} styleString
 */
const addStyle = (() => {
  const style = document.createElement('style');
  document.head.append(style);
  return (styleString) => style.textContent = styleString;
})();

addStyle(`
  .ytd-playlist-video-renderer {
    height: 5px;
  }
`);
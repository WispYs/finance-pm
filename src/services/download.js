export default function download (url) {
  let aEl = window.document.createElement('a');

  aEl.href     = url;
  aEl.target   = '_self';
  aEl.download = '';

  window.document.body.appendChild(aEl);
  aEl.click();
  window.document.body.removeChild(aEl);
};

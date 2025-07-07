const qrcode = new QRCode("qrcode", {
  width: 512,
  height: 512
});
const input = document.getElementById('text');

function go() {    
  qrcode.makeCode(input.value);
  

  const basename = input.value.replace(/\W+/g,'-');
  function set_link(a, url, extension) {
    a.setAttribute('href', url);
    a.setAttribute('target','_blank');
    a.setAttribute('download', `${basename}.${extension}`);
  }
  
  
  const svg = document.querySelector('#qrcode svg');
  svg.setAttribute('width',512);
  svg.setAttribute('height',512);
  svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  const content = `<?xml version="1.0" ?>`+svg.outerHTML;
  const blob = new Blob([content],{type: 'image/svg+xml'});
  const a_svg = document.getElementById('download-svg');
  const svg_url = URL.createObjectURL(blob);
  
  set_link(document.getElementById('download-svg'), svg_url, 'svg');
  
  const px = Math.max(3000, 10 * qrcode._oQRCode.getModuleCount());
  const img = new Image();
  const canvas = new OffscreenCanvas(px, px);
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext('2d');
  // set it as the source of the img element
  img.addEventListener('load', async () => {
    canvas.getContext('2d').drawImage(img, 0, 0, px, px);
    const blob = await canvas.convertToBlob();
    console.log(blob);
    const png_url = URL.createObjectURL(blob);
    set_link(document.getElementById('download-png'), png_url, 'png');
  },{once:true});
  img.src = svg_url;
  
}

input.addEventListener('change', e => {
  go();
})

input.addEventListener('input', e => {
  go();
})

go();
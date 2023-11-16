let memes = [];


document.getElementById('imageUpload').addEventListener('change', function(event) {
  let uploadedImage = document.getElementById('uploadedImage');
  let memeContainer = document.getElementById('memeContainer');
  let image = new Image();
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = function() {
    memeContainer.style.width = image.width + 'px';
    memeContainer.style.height = image.height + 'px';
  }
  uploadedImage.src = URL.createObjectURL(event.target.files[0]);
});

function addText() {
  let text = prompt("Enter text for the meme");
  if (text) {
    let textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.setAttribute("class", "textElement");
    textElement.setAttribute("draggable", "true");
    textElement.style.position = "absolute"; 
    textElement.style.left = "50px"; 
    textElement.style.top = "50px"; 
    textElement.style.fontSize = "50px";
    textElement.addEventListener('dragstart', dragStart);
    textElement.addEventListener('drag', drag);
    document.getElementById('memeContainer').appendChild(textElement);
  }
}

function increaseFontSize() {
  let textElements = document.querySelectorAll('.textElement');
  textElements.forEach((textElement) => {
    let currentFontSize = parseInt(textElement.style.fontSize, 10);
    textElement.style.fontSize = (currentFontSize + 5) + 'px';
  });
}

function decreaseFontSize() {
  let textElements = document.querySelectorAll('.textElement');
  textElements.forEach((textElement) => {
    let currentFontSize = parseInt(textElement.style.fontSize, 10);
    if (currentFontSize > 5) {
      textElement.style.fontSize = (currentFontSize - 5) + 'px';
    }
  });
}

function saveMeme() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = document.getElementById('uploadedImage');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  context.drawImage(image, 0, 0);

  const textElements = document.querySelectorAll('.textElement');
  textElements.forEach((textElement) => {
    context.font = textElement.style.fontSize + ' Arial'; 
    context.fillText(textElement.textContent, parseInt(textElement.style.left, 10) - canvas.offsetLeft, parseInt(textElement.style.top, 10) - canvas.offsetTop);
  });

  const dataURL = canvas.toDataURL();

  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'meme.png';
  link.click();
}

function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  draggedText = event.target;
  const rect = event.target.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
}

function drag(event) {
  event.target.style.left = (event.pageX - offsetX) + 'px';
  event.target.style.top = (event.pageY - offsetY) + 'px';
  event.preventDefault();
}
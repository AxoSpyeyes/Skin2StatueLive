// Declare globalvariables
  var input_canvas = {};
  var input_ctx = {};
  var input_canvas_flip = {};
  var input_ctx_flip = {};
  var skin_image = {} ;
  var output_image_link = {} ;
  var skin_width = 64;
  var skin_height = 64;
  var base_filename = "";

function initVariables ()  {
  console.log("Document loaded");
  skin_image = document.getElementById('inputskin');
  input_canvas = document.getElementById('inputCanvas');
  output_image_link = document.getElementById("outputImageLink");
  input_ctx = input_canvas.getContext('2d');
  input_canvas_flip = document.getElementById('inputCanvasFlip');
  input_ctx_flip = input_canvas_flip.getContext('2d');
  input_ctx_flip.translate(skin_width, 0);
  input_ctx_flip.scale(-1, 1);
  console.log("Variables initialized");
}

function mapAll(allmaps){
  input_ctx.drawImage(skin_image, 0, 0, skin_width, skin_height);
  input_ctx_flip.drawImage(skin_image, 0, 0, skin_width, skin_height);
  for (const map of allmaps.data){
    mapSkin(map.X1, map.Y1, map.X2, map.Y2, map.X3, map.Y3, map.Z3, map.Flip);
    // console.log(map.X1, map.Y1, map.X2, map.Y2, map.X3, map.Y3, map.Z3);
  }
  cloneCanvas(output_canvas, output_canvas_big, 5);
  output_image_link.href = output_canvas.toDataURL("image/png");
  output_image_link.download = "statue_" + base_filename;
}

function mapSkin(x1, y1, x2, y2, x3, y3, z3, flip) {

  // Calculate image part widht and height
  var width = x2 - x1 + 1;
  var height = y2 - y1 + 1;

  // Get the image part from either flipped or normal skin
  if (flip == 1) {
    var imgData = input_ctx_flip.getImageData(skin_width-1-x2, y1, width, height);
  } else {
    var imgData = input_ctx.getImageData(x1, y1, width, height);
  }

  // Write the image part to the output canvase
  output_ctx.putImageData(imgData, x3, y3);

}

function cloneCanvas(oldCanvas, newCanvas, zoom) {

    //set dimensions
    newCanvas.width = oldCanvas.width * zoom;
    newCanvas.height = oldCanvas.height * zoom;

    //apply the old canvas to the new one
    context = newCanvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.scale(zoom, zoom);
    context.drawImage(oldCanvas, 0, 0);

}

function loadFile(event) {

  // Get the file from the event
  const file = event.target.files[0];
  console.log("Fired", file);
  base_filename = file.name;

  // Read the file and write the data to the skin image
  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    skin_image.src = dataURL ;
  };
  reader.readAsDataURL(file);

}

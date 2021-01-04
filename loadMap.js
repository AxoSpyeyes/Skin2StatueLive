// Load the pixel mappings from the csv file sitting on the server

const fileName = "Skin2Stat2 - v1.0.3.csv";

Papa.parse(fileName, {
  download:true,
  header:true,
  skipEmptyLines:true,
  complete: function(results, file) {
    console.log("Parsing complete:", results, file);
    mapjson = results;
  }
})

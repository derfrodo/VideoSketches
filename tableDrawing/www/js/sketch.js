//das image
let img; 
function setup() {
    p=createP('');
    pt=createP('');
    
    input = createFileInput(handleFile);
    img = createImg("assets/puppy-1207818_960_720.jpg");
}

function draw() {
    p.html(img.width + "; " + img.height);
    
    let tbl = "<table width=640 height=480><tr height=40><td bgcolor=\"000000\"></td><td bgcolor=\"FF00FF\"></td></tr><tr></tr></table>"
    pt.html(tbl)
}
var input;

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        img = createImg(file.data);
        img.hide();
    }
}
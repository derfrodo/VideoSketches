//das image

let img;
let c;
let pt;
let p;

let tableRows = 100;
let tableCols = 100;

let cellWidth = 100;
let cellHeight = 100;

let showTable = false;

function preload() {
    img = loadImage("assets/moe-573293_960_720.png");
}

function setup() {
    frameRate(1);

    cellWidth = img.width / tableCols;
    cellHeight = img.height / tableRows;

    let b = createButton("clickMe");
    b.mousePressed(() => { showTable = !showTable; });

    p = createP('');
    pt = createP('');
    c = createCanvas(img.width, img.height);
}

function draw() {
    p.html(img.width + "; " + img.height + "(" + showTable + ")");

let densitiy = devicePixelRatio
    img.loadPixels();


    let tblCells = [];
    for (let i = 0; i < tableRows; i++) {
        let rowCells = [];
        for (let j = 0; j < tableCols; j++) {
            let cell = {};

            rowCells.push(cell);
        }
        tblCells.push(rowCells);    
    }

    let tbl = `<table width="${img.width}" height="${img.height}">`;
    for (let i = 0; i < tableRows; i++) {
        tbl += "<tr>";
        for (let j = 0; j < tableCols; j++) {
            let value = "" + hex(random(0, 256), 2) + hex(random(0, 256), 2) + hex(random(0, 256), 2);
            tbl += `<td bgcolor="${value}"></td>`;
        }
        tbl += "</tr>";
    }
    tbl += `</table>`;

    pt.html(tbl);
    image(img, 0, 0, img.width, img.height);
    if (showTable) {
        pt.show();
        c.hide();

    }
    else {
        pt.hide();
        c.show();
    }
}
var input;

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        img = createImg(file.data);
        img.hide();
    }
}


    // let tbl = "<table width=640 height=480><tr height=40><td bgcolor=\"000000\"></td><td bgcolor=\"FF00FF\"></td></tr><tr></tr></table>"

let c;
let pt;
let img;

let cellsPerFrame = 200;

let tblRows = 100;
let tblCols = 100;

let tblCellWidth = undefined;
let tblCellHeight = undefined;

let currentPosCol = 0;
let currentPosRow = 0;

let done = false;

let tblCells = [];

function preload() {
    img = loadImage("assets/moe.png");

    for (let i = 0; i < tblRows; i++) {
        let row = [];
        for (let j = 0; j < tblCols; j++) {
            row.push({
                bgColor: "FFFFFF",
            });
        }
        tblCells.push(row)
    }
}

function setup() {

    frameRate(1);

    createP('Dies ist ein leerer Sketch!');

    tblCellWidth = img.width / tblCols;
    tblCellHeight = img.height / tblRows;

    c = createCanvas(img.width, img.height);
    pt = createP('');
}

function createRandomBgColor() {
    // let color = "" + hex(floor(random(0, 256), 2));
    // color += hex(floor(random(0, 256), 2));
    // color += hex(floor(random(0, 256), 2));
    // return color;
}

function getColorForRectFromImage(offsetX, offsetY, wdth, hght) {
    img.loadPixels();
    let pixels = img.pixels;
    //let d = pixelDensity();
    //let ratio =devicePixelRatio;

    let clr = { r: 0, g: 0, b: 0, a: 0 };

    let ox = floor(offsetX);
    let oy = floor(offsetY);

    let oWidth = floor(wdth);
    let oHeight = floor(hght);

    for (let x = ox; x < ox + oWidth; x++) {
        for (let y = oy; y < oy + oHeight; y++) {
            let index = 4 * (x + y * img.width);
            clr.r += pixels[index];
            clr.g += pixels[index + 1];
            clr.b += pixels[index + 2];
            clr.a += pixels[index + 3];
        }
    }

    let pxCnt = oWidth * oHeight;
    clr.r /= pxCnt;
    clr.g /= pxCnt;
    clr.b /= pxCnt;
    clr.a /= pxCnt;

    return clr;
}

function getColorForNextCell() {

    let x = currentPosCol * tblCellWidth;
    let y = currentPosRow * tblCellHeight;

    //Farbe auswerten...
    let colorData = getColorForRectFromImage(x, y, tblCellWidth, tblCellHeight);

    tblCells[currentPosRow][currentPosCol] = {
        colorData,
        bgColor: "" + hex(floor(colorData.r, 2)) + hex(floor(colorData.g, 2)) + hex(floor(colorData.b, 2)),
    };

    currentPosCol++;
    if (currentPosCol >= tblCols) {
        currentPosRow++;
        if (currentPosRow >= tblRows) {
            done = true;
        }
        else {
            currentPosCol = 0;
        }
    }
}


function draw() {
    image(img, 0, 0, img.width, img.height);

    if (!done) {
        for (let i = 0; i < cellsPerFrame; i++) {
            getColorForNextCell();
            if(done){
                break;
            }
        }
    }

    let tableDom = `<table cellspaceing=0 cellpadding=0 border=0`;
    tableDom += `bgcolor="000000"`;
    tableDom += `height="${img.height}" width="${img.width}"`;
    tableDom += `style="border-spacing:2px;"`;
    tableDom += `>`;

    for (let i = 0; i < tblRows; i++) {
        tableDom += `<tr height="${floor(tblCellHeight)}">`
        for (let j = 0; j < tblCols; j++) {
            let clr = tblCells[i][j] ? tblCells[i][j].bgColor : "";
            tableDom += `<td bgcolor="${clr}"></td>`;
        }
        tableDom += "</tr>"
    }

    tableDom += "</table>";
    pt.html(tableDom);

    if (false && second() % 2 === 0) {
        c.show();
        pt.hide();
    }
    else {
        c.hide();
        pt.show();
    }
}

const PDFDocument = require('pdfkit');
const fs = require('node:fs');
const path = require('path');

const doc = new PDFDocument({ size: 'A4', autoFirstPage: false });
const dir = './imgs/'

fs.readdirSync(dir).forEach(file => {
    const imgPath = path.join(dir, file);
    const img = doc.openImage(imgPath);

    doc.addPage();
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const imgAspectRatio = img.width / img.height;
    const pageAspectRatio = pageWidth / pageHeight;

    let width, height;
    if (imgAspectRatio > pageAspectRatio) {
        width = pageWidth;
        height = pageWidth / imgAspectRatio;
    } else {
        width = pageHeight * imgAspectRatio;
        height = pageHeight;
    }

    const x = (pageWidth - width) / 2;
    const y = (pageHeight - height) / 2;

    doc.image(img, x, y, { width, height });
});


doc.pipe(fs.createWriteStream('./output/data.pdf'));
doc.end();

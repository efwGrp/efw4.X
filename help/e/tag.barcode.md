# To Draw Barcode

To draw barcodes in HTML, you can use `drawServlet`. It is mostly based on [barcode4j](http://barcode4j.sourceforge.net/), with the exception of QR Codes, which are powered by [ZXing](https://github.com/zxing/zxing).

## Sample for JSP

```html
<img src="drawServlet?type=qrcode&msg=hellword">
```

## API

| Type | Description |
|---|---|
| `qrcode` | QR Code ![QR Code](../img/barcodes/qrcode.png) |
| `codabar` | Codabar ![Codabar](../img/barcodes/codabar.png) |
| `code39` | Code 39 ![Code 39](../img/barcodes/code39.png) |
| `code128` | Code 128 ![Code 128](../img/barcodes/code128.png) |
| `2of5` | Interleaved 2 of 5 ![Interleaved 2 of 5](../img/barcodes/2of5.png) |
| `itf14` | ITF-14 ![ITF-14](../img/barcodes/itf14.png) |
| `ean13` | EAN-13 ![EAN-13](../img/barcodes/ean13.png) |
| `ean8` | EAN-8 ![EAN-8](../img/barcodes/ean8.png) |
| `upca` | UPC-A ![UPC-A](../img/barcodes/upca.png) |
| `upce` | UPC-E ![UPC-E](../img/barcodes/upce.png) |
| `postnet` | POSTNET ![POSTNET](../img/barcodes/postnet.png) |
| `rmcbc` | Royal Mail Customer Barcode ![Royal Mail Customer Barcode](../img/barcodes/rmcbc.png) |
| `usps4cb` | USPS Intelligent Mail ![USPS Intelligent Mail](../img/barcodes/usps4cb.png) |
| `pdf417` | PDF417 ![PDF417](../img/barcodes/pdf417.png) |
| `datamatrix` | DataMatrix ![DataMatrix](../img/barcodes/datamatrix.png) |
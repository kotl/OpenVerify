import * as fs from 'fs';
import * as jimp from 'jimp';
import QrCode from 'qrcode-reader';
import {validate} from './validate';

const image_file = process.argv[2];

if(image_file) {
  const buffer = fs.readFileSync(image_file);
  jimp.read(buffer, function(err: any, image: any) {
    if (err) {
        console.error("ERROR: ", err);
    }
    var qr = new QrCode();
    qr.callback = function(err: any, value: any) {
        if (err) {
            console.error("ERROR: ", err);
        } else {
          if (value.result.startsWith('shc:/')) {
            validate(value.result);
          }
        }
    };
    qr.decode(image.bitmap);
});

} else {
  console.log("Usage: npx ts-node cli.ts qrcode_image.png");
}

export {}

import * as fs from 'fs';
import QRCodeValidator from '../src/services/QRCodeValidator/QRCodeValidator';

const ruleJson = JSON.parse(fs.readFileSync(__dirname + '/rules.json').toString());

const qrValidator = new QRCodeValidator();

export function validate(shcString: string) {
    let response = qrValidator.validateQR(ruleJson?.publicKeys, shcString);
    console.log(JSON.stringify(response, null, 4));
}
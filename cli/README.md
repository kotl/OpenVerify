Simple command line utilty to verify QR code inside given image file.

How to install:

-   Run `yarn install` in main directory
-   Run `node cli/get_rules.js` (Use again if rules change, i.e. every month)

How to use:
-   Run ` npx ts-node cli/cli.ts <image.png|image.jpg>`

JSON object will be printed out if QR Code is successfully decoded (with validation information inside it)


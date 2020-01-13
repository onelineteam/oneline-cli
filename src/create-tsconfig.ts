const fs = require('fs');
const slash = require('slash');

export function createTsconfig() {
  const currentDir = process.cwd();
  fs.exists(currentDir + "/tsconfig.json", (result: boolean) => {
    if (!result) {
      const tsconfig =
        `{
        "compilerOptions": {
          "emitDecoratorMetadata": true,
          "experimentalDecorators": true,
          "target": "ES6",
          "module": "CommonJS",
          "noImplicitAny": true,
        }
       }`;

      fs.writeFileSync(slash(currentDir + "/tsconfig.json"), tsconfig);
      console.log("tsconfig已生成");
    } else {
      console.log("tsconfig已存在, 请确保已经有emitDecoratorMetadata, experimentalDecorators, noImplicitAny为true, module为CommonJS, target至少为es6 ")
    }
  })

}
#!/usr/bin/env node
import * as commander from 'commander';
// import * as path from 'path';
import * as fs from 'fs';
const  slash = require('slash');

commander.option('-t, --tsconfig', '创建默认的ts配置');
const command = commander.parse(process.argv);

if (command.tsconfig) {
  const currentDir = process.cwd();

  fs.exists(currentDir + "/tsconfig.json", (result) => {
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
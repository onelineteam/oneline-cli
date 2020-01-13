#!/usr/bin/env node
import * as commander from 'commander';
import  {createProject} from './create-project';
import {createTsconfig} from './create-tsconfig';

commander.option('-t, --tsconfig', '创建默认的ts配置');
commander.option('-c, --create <project>', '创建项目');
const command = commander.parse(process.argv);

// console.log("commander: ", commander)

if (commander.tsconfig) {
  createTsconfig();
} 

if(commander.create) {
  createProject(commander.create);
}

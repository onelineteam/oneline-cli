import * as https from "https";
import * as fs from 'fs';
import * as chalk from 'chalk';
const slash = require('slash');
const zip = require('adm-zip');

export function createProject(projectName: string) {
  const project = slash(process.cwd());
  if (fs.existsSync(project + "/" + projectName)) {
    console.log(chalk.red('当前项目已存在: ' + projectName))
    return;
  }

  console.log(chalk.gray("开始下载模板...."))
  const file = fs.createWriteStream(slash(process.cwd() + "/.temp.zip"));
  https.get('https://codeload.github.com/keep2zero/oneline-template/zip/master', (response) => {
    const cd: string = response.headers["content-disposition"] as string;
    // console.log("文件内容:", response.headers)
    if (!cd) return;

    console.log(chalk.gray("正在下载文件...."));
    const buf: Buffer[] = [];
    response.on("data", (chunk: Buffer) => {
      buf.push(chunk);
    })

    response.on('end', () => {
      file.write(Buffer.concat(buf));
      file.close();
      console.log(chalk.green("下载结束:"))

      // if (!fs.existsSync(project)) fs.mkdirSync(project);


      const zipfile = new zip(file.path);
      const entry = (cd.split("=")[1]).split(".zip")[0];
      console.log(chalk.gray("开始解压...." + entry));


      zipfile.extractEntryTo(entry + "/", project, true, false);
      fs.rename(project + "/" + entry, project + "/" + projectName, (error) => {
        if (error) {
          console.log(chalk.red("错误:" + error));
          fs.unlinkSync(project + "/" + entry);
        }
      });
      console.log(chalk.green("解压结束...."))
      fs.unlinkSync(file.path)
      console.log(chalk.green("删除解压文件"));

    });
  });




}
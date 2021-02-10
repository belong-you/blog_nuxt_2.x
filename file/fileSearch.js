const { File } = require('./readFile');
const fs = require('fs');
const path = require('path');

let number = 0;
/**
 * 搜索相关内容文件
 * @param {*} fileSrc 搜索文件地址
 * @param {*} text 搜索内容
 * @param {*} arr 
 * @param {*} maxSearch 最大搜索条数
 */
module.exports.fileContentSearch = async function fileContentSearch (fileSrc, text, arr = []) {
    const file = new File(fileSrc);
    const fileList = await file.getChildren();

    // if (number > 10) return arr;
    for (let i = 0; i < fileList.length; i ++) {
        const { isFile, ext, name, filename } = await File.getFile(fileList[i].filename);
        if (isFile) {  // 是文件，读取内容
            const obj = {};
            const data = await readFile(filename);
            if (data.includes(text)) {
                const src = path.relative(path.resolve(__dirname, './md/*'), filename);
                const srcArr = src.match(/\s.+(\.md)$/);
                let newSrc;
                if (srcArr) {
                    number ++;
                    newSrc = srcArr[0].slice(1, -3);
                }
                // obj[newSrc] = data;
                // arr.unshift(obj);
                arr.push(newSrc)
            }
        } else {  // 是文件夹，递归向下读取
            await fileContentSearch(filename, text, arr);
        }
    }
    return arr;
}

async function readFile (filename) {
    return await fs.promises.readFile(filename, 'utf-8');
}
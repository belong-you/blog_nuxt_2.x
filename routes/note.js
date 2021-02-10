const path = require('path');
const fs = require('fs');
const Router = require('@koa/router');
const note = new Router();

const { getFileList } = require('../file/getfileList');
const { fileContentSearch } = require('../file/fileSearch');
const { params } = require('./config');
const readFilename = path.resolve(__dirname, '../public/note');

note.get('/src/:type', async (ctx, next) => {
    const { type } = ctx.params;
    const newArr = [];
    type.split(',').forEach(val => {
        newArr.push(val);
    })
    const url = String.fromCodePoint(...newArr);
    const data = await fs.promises.readFile(path.resolve(__dirname, `../public/note/${url}`), 'utf-8');
    ctx.body = data;
    next();
})
note.get('/label', async (ctx, next) => {
    const data = await getFileList(readFilename);
    ctx.body = data;
    next();
})

module.exports = note;
const { File } = require('./readFile');

module.exports.getFileList = async function getFileList ( fileSrc, arr = []) {
    const file = new File(fileSrc);
    const fileList = await file.getChildren();

    for (let i = 0; i < fileList.length; i ++) {
        const { isFile, ext, name, filename } = await File.getFile(fileList[i].filename);
        if (isFile) {  // 如果是文件
            arr.push(name);
            arr.sort((a, b) => a.split(' ')[0] - b.split(' ')[0]);
            if (arr.files) {
                arr.files.sort((a, b) => stringAscllSum(a.split(' ')[0]) - stringAscllSum(b.split(' ')[0]));
            }
        } else {  // 如果是文件夹
            let id, folder, link;
            const nameArr1 = name.split(/\s/);
            id = nameArr1[0];
            folder = nameArr1[0];  // 文件夹没有标序号的情况下直接取文件夹全称
            link = nameArr1[0];
            if (nameArr1[1]) {
                const nameArr2 = nameArr1[1].split('_');
                folder = nameArr2[0];  // 文件夹
                link = nameArr2[1] || nameArr2[0];
            }
            arr.push({
                id,
                folder,
                link,
                files: [],
            });
            await getFileList(filename, arr[i].files);

            arr.sort((a, b) => stringAscllSum(a.id) - stringAscllSum(b.id));
        }
    }
    return arr;
}

// 求一个字符串的 ascll 总和
function stringAscllSum (prop) {
    const arr = prop.split('');
    let num = 0;
    arr.forEach(val => {
        num += val.charCodeAt(0);
    })
    return num;
}

// [
//     {'111': [
//         '1.1.js'
//     ]},
//     {'222': [
//         '2.2.js'
//     ]},
//     'g.js'
// ]
// arr[1].name
// arr[1].name[1].name
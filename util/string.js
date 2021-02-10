// 求一个字符串的 ascll 总和
export function stringAscll (prop) {
    const arr = prop.split('');
    const newArr = []
    arr.forEach(val => {
        newArr.push(val.charCodeAt(0));
    })
    return newArr.toString();
}
const fs = require('fs');
const path = require('path'); // 字符串处理模块 路径处理模块

// __dirname 返回的是始终是当前文件的绝对路径
const result = fs.readFileSync(path.resolve(__dirname, './variable.css'))

console.log('result', result.toString(), arguments)
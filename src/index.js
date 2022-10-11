const fs = require("fs");
const rd = require("readline");
const template = require("art-template");


const rl = rd.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("AutoEntry>");
let entryPath = undefined;
let outputDir = undefined;

//格式化json
function formatJson(data) {
    return JSON.stringify(data, null, "\t");
}

function main() {
    if (!entryPath || !outputDir) {
        console.log("错误的路径");
        return;
    }

    fs.readFile(entryPath, "utf8", (err, data) => {
        let entryData = JSON.parse(data);
        fs.readFile("./template/index.md", "utf8", (err, data) => {
            let typeCount = 0;
            let totalCount = 0;
            //遍历词条数据文件
            for (let typeKey in entryData) {
                let achiType = entryData[typeKey];
                let details = entryData[typeKey].details;
                typeCount++;
                totalCount += Object.keys(details).length;
                //词条数组
                let entryArr = [];
                //填充数据
                for (let entryKey in details) {
                    entryArr.push({
                        key: entryKey,
                        msg: details[entryKey].msg,
                        condition: details[entryKey].condition,
                        enable: details[entryKey].enable,
                        json: formatJson({[entryKey]: details[entryKey]})
                    });
                }

                achiType.details = {};//展示类型时不需要细节

                //将所有数据包装起来
                const content = {
                    type: {
                        key: typeKey,
                        count: Object.keys(details).length,
                        name: achiType.name,
                        enable: achiType.enable,
                        json: formatJson({[typeKey]: achiType})
                    },
                    entryArr
                };
                const mdFileContent = template.render(data, content);
                const path = `${outputDir}/${typeKey}.md`;
                fs.writeFileSync(path, mdFileContent, "utf8");
                console.log(`路径:${path},文件生成成功,`);
            }
            console.log(`总共收集${typeCount}种成就类型,${totalCount}个词条`);
        });
    });
}


rl.question("input your entry.json path:", (answer) => {
    entryPath = answer;
    rl.question("input your output path:", (answer) => {
        outputDir = answer;
        main();
        rl.close();
    });
});





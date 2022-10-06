const fs  = require('fs');
const template = require('art-template');

//格式化json
function formatJson(data){
    return JSON.stringify(data,null,'\t');
}

fs.readFile('./index.json','utf8',(err,data)=>{
    let entryData = JSON.parse(data);
    fs.readFile('./template/index.md','utf8',(err,data)=>{
        //遍历词条数据文件
        for (let typeKey in entryData){
            let achiType = entryData[typeKey];
            let details = entryData[typeKey].details;
            //词条数组
            let entryArr = [];
            //填充数据
            for (let entryKey in details){
                entryArr.push({
                    key:entryKey,
                    msg:details[entryKey].msg,
                    condition:details[entryKey].condition,
                    enable:details[entryKey].enable,
                    json:formatJson({[entryKey]:details[entryKey]})
                })
            }

            achiType.details = {};//展示类型时不需要细节

            //将所有数据包装起来
            const content = {
                type:{
                    key:typeKey,
                    name:achiType.name,
                    enable:achiType.enable,
                    json:formatJson({[typeKey]:achiType})
                },
                entryArr
            }
            const mdFileContent = template.render(data,content);
            const path = `./markdown/${typeKey}.md`;
            fs.writeFileSync(path,mdFileContent,'utf8');
            console.log(`路径:${path},文件生成成功,`);
        }
    });
});
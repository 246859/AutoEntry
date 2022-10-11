# {{type.name}}

成就描述

- **名称**：`{{type.name}}`
- **类型名**：`{{type.key}}`
- **默认开启**：`{{type.enable}}`
- **词条数量**：`{{type.count}}`
- **json**：

```json
{{@type.json}}
```



{{each entryArr}}
## {{$value.msg}}

- 触发值：`{{@$value.key}}`
- 词条：`{{@$value.msg}}`
- 条件：`{{@$value.condition}}`
- 默认开启：`{{@$value.enable}}`
- json：

```json
{{@$value.json}}
```

{{/each}}

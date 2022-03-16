# lerna 常用命令

## 1、`lerna init`

创建新的 lerna 存储库或将现有存储库升级到当前版本的 Lerna。

`--independent` / `-i–` 使用独立版本控制模式。

## 2、`lerna bootstrap`

引导当前 Lerna 存储库中的包。安装它们的所有依赖项并链接任何交叉依赖项。

**此命令至关重要，因为它允许您使用您的包名称，require()就好像这些包已经存在并且在您的 node_modules 文件夹中可用一样。**

## 3、`lerna import <pathToRepo>`

将本地路径 <pathToRepo> 中的包导入带有提交历史记录的 packages/<directory-name> 中。

## 4、`lerna publish`

创建已更新软件包的新版本。提示新版本并更新 git 和 npm 上的所有包。

选项 `--npm-tag [tagname]` 使用给定的 npm dist-tag 发布到 npm（默认为最新）。

`--canary` / `-c` 创建一个金丝雀版本。

`--skip-git` 不要运行任何 git 命令。

`--force-publish [packages]` 强制发布指定的包（逗号分隔）或所有使用 \*的包（跳过 git diff 检查更改的包）。

## 5、`lerna changed`

检查自上次发布以来哪些软件包已更改。

## 6、`lerna diff [package?]`

比较自上次发布以来的所有包或单个包。

## 7、`lerna run [script]`

在包含该脚本的每个包中 运行一个 npm 脚本。

## 8、`lerna ls`

列出当前 Lerna 存储库中的所有公共包。

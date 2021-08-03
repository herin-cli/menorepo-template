# menorepo-template

a template about menorepo project.

* modern front end project management

## how to use:

## commands:

## tips:

1. unified project environment

change to project directory then exec:
```shell
curl https://get.volta.sh | bash
volta install node
volta install yarn
# jump to project and exec: 
volta pin
```

2. private npm registry
```shell
docker pull verdaccio/verdaccio
# use port 8888 for verdaccio serve
docker run -id --name=verdaccio -p 8888:4873 verdaccio/verdaccio
```
3. permission about scripts

please run: `chmod -R u+x scripts` to give script permission

4. lerna use

The template's package managed by [lerna](https://lerna.js.org/).

quick use: 

```shell
lerna bootstrap # lerna link + yarn install
lerna run # run all subprojects' script
lerna exec # run all subprojects' script includes unix/windows shell
lerna publish # publish your changed project(please exec: `git commit` before this active)
lerna add # download package for this menorepo project

```


## reference:
[1] [请问有人使用monorepo的模式来管理代码库吗？体验怎么样？ - 阿里巴巴淘系技术的回答 - 知乎](https://www.zhihu.com/question/318476028/answer/1895685159)
[2] [lerna管理前端packages的最佳实践](http://www.sosout.com/2018/07/21/lerna-repo.html)
[3] [基于lerna和yarn workspace的monorepo工作流](https://zhuanlan.zhihu.com/p/71385053)
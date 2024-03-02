# 2024/1/11

# 分支合并
git branch <branch-name>
git checkout <branch-name>
简写：git checkout -b <branch-name>
删除  git branch -d <branch-name>  -D强制删除

git checkout main
git pull origin main  # 如果主分支在远程有更新，先拉取最新更改
git merge <branch-name>
git add .  # 添加所有已解决冲突的文件
git commit -m "Merge changes from <branch-name> into main"
git push origin main
#!/bin/bash
git init
git add -A
git commit -a -m "$(date '+%A %d-%b-%y %r')"
git remote add origin git@github.com:salwaniza95/${PWD##*/}.git
git push -f origin master
read -n1 -r -p "Press any key to continue..." key
#!/bin/bash
LG='\033[1;32m' # LIGHT GREEN
LY='\033[1;33m' # LIGHT YELLOW
NC='\033[0m'    # NO COLOR
printf "Setting current directory as git hooks directory.\n\n"
git config --local core.hooksPath `pwd`
printf "Git hooks directory has been set to:\n${LY}`git config --local --get core.hooksPath`${NC}\n\n"
printf "${LG}Success!${NC}\nScript execution finished. Press any key to continue.\n"
read -p ""
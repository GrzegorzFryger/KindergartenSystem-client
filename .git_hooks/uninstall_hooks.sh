#!/bin/bash
LG='\033[1;32m' # LIGHT GREEN
LY='\033[1;33m' # LIGHT YELLOW
NC='\033[0m'    # NO COLOR
printf "Removing local variable with git hooks directory\n\n"
git config --local --unset core.hooksPath
printf "${LG}Success!${NC}\nScript execution finished. Press any key to continue.\n"
read -p ""
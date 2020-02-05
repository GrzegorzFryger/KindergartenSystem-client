# 1. General Info
![Version](https://img.shields.io/badge/version-1.2-blue?style=for-the-badge)
## 1.1 What are git hooks?
> Git hooks are scripts that run automatically every time a particular event occurs in a Git repository. 
They let you customize Git’s internal behavior and trigger customizable actions at key points in the development life cycle.

https://www.atlassian.com/git/tutorials/git-hooks

## 1.2 Why do we want to use them?
There are some articles regarding git commit message good practices, which we could / decided to use in our team.
Below is one of example of such article:   
https://chris.beams.io/posts/git-commit/  

While these rules seem to be useful, it may be difficult to remember about applying them to each commit.  
Therefore git hooks should help us with this issue by automating them to some extent.

# 2. Installation
There are 2 ways of installing git hooks:  
a) Using Bash Script:  
Run `install_hooks.sh` from .git_hooks directory.  
This script will set .git_hooks directory as local directory with git hooks.  

In case you want to stop using them:  
Run `uninstall_hooks.sh` from .git_hooks directory.  

b) Manually:  
You simply have to copy files into `.git/hooks` directory in your local git repository.  

In case you want to stop using them:   
Simply previously copied files.

# 3. Implementation details
Hooks which are created are used for commit template generation and validation of commit message.  
In case of validation failures, commit is aborted.
## 3.1 prepare-commit-msg
As name suggests, this stage occurs before you write commit message.  
During this stage commit message template should be prepared.
### 3.1.1 Commit template
For each new commit there will be added template, which will provide advice what information should be included in commit.

Template:
```
# Summary of change (up to 50 characters)


# Description why change was made (up to 72 characters per line)


```
You should put all necessary information below these comments.  
Keep in mind, that these commented lines are ignored - so after you commit changes, these comments won't be visible.


Special rules:  
If you modify already existing commit, template won't be added.  
This may occur when you for instance use below command:   

`git commit --amend`
## 3.2 commit-msg
This stage occurs after you submit commit message. Here validation of this message will be performed.
### 3.2.1 Subject of each commit must be capitalized
In case when first letter of commit subject won't be capitalized, commit will be aborted.

Examples:

|Commit subject|Result|
|:---:|:---:|
|Add new validation service|OK|
|add new validation service|[ERROR] Commit name must start from capital letter.|

### 3.2.2 Subject may not end with dot
In case when last letter of commit subject will be dot, commit will be aborted.

Examples:

|Commit subject|Result|
|:---:|:---:|
|Add new validation service|OK|
|Add new validation service.|[ERROR] Commit name must not end with dot.|

### 3.2.3 Subject may not be longer than 50 characters
In case when commit length will be greater than 50 characters, warning for developer will be printed.  
If commit is related to merge - no further action is taken, otherwise commit will be aborted.  
The reason why commit is not aborted in case of merge is that merge commits may break this rule 
(especially with long branch names), therefore enforcing it will make branch merging more difficult.  

Examples:

|Commit subject|Result|
|:---:|:---:|
|Add new validation service for payments module|OK|
|Add new validation service for incoming and outgoing payments module|[ERROR] Subject is too long (Must be 50 characters at most).|
|Merge branch 'Some_Ultra_Extra_Long_Branch_Name_Created_By_Powerful_Developer'|[WARNING] Subject is too long (expected max length: 50, actual: 79).|

### 3.2.4 Body should be wrapped at 72 characters
Length of all uncommented lines (with exception for the first line) should be no longer than 72 characters.
In case this rule is not satisfied, commit will be aborted.

Examples:

|Commit body|Result|
|:---:|:---:|
|This change will simplify payments service development|OK|
|This change will simplify payments service development by adding some new methods|[ERROR] There are 1 uncommented lines with length > 72 characters.|

## 3.3 pre-push
### 3.3.1 Pushing code directly to master or develop branch is forbidden
Adding code to these branches is only possible via pull request.  
In case you try to push code directly to one of these branches - error will be thrown.
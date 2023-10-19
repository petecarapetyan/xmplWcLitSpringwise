Here are some explanations on the folder structure:

## High Level Objectives

- declutter root
- follow linux standards where appropriate
- make src/ subfolders super clear esp wc vs rdx
- abbreviations preferable ONLY when effectively a key word
- singular when duh obvious (doc not docs, asset not assets)
- dist for going out

## Reference

- linux (thanks Andy) https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/

## Specific root folders

| folder | desc | notes |
| - | - | - |
| `asset` | images, files, etc | copied to dist folder fresh at every build |
| `bin` | executables | see [this](https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/)|
| `dist` | as built | should be what deploys to a web server |
| `doc` | documentation | markdown files. Should include a TOC.md for Table of Contents | 
| `etc` | configuration | see [this](https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/)|
| `src` | source | see expanded definition below |

## src: primary application source files

This is a special category: Everyone wants to do this their way

| folder | desc | notes |
| - | - | - |
| `src/wc` | web components |  |
| `src/rdx` | state (redux) |  |
| `src` | source root | hmmm not sure if anything goes here? Preferably not |
| `src/rdx/model` | rdx model |  | 
| `other ???` | well ??? | Should there be anything else? |

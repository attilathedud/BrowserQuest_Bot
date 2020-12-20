# BrowserQuest Bot
A bot for BrowserQuest(http://browserquest.mozilla.org/) that hooks the game client to send auto-attack commands and toggle invicibility.

![promo image](https://thumbs.gfycat.com/EcstaticHomelyEastrussiancoursinghounds-size_restricted.gif)

## Usage
Execute the code in bot.js in the developer console after you load into the server with your player. Tested only with Chrome. 

## Background
Development was done on a modified version (https://github.com/nenuadrian/BrowserQuest) of BrowserQuest that fixed some dependency issues in the original version.

It works by hooking the game's tick function and extracting out the Game class to the global level.

From the Game class we can call makePlayerAttack(enemy_entity) which triggers the client to create an attack link and start sending attack packets up to the server. It also sends the necessary movement packets. We use an event driven model to make the bot continue to acquire targets.

## RequireJS
RequireJS is a module loader for Javascript that allows you to separate your code into separate modules and then lazy-load the relevant code when you need it. 

On a page without a module loader, Javascript code exists at the global level and can be modified at anytime. However, with a module loader, code only exists when it is referenced and then is hidden away. If this loaded code is modified, it is overwritten when the module is reloaded. In addition, variables declared inside the modules cannot be accessed from the global level.

Luckily, RequireJS has to store function signatures in global memory so that other modules know how to call them. These function signatures can be hijacked to move module variables out to a global level. RequireJS stores these function signatures in the following format:
`require.s.contexts._.defined.[modulename].prototype.[functionname]`

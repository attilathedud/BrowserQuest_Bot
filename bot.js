/*!
*   A bot for BrowserQuest(http://browserquest.mozilla.org/) that hooks the client to send auto-attack commands.
*
*   Execute in the developer console after you load into the server with your player. Tested with Chrome.  
*/

var bot_info = {
    'is_attacking': false,
    'attacked_mob': undefined
}

require.s.contexts._.defined.game.prototype.tick = function () {
    if (!window.game) {
        window.game = this;
        if (window.game) {
            document.dispatchEvent(new Event('game_hooked'));
        }
    }

    // Check to see if our previous target is dead and we need to acquire a new one
    if (bot_info.is_attacking) {
        if (bot_info.attacked_mob === undefined || bot_info.attacked_mob.isDead) {
            bot_info.is_attacking = false;
            bot_info.attacked_mob = undefined;

            document.dispatchEvent(new Event('kill_mob'));
        }
    }

    // The original function
    this.currentTime = (new Date).getTime(), this.started && (this.updateCursorLogic(), this.updater.update(), this.renderer.renderFrame()), this.isStopped || requestAnimFrame(this.tick.bind(this))
}

document.addEventListener('game_hooked', function (e) {
    // Quickly toggle invincibility to bring the invincible member to the global level so we can set it
    window.game.player.startInvincibility();
    window.game.player.stopInvincibility();
    window.game.player.invincible = true;

    document.addEventListener('kill_mob', function (e) {
        window.game.forEachMob(function (entity) {
            if (!bot_info.is_attacking) {
                bot_info.is_attacking = true;
                bot_info.attacked_mob = entity;
                window.game.makePlayerAttack(bot_info.attacked_mob);
            }
        });
    }, false);

    document.dispatchEvent(new Event('kill_mob'));
}, false);

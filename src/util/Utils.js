Utils = {
	getCollidingTileAtPixel: function(x, y, level){
		return level.tileMap.getTile(Math.round(x/level.tileMap.tileWidth), Math.round(y/level.tileMap.tileHeight), level.collisionLayer);
	},

	getMapTileAtPixel: function(x, y, level){
		return level.tileMap.getTile(Math.round(x/level.tileMap.tileWidth), Math.round(y/level.tileMap.tileHeight), level.mapLayer);
	},

    //cookie util functions from http://www.quirksmode.org/js/cookies.html
    createCookie: function(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    },

    readCookie: function(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },

    eraseCookie: function(name) {
        Utils.createCookie(name, "", -1);
    }
}
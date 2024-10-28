# ld34
A game made in Javascript with Phaser for LD34

# TODO:

ART:
	- Main Character (cat)
		- Idle animation DONE
		- Walk animation DONE
		- fall animation DONE
		- Death animation DONE
	- Enemy (swarm of bees) DONE
	    - Idle animation DONE
	    - Kill animation DONE
	    - Death animation DONE
	- Rising Platform plant
	    - Growing animation DONE
	    - Plant animation
	- Burning Plant DONE
		- Growing animation DONE
		- Burn animation DONE
	- Thorns
	    - Burned down animation DONE
	- Venus fly trap
	    - growing animation DONE
	    - eating animation DONE
	- Hole digger
	    - growing animation DONE
	    - dirt crumble animation
	- Bridge builder
	    - growing animation 
	    - building animation 
	    - Bridge Tile DONE
    - Tileset
        - Fertile planting ground DONE
        - random decoration tiles DONE
    - Background/forground
        - Layered background/forground DONE
    - Butterfly DONE
        - idle animation DONE
        - flutter animation DONE
    - Level select menu DONE
    - Bitmap font DONE?

LOGIC:
	- Main Character (cat) DONE
		- move left/right with arrow keys DONE
		- fall off cliffs DONE
		- die when contact enemy DONE
		- collect seeds by walking over (add to FIFO queue) DONE
		- plant seeds by walking over ground (pop from FIFO queue) DONE
	- Enemy (swarm of bees) DONE
	    - pace across avalible space on platform DONE
	    - kill main character when contact DONE
	    - die when contact venus fly trap DONE
	- Rising Platform plant DONE
	    - when grown, push main character up to configured height DONE (needs polish)
	- Burning Plant DONE
		- when grown, burn down any connecting thorns DONE (needs polish)
	- Thorn Door DONE
	    - burn down when connecting thorns are burned DONE
	- Venus fly trap DONE
	    - eat enemy when contact DONE
	- Hole digger DONE
	    - destroy fertal ground tile when planted DONE
	- Bridge builder DONE
	    - fill any open space on the left or right of fertal ground tile with solid tile DONE
    - Level loading/switching/selecting DONE
    - End screen with tons of butterflies and main character
    - 9/20 levels designed

SOUND:
	- Background music DONE
		- chill, relaxing
	- Buttefly flutter sound DONE
	- Growing plant sound DONE
	- die sound DONE
	- eating hornet sound DONE
	- collecting seed sound DONE

IMPROVEMENTS:
	- fix bees getting stuck on solid walls DONE
	- add music mute option DONE
	- implement cookie saving progress DONE
	    - cheat to unlock all DONE
	    - ability to erase Data DONE
	- fix level out-of-order problem DONE
	- fix issues with levels
		- broken grow spot on bridges level
		- broken collision on burn level
	- design remaining 2 levels
	    - 1 more challenging level
	    - 1 simple level for end of game
	- implement end screen







/* hepl-mmi/1010
 *
 * /game.js - Canvas initialisation, game launcher
 *
 * coded by Pauline Viroux!
 * started at 29/04/2016
 */
//Animation du jeu! 
 ( function( ) {

    "use strict";

    var Dixdix;

    //Game Manager
    Dixdix = function( oApp ) {
        var game = this, //eslint-disable-line consistent-this
            Piece; 

        this.app = oApp;

        //Background
        this.background = {
            "frame":{
                "sx":0,
                "sy":0,
                "sw":288,
                "sh":511,
                "dx":0,
                "dy":0,
                "dw":game.app.width,
                "dh":game.app.height
            },
            "draw": function( ){
                game._drawSpriteFromFrame( this.frame );
            }
        };

        //Grid
        this.grid = {
            "frame":{
                "sx":312,
                "sy":0,
                "sw":260,
                "sh":260,
                "dx":10,
                "dy":100,
                "dw":game.app.width - 20,
                "dh":game.app.width - 20 
            },
            "draw": function( ){
                game._drawSpriteFromFrame( this.frame );
            }
        };

        //Logo
        this.logo = {
            "frame":{
                "sx":158, //param sur le sprite 
                "sy":653,
                "sw":85,
                "sh":19,
                "dx":game.app.width / 2 - 45.5,   //param on je veux les disposer
                "dy":12,
                "dw":85,
                "dh":19
            },
            "draw": function( ){
                game._drawSpriteFromFrame( this.frame );
            }
        };

        //Cup
        this.cup = {
            "frame":{
                "sx":129, 
                "sy":561,
                "sw":40,
                "sh":34,
                "dx":game.app.width / 2 - 20,
                "dy":45,
                "dw":40,
                "dh":34
            },
            "draw": function( ){
                game._drawSpriteFromFrame( this.frame );
            }
        };

        //Container (repaire visuel : ou l'on va pop les pieces)
        this.container = {
            "frames":[
                {
                    "dx": 0,
                    "dy": game.app.height - (game.app.width / 3 - 5),
                    "dw": game.app.width / 3 - 5,
                    "dh": game.app.width / 3 - 5
                },
                {
                    "dx": game.app.width / 3 - 5 + 8,
                    "dy": game.app.height - (game.app.width / 3 - 5),
                    "dw": game.app.width / 3 - 5,
                    "dh": game.app.width / 3 - 5
                },
                {
                    "dx": (game.app.width / 3 - 5) * 2 + 16,
                    "dy": game.app.height - (game.app.width / 3 - 5),
                    "dw": game.app.width / 3 - 5,
                    "dh": game.app.width / 3 - 5
                }
            ],
            "draw": function(){
                for (var i = 0; i < this.frames.length; i++) {
                    game.app.context.fillStyle = '#4ac9ba';
                    game.app.context.rect(this.frames[i].dx, this.frames[i].dy, this.frames[i].dw, this.frames[i].dh);
                    game.app.context.fill();
                    game.app.context.stroke;

                }
            }, 
            "update" : function() {
                if ( game.pieces.length === 0) {
                    Piece.generate(this.frames);
                }
                this.draw();
            }
        };

        //Piece
        Piece = function( x, y ){
            this.frames = [
                {
                    "sx": 313,
                    "sy": 272,
                    "sw": 80,
                    "sh": 80,
                    "dx": x + 5,
                    "dy": y + 8,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                }
            ] 
        }
        Piece.prototype.draw = function() {
            game._drawSpriteFromFrame( this.frames[0] );
        }
        Piece.prototype.update = function() {
            this.draw();
        }

        Piece.generate = function( frames ){
            var i = 0;

            for (var i = 0; i < frames.length; i++) {
                game.pieces.push( new Piece(frames[i].dx, frames[i].dy) );            
            }
        };


        //Utils
        this._drawSpriteFromFrame = function( oFrame ){
            this.app.context.drawImage(
                this.spriteSheet,
                oFrame.sx,
                oFrame.sy,
                oFrame.sw,
                oFrame.sh,
                oFrame.dx,
                oFrame.dy,
                oFrame.dw,
                oFrame.dh
            );
        };

        // this._mouseDown = function (event) {
        //     this.
        // }

        // this._mouseMove = function (event){

        // }

        // this._mouseUp = function (event){

        // }

        // this._updateDradDrop = function (piece){

        // }

        // this._checkPointerPiece = function (piece){

        // }

        // this._checkPieceInBox = function (piece){

        // }

        //Setup aniamtion
        this.animate = function( ) {
            this.background.draw();
            this.grid.draw();
            this.logo.draw();
            this.cup.draw();

            this.container.update();


            this.pieces.forEach( function( oPiece ) {
                oPiece.update();
            } );


        };
        
        //Init game
        this.init = function() {
            this.mousePosition ={
                x : 0,
                y : 0
            };
            this.mouseDragging = false;
            this.mouseDraggedElements = null;

            // reset some variables
            this.pieces =[];
            // launch animation
            this.animate();


        };  

     
        //Load spriteSheet
        this.spriteSheet = new Image();
        this.spriteSheet.addEventListener( "load", this.init.bind( this) );
        this.spriteSheet.src = "./resources/sprite1010.png";

    };

        window.Dixdix = Dixdix; //var utilisavle de l'exteriuer 

 }) ( );




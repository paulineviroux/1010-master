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

        //Plateform
        this.plateform = {
            "lineFull": [],
            "gridToDraw": [],
            "frames": [

                // 0 : grey 
                {
                    "sx": 663,
                    "sy": 19,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 1 : pink 
                {
                    "sx": 663,
                    "sy": 52,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 2 : darkblue 
                {
                    "sx": 663,
                    "sy": 87,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 2,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 3 : lightblue
                {
                    "sx": 663,
                    "sy": 123,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 3,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 4 : darkcyan 
                {
                    "sx": 663,
                    "sy": 156,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 4,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 5 : red
                {
                    "sx": 663,
                    "sy": 194,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 5,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 6 : green
                {
                    "sx": 663,
                    "sy": 230,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 6,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 7 : yellow
                {
                    "sx": 663,
                    "sy": 267,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 7,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 8 : darkred
                {
                    "sx": 663,
                    "sy": 298,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 8,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                },
                // 9 : orange
                {
                    "sx": 663,
                    "sy": 333,
                    "sw": 27,
                    "sh": 27,
                    "dx": 10 + (game.app.width - 20) / 10 * 9,
                    "dy": 100,
                    "dw": (game.app.width - 20) / 10,
                    "dh": (game.app.width - 20) / 10
                }
               ],
            "frame":{
                "sx":312,
                "sy":0,
                "sw":260,
                "sh":260,
                "dx":5,
                "dy":100,
                "dw":game.app.width - 20,
                "dh":game.app.width - 20 
            },
            "draw": function( ){
                //game._drawSpriteFromFrame( this.frame );
                //game.app.context.fillStyle = "red";
                //game.app.context.fillRect(this.frame.dx, this.frame.dy, this.frame.dw, this.frame.dh);
                this.fillGridToDraw();
                for (var i = 0; i < this.gridToDraw.length; i++) {
                    game._drawSpriteFromFrame( this.gridToDraw[i] );
                };
            }, 
            "update" : function(){
                for (var i = 0; i < game.column ; i++) {
                    if ( this.canResetLineY(i) ) {
                        for (var j = 0; j < this.lineFull.length; j++) {
                            this.lineFull[j].value = 0;
                        }
                    } else if( this.canResetLineX(i) ) {
                        for (var j = 0; j < this.lineFull.length; j++) {
                            this.lineFull[j].value = 0;
                        }
                    }
                }
                this.draw();

            }, 
            "fillGridToDraw" : function() {
                for (var i = 0; i < game.grid.length; i++) {
                    switch( game.grid[i].value ) {
                        case 0: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[0] );
                            break; //Quand je clone l'objet, j'en fais une copie, je ne modifie pas l'original
                        case 1: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[1] );
                            break;
                        case 2: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[2] );
                            break;
                        case 3: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[3] );
                            break;
                        case 4: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[4] );
                            break;
                        case 5: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[5] );
                            break;
                        case 6: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[6] );
                            break;
                        case 7: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[7] );
                            break;
                        case 8: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[8] );
                            break;
                        case 9: 
                            this.gridToDraw[i] = game._cloneObject( this.frames[9] );
                            break;       
                    }
                    this.gridToDraw[i].dx  = game.grid[i].dx;  
                    this.gridToDraw[i].dy  = game.grid[i].dy; //Je fais une copie, je la modifie pour qu'il soit égal a celui de la grille
                }
            },
            "canResetLineY" : function( x ) { // LineFull contient tout les objets qu'il y a en x et donc quand je veux reset lineY, je place un x, je verifie tout les éléments ou x vaut 0-9 
                this.lineFull = game.grid.filter( this.filterX.bind( this, x ));
                for (var i = 0; i < this.lineFull.length; i++) {
                    if ( this.lineFull[i].value == 0) {
                        return false;
                    }   
                }
                return true;
            }, 
            "canResetLineX" : function( y ) {
                this.lineFull = game.grid.filter( this.filterY.bind( this, y ));
                for (var i = 0; i < this.lineFull.length; i++) {
                    if ( this.lineFull[i].value == 0) {
                        return false;
                    }   
                }
                return true;
            }, 
            "filterX" : function ( number, obj ) {
                return obj.x === number; 
            },
            "filterY" : function ( number, obj ) {
                return obj.y === number;
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

                    game.pieces.forEach( function( oPiece ) {
                        oPiece.update();
                    } );

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
        Piece = function( x, y, type ){
            this.frames = [
                // 0 : grey
                {

                },
                // 1 : pink
                {
                 "sx": 309,
                       "sy": 273,
                       "sw": 77,
                       "sh": 77,
                    "dx": x + 10 || 5,
                    "dy": y + 10 || game.app.height - 100 ,
                    // 3/10 of board warming to keep the good proportion
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 2 : darkblue horizontal
                {
                 "sx": 388,
                       "sy": 272,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 3 : darkblue vertical
                {
                 "sx": 468,
                       "sy": 273,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 4 : lightblue
                {
                 "sx": 520,
                       "sy": 273,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 5 : darkcyan both right
                {
                 "sx": 310,
                       "sy": 352,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 6 : darkcyan both left
                {
                 "sx": 388,
                       "sy": 352,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 7 : darkcyan top right
                {
                 "sx": 467,
                       "sy": 352,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3    
                },
                // 8 : darkcyan top left
                {
                 "sx": 545,
                       "sy": 352,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 9 : yellow
                {
                 "sx": 308,
                       "sy": 431,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 10 : red vertical
                {
                 "sx": 385,
                       "sy": 431,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 11 : red horizontal
                {
                 "sx": 467,
                       "sy": 431,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 12 : orange top right
                {
                 "sx": 547,
                       "sy": 431,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 13 : orange both left
                {
                 "sx": 309,
                       "sy": 510,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 14 : orange both right
                {
                 "sx": 388,
                       "sy": 510,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                },
                // 15 : orange top left
                {
                 "sx": 467,
                       "sy": 510,
                       "sw": 77,
                       "sh": 77,
                    "dx": x,
                    "dy": y,
                    "dw": (game.app.width - 20) / 10 * 3,
                    "dh": (game.app.width - 20) / 10 * 3
                }
                // 16 : green horizontal
                // 17 : green vertical
                // 18 : darkred horizontal
                // 19 : darkred vertical
            ],
            this.positionInitialX = x,
            this.positionInitialY = y,
            this.wasDragged = false, 
            this.type = type

        }
        Piece.prototype.draw = function() {
            game._drawSpriteFromFrame( this.frames[ this.type ] );
        }
        Piece.prototype.update = function() {
            //Drag
            if (game.mouseDraggedElement == this) {

                game.mouseDragging = true;
                game._updateDragDrop( this );
                this.wasDragged = true;
            }
            //Drop
            
            if (game.mouseDragging == false ) {
                if ( this.wasDragged == true ) {
                    var position = game._checkPointerInGrid(); //est ce que le curseur est dans la grille? 
                    if ( position != undefined ) {
                        if (this.canChangeGrid( position )) {//en fcontion de ou j'ai mis mon curseur, vérifie si je peux mettte une piece ou pas
                            var index = game.pieces.indexOf( this );
                            game.pieces.splice( index, 1);
                            this.changeGrid( position );
                        } else {
                            this.wasDragged = false;
                            this.resetPosition();
                        }
                        
                    } else {
                        this.wasDragged = false;
                        this.resetPosition();
                    }
                }
            }

            this.draw();
        }
        Piece.prototype.resetPosition = function( ){
            this.frames[ this.type ].dx = this.positionInitialX;
            this.frames[ this.type ].dy = this.positionInitialY;
        }
        Piece.prototype.changeGrid = function(position) { 
            if ( position == undefined ) {
                console.log("changeGrid argument is invalid : " + position);
            }
            //PIECE TODO
            // 0 : grey = empty
            // 16 : green horizontal
            // 17 : green vertical
            // 18 : darkred horizontal
            // 19 : darkred vertical
            // switch for every piece
            switch ( this.type ) {
                // 1 : pink piece
                case 1:
                    for ( var xGrid = position.x - 1; xGrid <= position.x + 1; xGrid++ ) {
                        for ( var yGrid = position.y - 1; yGrid <= position.y + 1; yGrid++ ) {
                            // recupere l'indice de xGrid et yGrid et change value to 1
                            var index = game._indexFromCoord( xGrid, yGrid, game.column );
                            game.grid[index].value = 1;
                        }
                    }
                    break;
                // 2 : darkblue horizontal piece
                case 2:
                    for ( var xGrid = position.x - 1; xGrid <= position.x + 1; xGrid++ ) {
                        var index = game._indexFromCoord( xGrid, position.y, game.column );
                        game.grid[index].value = 2;
                    }
                    break;
                // 3 : darkblue vertical piece
                case 3:
                    for ( var yGrid = position.y - 1; yGrid <= position.y + 1; yGrid++ ) {
                        var index = game._indexFromCoord( position.x, yGrid, game.column) ;
                        game.grid[index].value = 2; //Je change la couleur de la grille grise 
                    }
                    break;
                // 4 : lightblue piece
                case 4:
                    var index = game._indexFromCoord( position.x, position.y, game.column );
                    game.grid[index].value = 3;
                    break;
                // 5 : darkcyan both right piece
                case 5:
                    for ( var xGrid = position.x ; xGrid <= position.x + 1; xGrid++ ) {
                        for ( var yGrid = position.y ; yGrid <= position.y + 1; yGrid++ ) {
                            if ( xGrid != position.x || yGrid != position.y ) {
                                var index = game._indexFromCoord( xGrid, yGrid, game.column );
                                game.grid[index].value = 4;
                            }
                        }
                    }
                    break;
                // 6 : darkcyan both left piece
                case 6:
                    for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                        for ( var yGrid = position.y ; yGrid <= position.y + 1; yGrid++ ) {
                            if ( xGrid != position.x || yGrid != position.y ) {
                                var index = game._indexFromCoord( xGrid, yGrid, game.column );
                                game.grid[index].value = 4;
                            }
                        }
                    }
                    break;
                // 7 : darkcyan top right piece
                case 7:
                    for ( var xGrid = position.x ; xGrid <= position.x + 1 ; xGrid++ ) {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y ; yGrid++ ) {
                            if ( xGrid != position.x || yGrid != position.y ) {
                                var index = game._indexFromCoord(xGrid, yGrid, game.column);
                                game.grid[index].value = 4;
                            }
                        }
                    }
                    break;
                // 8 : darkcyan top left piece
                case 8:
                    for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y ; yGrid++ ) {
                            if ( xGrid != position.x || yGrid != position.y ) {
                                var index = game._indexFromCoord( xGrid, yGrid, game.column );
                                game.grid[index].value = 4;
                            }
                        }
                    }
                    break;
                // 9 : yellow piece
                case 9:
                    for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y ; yGrid++ ) {
                            var index = game._indexFromCoord( xGrid, yGrid, game.column );
                            game.grid[index].value = 7;
                        }
                    }
                    break;
                // 10 : red vertical piece
                case 10:
                    for ( var yGrid = position.y - 1; yGrid <= position.y ; yGrid++ ) {
                        var index = game._indexFromCoord( position.x, yGrid, game.column );
                            game.grid[index].value = 5;
                    }
                    break;
                // 11 : red horizontal piece
                case 11:
                    for ( var xGrid = position.x - 1; xGrid <= position.x ; xGrid++ ) {
                        var index = game._indexFromCoord( xGrid, position.y, game.column );
                            game.grid[index].value = 5;
                    }
                    break;
                // 12 : orange top right piece
                case 12:
                    for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                        var index = game._indexFromCoord( position.x + 1, yGrid, game.column );
                        game.grid[index].value = 9;
                    }
                    for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                        var index = game._indexFromCoord( xGrid, position.y - 1, game.column );
                        game.grid[index].value = 9;
                    }
                    break;
                // 13 : orange both left piece
                case 13:
                    for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                        var index = game._indexFromCoord( position.x - 1, yGrid, game.column );
                        game.grid[index].value = 9;
                    }
                    for ( var xGrid = position.x ; xGrid <= position.x + 1 ; xGrid++ ) {
                        var index = game._indexFromCoord( xGrid, position.y + 1, game.column );
                        game.grid[index].value = 9;
                    }
                    break;
                // 14 : orange both right piece
                case 14:
                    for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                        var index = game._indexFromCoord( position.x + 1, yGrid, game.column );
                        game.grid[index].value = 9;
                    }
                    for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                        var index = game._indexFromCoord( xGrid, position.y + 1, game.column );
                        game.grid[index].value = 9;
                    }
                    break;
                // 15 : orange top left piece
                case 15:
                    for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                        var index = game._indexFromCoord( position.x - 1, yGrid, game.column );
                        game.grid[index].value = 9;
                    }
                    for ( var xGrid = position.x ; xGrid <= position.x + 1; xGrid++ ) {
                        var index = game._indexFromCoord( xGrid, position.y - 1, game.column );
                        game.grid[index].value = 9;
                    }
                    break;
            }

        };
        Piece.prototype.canChangeGrid = function(position) {
            //PIECE TODO
                // 0 : grey = empty
                // 16 : green horizontal
                // 17 : green vertical
                // 18 : darkred horizontal
                // 19 : darkred vertical
            if (position == undefined ){
                return false
            }
            switch( this.type ) {
                // 1 : pink piece
                case 1: 
                    if ( position.x > 8 || position.y > 8 ) {
                        return false; 
                    } else { 
                        for ( var xGrid = position.x - 1 ; xGrid <= position.x + 1 ; xGrid++ ) { 
                            for (var yGrid = position.y - 1 ; yGrid <= position.y + 1; yGrid++ ) {
                                if (xGrid < 0 || yGrid < 0 ) {
                                    return false;
                                }
                                var index = game._indexFromCoord( xGrid, yGrid, game.column );
                                if ( game.grid[index].value != 0 ) {
                                    return false;
                                }
                            }
                            
                        }
                        return true;
                    }
                    break;    

                // 2 : darkblue horizontal piece 
                case 2: 
                    if ( position.x > 8 ) {
                        return false;  
                    } else { 
                        for ( var xGrid = position.x - 1 ; xGrid <= position.x + 1 ; xGrid++ ) { 
                            if ( xGrid < 0 ) {
                                return false;
                            }
                            var index = game._indexFromCoord( xGrid, position.y, game.column );
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }   
                        }
                        return true;
                    }
                    break; 


                // 3 : darkblue vertical piece
                case 3: 
                    if ( position.x > 8 ) {
                        return false; //Return false et true?? 
                    } else { 
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) { 
                            if ( yGrid < 0 ) {
                                return false;
                            }
                            var index = game._indexFromCoord( position.x, yGrid, game.column );
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }   
                        }
                        return true;
                    }
                    break; 

                // 4 : lightblue piece
                case 4 : 
                    var index = game._indexFromCoord( position.x, position.y, game.column );
                    if ( game.grid[index].value != 0 ) {
                        return false;
                    } else {
                        return true;
                    } 
                    break;


                // 5 :  darkcyan both right piece 
                case 5: 
                    if ( position.x > 8 || position.y > 8 ) {
                        return false; 
                    } else { 
                        for ( var xGrid = position.x ; xGrid <= position.x + 1 ; xGrid++ ) { 
                            for (var yGrid = position.y ; yGrid <= position.y + 1; yGrid++ ) {
                                var index = game._indexFromCoord( xGrid, yGrid, game.column );
                                if (xGrid != position.x || yGrid != position.y ) {
                                    if ( game.grid[index].value != 0 ) {
                                        return false;
                                    }
                                }  
                            }  
                        }
                        return true;
                    }
                    break; 
                // 6 : darkcyan both left piece
                case 6:
                    if ( position.y > 8 ) {
                        return false; //on le dessine pas, on reset sa position
                    } else {
                        for (var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++) {
                            for (var yGrid = position.y ; yGrid <= position.y + 1 ; yGrid++) {
                                if ( xGrid < 0 ){
                                    return false
                                }
                                var index = game._indexFromCoord(xGrid, yGrid, game.column);
                                if (xGrid != position.x || yGrid != position.y) {// seule condition pour ne pas dessiner un carré
                                    if ( game.grid[index].value != 0 ) { //Verifie si il y a pas deja une piece a cet endroit
                                        return false;
                                    }
                                }
                            }
                        }
                        return true;
                    }
                    break;
                // 7 : darkcyan top right piece
                case 7:
                    if ( position.x > 8 ){
                        return false
                    } else {
                        for (var xGrid = position.x ; xGrid <= position.x + 1 ; xGrid++) {
                            for (var yGrid = position.y - 1 ; yGrid <= position.y ; yGrid++) {
                                if ( yGrid < 0 ) {
                                    return false
                                }
                                var index = game._indexFromCoord(xGrid, yGrid, game.column);
                                if (xGrid != position.x || yGrid != position.y) {
                                    if ( game.grid[index].value != 0 ) {
                                        return false;
                                    }
                                }
                            }
                        }
                        return true;
                    }
                    break;
                // 8 : darkcyan top left piece
                case 8 :
                    for (var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++) {
                        for (var yGrid = position.y - 1 ; yGrid <= position.y ; yGrid++) {
                            if ( xGrid < 0 || yGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(xGrid, yGrid, game.column);
                            if (xGrid != position.x || yGrid != position.y) {
                                if ( game.grid[index].value != 0 ) {
                                    return false;
                                }
                            }
                        }
                    }
                    return true;
                    break;
                // 9 : yellow piece
                case 9 :
                    for (var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++) {
                        for (var yGrid = position.y - 1 ; yGrid <= position.y ; yGrid++) {
                            if ( xGrid < 0 || yGrid < 0 ){
                                return false
                            }
                            var index = game._indexFromCoord(xGrid, yGrid, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                    }
                    return true;
                    break;
                // 10 : red vertical piece
                case 10 :
                    for (var yGrid = position.y - 1; yGrid <= position.y ; yGrid++) {
                        if (yGrid < 0) {
                            return false 
                        }
                        var index = game._indexFromCoord(position.x, yGrid, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                    }
                    return true;
                    break;
                // 11 : red horizontal piece
                case 11 :
                    for (var xGrid = position.x - 1; xGrid <= position.x ; xGrid++) {
                        if ( xGrid < 0 ){
                            return false
                        }
                        var index = game._indexFromCoord(xGrid, position.y, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                    }
                    return true;
                    break;
                // 12 : orange top right piece
                case 12 : 
                    
                    if ( position.x > 8 ) {
                        return false
                    }
                    else {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                            if ( yGrid < 0 ){
                                return false
                            }
                            var index = game._indexFromCoord(position.x + 1, yGrid, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                        for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                            if ( xGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(xGrid, position.y - 1, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                    } return true;
                    break;
                // 13 : orange both left piece
                case 13 :
                    if ( position.x > 8 || position.y > 8 ) {
                        return false
                    } 
                    else {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                            if ( yGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(position.x - 1, yGrid, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                        for ( var xGrid = position.x ; xGrid <= position.x + 1 ; xGrid++ ) {
                            if ( xGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(xGrid, position.y + 1, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                    } return true;
                    break;
                // 14 : orange both right piece
                case 14 :
                    if ( position.x > 8 || position.y > 8 ) {
                        return false
                    }
                    else {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                            if ( yGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(position.x + 1, yGrid, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                        for ( var xGrid = position.x - 1 ; xGrid <= position.x ; xGrid++ ) {
                            if ( xGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(xGrid, position.y + 1, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                    } return true;
                    break;
                // 15 : orange top left piece
                case 15 :
                    if ( position.x > 8 || position.y > 8 ){
                        return false
                    } 
                    else {
                        for ( var yGrid = position.y - 1 ; yGrid <= position.y + 1 ; yGrid++ ) {
                            if ( yGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(position.x - 1, yGrid, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                        for ( var xGrid = position.x ; xGrid <= position.x + 1; xGrid++ ) {
                            if ( xGrid < 0 ) {
                                return false
                            }
                            var index = game._indexFromCoord(xGrid, position.y - 1, game.column);
                            if ( game.grid[index].value != 0 ) {
                                return false;
                            }
                        }
                    } return true;
                    break;
            }
        };
        Piece.generate = function( frames ){
            var i = 0;

            for (var i = 0; i < frames.length; i++) {

                var random = Math.floor(Math.random() * 15);
                if ( random == 0) {
                    i--;
                } else {
                    game.pieces.push( new Piece(frames[i].dx, frames[i].dy, random) );
                }
                

            }

        };

        // Game Over Screen

        this.gameOverScreen = {
            "frames": {
                "title": {
                    "sx": 106,
                    "sy": 872,
                    "sw": 168,
                    "sh": 24,
                    "dx": ( game.app.width - 168 ) / 2,
                    "dy": 0, //TODO
                    "dw": 168,
                    "dh": 24
                },
                "cup": {
                    "sx": 224,
                    "sy": 560,
                    "sw": 40,
                    "sh": 34,
                    "dx": ( game.app.width - 40 ) / 2,
                    "dy": 0, //TODO
                    "dw": 40,
                    "dh": 34
                },
                "cyphers": {
                    "sx": 17,
                    "sw": 14,
                    "sh": 21,
                    "sy": {
                        "0": 560,
                        "1": 592,
                        "2": 621,
                        "3": 651,
                        "4": 681,
                        "5": 712,
                        "6": 740,
                        "7": 772,
                        "8": 800,
                        "9": 831
                    }
                }
            }
        }


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

        this._mouseDown = function (event) {
            for (var i = 0; i < game.pieces.length; i++) {
                if (game._checkPointerPiece( game.pieces[i] ) == true) {
                    game.mouseDraggedElement = game.pieces[i];
                }
            }
        }

        this._mouseMove = function (event){

            game.mousePosition.x = event.clientX - (window.innerWidth - game.app.canvas.width) / 2; 
            game.mousePosition.y = event.clientY - game.app.canvas.offsetTop;

 
        };

        this._mouseUp = function (event){
            game.mouseDraggedElement = null;
            game.mouseDragging = false;
        }

        this._updateDragDrop = function (piece){

            piece.frames[ piece.type ].dx = game.mousePosition.x - piece.frames[ piece.type ].dw / 2;
            piece.frames[ piece.type ].dy = game.mousePosition.y - piece.frames[ piece.type ].dh / 2;
        }

        this._checkPointerPiece = function ( piece ){
        
            if ( game.mousePosition.x >= piece.frames[ piece.type ].dx 
                && game.mousePosition.x <= piece.frames[ piece.type ].dx + piece.frames[ piece.type ].dw  
                && game.mousePosition.y >= piece.frames[ piece.type ].dy 
                && game.mousePosition.y <= piece.frames[ piece.type ].dy + piece.frames[ piece.type ].dh )

            {
                return true;
            } else {
                return false;
            }

        };

        this._checkPieceInPlateform = function ( piece ){
            

            if ( piece.frames[0].dx >= game.plateform.frame.dx 
                && piece.frames[0].dx <= game.plateform.frame.dx + game.plateform.frame.dw 
                && piece.frames[0].dy >= game.plateform.frame.dy 
                && piece.frames[0].dy <= game.plateform.frame.dy + game.plateform.frame.dh )   
            {
                return true;
            } else {
                return false;
            }
        };
        this._checkPointerInGrid = function () {
            for (var i = 0; i < game.grid.length; i++) {
                if ( ( game.mousePosition.x >= game.grid[i].dx
                && game.mousePosition.x <= game.grid[i].dx + game.grid[i].dw )
                && ( game.mousePosition.y >= game.grid[i].dy
                && game.mousePosition.y <= game.grid[i].dy + game.grid[i].dh ) ) {
                    return {
                        x : game.grid[i].x, //si oui, renvoie un objet avec sa postion dans le tableau, indice et ordonnée
                        y : game.grid[i].y
                    };
                }
            }
        };
        this._indexFromCoord = function( x, y, col ){ 
            return x + y * col; // me donne l'index du tableau
        }
        this._cloneObject = function ( obj ) {
            if ( obj == null || "object" != typeof obj ) { //verifier que l'objet est bien un objet
               return obj;
            }
            var copy = obj.constructor(); 
            for (var prop in obj) { //parcourt les prop de l'objet
                if (obj.hasOwnProperty(prop)) { //si la prop existe 
                    copy[prop] = obj[prop]; //je copie la valeur de prop
                }
            }
              return copy; 
        }; 

        //Setup aniamtion -> dessiner et va appler tout les updates et nous permettre de jouer
        this.animate = function( ) {
            this.animationRequestID = window.requestAnimationFrame( this.animate.bind( this ) );

            // draw: clear
            this.app.context.clearRect( 0, 0, this.app.width, this.app.height );
            this.background.draw();
            
            this.logo.draw();
            this.cup.draw();

            
            this.plateform.update();
            this.container.update();

            


        };
        
        //Init game
        this.init = function() { // toutess les var que je crée devienennt des prop de game
            if ( !this.eventsSetted ) {
                this.app.canvas.addEventListener( "mousemove", this._mouseMove.bind(this._mouseMove) );
                this.app.canvas.addEventListener( "mousedown", this._mouseDown.bind(this._mouseDown) );
                this.app.canvas.addEventListener( "mouseup", this._mouseUp.bind(this._mouseUp));
            }

            this.mousePosition ={
                x : 0,
                y : 0
            };
            this.mouseDragging = false;
            this.mouseDraggedElement = null;


            // reset some variables
            this.pieces =[];
            this.column = 10;
            this.grid = [];
            this.celluleWidth = game.plateform.frame.dw / this.column;
            this.celluleHeight = game.plateform.frame.dh / this.column;
            //Remplir la grille 
            for (var i = 0; i < this.column * this.column; i++) { 
                var x = i%this.column;
                var y = (i - x) / this.column;
                this.grid[i] = {
                    "value" : 0, // 
                    "x" : x, //indice
                    "y" : y, //ordonnée
                    "dx" : x + x*game.celluleWidth + game.plateform.frame.dx, //destination sur la pateforme en x
                    "dy" : y + y*game.celluleHeight + game.plateform.frame.dy, 
                    "dw" : this.celluleWidth, 
                    "dh" : this.celluleHeight
                };

            }


            // launch animation
            this.animate();


        };  

     
        //Load spriteSheet
        this.spriteSheet = new Image();
        this.spriteSheet.addEventListener( "load", this.init.bind( this) );
        this.spriteSheet.src = "./resources/sprite10102.png";

    };

        window.Dixdix = Dixdix; //var utilisavle de l'exteriuer 

 }) ( );




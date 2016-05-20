/* hepl-mmi/1010
 *
 * /game.js - Canvas initialisation, game launcher
 *
 * coded by Pauline Viroux!
 * started at 29/04/2016
 */
// initialisation du canvas et dedans on appelle le jeu
 ( function( Dixdix ) {
    "use strict";

    var oApp = {
            "canvas": null, 
            "context": null,
            "width": null,
            "height": null
        },
        _isCanvasSupported;

        _isCanvasSupported = function( $canvasElt ) {
            return !!$canvasElt.getContext; //savoir si canvas est supporté ou pas -> Essayer d'appeler une fonction qui n'existe qu'avec canvas! 
        };

        oApp.setup = function() {
            this.canvas = document.querySelector( "#game" );

            if (!_isCanvasSupported( this.canvas )) {
                return console.error( "Canvas isn't supported!");
            }

            this.context = this.canvas.getContext( "2d" );
            this.width = this.canvas.width;
            this.height = this.canvas.height;

            window.game = new Dixdix( this ); //lui donner une référence à l'objet oApp -> this

        };
        oApp.setup();
        
 }) ( window.Dixdix );

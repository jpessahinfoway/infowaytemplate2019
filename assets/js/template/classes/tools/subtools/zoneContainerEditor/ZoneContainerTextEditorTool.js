import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {TextStylyzer} from "../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../TextIncrusteStyle";
var stringify = require('json-stringify-safe');


class ZoneContainerTextEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.$location.window.containers.right.containers.top.h2.content = 'Créer votre style de texte';
        this.$location.window.containers.left.containers.bottom.h2.content = 'Choisir un style de texte';
        this.$location.window.containers.left.containers.bottom.container.$location=$('.modal.background-editor .left-container .bottom-left-container #choose-text-style')
        this.$location.window.containers.right.containers.top.container.$location=$('.modal.background-editor .right-container #text-style-creator');
        this.$location.styleLocation = $('');
        this.zonesHTMLToAppendToStyleChoiceContainer = '';
        this.stylyzer = null
        this.getExistingStyles()
    }

    getExistingStyles(){
        $.ajax({
            type: "POST",
            url: '/template/stage2/getstyles',
            success: (data) => {
                this.buildStyleSelectorList(data)
            },
        });
    }

    buildStyleSelectorList(parsedCSSJson){

        let parsedCSS = JSON.parse(parsedCSSJson);
        let HTML = $("<div class='classes-text' ></div>");

        Object.keys(parsedCSS).map( className => {
            this.addStyleSelectorDiv(HTML,className.substring(1,className.length));
        });

        this.$location.window.containers.left.containers.bottom.container.$location.html(HTML)
    }

    addStyleSelectorDiv($container,className){
        let HTML =
        "<div class='class-text'>"+
            `<div class="class-text__flex-container"><span>.${className}</span>`+
                "<div>" +
                    "<button class='hidden-btn'><i class='fas fa-trash-alt' title='Supprimer'></i></button>"+
                    "<button class='hidden-btn'><i class='fas fa-file-import' title='Importer'></i></button>" +
                "</div>"+
            "</div>"+
            `<div class='incrust-style-wrapper'>`+
                `<p class='${className}'>Ici la description de votre zone</p>`+
            `</div>`+
        '</div>';
        $container.append(HTML);
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onActivation(){
        this.stylyzer = new TextStylyzer($('#text-style-creator'))
        this.stylyzer.setPreviewZone($('#text-style-creator .preview'))
        this.stylyzer.activeStylyser(true,{comfirmButtonLocation : this.parentTool.$location.window.containers.right.button.validate, onSuccess : (style)=>{

               let textIncrusteStyle =  new TextIncrusteStyle();
                textIncrusteStyle.setName('incruste1');
                textIncrusteStyle.setStyle(style)
                console.log(textIncrusteStyle)
                $.ajax({
                    type: "GET",
                    url: '/template/stage1/model/register',
                    data: {
                        newStyles : stringify(textIncrusteStyle),
                    },
                    success: (response)=>{
                        let parsedResponse = JSON.parse(response);
                        let newClass = parsedResponse['newClass'].content.content;
                        $('#text-style-css').replaceWith(`<link id="${$('#text-style-css').attr('id')}" rel="stylesheet" href="${$('#text-style-css').attr('href')}?t=${Date.now()}">`);

                        this.addStyleSelectorDiv(this.$location.window.containers.left.containers.bottom.container.$location,newClass)
                    },
                });
            }});

    }
    onDisactivation(){
        if(this.stylyzer !== null){
            this.stylyzer.activeStylyser(false)
        }
    }
}

export {ZoneContainerTextEditorTool}
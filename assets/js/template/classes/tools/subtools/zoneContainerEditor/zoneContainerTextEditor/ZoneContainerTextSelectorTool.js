
import {MediaContent} from "../../../../zoneContents/MediaContent";
import {ZoneContainerTextEditorSubTool} from "./parent/ZoneContainerTextEditorSubTool";



class ZoneContainerTextSelectorTool extends ZoneContainerTextEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de texte';
        this.$location.container = $('.modal.background-editor .left-container .bottom-left-container #choose-text-style');
        this.$location.selectorList = this.$location.container.find('ul.classes-text')

        this.textSelected = null;
        this.getExistingStyles().done( existingStyles => this.buildStyleSelectorList(existingStyles))

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    getExistingStyles(){
        return $.ajax({
            type: "POST",
            url: '/template/stage2/getstyles',
            success: (data) => {return data}
        });
    }

    buildStyleSelectorList(parsedCSSJson){

        let parsedCSS = JSON.parse(parsedCSSJson);
        let HTMLcontainer = '';

        Object.keys(parsedCSS).map( className => {
            HTMLcontainer += this.buildStyleSelectorDivHTML(className.substring(1,className.length));
        });

      //  this.$location.selectorList.html(HTMLcontainer)
    }

    addStyleSelectorDiv($container,className){
        let HTML =
            "<li class='class-text'>"+
            `<div class="class-text__flex-container"><span>.${className}</span>`+
            "<div>" +
            "<button class='hidden-btn'><i class='fas fa-trash-alt' title='Supprimer'></i></button>"+
            "<button class='hidden-btn'><i class='fas fa-file-import' title='Importer'></i></button>" +
            "</div>"+
            "</div>"+
            `<div class='incrust-style-wrapper'>`+
            `<p class='${className}'>Ici la description de votre zone</p>`+
            `</div>`+
            '</li>';
        
        $container.prepend(HTML);
    }

    refreshCssStylesheet(){
        $('#text-style-css').replaceWith(`<link id="${$('#text-style-css').attr('id')}" rel="stylesheet" href="${$('#text-style-css').attr('href')}?t=${Date.now()}">`);
    }

    onClickSelectStyle(active){
        if(active){
            this.$location.selectorList.on('click.onClickSelectStyle','.class-text',(e)=>{
                    let styleSelected = $(e.currentTarget)
                    styleSelected.find('.incrust-style-wrapper').addClass('selected-style')

            })
        }else{
            this.$location.selectorList.off('click.onClickSelectStyle')
        }
    }

    buildStyleSelectorDivHTML(className){
        console.log(className);
        let HTML =
            "<li class='class-text'>"+
            `<div class="class-text__flex-container"><span>.${className}</span>`+
            "<div>" +
            "<button class='hidden-btn'><i class='fas fa-trash-alt' title='Supprimer'></i></button>"+
            "<button class='hidden-btn'><i class='fas fa-file-import' title='Importer'></i></button>" +
            "</div>"+
            "</div>"+
            `<div class='incrust-style-wrapper'>`+
            `<p class='${className}' data-id=1>Ici la description de votre zone</p>`+
            `</div>`+
            '</li>';
        return HTML
    }


    onDisactivation(){
        this.onClickSelectStyle(false)
    }
    onActivation(){
        this.onClickSelectStyle(true)
        /*  console.log(this)
          console.log(this.parentTool)
          this.parentTool.templateMiniature.resetMiniature().addZones(['media']);
          this.onClickOnSelectedMedia(true)*/
    }
}

export {ZoneContainerTextSelectorTool}

import {MediaContent} from "../../../../zoneContents/MediaContent";
import {ZoneContainerTextEditorSubTool} from "./parent/ZoneContainerTextEditorSubTool";
import {TextStylyzer} from "../../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../../TextIncrusteStyle";
import {TextIncruste} from "../../../../objects/incrustes/textIncruste/TextIncruste";
import {TextIncrusteContent} from "../../../../objects/incrustesContents/textIncrusteConents/TextIncrusteContent";
var stringify = require('json-stringify-safe');



class ZoneContainerTextStyleCreatorTool extends ZoneContainerTextEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de texte';
        this.$location.container = $('.modal.background-editor .right-container #text-style-creator');
        this.$location.preview = this.$location.container.find('.preview')
        this.textIncrusteStyle = null;
        this.buildStylyzer();

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onClickOnComfirmButtonRegisterModel(active){
        if(active){
            this.stylyzer.$location.styleForm.find('button').on('click.onClickOnComfirmButtonRegisterModel',e => {
                let createdStyle = this.stylyzer.generateStyle();
                let textIncruste =  new TextIncruste();
                textIncruste.setName('incruste2');
                let textContent = new TextIncrusteContent()
                textContent.setStyle(createdStyle);
                textIncruste.addContent(textContent)
                $.ajax({
                    type: "GET",
                    url: '/template/stage1/model/register',
                    data: {
                        incrusteStyle : stringify(textIncruste),
                    },
                    success: (encodedNewIncruste)=>{
                        console.log(encodedNewIncruste)
                        let parsedNewIncruste = JSON.parse(encodedNewIncruste);
                        let newClass = parsedNewIncruste['elements'][0].name;

                        console.log(this.parentTool.subTools)
                        let ZoneContainerTextSelectorTool = this.parentTool.subTools['ZoneContainerTextSelectorTool'];

                        ZoneContainerTextSelectorTool.refreshCssStylesheet()
                        ZoneContainerTextSelectorTool.addStyleSelectorDiv(ZoneContainerTextSelectorTool.$location.container.find('ul'),newClass);

                    },
                });

            })
        }
    }

    buildStylyzer(){
        this.stylyzer = new TextStylyzer(this.$location.container)
        this.stylyzer.setPreviewZone(this.$location.preview)
        this.stylyzer.activeStylyser(true);
        console.log(this.stylyzer)
    }

    onDisactivation(){
        this.onClickOnComfirmButtonRegisterModel(false)
    }
    onActivation(){
        this.onClickOnComfirmButtonRegisterModel(true)

    }
}

export {ZoneContainerTextStyleCreatorTool}
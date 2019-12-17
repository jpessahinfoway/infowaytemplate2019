
import {MediaContent} from "../../../../zoneContents/MediaContent";
import {ZoneContainerTextEditorSubTool} from "./parent/ZoneContainerTextEditorSubTool";
import {TextStylyzer} from "../../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../../TextIncrusteStyle";
import {TextIncruste} from "../../../../objects/incrustes/textIncruste/TextIncruste";
import {TextIncrusteContent} from "../../../../objects/incrustesContents/textIncrusteConents/TextIncrusteContent";
import {PriceIncruste} from "../../../../objects/incrustes/priceIncruste/PriceIncruste";
import {PriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/PriceIncrusteContent";
import {CentimePriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/CentimePriceIncrusteContent";
import {EuroPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/EuroPriceIncrusteContent";
import {SeparateurPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/SeparateurPriceIncrusteContent";
import {UnitePriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/UnitePriceIncrusteContent";
import {Style} from "../../../../Style";
import {Observable} from "../../../../pattern/observer/Observable";
import {Observer} from "../../../../pattern/observer/Observer";
var stringify = require('json-stringify-safe');



class ZoneContainerTextStyleCreatorTool extends ZoneContainerTextEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de texte';
        this.$location.container = $('.modal.background-editor .right-container #text-incrust-style-creator');
        this.$location.preview = this.$location.container.find('.preview')
        this.textIncrusteStyle = null;
        this.buildStylyzer();
        this.createdIncrustStyle = this.buildIncrust({incrustObject: new TextIncruste(), incrustContentObject : new TextIncrusteContent()})
        this.styleCreatorObservable = new Observable();

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    buildIncrust({incrustObject = null, incrustContentObject = null, incrustSubContentsObject = [] } = {}){


        incrustObject.addContent(incrustContentObject)

        incrustContentObject.addSubContents(...incrustSubContentsObject);
        Object.values(incrustContentObject.subContents).map(subContent=> {
            subContent.setStyle(new Style())
        });

        console.log(this.stylyzer.style)
        incrustContentObject.setStyle(this.stylyzer.style)

        incrustObject.addContent(incrustContentObject)
        console.log(incrustObject)
        debugger;

        return incrustObject
    }

    onClickOnComfirmButtonRegisterModel(active){
        if(active){
            this.stylyzer.$location.styleForm.find('button').on('click.onClickOnComfirmButtonRegisterModel',e => {
                let createdStyle = this.stylyzer.generateStyle();
                let textIncruste =  new TextIncruste();
                textIncruste.setName('incruste2');
                let textContent = new TextIncrusteContent()
                textContent.setStyle(createdStyle);
                textContent.setContent('Exemple de text')
                textIncruste.addContent(textContent);
                this.styleCreatorObservable.notify('zoneCreation', textIncruste)
                debugger;
                $.ajax({
                    type: "GET",
                    url: '/template/stage1/model/register',
                    data: {
                        incrusteStyle : stringify(textIncruste),
                    },
                    success: (encodedNewIncruste)=>{
                        let parsedNewIncruste = JSON.parse(encodedNewIncruste);
                        let newClass = parsedNewIncruste['elements'][0].class;
                        let ZoneContainerTextSelectorTool = this.parentTool.subTools['ZoneContainerTextSelectorTool'];

                        ZoneContainerTextSelectorTool.refreshCssStylesheet();

                        ZoneContainerTextSelectorTool.addStyleSelectorDiv(ZoneContainerTextSelectorTool.$location.container.find('ul'),newClass);

                    },
                });

            })
        }
    }



    buildStylyzer(){
        this.stylyzer = new TextStylyzer(this.$location.container)
        this.stylyzer.setPreviewZone(this.$location.preview)
        this.stylyzer.init();
        this.stylyzer.activeStylyser(true);

        console.log(this.stylyzer)
    }

    onDisactivation(){
        this.onClickOnComfirmButtonRegisterModel(false);
        this.styleCreatorObservable.removeObserver(this.parentTool.styleCreatorObserver)

    }
    onActivation(){
        this.onClickOnComfirmButtonRegisterModel(true);
        this.styleCreatorObservable.addObserver(this.parentTool.styleCreatorObserver)
    }
}

export {ZoneContainerTextStyleCreatorTool}
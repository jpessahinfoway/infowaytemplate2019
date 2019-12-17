import {ZoneContainerPriceEditorSubTool} from "./parent/ZoneContainerPriceEditorSubTool";
import {PriceContent} from "../../../../zoneContents/PriceContent";
import {EuroContent} from "../../../../zoneContents/PriceContent/EuroContent/EuroContent";
import {SeparatorContent} from "../../../../zoneContents/PriceContent/SeparatorContent/SeparatorContent";
import {CentimeContent} from "../../../../zoneContents/PriceContent/CentimeContent/CentimeContent";
import {UniteContent} from "../../../../zoneContents/PriceContent/UniteContent/UniteContent";
import {PriceIncruste} from "../../../../objects/incrustes/priceIncruste/PriceIncruste";
import {UnitePriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/UnitePriceIncrusteContent";
import {EuroPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/EuroPriceIncrusteContent";
import {SeparateurPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/SeparateurPriceIncrusteContent";
import {CentimePriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/CentimePriceIncrusteContent";
import {PriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/PriceIncrusteContent";
import {Incruste} from "../../../../objects/incrustes/Incruste";
import {Zone} from "../../../../Zone";



class ZoneContainerPriceSelectorTool extends ZoneContainerPriceEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de prix';
        this.$location.container = $('.modal.background-editor .left-container #choose-price-style');
        this.$location.listPrices = this.$location.container.find('.list-prices');
        this.$location.comfirm = this.$location.container.find('button.btn.comfirm')
        this.selectedIncrust = null

    }


    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }


    onClickSelectStyle(active){
        if(active){
            this.$location.listPrices.find('.incrust-style-wrapper').on('click.onClickSelectStyle',e => {
                let target = e.currentTarget;
                this.selectedIncrust = this.generateIncrust($(e.currentTarget).get(0),{
                    incrust : {instance: new PriceIncruste(), required : ['id']},
                    incrustElementContent : {instance : new PriceIncusteContent(), required : ['id','className', 'incrustOrder']},
                    incrustElementSubContents : {instance : {
                            unite : new UnitePriceIncrusteContent(),
                            euro: new EuroPriceIncrusteContent(),
                            separator : new SeparateurPriceIncrusteContent(),
                            centime : new CentimePriceIncusteContent()
                    }, required : ['id', 'className' ,'incrustOrder', 'content']}
                });
            })
        }else{
            this.$location.listPrices.find('.incrust-style-wrapper').off('click.onClickSelectStyle')
        }

    }

    onClickOnComfirmSetZonePrice(active){
        if(active){
            this.$location.comfirm.on('click.onClickOnComfirmSetZonePrice',()=>{
                this.parentTool.onComfirmAddPriceToZone(this.selectedIncrust)
            })
        }
    }

    setSelectedPriceToZone(zone){
        if(typeof zone ==='object' && zone instanceof Zone && typeof this.selectedIncrust ==='object' && this.selectedIncrust instanceof Incruste)zone.setZoneContent(zone)
    }

    onClickOnComfirm(){
        this.location.buttons
    }

    onDisactivation(){

    }
    onActivation(){
        this.onClickOnComfirmSetZonePrice(true)
        this.onClickSelectStyle(true)
    }
}

export {ZoneContainerPriceSelectorTool}
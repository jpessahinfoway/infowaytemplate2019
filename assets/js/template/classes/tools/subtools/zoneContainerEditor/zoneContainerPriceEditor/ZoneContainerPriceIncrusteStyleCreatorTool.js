import {TextStylyzer} from "../../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../../TextIncrusteStyle";
import {TextIncruste} from "../../../../objects/incrustes/textIncruste/TextIncruste";
import {TextIncrusteContent} from "../../../../objects/incrustesContents/textIncrusteConents/TextIncrusteContent";
import {ZoneContainerPriceEditorSubTool} from "./parent/ZoneContainerPriceEditorSubTool";
import {PriceIncruste} from "../../../../objects/incrustes/priceIncruste/PriceIncruste";
import {UnitePriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/UnitePriceIncrusteContent";
import {EuroPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/EuroPriceIncrusteContent";
import {SeparateurPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/SeparateurPriceIncrusteContent";
import {CentimePriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/CentimePriceIncrusteContent";
import {ZoneContainerPriceIncrustePriceStyleCreatorTool} from "./ZoneContainerPriceIncrustePriceStyleCreatorTool";
import {ZoneContainerPriceIncrusteRuptureStyleCreatorTool} from "./ZoneContainerPriceIncrusteRuptureStyleCreatorTool";
var stringify = require('json-stringify-safe');



class ZoneContainerPriceIncrusteStyleCreatorTool extends ZoneContainerPriceEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de prix';
        this.$location.container = $('.modal.background-editor .right-container #price-incrust-style-creator');
        this.$location.container.incrustTypeSelectionRadios = this.$location.container.find('form#type-incrust input[type=radio]');
        this.incrustTarget = null;
        this.addSubTools(
            new ZoneContainerPriceIncrustePriceStyleCreatorTool(this.interface,this),
            new ZoneContainerPriceIncrusteRuptureStyleCreatorTool(this.interface,this)
        );
        this.activeCheckedTool()


        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }


    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onChangeOnIncrustTypeSelectionRadioSwitchActivatedTool(active){
        if(active){
            this.$location.container.incrustTypeSelectionRadios.on('change.onChangeOnIncrustTypeSelectionRadioSwitchActivatedTool',this.activeCheckedTool.bind(this))
        }else{
            this.$location.container.incrustTypeSelectionRadios.off('change.onChangeOnIncrustTypeSelectionRadioSwitchActivatedTool')
        }
    }

    activeCheckedTool(){
        console.log(this);
        let checkedRadio = this.$location.container.incrustTypeSelectionRadios.filter((index , incrustTypeSelectionRadio) => $(incrustTypeSelectionRadio).is(':checked'));
        if(checkedRadio.length >0 && typeof this.subTools[checkedRadio[0].dataset.tool] !== 'undefined'){
            Object.values(this.subTools).map(subTool => subTool.activeTool(false));
            let activatedSubTool = this.subTools[checkedRadio[0].dataset.tool];
            activatedSubTool.activeTool(true)
        }
    }

    onDisactivation(){
        this.onChangeOnIncrustTypeSelectionRadioSwitchActivatedTool(false)
    }
    onActivation(){
        this.onChangeOnIncrustTypeSelectionRadioSwitchActivatedTool(true)
    }
}

export {ZoneContainerPriceIncrusteStyleCreatorTool}
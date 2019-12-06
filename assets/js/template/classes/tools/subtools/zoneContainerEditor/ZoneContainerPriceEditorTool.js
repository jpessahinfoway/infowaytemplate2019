import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {TextStylyzer} from "../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../TextIncrusteStyle";
import {ZoneContainerPriceIncrustePriceStyleCreatorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceIncrustePriceStyleCreatorTool";
import {ZoneContainerPriceIncrusteRuptureStyleCreatorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceIncrusteRuptureStyleCreatorTool";
import {ZoneContainerPriceIncrusteStyleCreatorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceIncrusteStyleCreatorTool";
import {ZoneContainerPriceSelectorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceSelectorTool";
import {PriceContent} from "../../../zoneContents/PriceContent";
import {EuroContent} from "../../../zoneContents/PriceContent/EuroContent/EuroContent";
import {SeparatorContent} from "../../../zoneContents/PriceContent/SeparatorContent/SeparatorContent";
import {CentimeContent} from "../../../zoneContents/PriceContent/CentimeContent/CentimeContent";
import {UniteContent} from "../../../zoneContents/PriceContent/UniteContent/UniteContent";
import {MediaContent} from "../../../zoneContents/MediaContent";
/*import {ZoneContainerTextSelectorTool} from "./zoneContainerTextEditor/ZoneContainerTextSelectorTool";
import {ZoneContainerTextStyleCreatorTool} from "./zoneContainerTextEditor/ZoneContainerTextStyleCreatorTool";*/


class ZoneContainerPriceEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.subTools = super.initSubTools(
           //new ZoneContainerTextSelectorTool(this.interface,this),
            new ZoneContainerPriceIncrusteStyleCreatorTool(this.interface,this),
            new ZoneContainerPriceSelectorTool(this.interface,this)
        );

        this.$location.styleLocation = $('');
        this.zonesHTMLToAppendToStyleChoiceContainer = '';
        this.stylyzer = null
        // this.getExistingStyles()
    }


    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onActivation(){
        this.parentTool.templateMiniature.resetMiniature().addZones(['price']);
        this.onComfirmAddPriceToZone()
    }

    onComfirmAddPriceToZone(price){

        if(typeof price !== 'object' && !(price instanceof PriceContent))return ;

        this.parentTool.subTools['TemplateMiniatorizerTool'].miniature.zonesSelected.forEach(zoneSelected => {
            if(price !== null) this.interface.currentTemplate.getZone(zoneSelected).setZoneContent(price)
            console.log(this.interface.currentTemplate.getZone(zoneSelected))
            debugger;
        });
    }

    onDisactivation(){
        if(this.stylyzer !== null){
            this.stylyzer.activeStylyser(false)
        }
    }
}

export {ZoneContainerPriceEditorTool}
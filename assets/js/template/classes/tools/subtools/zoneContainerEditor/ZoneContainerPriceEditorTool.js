import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {TextStylyzer} from "../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../TextIncrusteStyle";
import {ZoneContainerPriceIncrustePriceStyleCreatorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceIncrustePriceStyleCreatorTool";
import {ZoneContainerPriceIncrusteRuptureStyleCreatorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceIncrusteRuptureStyleCreatorTool";
import {ZoneContainerPriceIncrusteStyleCreatorTool} from "./zoneContainerPriceEditor/ZoneContainerPriceIncrusteStyleCreatorTool";
/*import {ZoneContainerTextSelectorTool} from "./zoneContainerTextEditor/ZoneContainerTextSelectorTool";
import {ZoneContainerTextStyleCreatorTool} from "./zoneContainerTextEditor/ZoneContainerTextStyleCreatorTool";*/


class ZoneContainerPriceEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.subTools = super.initSubTools(
           //new ZoneContainerTextSelectorTool(this.interface,this),
          new ZoneContainerPriceIncrusteStyleCreatorTool(this.interface,this)
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


    }
    onDisactivation(){
        if(this.stylyzer !== null){
            this.stylyzer.activeStylyser(false)
        }
    }
}

export {ZoneContainerPriceEditorTool}
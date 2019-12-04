import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {TextStylyzer} from "../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../TextIncrusteStyle";
import {ZoneContainerMediaSelectorTool} from "./zoneContainerMediaEditor/ZoneContainerMediaSelectorTool";
import {ZoneContainerTextSelectorTool} from "./zoneContainerTextEditor/ZoneContainerTextSelectorTool";
import {ZoneContainerTextStyleCreatorTool} from "./zoneContainerTextEditor/ZoneContainerTextStyleCreatorTool";


class ZoneContainerTextEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.subTools = super.initSubTools(
            new ZoneContainerTextSelectorTool(this.interface,this),
            new ZoneContainerTextStyleCreatorTool(this.interface,this)
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

export {ZoneContainerTextEditorTool}
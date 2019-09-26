import {Template} from "./Template.js";
import {TemplateToolBox} from "./TemplateToolBox.js";
import {ZoneCreatorTool} from "./tools/ZoneCreatorTool.js";
import {ZoneDraggerTool} from "./tools/ZoneDraggerTool.js";
import {ZoneRemoverTool} from "./tools/ZoneRemoverTool.js";
import {ZoneResizerTool} from "./tools/ZoneResizerTool.js";

class TemplateModule{

    constructor(){
        this.currentTemplate    =   null
        this.toolBox            =   null
    }

    attachToolBox(){
        this.toolBox = new TemplateToolBox();
        this.toolBox.addTool(new ZoneCreatorTool(this),'fal fa-plus-square');
        this.toolBox.addTool(new ZoneDraggerTool(this),'fal fa-arrows');
        this.toolBox.addTool(new ZoneRemoverTool(this),'fal fa-trash-alt');
        this.toolBox.addTool(new ZoneResizerTool(this),'fal fa-vector-square');
        this.toolBox.addTool(new ZonePriorityManagerTool(this),'fal fa-layer-group');
    }

    createTemplate(name,orientation){
        this.currentTemplate = new Template();
        this.currentTemplate.setOrientation(orientation);
        this.currentTemplate.setName(name);
        this.currentTemplate.show();
    }
}

export {TemplateModule}
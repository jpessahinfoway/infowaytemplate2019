import {Template} from "./Template.js";
import {TemplateToolBox} from "./TemplateToolBox.js";
import {ZoneCreatorTool} from "./tools/ZoneCreatorTool.js";
import {ZoneDraggerTool} from "./tools/ZoneDraggerTool.js";
import {ZoneRemoverTool} from "./tools/ZoneRemoverTool.js";
import {ZoneResizerTool} from "./tools/ZoneResizerTool.js";
import {ZonePriorityManagerTool} from "./tools/ZonePriorityManagerTool.js";
import {ZonePriorityForegroundTool} from "./tools/subtools/ZonePriorityForegroundTool.js";
import {ZonePriorityBellowTool} from "./tools/subtools/ZonePriorityBellowTool.js";
import {ZonePriorityAboveTool} from "./tools/subtools/ZonePriorityAboveTool.js";
import {ZonePriorityBackgroundTool} from "./tools/subtools/ZonePriorityBackgroundTool.js";

class TemplateModule{

    constructor(){
        this.currentTemplate    =   null;
        this.toolBox            =   null;
        this.currentTemplate    =   null;
        this.initActions()
    }

    attachToolBox(){

        this.toolBox = new TemplateToolBox();
        this.toolBox.addTool(new ZoneCreatorTool(this),'fal fa-plus-square');
        this.toolBox.addTool(new ZoneDraggerTool(this),'fal fa-arrows');
        this.toolBox.addTool(new ZoneRemoverTool(this),'fal fa-trash-alt');
        this.toolBox.addTool(new ZoneResizerTool(this),'fal fa-vector-square');
        this.toolBox.addTool(new ZonePriorityManagerTool(this),'fal fa-layer-group');
        this.toolBox.addTool(new ZonePriorityForegroundTool(this),'fal fa-bring-front',this.toolBox.tools['ZonePriorityManagerTool'].instance);
        this.toolBox.addTool(new ZonePriorityBackgroundTool(this),'fal fa-send-back',this.toolBox.tools['ZonePriorityManagerTool'].instance);
        this.toolBox.addTool(new ZonePriorityBellowTool(this),'fal fa-layer-plus',this.toolBox.tools['ZonePriorityManagerTool'].instance);
        this.toolBox.addTool(new ZonePriorityAboveTool(this),'fal fa-layer-minus',this.toolBox.tools['ZonePriorityManagerTool'].instance);
        this.toolBox.activeToolBoxEvents()
    }

    createTemplate(name,orientation){
        this.currentTemplate = new Template();
        this.currentTemplate.setOrientation(orientation);
        this.currentTemplate.setName(name);
        this.currentTemplate.show();
    }

    initActions(){
        this.saveOnClick()
    }

    saveOnClick(){
        $('.template-menu li.save').on('click',()=>{

            let templateDataToImport = {
                name : this.currentTemplate._name,
                attrs : this.currentTemplate._attr
            };
            console.log(templateDataToImport);
            $.ajax({
                type: "GET",
                url: '/template/stage1/register',
                data: {
                    zones : JSON.stringify(this.currentTemplate.getZones()),
                    template : JSON.stringify(templateDataToImport)
                },
                success: function(){
                    console.log('success')
                },
            });
        })
    }
}

export {TemplateModule}
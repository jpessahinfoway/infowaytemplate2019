import {TemplateInterface} from "../TemplateInterface.js";
import {ZoneCreatorTool} from "../tools/ZoneCreatorTool.js";
import {ZoneDraggerTool} from "../tools/ZoneDraggerTool.js";
import {ZoneRemoverTool} from "../tools/ZoneRemoverTool.js";
//import {ZonePriorityManagerTool} from "../tools/ZonePriorityManagerTool.js";
import {ZoneResizerTool} from "../tools/ZoneResizerTool.js";
import {Template} from "../Template.js";

let templateProperties = {name : $('#template__workzone__templateZone').data('n'), format : $('#template__workzone__templateZone').data('f')};

let template = new Template(templateProperties);
template.attachInterface();
template.create();

//let Template = templateInterface.createTemplate(templateProperties);
/*
//On attache la toolBox à l'interface du template
templateInterface.attachToolBox();
templateInterface.toolBox.addTools(new ZoneCreatorTool(templateInterface.template));
templateInterface.toolBox.addTools(new ZoneDraggerTool(templateInterface.template));
templateInterface.toolBox.addTools(new ZoneRemoverTool(templateInterface.template));
templateInterface.toolBox.addTools(new ZonePriorityManagerTool(templateInterface.template));
templateInterface.toolBox.addTools(new ZoneResizerTool(templateInterface.template));
templateInterface.toolBox.activeToolBoxEvents();


*/
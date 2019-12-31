import {TemplateInterface} from "../../interface/classes/TemplateInterface";
import {TemplateTool} from "../../template/classes/tools/parent/TemplateTool";
import {ZoneCreatorTool} from "../../template/classes/tools/ZoneCreatorTool";
import {ZoneDraggerTool} from "../../template/classes/tools/ZoneDraggerTool";
import {ZoneRemoverTool} from "../../template/classes/tools/ZoneRemoverTool";
import {ZoneResizerTool} from "../../template/classes/tools/ZoneResizerTool";
import {ZonePriorityManagerTool} from "../../template/classes/tools/ZonePriorityManagerTool";
import {ZoneZoomOnTool} from "../../template/classes/tools/ZoneZoomOnTool";
import {ZoneInfoDisplayerTool} from "../../template/classes/tools/ZoneInfoDisplayerTool";
import {ZoneDuplicatorTool} from "../../template/classes/tools/ZoneDuplicatorTool";


let templateInterface = new TemplateInterface() ;

templateInterface .createTemplate( 'test' , 'H' );

let toolBox = templateInterface .attachToolBox() ;
let toolsList = [
toolBox.addTool(new ZoneCreatorTool(templateInterface)),
toolBox.addTool(new ZoneDraggerTool(templateInterface)),
toolBox.addTool(new ZoneRemoverTool(templateInterface)),
toolBox.addTool(new ZoneResizerTool(templateInterface)),
toolBox.addTool(new ZonePriorityManagerTool(templateInterface)),
toolBox.addTool(new ZoneZoomOnTool(templateInterface)),
toolBox.addTool(new ZoneInfoDisplayerTool(templateInterface)),
toolBox.addTool(new ZoneDuplicatorTool(templateInterface)),
] ;

let mainToolsMenu = templateInterface.attachToolsMenu('mainToolsMenu', $('#main-toolbox')) ;

toolsList.forEach(tool => {
    if(typeof tool ==='object' && tool instanceof TemplateTool) mainToolsMenu.attachTool(tool)
}) ;

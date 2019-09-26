import {Zone} from './Zone.js';
import {TemplateInterface} from "./TemplateInterface.js";
class Template{
    constructor({name='test',size={width:1500,height:1200},format=false}={}){
        this.name = name;
        this.size = {'width':size.width+'px','height':size.height+'px'}
        if(format && (format === 'H' || format ==='V')){
            this.size = format ==='V'? {width : 720, height:1280} : {width:1280,height : 720}
        }
        this.backgroundColor = 'rgb(225, 237, 240)';
        this.ids = {
            'templateZone' : $('#template__workzone__templateZone')
        }
        this.zones = {};
        this.tools = {};
    }
    addTool(toolToAdd){
        this.tools[toolToAdd.constructor.name]=toolToAdd
    }

    attachInterface(){
        this.interface = new TemplateInterface();
        this.interface.activeTools(this)
        this.interface.activeToolBox(this);
    }

    create(){
        this.ids.templateZone.width(this.size.width)
        this.ids.templateZone.height(this.size.height)
        this.ids.templateZone.css('background-color',this.backgroundColor)
    }

    deleteZoneInTemplate(id){

        this._zones[id].delete();
        delete this._zones[id];
    }

    createNewZone(position={top:0,left:0},size={width:0,height:0}){
        let zoneId = null;
        let zIndex = Object.keys(this.zones).length;
        for(let i=0; i<=Object.keys(this.zones).length+1;i++){
            if(!(i in this.zones)){
                zoneId=i;
                break;
            }
        }
        let zone = new Zone({position:position,size:size});
        zone.create();
        zone.setZIndex(zIndex);
        zone.setIdentificator(zoneId)
        zone.setLocation(this.ids.templateZone,true);
        zone.attachToTemplate(this);
        return zone;
    }
}

export {Template}
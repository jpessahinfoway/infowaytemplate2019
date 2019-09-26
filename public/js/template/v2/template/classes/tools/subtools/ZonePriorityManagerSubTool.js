import {TemplateSubTool} from "../TemplateSubTool.js";

class ZonePriorityManagerSubTool extends TemplateSubTool{
    constructor(template){
        super(template);
        this.$eventLocation=".zone";
    }

    activeTool(boolean,onActivationFunction){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                $('.zone').on('click.'+this.constructor.name,(e)=>{
                    this.currentZone = this.template.zones[$(e.currentTarget).prop('id').match(/[0-9]*$/)[0]];
                    onActivationFunction.bind(this)();
                    this.updateZoneZindex();
                })
            }else if(mode === 'off'){

            }
        })
    }

    filterZonesByZindex(croissant=true){
      return Object.keys(this.template.zones).sort((a,b)=>{return croissant ? this.template.zones[a].zIndex - this.template.zones[b].zIndex : this.template.zones[b].zIndex - this.template.zones[a].zIndex}).map(val=>this.template.zones[val])
    }

    updateZoneZindex(){
        this.filterZonesByZindex().map((zone,index)=>{if(zone.zIndex!==index)zone.setZIndex(index)})
    }

}
export {ZonePriorityManagerSubTool}
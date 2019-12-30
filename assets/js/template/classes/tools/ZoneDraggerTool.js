import {TemplateTool} from './parent/TemplateTool'

class ZoneDraggerTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Déplacer une zone';
        this.$eventLocation.mousedown =  $('body');
        this.$eventLocation.mousemove =  $('body');
        this.$eventLocation.mouseup =  $('body');
        this.workSpace = $('.container-zone')
    }

   activeTool(active){
       super.activeTool(active)
            if(active){
                let newPosition,
                    oldPosition,
                    deplacementValue,
                    currentPosition,
                    currentZone,
                    nextZonePos;

                $('.zone').addClass('draggerModeOn');

                this.$eventLocation.mousedown.on('mousedown.'+this.constructor.name,'.zone',(e)=>{
                    this.activated = true;
                    currentZone = this.interface.currentTemplate.getZone($(e.currentTarget).data('zone'));
                    console.log(currentZone)
                    currentPosition = Object.assign(currentZone.position,{});
                    newPosition = this.getCursorPositionInTemplate(e,this.workSpace);
                    oldPosition = null;

                    this.$eventLocation.mousemove.on('mousemove.'+this.constructor.name,(e) => {
                        if(this.activated){
                                oldPosition = newPosition;
                                newPosition = this.getCursorPositionInTemplate(e,this.workSpace);
                                deplacementValue = {left:newPosition.x-oldPosition.x,top:newPosition.y-oldPosition.y};
                                console.log(deplacementValue);
                                nextZonePos = {left : currentPosition.left + deplacementValue.left, top:currentPosition.top + deplacementValue.top};

                                console.log('current: '+currentPosition.left+ ' + deplacement : '+deplacementValue.left+' = '+nextZonePos.left);
                                console.log('')
                                let positionLimit;
                                if(nextZonePos.left<0)nextZonePos.left=0;
                                if(nextZonePos.top<0)nextZonePos.top=0;

                                if(nextZonePos.left + currentZone.size.width>this.interface.currentTemplate.size.width){
                                    nextZonePos.left= this.interface.currentTemplate.size.width-currentZone.size.width;
                                }
                                if(nextZonePos.top + currentZone.size.height>this.interface.currentTemplate.size.height){
                                    nextZonePos.top=this.interface.currentTemplate.size.height-currentZone.size.height;
                                }
                            Object.values(currentZone.zoneChildrens).map(zone=>{
                                console.log(currentZone.position.top )
                                console.log(nextZonePos.top)
                                let childNewSize = {
                                    top : zone.position.top + ( nextZonePos.top - currentZone.position.top ),
                                    left : zone.position.left + ( nextZonePos.left - currentZone.position.left )
                                }
                                zone.setPosition(childNewSize);
                            })
                            currentZone.setPosition(nextZonePos);
                                console.log(currentZone)
                            currentPosition = nextZonePos
                            //this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:nextZonePos});
                        }
                    })
                });
                $(`${'body'}`).on('mouseup.'+this.constructor.name, (e) => {
                    this.$eventLocation.mousemove.unbind('mousemove.'+this.constructor.name)
                    this.activated = false;
                })
            }
            else{
                $('.zone').removeClass('draggerModeOn');
                this.$eventLocation.mousedown.unbind('mousedown.'+this.constructor.name);
                this.$eventLocation.mousemove.unbind('mousemove.'+this.constructor.name);
                this.$eventLocation.mouseup.unbind('mouseup.'+this.constructor.name);
            }
    }
}

export {ZoneDraggerTool}
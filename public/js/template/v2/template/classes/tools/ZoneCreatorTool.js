import {TemplateTool} from './TemplateTool.js'
class ZoneCreatorTool extends TemplateTool{

    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Ajouter une zone';
        this.$eventLocation.mousedown = $(document);
        this.$eventLocation.mousemove = $(document);
        this.$eventLocation.mouseup = $(document);
        this.zoneStartPosition = null;
        this.zoneLastSize = null;
        this.$zoneInWork = null;
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            console.log('dfgfdgdg');
            if(mode==='on'){
                this.$eventLocation.mousedown.on('mousedown.'+this.constructor.name,(e)=> {

                   if($(e.target).hasClass('bloc-menu'))return;

                    let workZone = $('.container-zone');

                    this.lastMousePosition = {x: e.pageX - workZone.offset().left, y: e.pageY - workZone.offset().top};

                    let cursorPositionInTemplate = this.getCursorPositionInTemplate(e,workZone);

                    this.activated = true;
                    this.zoneStartPosition = cursorPositionInTemplate;
                    
                    Object.keys(
                        this.zoneStartPosition).map(positionKey=>{
                            this.zoneStartPosition[positionKey]<0 ? this.activated=false:''}
                        );
                   
                    this.zoneLastSize = {width : 0, height:0};

                    this.$eventLocation.mousemove.on('mousemove.'+this.constructor.name, (e) => {
                        cursorPositionInTemplate = this.getCursorPositionInTemplate(e,workZone);

                        if(!this.activated && cursorPositionInTemplate.top >= -1 && cursorPositionInTemplate.left <= this.interface.currentTemplate.getSize().width && cursorPositionInTemplate.left >= -1){
                            Object.keys(this.zoneStartPosition).map(positionKey=>this.zoneStartPosition[positionKey]=this.zoneStartPosition[positionKey]<0?0:this.zoneStartPosition[positionKey]);
                            this.activated=true;
                        }
                        if (this.activated) {
                            console.log(this.interface.currentTemplate.getSize())
                            this.zoneLastSize.width =  cursorPositionInTemplate.left>this.interface.currentTemplate.getSize().width?this.interface.currentTemplate.getSize().width- this.zoneStartPosition.left:cursorPositionInTemplate.left- this.zoneStartPosition.left;
                            this.zoneLastSize.height =  cursorPositionInTemplate.top>this.interface.currentTemplate.getSize().height? this.interface.currentTemplate.getSize().height-this.zoneStartPosition.top:cursorPositionInTemplate.top- this.zoneStartPosition.top ;


                            if (!this.$zoneInWork) this.$zoneInWork = this.interface.currentTemplate.createNewZone(this.zoneStartPosition, this.zoneLastSize);
                            else{
                                this.$zoneInWork.setSize({width:this.zoneLastSize.width,height: this.zoneLastSize.height})
                            }
                            //debugger
                        }
                    });
                })
                this.$eventLocation.mouseup.on('mouseup.'+this.constructor.name, (e) => {
                    this.$zoneInWork=null;
                    this.activated = false;
                    this.$eventLocation.mouseup.unbind('mousemove.'+this.constructor.name);
                })
            }else if(mode==='off'){
                this.$eventLocation.mouseup.unbind('mouseup.'+this.constructor.name);
                this.$eventLocation.mousedown.unbind('mousedown.'+this.constructor.name);
                this.$eventLocation.mousemove.unbind('mousemove.'+this.constructor.name);
            }
        })
    }

}

export {ZoneCreatorTool}
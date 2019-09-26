import {TemplateTool} from './TemplateTool.js'
class ZoneCreatorTool extends TemplateTool{

    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Ajouter une zone';
        this.$eventLocation.click = $(document);

       /* this.setIcon('fal fa-plus-square');
        this.setTitle('Ajouter');
        this.$eventLocation=$(document);
        this.$currentWorkZone = null;
        this.lastPosition = null;*/
    }

    /*activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.$eventLocation.on('mousedown.'+this.constructor.name,(e)=> {

                   if($(e.target).hasClass('bloc-menu'))return;


                    this.lastMousePosition = {x: e.pageX - this.workZone.offset().left, y: e.pageY - this.workZone.offset().top};
                    let cursorPositionInTemplate = this.getCursorPositionInTemplate(e,this.workZone);
                    this.activated = true;
                    this.startPosition = cursorPositionInTemplate;
                    Object.keys(this.startPosition).map(positionKey=>{this.startPosition[positionKey]<0?this.activated=false:''}

                        );
                   
                    this.lastSize = {width : 0, height:0};

                    this.$eventLocation.on('mousemove.'+this.constructor.name, (e) => {
                        cursorPositionInTemplate = this.getCursorPositionInTemplate(e,this.workZone)

                        if(!this.activated && cursorPositionInTemplate.top>=-1 && cursorPositionInTemplate.left <=this.template.size.width && cursorPositionInTemplate.left>=-1){
                            Object.keys(this.startPosition).map(positionKey=>this.startPosition[positionKey]=this.startPosition[positionKey]<0?0:this.startPosition[positionKey]);
                            this.activated=true;
                        }
                        if (this.activated) {

                            this.lastSize.width =  cursorPositionInTemplate.left>this.template.size.width?this.template.size.width- this.startPosition.left:cursorPositionInTemplate.left- this.startPosition.left;
                            this.lastSize.height =  cursorPositionInTemplate.top>this.template.size.height? this.template.size.height-this.startPosition.top:cursorPositionInTemplate.top- this.startPosition.top ;


                            if (!this.$currentWorkZone) this.$currentWorkZone = this.template.createNewZone(this.startPosition, this.lastSize);
                            else{
                                this.$currentWorkZone.setSize({width:this.lastSize.width,height: this.lastSize.height})
                            }
                            //debugger
                        }
                    });
                })
                this.$eventLocation.on('mouseup.'+this.constructor.name, (e) => {
                    this.$currentWorkZone=null;
                    this.activated = false;
                    this.$eventLocation.unbind('mousemove.'+this.constructor.name);
                })
            }else if(mode==='off'){
                this.$eventLocation.unbind('click.'+this.constructor.name);
                this.$eventLocation.unbind('mouseup.'+this.constructor.name);
                this.$eventLocation.unbind('mousedown.'+this.constructor.name);
                this.$eventLocation.unbind('mousemove.'+this.constructor.name);
            }
        })
    }*/

}

export {ZoneCreatorTool}
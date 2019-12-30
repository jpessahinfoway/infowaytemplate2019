import {TemplateTool} from './parent/TemplateTool'
class ZoneResizerTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description='Transformer une zone'
        this.$eventLocation.mousemove = $('body');
        this.$eventLocation.mouseup = $('body');
        this.$eventLocation.mousedown = $('body');
        this.currentWorkZone=null;
        this.workSpace = $('.container-zone')
        /*this.iconsArray = [];
        this.size = 5;
        this.backGroundColor = null;
        this.borderStyle = null;*/

    }



    appendResizeButton(){
         Object.keys(this.interface.currentTemplate.getZones()).forEach((templateZoneIndex,iterIndex)=>{
             console.log(templateZoneIndex);
                this.currentWorkZone = this.interface.currentTemplate.getZone(templateZoneIndex);
                this.iconsArray = [];
                this.iconsArray.push($(`<span class="tl" data-position="topLeft" style="top:-2px;left:-2px"></span>`));
                this.iconsArray.push($(`<span class="tr" data-position="topRight" style="top:-2px;right:-2px"></span>`));
                this.iconsArray.push($(`<span class="bl" data-position="bottomLeft" style="bottom:-2px;left:-2px"></span>`));
                this.iconsArray.push($(`<span class="br" data-position="bottomRight" style="bottom:-2px;right:-2px"></span>`));
                this.iconsArray.push($(`<span class="ml" data-position="middleLeft" style="top:50%;left:-2px;transform:translateY(-50%)"></span>`));
                this.iconsArray.push($(`<span class="mr" data-position="middleRight" style="top:50%;right:-2px;transform:translateY(-50%)"></span>`));
                this.iconsArray.push($(`<span class="mb" data-position="middleBottom" style="bottom:-2px;left:50%;transform:translateX(-50%)"></span>`));
                this.iconsArray.push($(`<span class="mt" data-position="middleTop" style="top:-2px;right:50%;transform:translateX(50%)"></span>`));
                this.iconsArray.forEach(icon=>{
                    icon.addClass('zoneResizer');
                    if(this.size !== null)icon.css({ "width" : this.size,"height": this.size});
                    if(this.backGroundColor !== null)icon.css('background-color',this.backGroundColor);
                    if(this.borderStyle !== null)icon.css('border',this.borderStyle);
                    //icon.css('border')

                    this.currentWorkZone.$container.append(icon)
                });
            })
    }

    resizeZoneOnMouseActivity(){
        this.$eventLocation.mousedown.on('mousedown.'+this.constructor,'.zoneResizer',(e)=>{
            console.log('clicked')
            this.activated=true;

            this.lastIconClicked = $(e.currentTarget);

            let zoneId=$(e.currentTarget).parents('.zone').data('zone');

            this.currentWorkZone = this.interface.currentTemplate.getZone(zoneId);

            console.log(this.currentWorkZone)
            let properties = {new : {size:this.currentWorkZone.getSize(),position:this.currentWorkZone.getPosition()}};
            properties.old = properties.new;

            console.log(this.currentWorkZone.$zone)
            console.log(this.workSpace)
            let cursorPosition = {'new':this.getCursorPositionInTemplate(e,this.workSpace),'old':null};


           // let {oldPosition,deplacementValue}=null;

            let deplacementValue=null;

            $(`${'body'}`).on('mousemove.'+this.constructor.name, (e) => {
                console.log('icii')

                    cursorPosition.old = cursorPosition.new;
                    cursorPosition.new = this.getCursorPositionInTemplate(e,this.workSpace);
                    console.log(cursorPosition)

                    deplacementValue = {left:cursorPosition.new.x-cursorPosition.old.x,top:cursorPosition.new.y-cursorPosition.old.y};

                    Object.keys(properties.new)
                        .map(attr=>{Object.keys(properties.new[attr])
                            .map(subAttr=>{if(typeof properties.new[attr][subAttr] === 'number')properties.old[attr][subAttr] = properties.new[attr][subAttr]
                       })});
                   
                    properties.new = {size:false,position:false};


                    switch(this.lastIconClicked.data('position')){
                        case 'topLeft':
                            // $('body').addClass('tl');
                            properties.new.position = {left : properties.old.position.left + deplacementValue.left,top:properties.old.position.top + deplacementValue.top};
                           
                            properties.new.size = {width: properties.old.size.width - deplacementValue.left,height:properties.old.size.height - deplacementValue.top};
                            break;
                        case 'topRight':

                            properties.new.position = {left: false,top:properties.old.position.top+deplacementValue.top};
                            properties.new.size = {width: properties.old.size.width + deplacementValue.left,height:properties.old.size.height-deplacementValue.top};

                            break;
                        case 'bottomLeft':
                            properties.new.position = {left: properties.old.position.left + deplacementValue.left,top:false};
                            properties.new.size = {width: properties.old.size.width - deplacementValue.left,height:properties.old.size.height+deplacementValue.top};
                            break;
                        case 'bottomRight' :
                            properties.new.size = {width: properties.old.size.width + deplacementValue.left,height:properties.old.size.height+deplacementValue.top};
                            break;
                        case 'middleLeft':
                            console.log(properties.old.position.left)
                            console.log(deplacementValue.left)
                            console.log(properties.old.position.left + deplacementValue.left)
                            properties.new.position = {left: properties.old.position.left + deplacementValue.left,top:false};
                            properties.new.size = {width: properties.old.size.width - deplacementValue.left,height:false};
                            break;
                        case 'middleRight':
                            properties.new.size = {width: properties.old.size.width + deplacementValue.left,height:false};
                            break;
                        case 'middleTop':
                            properties.new.size = {width: false,height:properties.old.size.height - deplacementValue.top};
                            properties.new.position = {left: false,top:properties.old.position.top + deplacementValue.top};
                            break;
                        case 'middleBottom':
                            properties.new.size = {width: false,height:properties.old.size.height + deplacementValue.top};
                            break;
                    }


                  /*  if(cursorPosition.new.left<=0){

                    }
                    if(properties.new.position.top<=-1){
                        properties.new.size.height = false;
                        properties.new.position.top=false;
                    }*/


                    if(properties.new.position)this.currentWorkZone.setPosition(properties.new.position);

                    if(properties.new.size)this.currentWorkZone.setSize(properties.new.size);
                   

                    //this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent(properties.new);

            });
        });
        this.$eventLocation.mouseup.on('mouseup',()=>{
            this.$eventLocation.mousemove.unbind('mousemove.'+this.constructor.name)
        })
    }
    activeTool(active){
        super.activeTool(active) ;
            if(active){

                this.appendResizeButton()
                this.resizeZoneOnMouseActivity()
            }else{
                this.$eventLocation.mouseup.unbind('mouseup.'+this.constructor.name);
                this.$eventLocation.mousedown.unbind('mousedown.'+this.constructor.name);
                this.$eventLocation.mousemove.unbind('mousemove.'+this.constructor.name);
                $('.zoneResizer').remove()
            }
    }

}

export {ZoneResizerTool}
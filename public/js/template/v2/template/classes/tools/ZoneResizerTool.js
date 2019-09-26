import {TemplateTool} from './TemplateTool.js'
class ZoneResizerTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description='Transformer une zone'
        this.$eventLocation = $('body');
        /*this.iconsArray = [];
        this.size = 5;
        this.backGroundColor = null;
        this.borderStyle = null;*/

    }



  /*  appendResizeButton(){
        let myPromise = new Promise((resolve)=>{
            Object.keys(this.template.zones).forEach((templateZoneIndex,iterIndex)=>{
                let currentZone = this.template.zones[templateZoneIndex];
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
                   
                    this.template.zones[templateZoneIndex].$zone.append(icon)
                });
                if(iterIndex === Object.keys(this.template.zones).length-1){
                    let zoneRemoverFinderInterval = setInterval(()=>{
                        if(currentZone.$zone.find('.zoneResizer').length===this.iconsArray.length){
                            resolve('icone zone Remover ajouté partout');
                            clearInterval(zoneRemoverFinderInterval);
                        }
                    },100);
                }
            })
        });
        return myPromise;
    }
*/
    /*resizeZoneOnMouseActivity(){
        $(`.${this.$eventLocation}`).on('mousedown.'+this.constructor,(e)=>{
            this.activated=true

            this.lastIconClicked = $(e.currentTarget);

            let zoneId=$(e.currentTarget).parent().prop('id').match(/[0-9]*$/)[0];

            this.$currentWorkZone = this.template.zones[zoneId];

            let properties = {new : {size:this.$currentWorkZone.size,position:this.$currentWorkZone.position}};
            properties.old = properties.new;

            let cursorPosition = {'new':this.getCursorPositionInTemplate(e,this.workZone),'old':null};

           // let {oldPosition,deplacementValue}=null;

            let deplacementValue=null;

            $(`${'body'}`).on('mousemove.'+this.constructor.name, (e) => {

                    cursorPosition.old = cursorPosition.new;
                    cursorPosition.new = this.getCursorPositionInTemplate(e,this.workZone);

                    deplacementValue = {left:cursorPosition.new.left-cursorPosition.old.left,top:cursorPosition.new.top-cursorPosition.old.top};

                    Object.keys(properties.new)
                        .map(attr=>{Object.keys(properties.new[attr])
                            .map(subAttr=>{if(typeof properties.new[attr][subAttr] === 'number')properties.old[attr][subAttr] = properties.new[attr][subAttr]
                       })});
                   
                    properties.new = {size:false,position:false};


                    switch(this.lastIconClicked.data('position')){
                        case 'topLeft':
                            // $('body').addClass('tl');
                            properties.new.position = {left : properties.old.position.left + deplacementValue.left,top:this.$currentWorkZone.position.top + deplacementValue.top};
                           
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


                    if(cursorPosition.new.left<=0){

                    }
                    if(properties.new.position.top<=-1){
                        properties.new.size.height = false;
                        properties.new.position.top=false;
                    }


                 console.log(properties.old.size)
                    if(properties.new.position)this.$currentWorkZone.setPosition(properties.new.position);

                    console.log(properties.new.size)
                    if(properties.new.size)this.$currentWorkZone.setSize(properties.new.size);
                if(cursorPosition.new.left<=0){debugger;}
                    console.log($('#zone-'+this.$currentWorkZone.identificator).width())
                   

                    this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent(properties.new);

            });
        });
        $('body').on('mouseup',()=>{
            $('body').unbind('mousemove.'+this.constructor.name)
        })
    }*/
    /*activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){

                this.appendResizeButton().then(()=>{
                    this.resizeZoneOnMouseActivity()
                })
            }else if(mode === 'off'){
                let $eventLocation = $('.'+this.$eventLocation);
                $eventLocation.remove();
                $(`${'body'}`).unbind('mouseup.'+this.constructor.name);
                $eventLocation.unbind('mousedown.'+this.constructor.name);
                $(`${'body'}`).unbind('mousemove.'+this.constructor.name);

               // $('.'+this.removerIcon.class).remove()
            }
        })
    }*/

}

export {ZoneResizerTool}
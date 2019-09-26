import {TemplateTool} from './TemplateTool.js'
class ZoneRemoverTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.$eventLocation.click = $('.zoneDeleter');
        this.description = 'Supprimer une zone';
        this.removerIcon = {
            name : '<i class="fal fa-times"></i>',
            size : 10,
            position: {top:false,bottom:false,left:false,right:0},
            class:'zoneDeleter'
        }

       
    }

    /*appendCloseButton(){
        var myPromise = new Promise(resolve=>{
            Object.keys(this.template.zones).forEach((zoneIndex,indexIter)=>{
                let currentZone = this.template.zones[zoneIndex];
                let removerIcon = $(this.removerIcon.name);
                removerIcon.css('font-size',this.removerIcon.size+'px');
                removerIcon.css('position','absolute');

                removerIcon.css({'right':this.removerIcon.position.right});
                removerIcon.css('box-shadow','inset 0 0 0 1px');
                removerIcon.css('padding',5);
                removerIcon.addClass(this.removerIcon.class);
                currentZone.$zone.append(removerIcon);
                if(indexIter === Object.keys(this.template.zones).length-1){
                   
                    let zoneDeleterFinderInterval = setInterval(()=>{
                        if(currentZone.$zone.find('.zoneDeleter').length>0){
                            resolve('icone zone Deleter ajouté partout')
                            clearInterval(zoneDeleterFinderInterval);
                        }
                    },100);
                }
            })
        });
        return myPromise;

    }*/

   /* activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.appendCloseButton().then(()=>{
                    $(`.${this.removerIcon.class}`).on('click.'+this.constructor.name,(e)=>{
                        let zoneId=$(e.currentTarget).parent().prop('id').match(/[0-9]*$/)[0];
                       
                    });
                })
            }else if(mode === 'off'){
                $('.'+this.removerIcon.class).remove()
            }
        })
    }*/
}

export {ZoneRemoverTool}
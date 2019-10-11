import {PermanentTool} from "./parent/PermanentTool.js";
import {TemplateTool} from "./parent/TemplateTool.js";

class ZoneZoomIncreaserTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Appliquer un zoom';
        this.$applyZoneOn = $('.container-zone');
        this.currentScale  = this.interface.currentTemplate.getCurrentScale();
        this.$eventLocation.click=this.$applyZoneOn;
        this.$eventLocation.mousemove=this.$applyZoneOn;
        this.$eventLocation.rightclick=this.$applyZoneOn;
        this.toolOn=false;
        this.paused=false
    }

    moveZoomOnMouseMove(){
        this.$eventLocation.mousemove.on('mousemove.'+this.constructor.name, e => {
            if(this.toolOn && !this.paused){
                console.log('ok')
                // Position en X et Y de la souris
                let pageX = e.pageX;
                let pageY = e.pageY;
                // Position en left et top du parent
                let offsetLeft = $('section').offset().left;
                let offsetTop = $('section').offset().top;
                // Width et height du parent
                let width = $('section').width();
                let height = $('section').height();
                // On modifie la propriété 'transform-origin'
                this.$applyZoneOn.css('transform-origin' , (pageX - offsetLeft) / width * 100 + '% ' + (pageY - offsetTop) / height * 100 + '%');
            }
        })
    }

    stopZoomOnRightClick(){
        this.$eventLocation.rightclick.on(`contextmenu.${this.constructor.name}`,()=>{
            this.paused=!this.paused;
            return false;
        })
    }
    updateScale(scale){
        this.interface.currentTemplate.setCurrentScale(scale);
        this.currentScale = scale
    }


    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.currentScale = this.interface.currentTemplate.getCurrentScale();
                this.$eventLocation.click.on(`click.${this.constructor.name}`,()=>{
                    this.toolOn=true;
                    if (this.currentScale.toFixed(1) >= 1.6) {
                        this.updateScale(1.6);
                    }
                    // Sinon, on autorise le zoom
                    else {
                        this.updateScale(this.currentScale+0.2);
                    }
                    this.$applyZoneOn.css('transform', 'scale(' + this.currentScale + ')')

                })
                this.$applyZoneOn.click();
                this.moveZoomOnMouseMove();
                this.stopZoomOnRightClick()
            }
            if(mode==='off'){
                this.toolOn=false;
                this.paused=false;
                this.$eventLocation.rightclick.unbind(`contextmenu.${this.constructor.name}`);
                this.$eventLocation.click.unbind(`click.${this.constructor.name}`);
                this.$eventLocation.mousemove.unbind(`mousemove.${this.constructor.name}`);

            }

        })
    }
}

export {ZoneZoomIncreaserTool}
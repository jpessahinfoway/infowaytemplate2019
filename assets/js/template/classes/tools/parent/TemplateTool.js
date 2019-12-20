class TemplateTool{
    constructor(templateInterface){
        this.interface = templateInterface;
        this.name = this.constructor.name;
      //  this.jq = null;
        this.icon = null;
        this.visibleOnActivation = true;
       
       // this.iconContainer = $(`<span title="${this.title}" class="${this.name}" data-tool="${this.constructor.name}"></span>`);

        this.state = 'disabled';

        this.$eventLocation={};

       // this.workZone = $('#template__workzone__templateZone');
        this.subTools = {};
        this.adaptableIconsInZone = {
            element : null,
            enclosureDiv:'<div class="icon-action-div"></div>',
            position: null,
            class: null
        };

        console.log(this.subTools)
    //    this.activated = false;
    }

    addSubTools(...subTools){
        subTools.map(subTool => this.subTools[subTool.name]=subTool)
    }

    getCursorPositionInTemplate(e,$el) {
        let offsetElement = this.getOffset($el);
        return {x : e.pageX - offsetElement.left,y: e.pageY - offsetElement.top}
    }

    appendIconInZones(){
        this.initOnZoneHoverFocusIcon()
            Object.keys(this.interface.currentTemplate.getZones()).forEach((zoneIndex,indexIter)=>{

                let currentZone              =   this.interface.currentTemplate.getZone(zoneIndex);
                let minSizeValue             =   Math.min(   ...Object.values(  currentZone.getSize()   ));

                let iconsInZones              =   $(this.adaptableIconsInZone.enclosureDiv).append($(this.adaptableIconsInZone.element));

                iconsInZones.find('i').css('font-size',minSizeValue*0.3);

                // removerIcon.css('box-shadow','inset 0 0 0 1px');
                currentZone.$container.append(iconsInZones);
                if(indexIter === Object.keys(this.interface.currentTemplate.getZones()).length-1){

                }
            })
    }

    initOnZoneHoverFocusIcon(){
        $('.zone').on(`mouseover.${this.constructor.name}`,  (e)=> { $(e.currentTarget).find('.icon-action-div i').addClass('active-icon')  });
        $('.zone').on(`mouseout.${this.constructor.name}`,   (e)=>     {    $(e.currentTarget).find('.icon-action-div i').removeClass('active-icon')   })
    }

    getOffset( $el ) {
        let el = $el.get(0)
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

   /* setIcon(iconClass){
        this.icon = $(`<i class="${iconClass}"></i>`)
        this.iconContainer.append(this.icon);
        this.icon.data('eventname',this.constructor.name);
    }*/

    isActivated(){
        return this.state ==='enabled';
    }

    /*setTitle(title){
        this.iconContainer.attr('title',this.title=title)
    }*/

    /*switchState(){
        if(typeof this.state === 'undefined' || (this.state !== 'enabled' && this.state !== 'disabled')){
           
            return;
        }
        if(this.state === 'enabled')this.state = 'disabled';
        else this.state='enabled';
       
        return this.state !== 'disabled';
    }*/

    activeToolDecorator(boolean,functionToExecuteWhenEventIsTriggered){
       
        if(typeof boolean ==='undefined'){
            this.activeToolDecorator(this.switchState());
            return;
        }
        else{
            if(typeof boolean !=='boolean'){
               
                return
            }
        }
        if(typeof this.$eventLocation === 'undefined' || this.$eventLocation== null){
           
        }
        if(boolean){
            this.state = 'enabled';
            //this.activeTool(false);
           if(typeof this.$eventLocation !== 'undefined' && this.$eventLocation!== null ){
              
                   functionToExecuteWhenEventIsTriggered('on')
           }
            this.state = 'enabled';
           
        }else{
            this.state='disabled';
            if(typeof this.$eventLocation !== 'undefined' && this.$eventLocation!== null ){
                functionToExecuteWhenEventIsTriggered('off')
            }
           
           
        }
    }


}

export {TemplateTool}
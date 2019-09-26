class TemplateTool {
    constructor(templateInterface){
        this.interface = templateInterface;
        this.name = this.constructor.name;
      //  this.jq = null;
        this.icon = null;
       
       // this.iconContainer = $(`<span title="${this.title}" class="${this.name}" data-tool="${this.constructor.name}"></span>`);

        this.state = 'disabled';

        this.$eventLocation={};

       // this.workZone = $('#template__workzone__templateZone');
        this.subTools = {};
        console.log(this.subTools)
    //    this.activated = false;
    }

    addSubTool(subTool){
        this.subTools[subTool.constructor.name]=subTool;
        this.subTools[subTool.constructor.name].mainTool = this.subTools[subTool.constructor.name];
    }

    getCursorPositionInTemplate(e,$el) {
        let offsetElement = this.getOffset($el);
        return {left : e.pageX - offsetElement.left,top: e.pageY - offsetElement.top}
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
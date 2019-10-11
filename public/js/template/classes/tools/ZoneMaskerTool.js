import {PermanentTool} from "./parent/PermanentTool.js";

class ZoneMaskerTool extends PermanentTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Masquer les zones';
        this.$eventLocation=$('.zone');
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.interface.isMaskerOn=true;
                $('.zone').addClass('blindmode');
            }
            if(mode==='off'){
                this.interface.isMaskerOn=false;
                $('.zone').removeClass('blindmode');
            }

        })
    }
}

export {ZoneMaskerTool}
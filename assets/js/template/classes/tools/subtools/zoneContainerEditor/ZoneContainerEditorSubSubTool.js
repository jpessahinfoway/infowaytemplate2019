import {PermanentSubTool} from "../../parent/PermanentSubTool";



class ZoneContainerEditorSubSubTool extends PermanentSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = null;

        this.$location = {};


        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean,onActivationFunction=null,onDisactivationFunction=null){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                onActivationFunction.bind(this)();
                if(this.visibleOnActivation)this.$location.container.removeClass('none');
            }else if(mode === 'off'){
                if(onDisactivationFunction !== null)onDisactivationFunction.bind(this)()
                this.$location.container.addClass('none');
                // this.parentTool.zoneCreationObservable.removeObserver(this.zoneCreatorObserver)
            }
        })
    }
}

export {ZoneContainerEditorSubSubTool}
import {TemplateSubTool} from "../../parent/TemplateSubTool";
import _ from 'lodash';

class ZoneContainerEditorSubTool extends TemplateSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);
        this.$location = _.cloneDeep(this.parentTool.$location)
        this.functionToExecuteOnSelectedZone = null;
        this.subTools = {}

    }

    resetSubToolWindowsContainers(){
        this.parentTool.resetWindowContainers();
        //this.$location = _.cloneDeep(this.parentTool.$location)
    }
    onValidateButtonClickApplyOnZonesSelected(active){
        if(active){
          /*  this.$location.window.containers.right.button.validate.on('click.onValidateButtonClickApplyOnZonesSelected',()=>{
                console.log(this.parentTool.zonesSelected)
                this.parentTool.zonesSelected.forEach(indexZoneSelected => {
                    this.functionToExecuteOnSelectedZone(this.interface.currentTemplate.getZone(indexZoneSelected))
                })
            })*/
        }
    }

    initSubTools(...subTools){
        let subToolsObject = {};

        subTools.map(subTool=>subToolsObject[subTool.name] = subTool);

        return subToolsObject
    }

    activeSubTools(active){

        Object.values(this.subTools).forEach(subTool=>subTool.activeTool(active))
    }


    activeTool(boolean,onActivationFunction=null,onDisactivationFunction=null){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                onActivationFunction.bind(this)();
                this.activeSubTools(true)
                this.$location.container.removeClass('none');
            }else if(mode === 'off'){
                this.activeSubTools(false)
                if(onDisactivationFunction !== null)onDisactivationFunction.bind(this)()
                /*this.onValidateButtonClickApplyOnZonesSelected(false)
                this.parentTool.resetZonesSelected();*/

                console.log(this.parentTool.zonesSelected)
               // this.parentTool.zoneCreationObservable.removeObserver(this.zoneCreatorObserver)
            }
        })
    }

}

export {ZoneContainerEditorSubTool}
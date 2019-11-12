import {TemplateSubTool} from "../../parent/TemplateSubTool";
import _ from 'lodash';

class ZoneContainerEditorSubTool extends TemplateSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);
        this.$location = _.cloneDeep(this.parentTool.$location)
        this.functionToExecuteOnSelectedZone = null;

    }

    resetSubToolWindowsContainers(){
        this.parentTool.resetWindowContainers();
        //this.$location = _.cloneDeep(this.parentTool.$location)
    }
    onValidateButtonClickApplyOnZonesSelected(active){
        if(active){
            this.$location.window.containers.right.button.validate.on('click.onValidateButtonClickApplyOnZonesSelected',()=>{
                console.log(this.parentTool.zonesSelected)
                this.parentTool.zonesSelected.forEach(indexZoneSelected => {
                    this.functionToExecuteOnSelectedZone(this.interface.currentTemplate.getZone(indexZoneSelected))
                })
            })
        }
    }


    activeTool(boolean,onActivationFunction=null,onDisactivationFunction=null){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                onActivationFunction.bind(this)();
                this.onValidateButtonClickApplyOnZonesSelected(true)
                this.parentTool.setTitle({containerX : 'right', containerY : 'top'},this.$location.window.containers.right.containers.top.h2.content);
                this.parentTool.setTitle({containerX : 'left', containerY : 'bottom'},this.$location.window.containers.left.containers.bottom.h2.content);
                let containers = this.$location.window.containers;
                Object.keys(containers).map(containerPositionX => {
                    Object.keys(containers[containerPositionX].containers).map(containerPositionY=>{
                        if(containers[containerPositionX].containers[containerPositionY].container.$location !== null && containers[containerPositionX].containers[containerPositionY].container.$location.hasClass('none')){
                            this.parentTool.setActiveContainer({containerX :containerPositionX ,containerY:containerPositionY},containers[containerPositionX].containers[containerPositionY].container.$location)
                        }
                    })
                });
                this.$location.window.$location.removeClass('none');
            }else if(mode === 'off'){
                if(onDisactivationFunction !== null)onDisactivationFunction.bind(this)()
                this.onValidateButtonClickApplyOnZonesSelected(false)
                this.parentTool.resetZonesSelected();
                console.log(this.parentTool.zonesSelected)
               // this.parentTool.zoneCreationObservable.removeObserver(this.zoneCreatorObserver)
            }
        })
    }

}

export {ZoneContainerEditorSubTool}
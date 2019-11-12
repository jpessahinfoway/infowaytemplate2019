import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {BackgroundContent} from "../../../zoneContents/BackgroundContent";



class ZoneContainerBackgroundEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.$location.window.containers.right.containers.top.h2.content = 'Choisissez un fond'
        this.$location.window.containers.left.containers.bottom.h2.content = 'Uploader des médias'

        this.$location.window.containers.left.containers.bottom.container.$location=$('.modal.background-editor .left-container .bottom-left-container #upload-background');
        this.$location.window.containers.right.containers.top.container.$location = $('.modal.background-editor .right-container #list-background');
        this.backgroundSelected = null;

        this.functionToExecuteOnSelectedZone = this.setBackgroundToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onClickOnSelectedBackground(active){
        if(active){
            console.log('icii')
            this.$location.window.containers.right.containers.top.container.$location.on('click.onClickOnSelectedBackground','.media', (e)=> {
                $('.selected-style').removeClass('selected-style');
                $(e.currentTarget).children('.media-selected-sub-layer').addClass('selected-style');
                this.backgroundSelected = $(e.currentTarget).children('img').attr('src').split('/').pop();
            })
        }else{
            if(this.$location.window.containers.right.containers.top.container.$location !== null){
                this.$location.window.containers.right.containers.top.container.$location.off('click.onClickOnSelectedBackground')
            }
        }
    }

    setBackgroundToSelectedZone(zone){
        let background = this.backgroundSelected === null ? null : new BackgroundContent(this.backgroundSelected);
        console.log(background)
        if(background !== null)zone.setZoneBackground(background)

    }

    onDisactivation(){
        this.onClickOnSelectedBackground(false)
        this.backgroundSelected = null;
        this.resetSubToolWindowsContainers()
    }
    onActivation(){
        this.parentTool.templateMiniature.resetMiniature().addZones();
        this.onClickOnSelectedBackground(true)
    }
}

export {ZoneContainerBackgroundEditorTool}
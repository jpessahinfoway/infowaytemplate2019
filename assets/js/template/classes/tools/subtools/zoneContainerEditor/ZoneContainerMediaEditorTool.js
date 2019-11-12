import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {BackgroundContent} from "../../../zoneContents/BackgroundContent";
import {MediaContent} from "../../../zoneContents/MediaContent";



class ZoneContainerMediaEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.$location.window.containers.right.containers.top.h2.content = 'Gestion des médias'
        this.$location.window.containers.right.containers.top.container.$location = $('.modal.background-editor .right-container #list-medias');
        this.backgroundSelected = null;

        this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onClickOnSelectedBackground(active){
        if(active){
            this.$location.window.containers.top.containers.right.container.$location.on('click.onClickOnSelectedBackground','.media', (e)=> {
                $('.selected-background').removeClass('selected-background');
                $(e.currentTarget).addClass('selected-background');
                this.backgroundSelected = $(e.currentTarget).children('img').attr('src').split('/').pop();
            })
        }
    }

    setBackgroundToSelectedZone(zone){
        let background = this.backgroundSelected === null ? null : new BackgroundContent(this.backgroundSelected);
        if(background !== null)zone.setZoneBackground(background)

    }

    onClickOnSelectedMedia(active){
        if(active){
            console.log('activatedd')
            this.$location.window.containers.right.containers.top.container.$location.on('click.onClickOnSelectedMedia','.media', (e)=> {
                $('.selected-style').removeClass('selected-style');
                $(e.currentTarget).children('.media-selected-sub-layer').addClass('selected-style');
                this.mediaSelected = $(e.currentTarget).children('.media-miniature').css('background-image').split('/').pop();
                this.mediaSelected = this.mediaSelected.substring(0,this.mediaSelected.length-2)
                console.log(this.mediaSelected)
            })
        }else{
            console.log('disactivated')
            this.$location.window.containers.right.containers.top.container.$location.off('click.onClickOnSelectedMedia');
        }
    }

    setMediaToSelectedZone(zone){
        let media = this.mediaSelected === null ? null : new MediaContent(this.mediaSelected);
        console.log(media)
        if(media !== null)zone.setZoneContent(media)
    }



    onDisactivation(){
        this.onClickOnSelectedMedia(false)
        this.mediaSelected=null
    }
    onActivation(){
        this.parentTool.templateMiniature.resetMiniature().addZones(['media']);
        this.onClickOnSelectedMedia(true)
    }
}

export {ZoneContainerMediaEditorTool}
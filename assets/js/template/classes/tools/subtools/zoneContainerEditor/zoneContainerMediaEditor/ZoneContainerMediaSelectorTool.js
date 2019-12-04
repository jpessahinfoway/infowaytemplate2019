import {ZoneContainerMediaEditorSubTool} from "./parent/ZoneContainerMediaEditorSubTool";
import {MediaContent} from "../../../../zoneContents/MediaContent";



class ZoneContainerMediaSelectorTool extends ZoneContainerMediaEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Gestion des médias';

        this.$location.container = $('.modal.background-editor .right-container #list-medias');
        this.$location.comfirmButton = this.$location.container.find('button.comfirm')

        this.mediaSelected = null;

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }


    onClickOnSelectedMedia(active){
        if(active){
            console.log('activatedd')
            this.$location.container.on('click.onClickOnSelectedMedia','.media', (e)=> {
                $('.media').removeClass('selected-element');
                $(e.currentTarget).addClass('selected-element');
                let mediaSelected = $(e.currentTarget).children('.media-miniature').css('background-image').split('/').pop();
                mediaSelected = mediaSelected.substring(0,mediaSelected.length-2)
                console.log(mediaSelected)
                this.mediaSelected = mediaSelected === null ? null :  new MediaContent(mediaSelected,`/build/medias/${mediaSelected}`);
            })
        }else{
            this.$location.container.off('click.onClickOnSelectedMedia');
            $('.media').removeClass('selected-element');
            this.mediaSelected = null;
        }
    }

    onClickOnComfirmButton(active){
        if(active){
            this.$location.comfirmButton.on('click.onClickOnComfirmButton',()=>{
                this.parentTool.onComfirmSetZoneMedia(this.mediaSelected)
            })
        }else{
            this.$location.comfirmButton.off('click.onClickOnComfirmButton')
        }
    }



    onDisactivation(){
        this.onClickOnSelectedMedia(false)
        this.onClickOnComfirmButton(false)
        this.mediaSelected=null
    }
    onActivation(){
        this.onClickOnSelectedMedia(true)
        this.onClickOnComfirmButton(true)
      /*  console.log(this)
        console.log(this.parentTool)
        this.parentTool.templateMiniature.resetMiniature().addZones(['media']);
        this.onClickOnSelectedMedia(true)*/
    }
}

export {ZoneContainerMediaSelectorTool}
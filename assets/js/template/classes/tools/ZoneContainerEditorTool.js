import {TemplateTool} from './parent/TemplateTool'
import {ZoneContainerBackgroundEditorTool} from "./subtools/zoneContainerEditor/ZoneContainerBackgroundEditorTool";
import {ZoneContainerTextEditorTool} from "./subtools/zoneContainerEditor/ZoneContainerTextEditorTool";
import {TemplateMiniatorizerTool} from "./TemplateMiniatorizerTool";
import {Observer} from "../pattern/observer/Observer";
import {ZoneContainerMediaEditorTool} from "./subtools/zoneContainerEditor/ZoneContainerMediaEditorTool";


class ZoneContainerEditorTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Definir les propriétés des contenus de la zone';
        this.$eventLocation=$('body');
        this.zonesSelected = [];
        this.$location = {
            window : {
                $location : $('.modal.background-editor'),
                closeIcon : {
                    $location : $('.modal.background-editor .close')
                },
                containers : {
                    left : {
                        $location : null,
                        containers : {
                            top : {
                                h2 : {
                                    $location: $('.miniature h2'),
                                    content : 'Choisissez vos zones',
                                },
                                container : {
                                    $location : $('.miniature .container > div')
                                }

                            },
                            bottom : {
                                h2 : {
                                    $location : $('.modal.background-editor .left-container .bottom-left-container h2'),
                                    content : null
                                },
                                container : {
                                    $location : null
                                },
                                permanent : false
                            }
                        }
                    },
                    right : {
                        $location : null,
                        containers : {
                            top : {
                                h2 : {
                                    $location : $('.right-container h2'),
                                    content : null
                                },
                                container : {
                                    $location : null
                                },
                                permanent : false
                            },
                        },
                        button : {
                             validate : $('.right-container .button-group .btn')
                        }
                    },
                }
            },
        };
        this.activeTool(true)
        this.templateMiniature = null;
        this.buildZoneContainerMiniature();
        this.activatedZonesInMiniatureObserver = null;
        this.addSubTools();
        // this.addSubTools(template);
    }


    resetZonesSelected(){
        this.templateMiniature.resetZonesSelected();
        this.zonesSelected = []
    }

    resetWindowContainers(){
        console.log('iciii')
        Object.keys(this.$location.window.containers).map(windowContainerPosX => {
            Object.keys(this.$location.window.containers[windowContainerPosX].containers).map(windowContainerPosY=>{
                if(! this.$location.window.containers[windowContainerPosX].containers[windowContainerPosY].permanent){
                    if(this.$location.window.containers[windowContainerPosX].containers[windowContainerPosY].container.$location !== null){
                        this.$location.window.containers[windowContainerPosX].containers[windowContainerPosY].container.$location.addClass('none');
                        this.$location.window.containers[windowContainerPosX].containers[windowContainerPosY].container.$location = null;
                    }
                }
            })
        })
    }

    buildZoneContainerMiniature(){

        this.templateMiniature = this.interface.toolBox.tools['TemplateMiniatorizerTool'].instance.createMiniature(this.$location.window.containers.left.containers.top.container.$location,'zoneContainerMiniature');
        this.templateMiniature.append();
        this.templateMiniature.onClickselectZoneInMiniature(true);
        this.activatedZonesInMiniatureObserver = new Observer();
        this.activatedZonesInMiniatureObserver.observerFunction((observer)=>{
            this.zonesSelected = observer.data[0];
        });
        this.templateMiniature.zonesSelectedUpdatedObservable.addObserver(this.activatedZonesInMiniatureObserver);
    }



    setTitle({containerX = null, containerY=null}={}, title=null){
       let titleElements = this.$location.window.containers[containerX].containers[containerY].h2;

        if(title ===null)titleElements.$location.text(titleElements.content);
        else{
            titleElements.$location.text(title)
            titleElements.content = title
        }
    }

    onClickCloseZoneContainerWindow(active){
        if(active){
            this.$location.window.closeIcon.$location.on('click.onClickCloseZoneContainerWindow',()=>{
                this.$location.window.$location.addClass('none')
                this.interface.toolBox.activeToolInToolBox(this.name,false)
            })
        }
    }

    setActiveContainer({containerX = null, containerY=null}={},$container=null){
        if(containerX!==null && containerY !== null && $container.hasClass('none') && typeof this.$location.window.containers[containerX].containers[containerY] !== 'undefined'){
            this.$location.window.containers[containerX].containers[containerY].container.$location = $container
            $container.removeClass('none');
        }
    }


    addSubTools(){
        console.log('jadd ici le tool')
        this.addSubTool(new ZoneContainerBackgroundEditorTool(this.interface,this));
        this.addSubTool(new ZoneContainerTextEditorTool(this.interface,this));
        this.addSubTool(new ZoneContainerMediaEditorTool(this.interface,this));
    }


    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{
            this.onClickCloseZoneContainerWindow(true)
        })
    }
}

export {ZoneContainerEditorTool}
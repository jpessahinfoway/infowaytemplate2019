import {TemplateTool} from './parent/TemplateTool';
import {parse, stringify} from 'flatted/esm';

class ZoneDuplicatorTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description='Dupliquer une zone'
        this.workSpace = $('.container-zone')
        this.currentZone = {
            $zone : null,
            instance : null,
            id : null
        };
        /*this.iconsArray = [];
        this.size = 5;
        this.backGroundColor = null;
        this.borderStyle = null;*/

    }


    duplicateZone(zone){
        Object.keys(zone.position).map( positionKey => {
            zone.position[positionKey]=zone.position[positionKey]+10
        });
        this.interface.currentTemplate.createNewZone({...zone.position}, {...zone.size},zone.type)
    }

    onClickDisplayDuplicateComfirm(){
        $('body').on('click','.zone', (e) => {

            this.currentZone.$zone = $(e.currentTarget);
            this.currentZone.id = this.currentZone.$zone.data('zone');
            this.currentZone.instance = this.interface.currentTemplate.getZone(this.currentZone.id)
            this.duplicateZone(this.currentZone.instance)

            /*let templateInstanceToDecode = Object.assign({},this.interface.currentTemplate);


            Object.values(templateInstanceToDecode._zones).map(zone=>{
                return zone.zoneChildrens = Object.keys(zone.zoneChildrens).map(childKeys=>childKeys)
            });
            console.log(templateInstanceToDecode)

            /*this.interface.currentTemplate.map(val=>{

            })*/


        })
    }
    activeTool(active){
        super.activeTool(active)
            if(active){
                this.onClickDisplayDuplicateComfirm()
            }else{

            }
    }

}

export {ZoneDuplicatorTool}
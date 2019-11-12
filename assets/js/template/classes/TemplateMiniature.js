import {Observable} from "./pattern/observer/Observable";

class TemplateMiniature{
    constructor(template,name,$location){
        this.scale = '0.3';
        this.name = name;
        this.$miniature = null;
        this.template = template;
        this.zonesSelected = [];
        this.$location = {
            miniature : null,
            container : $location
        }
        this.zonesSelectedUpdatedObservable = new Observable()
    }

    createMiniature(){
        this.$miniature =$(`<div class='template-miniature' id='${this.name}'></div>`);
        this.$miniature.width(this.template._attr._size._width  * this.scale);
        this.$miniature.height(this.template._attr._size._height * this.scale);

        return this
    }

    resetMiniature(){
        this.$miniature.empty() ;
        return this;
    }


    addZones(zoneTypeArray=['zone','price','text','media']){
        let zonesHtml = "";
        Object.values(this.template.getZones()).map(zone => {
            if(zoneTypeArray.includes(zone.type)){
                let currentZoneSize = {};
                let currentZonePosition = {}
                Object.keys(zone.size).map(sizeKey => currentZoneSize[sizeKey] = zone.size[sizeKey] * this.scale);
                Object.keys(zone.position).map(positionKey => currentZonePosition[positionKey] = zone.position[positionKey] * this.scale);

                zonesHtml += "<div class='zone-miniature";
                if (zone.type !== 'zone') zonesHtml += ` ${zone.type}-zone`;
                zonesHtml += `' data-type='${zone.type}`;
                zonesHtml += `' data-zone='${zone.identificator}'`;
                zonesHtml += " style='";
                zonesHtml += " position : absolute;";
                zonesHtml += `width : ${currentZoneSize.width}px;`;
                zonesHtml += `height : ${currentZoneSize.height}px;`;
                zonesHtml += `top : ${currentZonePosition.top}px;`;
                zonesHtml += `left : ${currentZonePosition.left}px;`;
                zonesHtml += "'></div>";
                console.log(zonesHtml)
            }

        })

        this.$miniature.html(zonesHtml)
    }

    onClickselectZoneInMiniature(active){
        if(active){
            this.$location.miniature.on('click.onClickselectZoneInMiniature','.zone-miniature',(e)=>{
                let currentZone = $(e.currentTarget)
                console.log(currentZone.data('zone'))
                if(this.zonesSelected.includes(currentZone.data('zone'))) {
                    currentZone.removeClass('selected-miniature')
                    this.zonesSelected.splice(this.zonesSelected.indexOf(currentZone.data('zone')),1);
                    console.log(this.zonesSelected)
                }else{
                    this.zonesSelected.push(currentZone.data('zone'));
                    currentZone.addClass('selected-miniature')
                }
                this.zonesSelectedUpdatedObservable.notify(this.zonesSelected)
            })
        }

    }

    resetZonesSelected(){
        this.zonesSelected = []
    }
    setLocation($location){
        this.$location.container = $location
    }
    append($location=null){
        let location=null
        if($location!==null){
            this.setLocation($location)
            location = $location
        }else{
            console.log(this.$location)
            location=this.$location.container
        }

        location.append(this.$miniature)
        this.$location.miniature = this.$miniature
    }

}

export {TemplateMiniature}
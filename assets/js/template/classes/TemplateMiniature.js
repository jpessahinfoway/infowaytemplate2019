import {Observable} from "./pattern/observer/Observable";

class TemplateMiniature{
    constructor(template,$location){
        this.scale = '0.3';
        this.$miniature = null;
        this.template = template;
        this.zonesSelected = [];
        this.$location = {
            miniature : null,
            container : $location
        }
        this.zonesSelectedUpdatedObservable = new Observable()
        this.onClickselectZoneInMiniature(true);
    }

    createMiniature(){
        this.$miniature =$(`<div class='template-miniature' id='${this.name}'></div>`);
       // this.$miniature.width('calc(100%-10px)');
        this.$miniature.height(this.template._attr.size.height * this.scale);
        return this
    }

    resetSelectedZone(){
        this.zonesSelected = [];
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
                console.log(zone.size)
                Object.keys(zone.size).map(sizeKey => currentZoneSize[sizeKey] = zone.size[sizeKey] * this.scale);
                Object.keys(zone.position).map(positionKey => currentZonePosition[positionKey] = zone.position[positionKey] * this.scale);

                zonesHtml += "<div class='zone-miniature";
                if (zone.type !== 'zone') zonesHtml += ` ${zone.type}-zone`;
                console.log(this.template._attr.size.width)
                console.log(currentZoneSize.width)

                zonesHtml +=
                    `' data-type='${zone.type}`+
                    `' data-zone='${zone.identificator}'` +
                     " style='"+
                     " position : absolute;"+
                     `width :  calc(100% / (${this.template._attr.size.width} / ${zone.size.width}));`+
                     `height : calc(100% / (${this.template._attr.size.height} / ${zone.size.height}));`+
                     `top : calc(${zone.position.top} * (100% / ${this.template._attr._size._height}));`+
                     `left : calc(${zone.position.left} * ( 100% / ${this.template._attr._size._width}));`+
                     "'><div class='wrapper'>&nbsp;</div></div>"
            }

        })

        this.$miniature.html(zonesHtml)
    }

    onClickselectZoneInMiniature(active){
        if(active){
            this.$location.container.on('click.onClickselectZoneInMiniature','.zone-miniature',(e)=>{
                let currentZone = $(e.currentTarget)
                if(this.zonesSelected.includes(currentZone.data('zone'))) {
                    currentZone.removeClass('selected-style--blue')
                    this.zonesSelected.splice(this.zonesSelected.indexOf(currentZone.data('zone')),1);
                    console.log(this.zonesSelected)
                }else{
                    this.zonesSelected.push(currentZone.data('zone'));
                    currentZone.addClass('selected-style--blue')
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
            location=this.$location.container
        }
        console.log(location)

        location.append(this.$miniature)
        this.$location.miniature = this.$miniature
    }

}

export {TemplateMiniature}
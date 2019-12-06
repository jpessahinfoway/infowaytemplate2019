import {ZoneContainerPriceEditorSubTool} from "./parent/ZoneContainerPriceEditorSubTool";
import {PriceContent} from "../../../../zoneContents/PriceContent";
import {EuroContent} from "../../../../zoneContents/PriceContent/EuroContent/EuroContent";
import {SeparatorContent} from "../../../../zoneContents/PriceContent/SeparatorContent/SeparatorContent";
import {CentimeContent} from "../../../../zoneContents/PriceContent/CentimeContent/CentimeContent";
import {UniteContent} from "../../../../zoneContents/PriceContent/UniteContent/UniteContent";



class ZoneContainerPriceSelectorTool extends ZoneContainerPriceEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de prix';
        this.$location.container = $('.modal.background-editor .left-container #choose-price-style');
        this.$location.listPrices = this.$location.container.find('.list-prices')
        this.generatedPrice = new PriceContent()
        this.generatedPrice.addSubContents(
            new EuroContent(),
            new SeparatorContent(),
            new CentimeContent(),
            new UniteContent()
        )

    }

    resetGeneratedPrice(){
        Object.values(this.generatedPrice.subContents).map(subContent => {subContent.value = null ; subContent.className = null })
    }



    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }


    onClickSelectStyle(active){
        if(active){
            this.$location.listPrices.find('.incrust-style-wrapper').on('click.onClickSelectStyle',e => {
                let targetPrice = $(e.currentTarget).find('.price')
                let priceElements = targetPrice.find('[data-type=price]')
                let currentSubContent
                console.log(priceElements)
                this.resetGeneratedPrice()
                priceElements.each((indexPriceElement, priceElement) => {
                    console.log(priceElement)
                    if(typeof (currentSubContent = this.generatedPrice.subContents[priceElement.dataset.subtype]) !== undefined){
                        let className = $(priceElement).attr('class').split(' ').filter(className => className.match(new RegExp(`^${priceElement.dataset.subtype}[0-9].$`)));
                        if(className.length >0)currentSubContent.className = className[0] ;
                        currentSubContent.value = $(priceElement).text();
                        currentSubContent.id = priceElement.dataset.id;
                    }
                });
                console.log(this.parentTool)
            })
        }else{
            this.$location.listPrices.find('.incrust-style-wrapper').off('click.onClickSelectStyle')
        }

    }

    onClickOnComfirmSetZonePrice(active){
        if(active){
            this.$location.container.find('button').on('click.onClickOnComfirmSetZonePrice',()=>{
                this.parentTool.onComfirmAddPriceToZone(this.generatedPrice)
            })
        }
    }

    onDisactivation(){

    }
    onActivation(){
        this.onClickOnComfirmSetZonePrice(true)
        this.onClickSelectStyle(true)
    }
}

export {ZoneContainerPriceSelectorTool}
import {TextStylyzer} from "../../../../TextStylyzer";
import {TextIncrusteStyle} from "../../../../TextIncrusteStyle";
import {TextIncruste} from "../../../../objects/incrustes/textIncruste/TextIncruste";
import {TextIncrusteContent} from "../../../../objects/incrustesContents/textIncrusteConents/TextIncrusteContent";
import {ZoneContainerPriceEditorSubTool} from "./parent/ZoneContainerPriceEditorSubTool";
import {PriceIncruste} from "../../../../objects/incrustes/priceIncruste/PriceIncruste";
import {UnitePriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/UnitePriceIncrusteContent";
import {EuroPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/EuroPriceIncrusteContent";
import {SeparateurPriceIncrusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/SeparateurPriceIncrusteContent";
import {CentimePriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/centimePriceIncrusteContent/CentimePriceIncrusteContent";
import {PriceIncusteContent} from "../../../../objects/incrustesContents/priceIncrustContents/PriceIncusteContent";
var stringify = require('json-stringify-safe');



class ZoneContainerPriceIncrusteRuptureStyleCreatorTool extends ZoneContainerPriceEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.title = 'Choisir un style de rupture';
        this.$location.container = $('.modal.background-editor .right-container #price-incrust-style-creator__rupture');

        this.$location.preview = this.$location.container.find('.preview');

       /* this.$location.incrustTargetRadios = this.$location.container.find('form.select-element-price input[type=radio]');

        this.textIncrusteStyle = null;
        this.stylyzer = this.buildStylyzer();
        this.createdPriceIncrust = this.buildIncrust()
        this.targetedIncrustContents = this.getTargetedIncrustContents();
        debugger;

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;*/
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
        console.log('activated')
    }

   /* getTargetedIncrustContents(){
        let checkedRadio = this.$location.container.find('form.select-element-price input[type=radio]:checked');
        if(checkedRadio.length>0){
            let targetedIncrustContentType = $(checkedRadio).attr('id')
            console.log(targetedIncrustContentType)
            if( targetedIncrustContentType === 'prix')return Object.values(this.createdPriceIncrust['contents'])
            else if(typeof this.createdPriceIncrust['contents'][targetedIncrustContentType] !== 'undefined')return [ this.createdPriceIncrust['contents'][targetedIncrustContentType] ];
            else return []
        }else return []
    };*/

    // onChangeSwitchTargetedIncrusteContents(active){
    //     if(active){
    //         this.$location.incrustTargetRadios.on('change.onChangeSwitchTargetedIncrusteContents', e => {
    //             let $newTarget;
    //
    //             this.targetedIncrustContents.map(incrustContent =>  incrustContent.setStyle(this.stylyzer.generateStyle()) );
    //
    //             let radioSelected = e.currentTarget;
    //             let targetedIncrustContents = $(radioSelected).attr('id');
    //
    //             this.stylyzer.setTarget(this.stylyzer.$location.preview.find(`.${targetedIncrustContents}`))
    //             console.log($(this.stylyzer.$location.target[0]))
    //             $(this.stylyzer.$location.target[0]).focus()
    //
    //             this.targetedIncrustContents = this.getTargetedIncrustContents();
    //
    //
    //         })
    //     }
    // }

    // onClickOnPreviewFocusElement(active){
    //     if(active){
    //         this.stylyzer.$location.preview.on('click.onClickOnPreviewFocusElement', e => {
    //             let target = e.target;
    //             console.log(target)
    //         })
    //     }else{
    //
    //     }
    //
    // }

    // buildIncrust(){
    //     let priceIncruste = new PriceIncruste();
    //     priceIncruste
    //         .addContent(new UnitePriceIncrusteContent())
    //         .addContent(new EuroPriceIncrusteContent())
    //         .addContent(new SeparateurPriceIncrusteContent())
    //         .addContent(new CentimePriceIncusteContent());
    //
    //     return priceIncruste
    // }

    // buildStylyzer(){
    //     let stylyzer = new TextStylyzer(this.$location.container)
    //     stylyzer.setPreviewZone(this.$location.preview)
    //     stylyzer.activeStylyser(true)
    //     /*,{comfirmButtonLocation : null, onSuccess : (style)=>{
    //
    //         //let textIncruste =  new TextIncruste();
    //         let priceIncruste = new PriceIncruste();
    //
    //         priceIncruste.setName('priceincruste1');
    //         priceIncruste
    //             .addContent(new UnitePriceIncrusteContent())
    //             .addContent(new EuroPriceIncrusteContent())
    //             .addContent(new SeparateurPriceIncrusteContent())
    //             .addContent(new CentimePriceIncusteContent());
    //         this.targetedIncrustContents = Object.values(priceIncruste.contents);
    //
    //
    //
    //         let priceContent = new TextIncrusteContent()
    //         textContent.setStyle(style);
    //         textIncruste.addContent(textContent)
    //
    //         $.ajax({
    //             type: "GET",
    //             url: '/template/stage1/model/register',
    //             data: {
    //                 incrusteStyle : stringify(textIncruste),
    //             },
    //             success: (encodedNewIncruste)=>{
    //                 console.log(encodedNewIncruste)
    //                 let parsedNewIncruste = JSON.parse(encodedNewIncruste);
    //                 let newClass = parsedNewIncruste['elements'][0].name;
    //
    //                 console.log(this.parentTool.subTools)
    //                 let ZoneContainerTextSelectorTool = this.parentTool.subTools['ZoneContainerTextSelectorTool'];
    //
    //                 ZoneContainerTextSelectorTool.refreshCssStylesheet()
    //                 ZoneContainerTextSelectorTool.addStyleSelectorDiv(ZoneContainerTextSelectorTool.$location.container.find('ul'),newClass);
    //
    //             },
    //         });
    //
    //     }})*/
    //     return stylyzer
    // }

    onDisactivation(){

    }
    onActivation(){
        // this.onChangeSwitchTargetedIncrusteContents(true)
        // this.onClickOnPreviewFocusElement(true)
    }
}

export {ZoneContainerPriceIncrusteRuptureStyleCreatorTool}
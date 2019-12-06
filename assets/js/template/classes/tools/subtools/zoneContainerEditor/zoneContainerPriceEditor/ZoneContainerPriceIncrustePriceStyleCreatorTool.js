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



class ZoneContainerPriceIncrustePriceStyleCreatorTool extends ZoneContainerPriceEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);
        this.title = 'Choisir un style de prix';
        this.$location.container = $('.modal.background-editor .right-container #price-incrust-style-creator__price');
        this.$location.preview = this.$location.container.find('.preview');
        this.$location.selectElementPriceForm = this.$location.container.find('.select-element-price');
        this.textIncrusteStyle = null;
        this.stylyzer = this.buildStylyzer();
        this.createdPriceIncrust = this.buildIncrust()
        this.targetedIncrustContents = Object.values(this.createdPriceIncrust['contents'])
        this.focusCheckedIncrustElement()

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    focusCheckedIncrustElement() {
        let checkedRadio = this.$location.selectElementPriceForm.find('input[type=radio]:checked');
        if (checkedRadio.length > 0) {
            let targetedIncrustContentType = $(checkedRadio).attr('id');
            this.$location.preview.find(`.incrust-element[data-type=${targetedIncrustContentType}]`).focus()
        }
    }



    onChangeSwitchTargetedIncrusteContents(active){
       if(active){
           this.$location.selectElementPriceForm.find('input[type=radio]').on('change.onChangeSwitchTargetedIncrusteContents', e => {
               console.log(this.stylyzer.generateStyle());
               this.targetedIncrustContents.map(targetedIncrustContent=>targetedIncrustContent.setStyle(this.stylyzer.generateStyle()))
               console.log(this.targetedIncrustContents)
               this.focusCheckedIncrustElement()
            })
       }else{
           this.$location.selectElementPriceForm.find('input[type=radio]').off('change.onChangeSwitchTargetedIncrusteContents')
       }
    }

    onFocusIncrustRefreshTarget(active) {
        if(active){
            this.$location.container.find('.incrust-element').on('focus.onFocusIncrustRefreshTarget',e => {
                let incrustTarget = e.currentTarget;
                let incrustTargetType = e.currentTarget.dataset.type;
                this.$location.container.find('.focused-element').removeClass('focused-element');
                $(incrustTarget).addClass('focused-element');
                if( incrustTargetType === 'prix'){
                    this.targetedIncrustContents = Object.values(this.createdPriceIncrust['contents'])
                    incrustTarget  = this.$location.preview.eq(0)
                }
                else if(typeof this.createdPriceIncrust['contents'][incrustTargetType] !== 'undefined')this.targetedIncrustContents =  [ this.createdPriceIncrust['contents'][incrustTargetType] ];
                else this.targetedIncrustContents= []

                this.stylyzer.setTarget($(incrustTarget))

                this.recoveryPropertiesElement(incrustTargetType)
            })
        }else{
            this.$location.container.find('.incrust-element').off('focus.onFocusIncrustRefreshTarget')
        }
    }

    recoveryPropertiesElement(type) {
        // Cible l'élément
        let element = this.$location.container.find(`.incrust-element[data-type=${type}]`).get(0);
        console.log(element)
        // Ensemble des propriétés CSS
        let style = element.style
        // Propriétés CSS de l'incruste
        let display = style.display == 'none' ? true : false
        let rotate = style.transform != '' ? style.transform.replace(/[^\d]/g, "") : 0
        let fontSize = parseInt(style.fontSize.split('px')[0])
        let bold = style.fontWeight == 'bold' ? true : false
        let fontStyle = style.fontStyle == 'italic' ? true : false
        let color = style.color
        let backgroundColor = style.backgroundColor != '' ? style.backgroundColor : '#000000'
        $('#form-create-price-incrust #font-family-price').val(style.fontFamily)
        $('#form-create-price-incrust #color-price').val(color)
        $('#form-create-price-incrust #background-color-price').val(backgroundColor)
        $('#form-create-price-incrust #font-size-price').val(fontSize)
        $('#form-create-price-incrust #rotate-price').val(rotate)
        $('#form-create-price-incrust #bold-price').prop('checked', bold)
        $('#form-create-price-incrust #italic-price').prop('checked', fontStyle)
        $('#form-create-price-incrust #none').prop('checked', display)
        // Pour la propriété 'text-decoration'
        let radios = $('#form-create-price-incrust .radio').find('input')
        // Ensemble des cases à cocher pour la propriété
        $.each(radios, (index, radio) => {
            // On active la case à cocher correspondant à la valeur
            if (style.textDecoration == $(radio).val()) {
                $(radio).prop('checked', true)
            }
        })
    }

    buildIncrust(){
        let priceIncruste = new PriceIncruste();
        priceIncruste
            .addContent(new UnitePriceIncrusteContent())
            .addContent(new EuroPriceIncrusteContent())
            .addContent(new SeparateurPriceIncrusteContent())
            .addContent(new CentimePriceIncusteContent());

        return priceIncruste
    }


    onClickOnComfirmRegisterModel(active){
        if(active){
            this.$location.container.find('button.btn.comfirm').on('click.onClickOnComfirmRegisterModel',e => {
                //let textIncruste =  new TextIncruste();


                this.createdPriceIncrust.setName('priceincruste1');
                Object.keys(this.createdPriceIncrust['contents']).map(contentType => {
                    let incrustElement = this.$location.preview.find(`*[data-type=${contentType}]`);
                    this.createdPriceIncrust['contents'][contentType].content=incrustElement.text()
                   // this.createdPriceIncrust['contents'][contentType]
                })
                console.log(this.createdPriceIncrust)
                debugger;

                $.ajax({
                    type: "GET",
                    url: '/template/stage1/model/register',
                    data: {
                        incrusteStyle : stringify(this.createdPriceIncrust),
                    },
                    success: (encodedNewIncruste)=>{
                        console.log(encodedNewIncruste)
                        let parsedNewIncruste = JSON.parse(encodedNewIncruste);
                        let newClass = parsedNewIncruste['elements'][0].name;

                        console.log(this.parentTool.subTools)
                        let ZoneContainerTextSelectorTool = this.parentTool.subTools['ZoneContainerTextSelectorTool'];

                        ZoneContainerTextSelectorTool.refreshCssStylesheet()
                        ZoneContainerTextSelectorTool.addStyleSelectorDiv(ZoneContainerTextSelectorTool.$location.container.find('ul'),newClass);

                    },
                });
            })
        }else{

        }

    }



    buildStylyzer(){
        let stylyzer = new TextStylyzer(this.$location.container)
        stylyzer.setPreviewZone(this.$location.preview)
        stylyzer.activeStylyser(true);
            /*,{comfirmButtonLocation : null, onSuccess : (style)=>{

                //let textIncruste =  new TextIncruste();
                let priceIncruste = new PriceIncruste();

                priceIncruste.setName('priceincruste1');
                priceIncruste
                    .addContent(new UnitePriceIncrusteContent())
                    .addContent(new EuroPriceIncrusteContent())
                    .addContent(new SeparateurPriceIncrusteContent())
                    .addContent(new CentimePriceIncusteContent());
                this.targetedIncrustContents = Object.values(priceIncruste.contents);



                let priceContent = new TextIncrusteContent()
                textContent.setStyle(style);
                textIncruste.addContent(textContent)

                $.ajax({
                    type: "GET",
                    url: '/template/stage1/model/register',
                    data: {
                        incrusteStyle : stringify(textIncruste),
                    },
                    success: (encodedNewIncruste)=>{
                        console.log(encodedNewIncruste)
                        let parsedNewIncruste = JSON.parse(encodedNewIncruste);
                        let newClass = parsedNewIncruste['elements'][0].name;

                        console.log(this.parentTool.subTools)
                        let ZoneContainerTextSelectorTool = this.parentTool.subTools['ZoneContainerTextSelectorTool'];

                        ZoneContainerTextSelectorTool.refreshCssStylesheet()
                        ZoneContainerTextSelectorTool.addStyleSelectorDiv(ZoneContainerTextSelectorTool.$location.container.find('ul'),newClass);

                    },
                });

            }})*/
            return stylyzer
    }

    onDisactivation(){
    this.onFocusIncrustRefreshTarget(false)
    }
    onActivation(){
        this.onClickOnComfirmRegisterModel(true)
        this.onChangeSwitchTargetedIncrusteContents(true)
        this.onFocusIncrustRefreshTarget(true)
    }
}

export {ZoneContainerPriceIncrustePriceStyleCreatorTool}
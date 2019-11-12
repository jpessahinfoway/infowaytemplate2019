import { Style } from "./Style";
import {StyleProperty} from "./StyleProperty";

class TextStylyzer{
    constructor($location){
        let transform = new StyleProperty({name : 'transform'})
        this.$location = {
            styleForm : $location,
            preview   : null
        };
        this.styles = {
            textAlign : {
                $location : this.$location.styleForm.find('form input[name="text-align-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'text-align',value:this.$location.styleForm.find('form input[name="text-align-text"]').val()}),
                defaultValue:'center',
            },
            textDecoration : {
                $location : this.$location.styleForm.find('form input[name="text-decoration-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'text-decoration',value:this.$location.styleForm.find('form input[name="text-decoration-text"]').val()}),
                defaultValue:'none',
            },
            fontWeight : {
                $location : this.$location.styleForm.find('form input[name="font-weight-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-weight',value:this.$location.styleForm.find('form input[name="font-weight-text"]').val()}),
                defaultValue:'normal',
            },
            fontStyle : {
                $location : this.$location.styleForm.find('form input[name="font-style-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-style',value:this.$location.styleForm.find('form input[name="font-style-text"]').val()}),
                defaultValue:'normal',
            },
            fontFamily : {
                $location : this.$location.styleForm.find('form select[name="font-family-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-family',value:this.$location.styleForm.find('form select[name="font-family-text"]').val()}),
                defaultValue:'Arial',
                cssTag : 'font-family',
            },
            fontSize : {
                $location : this.$location.styleForm.find('form input[name="font-size-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-size',value:this.$location.styleForm.find('form input[name="font-size-text"]').val(),unity:'px'}),
                defaultValue:30,
            },
            orientation : {
                $location : this.$location.styleForm.find('form input[name="rotate-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'rotate',value:this.$location.styleForm.find('form input[name="rotate-text"]').val(),unity:'deg',before:'(',after:')', parentProperty: transform}),
                defaultValue:0,
            },
            color : {
                $location : this.$location.styleForm.find('form input[name="color-text"]'),
                active:false,
                styleProperty: new StyleProperty({name:'color',value:this.$location.styleForm.find('form input[name="color-text"]').val()}),
                defaultValue:'black',
            },

        },
        console.log(this.styles.textAlign.$location)
    }


    generateStyleOnClick(active,comfirmButtonLocation=null, onSuccess=null, onError=null){
        if(active){
            comfirmButtonLocation.on('click.generateStyleOnClick',(e)=>{
                let styles = Object.values(this.styles)
                if(styles.length >0){
                    let style = new Style()
                    style.hydrate(
                        styles.map(styleProperty=> {
                            if(styleProperty.active)return styleProperty.styleProperty.isSubProperty() ? styleProperty.styleProperty.parentProperty : styleProperty.styleProperty;
                        })
                    )
                    console.log(style)
                    onSuccess(style)
                }
            })
        }else{
            comfirmButtonLocation.off('click.generateStyleOnClick')
        }
    }

    activeStylyser(active,{comfirmButtonLocation =null, onSuccess = null, onError = null } = {}){
        if(comfirmButtonLocation === null)comfirmButtonLocation = this.$location.styleForm.find('button')
        console.log(comfirmButtonLocation)
        this.generateStyleOnClick(active,comfirmButtonLocation,onSuccess,onError);
        this.activeStyleFormEvents(active)
    }

    setPreviewZone($previewLocation){
        this.$location.preview = $previewLocation
    }

    activeStyleFormEvents(active){
        if(active){
            Object.keys(this.styles).map(styleProperty=>{
                this.styles[styleProperty].active = true
                this.styles[styleProperty].$location.on('change',(e) => {
                    let cssValue;
                   if( ( $(e.currentTarget).is('input[type=radio]') || $(e.currentTarget).is('input[type=checkbox]') ) && ( !$(e.currentTarget).is(':checked') &&  !$(e.currentTarget).is(':selected') ) ){
                       this.styles[styleProperty].styleProperty.value = this.styles[styleProperty].defaultValue
                       cssValue = this.styles[styleProperty].styleProperty.value;
                   }else{
                       cssValue = this.styles[styleProperty].styleProperty.value =  $(e.currentTarget).val();
                   }
                   this.styles[styleProperty].styleProperty.buildPropertyWritting()
                    if(this.styles[styleProperty].styleProperty.isSubProperty()){
                        console.log(this.styles[styleProperty].styleProperty.parentProperty.buildPropertyWritting())
                        console.log(this.styles[styleProperty].styleProperty.parentProperty)
                    }
                    this.$location.preview.children('p').css(this.styles[styleProperty].styleProperty.name,this.styles[styleProperty].styleProperty.value)
                })
            })
        }else{
            this.styles.textAlign.$location.off('change')
        }
    }
}

export {TextStylyzer}
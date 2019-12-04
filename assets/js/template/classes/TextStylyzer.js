import { Style } from "./Style";
import {StyleProperty} from "./StyleProperty";

class TextStylyzer{
    constructor($location){

        let transform = new StyleProperty({name : 'transform'})

        this.$location = {
            styleForm : $location,
            preview   : null,
            target : null
        };

        this.styles = {
            textAlign : {
                $location : this.$location.styleForm.find('form input[data-type="text-align"]'),
                active:false,
                styleProperty: new StyleProperty({name:'text-align',value:this.$location.styleForm.find('form input[data-type="text-align"]').val()}),
                defaultValue:'center',
            },
            textDecoration : {
                $location : this.$location.styleForm.find('form input[data-type="text-decoration"]'),
                active:false,
                styleProperty: new StyleProperty({name:'text-decoration',value:this.$location.styleForm.find('form input[data-type="text-decoration"]').val()}),
                defaultValue:'none',
            },
            fontWeight : {
                $location : this.$location.styleForm.find('form input[data-type="font-weight"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-weight',value:this.$location.styleForm.find('form input[data-type="font-weight"]').val()}),
                defaultValue:'normal',
            },
            fontStyle : {
                $location : this.$location.styleForm.find('form input[data-type="font-style"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-style',value:this.$location.styleForm.find('form input[data-type="font-style"]').val()}),
                defaultValue:'normal',
            },
            fontFamily : {
                $location : this.$location.styleForm.find('form select[data-type="font-family"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-family',value:this.$location.styleForm.find('form select[data-type="font-family"]').val()}),
                defaultValue:'Arial',
                cssTag : 'font-family',
            },
            fontSize : {
                $location : this.$location.styleForm.find('form input[data-type="font-size"]'),
                active:false,
                styleProperty: new StyleProperty({name:'font-size',value:this.$location.styleForm.find('form input[data-type="font-size"]').val(),unity:'px'}),
                defaultValue:30,
            },
            orientation : {
                $location : this.$location.styleForm.find('form input[data-type="rotate"]'),
                active:false,
                styleProperty: new StyleProperty({name:'rotate',value:this.$location.styleForm.find('form input[data-type="rotate"]').val(),unity:'deg',before:'(',after:')', parentProperty: transform}),
                defaultValue:0,
            },
            color : {
                $location : this.$location.styleForm.find('form input[data-type="color"]'),
                active:false,
                styleProperty: new StyleProperty({name:'color',value:this.$location.styleForm.find('form input[data-type="color"]').val()}),
                defaultValue:'black',
            },

        }

    }


    generateStyle(){

        let styles = Object.values(this.styles);

                if(styles.length >0) {
                    let style = new Style()
                    style.hydrate(
                        styles.map(styleProperty => {
                            if (styleProperty.active) return styleProperty.styleProperty.isSubProperty() ? styleProperty.styleProperty.parentProperty : styleProperty.styleProperty;
                        })
                    );
                    return style;
                }else return null
    }



    activeStylyser(active){
        this.activeStyleFormEvents(active)
    }

    setPreviewZone($previewLocation){
        this.$location.preview = $previewLocation
        this.$location.target = $previewLocation.find('*');
    }
    setTarget($target){
        this.$location.target = $target
    }

    activeStyleFormEvents(active){
        if(active){
            Object.keys(this.styles).map(styleProperty=>{
                let currentProperty = this.styles[styleProperty]
                currentProperty.active = true

                currentProperty.$location.on('change',(e) => {
                    console.log(this)
                    let cssValue;
                   if( ( $(e.currentTarget).is('input[type=radio]') || $(e.currentTarget).is('input[type=checkbox]') ) && ( !$(e.currentTarget).is(':checked') &&  !$(e.currentTarget).is(':selected') ) ){
                       currentProperty.styleProperty.value = currentProperty.defaultValue
                       cssValue = currentProperty.styleProperty.value;
                   }else{
                       cssValue = currentProperty.styleProperty.value =  $(e.currentTarget).val();
                   }
                   console.log(cssValue)
                    console.log(currentProperty)
                    currentProperty.styleProperty.buildPropertyWritting()
                    console.log(currentProperty)

                    let propertyToApply = currentProperty.styleProperty.isSubProperty()?currentProperty.styleProperty.parentProperty : currentProperty.styleProperty

console.log(propertyToApply)

                    this.$location.target.css(propertyToApply.name,propertyToApply.propertyWritting)
                })
            })
        }else{
            this.styles.textAlign.$location.off('change')
        }
    }
}

export {TextStylyzer}

class ChoiceDiv{
    constructor(){
        this.choiceLabel= null;
        this.text=null;
        this.$elements      =
            {
                choiceZone   : $('#choice-background'),
                labelZone    : $('.choice-window__label p'),
                textZone     : $('.choice-window__content p'),
                button    : {
                    yes : $('button#choice-window__choice--yes'),
                    no  : $('button#choice-window__choice--no')
                }
            }
    }

        setLabel(label) {
            this.choiceLabel = label
            this.$elements.labelZone.text(label)
        }

        setText(text) {
            this.text = text;
            this.$elements.textZone.text(text)
        }

        show(){
            this.$elements.choiceZone.fadeIn()
        }

        hide(){
            this.$elements.choiceZone.fadeOut()
        }

        onYes(success){
        console.log(this.$elements.button.yes)
            this.$elements.button.yes.on(`click.${this.constructor.name}`,(e)=>{
                e.preventDefault();
                success();
                this.hide()
            })
        }

        onNo(success){
            this.$elements.button.no.on(`click.${this.constructor.name}`,(e)=>{
                e.preventDefault();
                success();
                this.hide()
            })
        }

        desactive(){
            this.$elements.button.yes.unbind(`click.${this.constructor.name}`);
            this.$elements.button.no.unbind(`click.${this.constructor.name}`);
        }
        // this.iconContainer=$(`<span title="${this.title}" class="${this.name}" data-subtool="${this.constructor.name}"></span>`);


}

export {ChoiceDiv}
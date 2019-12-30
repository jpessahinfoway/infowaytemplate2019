
class ChoiceDiv{
    constructor(){
        this.choiceLabel= null;
        this.textHTML='';
        this.events = {
            onYes : null,
            onNo: null
        };
        this.$elements      =
            {
                choiceZone   : $('#choice-background'),
                labelZone    : $('.choice-window__label p'),
                textZone     : $('.choice-window__content p'),
                button    : {
                    yes : $('button#choice-window__choice--yes'),
                    no  : $('button#choice-window__choice--no')
                },
                closeIcon :$('#choice-background .choice-window__label .choice-window__label__close')
            }
        this.onClickCloseWindow(true)
    }

        onClickCloseWindow(active) {
            if(active){
                this.$elements.closeIcon.on('click.onClickCloseWindow',() => {
                    this.hide()
                })
            }else{

            }

        }
        setLabel(label) {
            this.choiceLabel = label
            this.$elements.labelZone.text(label)
        }

        addText(text) {
            this.textHTML += text;
            this.$elements.textZone.html(text)
        }


        addTextLine(text){
            this.textHTML += '<br>' + text;
            this.$elements.textZone.html(this.textHTML)
        }

        lineBreak(){
            this.textHTML+= '<br>';
            this.$elements.textZone.html(this.textHTML);
        }

        show(){
        this.$elements.button.yes.on(`click.${this.constructor.name}`,(e)=>{
            e.preventDefault();
            this.events.onYes();
            this.hide()
        });this.$elements.button.no.on(`click.${this.constructor.name}`,(e)=>{
                e.preventDefault();
                this.events.onNo();
                this.hide()
            });


            this.$elements.choiceZone.fadeIn()
        }

        hide(){
            this.$elements.choiceZone.fadeOut()
            this.desactive()
            this.textHTML = ''
            console.log(this.textHTML)
        }

        onYes(success){
        this.events.onYes = success

        }

        onNo(success){
        this.events.onNo = success;
        }

        desactive(){
            this.$elements.button.yes.unbind(`click.${this.constructor.name}`);
            this.$elements.button.no.unbind(`click.${this.constructor.name}`);
        }
        // this.iconContainer=$(`<span title="${this.title}" class="${this.name}" data-subtool="${this.constructor.name}"></span>`);


}

export {ChoiceDiv}
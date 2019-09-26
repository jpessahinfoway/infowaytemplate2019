class TemplateMenu{
    constructor(){
        this.$newTemplateButton = $('#template .workzone #creation-menu  .newButton')
        this.$loadTemplateButton = $('#template .workzone #creation-menu  .loadButton')
    }

    init(){
       
       
        this.events('DisplayCreateTemplateDivOnClick')
        this.events('createTemplateOnClick')
        this.events('displayImportTemplateDivOnClick')
        this.events('importTemplateOnClick')
    }
    events(eventName){
        switch(eventName){
            case 'DisplayCreateTemplateDivOnClick' :
                this.$newTemplateButton.on('click',(e)=>{
                    e.preventDefault()
                    this.buildNewTemplateDiv()
                   
                });
                break;
            case 'createTemplateOnClick' :
                $('body').on('click','#validTemplateCreation',(e)=>{

                    e.preventDefault()
                    window.location.href = "http://localhost:8000/template/create";
                   
                })
                break;
            case 'displayImportTemplateDivOnClick' :
                this.$loadTemplateButton.on('click',(e)=>{
                    e.preventDefault()
                    this.buildImportTemplateDiv()
                   
                })
                break;
            case 'importTemplateOnClick' :
                $('body').on('click','#validTemplateImport',(e)=>{
                    e.preventDefault()
                   
                })
                break;
        }
    }

    fillCreationMenuSubDiv(h1, content){
        return Promise.resolve($('#sub_action_menu_window_label h1').text(h1)).then(()=>{
            return $('#sub .window_body').append(content);
        })
    }

    buildImportTemplateDiv(){
        let fillCreationMenuSubContent =
            $('<div id="name_select_div">'+
                '<label for="name_input_element">Nom du template</label>'+
                '<span class="custom_select custom_select_white">'+
                '<select type="text" id="name_select_element" class="custom_select_selected custom_select_selected_white">'+
                '<option>Choix du template à charger</option>'+
                '</select>'+
                '</span>'+
                '</div>'+
                '<a href="#" id="validTemplateImport" class="button">Chargement du template</a>');
        this.fillCreationMenuSubDiv('Importer un Template', fillCreationMenuSubContent).then(()=>{
            $('#template .workzone #sub').fadeIn('fast')
        })

    }

    buildNewTemplateDiv(){
        let fillCreationMenuSubContent =
            $('<div id="name_input_div">'+
                '<label for="name_input_element">Nom du template</label>'+
                '<input type="text" id="name_input_element">'+
            '</div>'+
            '<div id="format_input_div">'+
                '<p>Format</p>'+
                '<label class="radio_label">Vertical</label>'+
                '<div class="radio_style_1">'+
                    '<div class="radio_container">'+
                        '<input type="radio" id="V" name="format_input_element" value="V">' +
                        '<label for="V"></label>'+
                    '</div>'+
                '</div>'+
                '<label class="radio_label">Horizontal</label>'+
                '<div class="radio_style_1">'+
                    '<div class="radio_container">'+
                        '<input type="radio" id="H" name="format_input_element" value="H" checked>' +
                        '<label for="H"></label>'+
                    '</div>'+
                '</div>'+
            '<a href="#" id="validTemplateCreation" class="button">Création du template</a>');
        this.fillCreationMenuSubDiv('Creation de Template',fillCreationMenuSubContent).then(()=>{
            $('#template .workzone #sub').fadeIn('fast')
        })
    }

    loadNameSelectorDiv(){

    }
}

export {TemplateMenu}
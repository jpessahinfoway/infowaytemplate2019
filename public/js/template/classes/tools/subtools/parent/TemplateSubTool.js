import {TemplateTool} from "../../parent/TemplateTool.js";

class TemplateSubTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface)
       // this.iconContainer=$(`<span title="${this.title}" class="${this.name}" data-subtool="${this.constructor.name}"></span>`);
    }

}

export {TemplateSubTool}
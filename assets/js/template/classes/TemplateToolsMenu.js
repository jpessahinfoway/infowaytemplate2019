import {Observable} from "./pattern/observer/Observable";
import {TemplateTool} from "./tools/parent/TemplateTool";

class TemplateToolsMenu{
    constructor(name,$location){
        this.name = name
        this.$location = {
            menu : $location
        };
        this.clickOnToolObservable = new Observable();
        this.toolsList = {}
    }

    activeToolMenu(active){
        if(active){
            this.$location.menu.find('.tool').on('click.activeToolBox',(e)=>{
                console.log('test')
                e.stopPropagation()
                let $clickedTool = $(e.currentTarget);
                let selectedToolName = $clickedTool.data('tool');

                if(typeof selectedToolName ==='undefined')throw new Error('invalid dataset')

                let selectedTool = this.toolsList[selectedToolName]

                if(typeof selectedTool !=='object' || !( selectedTool instanceof TemplateTool) )throw new Error('tool non recognized')

                this.clickOnToolObservable.notify(selectedTool)

            })
        }
    }


    attachTool(tool){
        if(this.$location.menu.find(`[data-tool=${tool.name}]`).length <1)return console.log(`no data-tool for the tool ${tool.name} founded please add once first `)
        this.toolsList[tool.name] = tool
        Object.values(tool.subTools).forEach(subTool => this.attachTool(subTool))
    }
    detachTool(tool) {
        delete this.toolsList[tool.name];
    }

    toggleSubMenuOnMouseHover(){
        $('.toolbar')
            .on('mouseover','.tool' ,e=> {
                let current = $(e.currentTarget)
                console.log($(e.currentTarget))
                console.log($(current).children('ul.slider-menu'))
                $(current).children('ul.slider-menu').stop().slideDown('fast')
            })
            .on('mouseout','.tool', e => {
                let current = $(e.currentTarget)
                $(current).children('ul.slider-menu').stop().slideUp('fast')
            });
    }







}

export {TemplateToolsMenu}
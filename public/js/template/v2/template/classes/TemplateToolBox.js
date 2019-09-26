class TemplateToolBox{
    constructor(){
        console.log('Hello Toolbox')

        this.$location = {
            ul : $('.tools ul:first'),
        };

        this.activatedTool = {};

        this.tools={};

        this.toggleSubMenuOnMouseHover()

       /* this.iconsSize=null;
        this.casesProperties={size:null,background:'white'};
        //this.setToolBoxCaseSize({width:50,height:50});
        this.setIconSize(20);
        this.tools = {};
        this.subTools = {};
        this.activatedTool = {
            'tool' : null,
            'subTool' : null
        };
        this.lastActivatedToolBoxElements = {};
        this.initLastActivatedToolBoxElements();
        this.$location = {
            toolBox : $('#toolbar'),
            toolsContainer : $('.tools')
        };
        this.active()*/

    }

    disactiveAllTools(exception){
     let exceptionArray = exception;

  //   typeof exception === 'string'? exceptionArray.push(exception):exceptionArray = exception;
     let allowDisactivation;
     Object.keys(this.tools).forEach((tool)=>{
         allowDisactivation=true;
         if(!exceptionArray.includes(tool)){

             Object.keys(this.tools[tool].subTools).forEach(subTool=>{

                 if(!exceptionArray.includes(subTool)){
                     this.tools[tool].subTools[subTool].elements.li.removeClass('active-subTool');

                     this.tools[tool].subTools[subTool].instance.activeTool(false);
                 }else{
                     allowDisactivation=false
                 }
             })
             if(allowDisactivation){
                 this.tools[tool].elements.li.removeClass('active-tool');
                 this.tools[tool].instance.activeTool(false);
             }
         }else{

         }
     })
 }

    toggleSubMenuOnMouseHover(){
        $('body')
            .on('mouseover','.tool' ,e=> {
                let current = $(e.currentTarget)
                $(current).children('ul').stop().slideDown('fast')
            })
            .on('mouseout','.tool', e => {
                let current = $(e.currentTarget)
                $(current).children('ul').stop().slideUp('fast')
            });
    }

     activeToolInToolBox(toolName,active=true){
     let element = Object.keys(this.tools).includes(toolName)?'tool':'subTool';

     let objectToActive = element==='tool'?this.tools[toolName].instance:this.subTools[toolName];

     let classToAdd = element==='tool'?'active-tool':'active-subTool';
     console.log(objectToActive)
     objectToActive.activeTool(active);
     if(active){
         this.activatedTool[element]=objectToActive;
         this.tools[objectToActive.name].elements.li.addClass(classToAdd);
     }else{
         this.activatedTool[element]=null;
         this.tools[objectToActive.name].elements.li.removeClass(classToAdd);
     }

    }

    activeToolBoxEvents(){
        //Au click sur un element de la toolBox
        this.$location.ul.find('li').on('click',(e)=>{
            let active = {tool : false, subtool:false};
            let toolsToNotDisactivate = [];
            let tool = $(e.currentTarget).hasClass('tool')?$(e.currentTarget).find('span:first').data('tool'):$(e.currentTarget).parents('.tool li').find('span:first').data('tool');
            let subTool = $(e.currentTarget).find('span:first').data('subtool')?$(e.currentTarget).find('span:first').data('subtool'):false;
            if(!subTool){
                active.tool=this.tools[tool].state !=='enabled'
            }else{
                if(this.tools[tool].subTools[subTool].state !=='enabled'){
                    active.subtool=true
                    active.tool=true
                }else{
                    if(this.activatedTool.subTool!==null){

                        if(Object.keys(this.tools[tool].subTools).includes(subTool)){
                            if(this.activatedTool.subTool.name !== subTool){
                                active.subtool=true;
                                active.tool=true;
                            }
                        }else{
                            active.tool=false;
                            active.subtool=true;
                        }
                    }else{
                        active.subTool=true;
                        active.tool = true;
                    }
                }
            }

            Object.keys(active).map(val=>toolsToNotDisactivate.push(val));

            this.disactiveAllTools(toolsToNotDisactivate);


            Object.keys(active).map(val=>{
                let toolsEntity = val==='tool'?tool:subTool;


                if(active[val])toolsEntity.state==='enabled'?this.activeToolInToolBox(toolsEntity,false):this.activeToolInToolBox(toolsEntity,true);
            });

            //this.disactiveSubTools(eventName);

            e.stopPropagation()
        })
    }

    setToolIcon(tool,icon){
        tool.iconClass=icon
        tool.elements.icon=$(`<i class="${tool.iconClass}"></i>`);
    }

    setToolTitle(tool) {
        tool.attrs.title = tool.instance.description;
    }

    addSubTool(tool,subTool){
        this.tools[tool.name].subTools[subTool.name]={}
        this.tools[tool.name].subTools[subTool.name]={}
    }
    addTool(tool,icon,parentTool=false){

        let toolContainer  =  !parentTool ?  this.tools  :  this.tools[parentTool.name].subTools  ;
        let ul  =  !parentTool  ?  this.$location.ul  :  this.tools[parentTool.name].elements.ul;
        let $currentToolHTML = null;

        toolContainer[tool.name]={};

        if(!parentTool)toolContainer[tool.name].subTools = {}
        toolContainer[tool.name].elements={};
        toolContainer[tool.name].attrs={};
        toolContainer[tool.name].instance=tool;

        this.setToolTitle(toolContainer[tool.name]);

        toolContainer[tool.name].elements.span = $(`<span>${toolContainer[tool.name].attrs.title}</span>`);
        toolContainer[tool.name].elements.span.data('tool',tool.name)
        console.log(toolContainer[tool.name])
        toolContainer[tool.name].elements.li    = $(`<li class="tool" title="${toolContainer[tool.name].attrs.title}"></li>`);

        this.setToolIcon(toolContainer[tool.name],icon);
        Object.keys(tool.subTools).length >0 ?toolContainer[tool.name].elements.ul=$(`<ul class="subMenu"></ul>`):null;

        console.log(toolContainer[tool.name].elements.icon)
        $currentToolHTML =
            toolContainer[tool.name].elements.li
                .append(toolContainer[tool.name].elements.span).append(toolContainer[tool.name].elements.icon);
        if(toolContainer[tool.name].elements.ul !== null)$currentToolHTML.append(toolContainer[tool.name].elements.ul);

        ul.append($currentToolHTML);

      /*  console.log(ul)
        console.log()
        if(parentTool)toolContainer[tool.name].elements.li.append(ul);*/




        /*let icon = $(`<i></i>`)
        let iconInToolBox =$('<li class="tools"></li>');
        iconInToolBox.append(tool.iconContainer);
        let subToolsContainer,subToolConainer=null;
        Object.keys(this.tools[tool.constructor.name].subTools).forEach((subToolName,index)=>{
            this.subTools[subToolName]=this.tools[tool.constructor.name].subTools[subToolName];
            if(index<1){  subToolsContainer=$('<ul class="subToolsContainer"></ul>')  };
            subToolConainer = $('<li class="subtools"></li>').append(this.tools[tool.constructor.name].subTools[subToolName].iconContainer);
            subToolsContainer.append(subToolConainer);
        });
        if(subToolsContainer !== null)iconInToolBox.append(subToolsContainer);
        this.setMenuCaseProperties(tool);
        this.showMenuCase(iconInToolBox,tool);*/
    }

   /* initLastActivatedToolBoxElements(){
        this.lastActivatedToolBoxElements = {
            tool : {
                'li' : null,
                'i'  : null
            },
            subTool: {
                'li' : null,
                'i'  : "dfgdfg"
            }
        }
    }*/

   /* setLastActivatedToolBoxElements({tool = {li : false, i:false}, subTool = {li:false,i:false}} = {}){
        if(tool.li)this.lastActivatedToolBoxElements.tool.li=tool.li;
        if(tool.i)this.lastActivatedToolBoxElements.tool.i=tool.i;
        if(subTool.li)this.lastActivatedToolBoxElements.subTool.li=subTool.li;
        if(subTool.i) this.lastActivatedToolBoxElements.subTool.i = subTool.i
    }*/

    /*setToolBoxCaseSize(size){
        let access = true;

        if(typeof size.width === 'undefined' ||  !Number.isInteger(size.width)){
           
            access=false;
        }
        if(typeof size.height === 'undefined' ||  !Number.isInteger(size.width)){
           
            access=false;
        }

        if(!access)return;
        this.casesProperties.size=size;
    }*/
  /*  setIconSize(size){
        let access = true;

        if(typeof size === 'undefined' ||  !Number.isInteger(size)){
           
            access=false;
        }

        if(!access)return;
        this.iconsSize=size;
    }*/

  /*  setMenuCaseProperties(tool){
        let icon = tool.iconContainer;
        icon.css('font-size',this.iconsSize);
        this.$location.toolBox.find('ul').css('background-color',this.casesProperties.background)

    }*/
   /* showMenuCase(menuCase,tool){

        //menuCase.width(this.casesProperties.size.width);
        //menuCase.height(this.casesProperties.size.height);

        this.$location.toolBox.find('ul:first').append(menuCase);
    }*/



   /* activeAllTools(){

       
        Object.keys(this.tools).forEach((tool)=>{
            this.tools[tool].active();
        })
    }*/



}

export {TemplateToolBox}
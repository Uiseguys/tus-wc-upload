/*! Built with http://stenciljs.com */
const{h:e}=window.App;class t{constructor(){this.allowDrop="true",this.allowClick="true",this.allowMultiple="true",this.accept=[],this.file=[],this.error=[],this.currentFiles=[],this.upload=[],this.stringsText=""}componentDidLoad(){this.initDragDropArea()}initDragDropArea(){this.stringsText="true"==this.allowDrop&&"true"==this.allowClick?"true"==this.allowMultiple?"Please drop files here or ":"Please drop file or ":"true"==this.allowDrop&&"false"==this.allowClick?"true"==this.allowMultiple?"Please drop files":"Please drop file":"false"==this.allowDrop&&"true"==this.allowClick?"":"Please allow drop or allow Click"}handleChange(e){this.currentFiles=[],this.addedFiles(e.target.files),this.push.emit(e)}drop(e){if(e.preventDefault(),"true"==this.allowMultiple)this.addedFiles(e.dataTransfer.files);else if(e.dataTransfer.files.length>1){this.errorHandler("You can upload single file at a time.");let t=[];t=[...t,e.dataTransfer.files[0]],this.addedFiles(t)}else this.addedFiles(e.dataTransfer.files)}addedFiles(e){var t;if(this.accept==[]||0==this.accept.length||null==this.accept)this.filesChosen.emit(e);else{let l=[];for(let s=0;s<e.length;s++){t=!1;for(let i=0;i<this.accept.length;i++)if(1==this.formatValidator(this.accept[i],e[s].type)){t=!0,l=[...l,e[s]];break}0==t&&this.errorHandler("Please select the file of required format.")}this.filesChosen.emit(l)}}formatValidator(e,t){return(e=e.slice(e.indexOf(".")+1,e.length))==t.slice(t.indexOf("/")+1,t.length)}allowDropFile(e){"true"==this.allowDrop&&e.preventDefault()}errorHandler(e){let t;this.error=[...this.error,e],clearInterval(t),t=setInterval(()=>{this.error=[]},5e3)}render(){var t="true"==this.allowMultiple;return[e("div",{class:"st_container"},e("div",{class:"st_top_50 dashed-border",onDrop:e=>this.drop(e),onDragOver:e=>this.allowDropFile(e)},e("div",{class:"st_file_contain st_text-center"},e("div",{class:"st_file_icon"},e("div",{class:"st_scb-drop-area"},e("img",{src:"/assets/icon/arrow-pointing-up.svg"}))),e("div",{class:"st_scb-fi-default-label"},e("slot",{name:"drop-target"},e("p",null,this.stringsText," ")),e("slot",{name:"text"})),"true"==this.allowClick?e("div",{class:"st_file-upload"},e("slot",{name:"dialog-trigger"},e("label",{class:"st_file-upload__label"},"Choose","true"==this.allowMultiple?" Files":" File")),e("input",{id:"upload",class:"st_file-upload__input",type:"file",onChange:e=>this.handleChange(e),accept:this.accept.toString(),multiple:t})):null,e("div",{class:"st_scb-fi-default-error"},this.error.map(t=>e("p",{class:"error_one"},e("img",{src:"/assets/icon/error-triangle.svg"}),t," "))))))]}static get is(){return"cwc-file-chooser"}static get properties(){return{accept:{type:"Any",attr:"accept"},allowClick:{type:String,attr:"allow-click"},allowDrop:{type:String,attr:"allow-drop"},allowMultiple:{type:String,attr:"allow-multiple"},currentFiles:{state:!0},error:{state:!0},file:{state:!0},stringsText:{state:!0},upload:{state:!0},uppy:{state:!0}}}static get events(){return[{name:"push",method:"push",bubbles:!0,cancelable:!0,composed:!0},{name:"filesChosen",method:"filesChosen",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"body{font-family:Montserrat,sans-serif;padding:0;margin:0;-webkit-font-smoothing:antialiased}.st_row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.st_container{width:100%;margin:auto;max-width:1170px}.st_w_100{width:100%}.st_wid_100{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.st_wid_20{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.st_content_align_center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:center;align-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%}.st_top_50{width:31%;margin:15px auto;padding:26px}.dashed-border{border:2px dashed #e8e4e4}.st_text-center{text-align:center}.st_file-upload{position:relative;display:inline-block;margin-top:1rem}.st_file-upload__label{background-color:#007bff;padding:1em 2em;color:#fff;border-radius:2em;-webkit-transition:background .3s;transition:background .3s}.st_file-upload__label:hover{cursor:pointer;background:#000}.st_file-upload__input{position:absolute;left:0;top:0;right:0;bottom:0;font-size:1;width:0;height:100%;opacity:0}.st_scb-drop-area{height:80px;width:80px;border:3px solid #c7cfd7;border-radius:50%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative;margin:auto}.st_scb-drop-area:before{content:\"\";position:absolute;left:50%;top:50%;display:block;border-radius:50%;border:1px solid #c7cfd7;width:80px;height:80px;margin-left:-41px;margin-top:-41px;-webkit-animation:1s ease-in infinite beforeWave;animation:1s ease-in infinite beforeWave}.st_scb-drop-area img{height:63%}\@-webkit-keyframes beforeWave{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.4}20%{-webkit-transform:scale(1.1);transform:scale(1.1);opacity:.6}40%{-webkit-transform:scale(1.2);transform:scale(1.2);opacity:.8}75%{-webkit-transform:scale(1.4);transform:scale(1.4);opacity:0}60%{opacity:.9;opacity:0;-webkit-transform:scale(1.6);transform:scale(1.6);opacity:0}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}\@keyframes beforeWave{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.4}20%{-webkit-transform:scale(1.1);transform:scale(1.1);opacity:.6}40%{-webkit-transform:scale(1.2);transform:scale(1.2);opacity:.8}75%{-webkit-transform:scale(1.4);transform:scale(1.4);opacity:0}60%{opacity:.9;opacity:0;-webkit-transform:scale(1.6);transform:scale(1.6);opacity:0}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}.st_file_icon{margin-bottom:20px}.st_scb-fi-default-label p{font-weight:400;color:#797979}.st_file_contain st_text-center{width:33%;margin:auto;border:4px dashed #eee;padding:49px 20px}p.error_one{color:#f6183d;font-weight:400;font-size:12px;width:100%}p.error_one img{width:15px;opacity:.8;position:relative;top:2px;left:-4px}.st_scb-fi-default-error{margin-top:35px!important}.st_file-upload input[type=file]{height:50px!important;width:100%!important;top:-16px;border-radius:46px}"}}export{t as CwcFileChooser};
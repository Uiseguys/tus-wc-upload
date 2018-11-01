/*! Built with http://stenciljs.com */
const{h:e}=window.App;class t{constructor(){this.allowDrop=!0,this.allowClick=!0,this.allowMultiple=!0,this.accept=[],this.error=[],this.stringsText=""}componentDidLoad(){this.initDragDropArea()}initDragDropArea(){this.stringsText=1==this.allowDrop&&1==this.allowClick?1==this.allowMultiple?"Please drop files here or ":"Please drop file or ":1==this.allowDrop&&0==this.allowClick?1==this.allowMultiple?"Please drop files":"Please drop file":0==this.allowDrop&&1==this.allowClick?"":"Please allow drop or allow Click"}handleChange(e){this.addedFiles(e.target.files)}drop(e){if(e.preventDefault(),1==this.allowMultiple)this.addedFiles(e.dataTransfer.files);else if(e.dataTransfer.files.length>1){this.errorHandler("You can upload single file at a time.");let t=[];t=[...t,e.dataTransfer.files[0]],this.addedFiles(t)}else this.addedFiles(e.dataTransfer.files)}addedFiles(e){var t;if(this.accept==[]||0==this.accept.length||null==this.accept)this.filesChosen.emit(e);else{let s=[];for(let l=0;l<e.length;l++){t=!1;for(let i=0;i<this.accept.length;i++)if(1==this.formatValidator(this.accept[i],e[l].type)){t=!0,s=[...s,e[l]];break}0==t&&this.errorHandler("Please select the file of required format.")}this.filesChosen.emit(s)}}formatValidator(e,t){return(e=e.slice(e.indexOf(".")+1,e.length))==t.slice(t.indexOf("/")+1,t.length)}allowDropFile(e){1==this.allowDrop&&e.preventDefault()}errorHandler(e){let t;this.error=[...this.error,e],clearInterval(t),t=setInterval(()=>{this.error=[]},5e3)}render(){var t=1==this.allowMultiple;return[e("div",{class:"st_container"},e("div",{class:"st_top_50 dashed-border",onDrop:e=>this.drop(e),onDragOver:e=>this.allowDropFile(e)},e("div",{class:"st_file_contain st_text-center"},e("div",{class:"st_file_icon"},e("div",{class:"st_scb-drop-area"},e("img",{src:"/assets/icon/arrow-pointing-up.svg"}))),e("div",{class:"st_scb-fi-default-label"},e("slot",{name:"drop-target"},e("p",null,this.stringsText," ")),e("slot",{name:"text"})),1==this.allowClick?e("div",{class:"st_file-upload"},e("slot",{name:"dialog-trigger"},e("label",{class:"st_file-upload__label"},"Choose",1==this.allowMultiple?" Files":" File")),e("input",{id:"upload",class:"st_file-upload__input",type:"file",onChange:e=>this.handleChange(e),accept:this.accept.toString(),multiple:t})):null,e("div",{class:"st_scb-fi-default-error"},this.error.map(t=>e("p",{class:"error_one"},e("img",{src:"/assets/icon/error-triangle.svg"}),t," "))))))]}static get is(){return"cwc-file-chooser"}static get properties(){return{accept:{type:"Any",attr:"accept"},allowClick:{type:Boolean,attr:"allow-click"},allowDrop:{type:Boolean,attr:"allow-drop"},allowMultiple:{type:Boolean,attr:"allow-multiple"},error:{state:!0},stringsText:{state:!0}}}static get events(){return[{name:"filesChosen",method:"filesChosen",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"body{font-family:Montserrat,sans-serif;padding:0;margin:0;-webkit-font-smoothing:antialiased}.st_row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.st_container{width:100%;margin:auto;max-width:1170px}.st_w_100{width:100%}.st_wid_100{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.st_wid_20{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.st_content_align_center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:center;align-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%}.st_top_50{width:31%;margin:15px auto;padding:26px}.dashed-border{border:2px dashed #e8e4e4}.st_text-center{text-align:center}.st_file-upload{position:relative;display:inline-block;margin-top:1rem}.st_file-upload__label{background-color:#007bff;padding:1em 2em;color:#fff;border-radius:2em;-webkit-transition:background .3s;transition:background .3s}.st_file-upload__label:hover{cursor:pointer;background:#000}.st_file-upload__input{position:absolute;left:0;top:0;right:0;bottom:0;font-size:1;width:0;height:100%;opacity:0}.st_scb-drop-area{height:80px;width:80px;border:3px solid #c7cfd7;border-radius:50%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative;margin:auto}.st_scb-drop-area:before{content:\"\";position:absolute;left:50%;top:50%;display:block;border-radius:50%;border:1px solid #c7cfd7;width:80px;height:80px;margin-left:-41px;margin-top:-41px;-webkit-animation:1s ease-in infinite beforeWave;animation:1s ease-in infinite beforeWave}.st_scb-drop-area img{height:63%}\@-webkit-keyframes beforeWave{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.4}20%{-webkit-transform:scale(1.1);transform:scale(1.1);opacity:.6}40%{-webkit-transform:scale(1.2);transform:scale(1.2);opacity:.8}75%{-webkit-transform:scale(1.4);transform:scale(1.4);opacity:0}60%{opacity:.9;opacity:0;-webkit-transform:scale(1.6);transform:scale(1.6);opacity:0}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}\@keyframes beforeWave{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.4}20%{-webkit-transform:scale(1.1);transform:scale(1.1);opacity:.6}40%{-webkit-transform:scale(1.2);transform:scale(1.2);opacity:.8}75%{-webkit-transform:scale(1.4);transform:scale(1.4);opacity:0}60%{opacity:.9;opacity:0;-webkit-transform:scale(1.6);transform:scale(1.6);opacity:0}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}.st_file_icon{margin-bottom:20px}.st_scb-fi-default-label p{font-weight:400;color:#797979}.st_file_contain st_text-center{width:33%;margin:auto;border:4px dashed #eee;padding:49px 20px}p.error_one{color:#f6183d;font-weight:400;font-size:12px;width:100%}p.error_one img{width:15px;opacity:.8;position:relative;top:2px;left:-4px}.st_scb-fi-default-error{margin-top:35px!important}.st_file-upload input[type=file]{height:50px!important;width:100%!important;top:-16px;border-radius:46px}"}}class s{constructor(){this.files=[],this.filesList=[],this.note="Uploads List",this.refreshState=!1}errors(e){console.log(e)}onFilesChosen(e){this.files=e.detail;for(let e=0;e<this.files.length;e++){var t=this.files[e];t.uploadObj=null,this.filesList=[...this.filesList,t]}}onError(e){console.log(e.detail)}onSave(e){console.log(e.detail)}onprogress(e){console.log("Progresssss"),console.log(e)}onCancel(e){let t=this.filesList.findIndex(t=>t.name==e.detail.name&&t.size==e.detail.size);t>-1&&this.filesList.splice(t,1),this.refreshState=!this.refreshState}componentDidLoad(){}getFilesFromStorage(){}render(){return this.getFilesFromStorage(),e("div",null,e("div",{class:"st_mainPage"},e("cwc-file-chooser",{allowDrop:!0,allowClick:!0,allowMultiple:!0}),e("div",{class:"st_container"},e("div",{class:"st_content_align_center"},e("div",{class:"st_uploaded_file st_w_100 st_text-center"},e("div",{class:"uploaded_images"},e("div",{class:"st_row"},this.filesList.length>0?this.filesList.map(t=>e("cwc-upload-item",{fileProvided:t,endpoint:"https://master.tus.io/files/",file:"Blob",upload:!0,value:this.note})):"No files Added")))))))}static get is(){return"cwc-file-root"}static get properties(){return{errors:{method:!0},files:{state:!0},filesList:{state:!0},note:{state:!0},refreshState:{state:!0}}}static get events(){return[{name:"allFiles",method:"allFiles",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"filesChosen",method:"onFilesChosen"},{name:"errors",method:"onError"},{name:"save",method:"onSave"},{name:"progress",method:"onprogress"},{name:"cancelEvent",method:"onCancel"}]}static get style(){return"header{background:#5851ff;color:#fff;height:56px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26)}h1{font-size:1.4rem;font-weight:500;color:#fff;padding:0 12px}.column{width:40%;float:left;padding:5%}.UppyInput-Progress{width:90%;clear:both;padding:0 5%}.app-profile,.file-chooser{padding:10px}button{background:#5851ff;color:#fff;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;-webkit-box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;-webkit-transition:all .15s ease;transition:all .15s ease;cursor:pointer}.play-pause-btn{background:0 0;max-width:30px;margin:0;padding:0;-webkit-box-shadow:0 0;box-shadow:0 0}.play-pause-btn img{width:100%}button:hover{-webkit-box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);-webkit-transform:translateY(1px);transform:translateY(1px)}div#drag-drop-area{position:relative;margin-bottom:15px}h6.water-mark{position:absolute;top:50%;left:37%;display:block!important;font-weight:400;font-size:1.15em!important;margin-bottom:5px!important}#image-list{width:100%;max-height:15%;padding-bottom:6px}#image-list img{width:50px;height:50px;padding:5px}#myProgress{width:100%;background-color:#ddd}#myProgress div{width:1%;height:2px;background-color:#4caf50}.progress-footer{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;text-align:center;padding-top:5px}.progress-footer span{margin:auto;text-align:center;padding-left:8px;font-size:15px}.progress-list{padding:7px;background:#f1f1f1;margin-bottom:8px}.file-name{padding:7px 7px 7px 0;color:#7421da}body{font-family:Montserrat,sans-serif;font-weight:700;padding:0;margin:0;-webkit-font-smoothing:antialiased}.st_row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.st_container{width:100%;margin:auto;max-width:1170px}.st_w_100{width:100%}.st_wid_100{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.st_wid_70{-webkit-box-flex:0;-ms-flex:0 0 70%;flex:0 0 70%;max-width:70%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_15{-webkit-box-flex:0;-ms-flex:0 0 15%;flex:0 0 15%;max-width:15%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_content_align_center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:center;align-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%}.st_text-center{text-align:center}.st_progress-bar{height:4px;width:100%;background:#d3d3d3;margin-top:25px}.uploaded_images{margin-top:45px}a.st_closeBtn{padding-top:16px;display:inline-block;cursor:pointer}a.st_closeBtn img{width:20px}.st_image{border:1px solid #eee;position:relative}.st_bg{background:#f6f6f6;padding:0 10px}.video-play-button{position:relative;z-index:10;top:50%;left:20px;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:32px;height:44px;border-radius:50%;padding:5px}.video-play-button:before{content:\"\";position:absolute;z-index:0;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);display:block;width:20px;height:20px;background:#ba1f24;border-radius:50%;-webkit-animation:1.5s ease-out infinite pulse-border;animation:1.5s ease-out infinite pulse-border}.video-play-button:after{content:\"\";position:absolute;z-index:1;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);display:block;width:20px;height:20px;background:#fa183d;border-radius:50%;-webkit-transition:all .2s;transition:all .2s}.video-play-button:hover:after{background-color:#da0528}.video-play-button img{position:relative;z-index:3;max-width:100%;width:auto;height:auto}.video-play-button span{display:block;position:relative;z-index:3;width:0;height:0;border-left:8px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent;top:17px;left:14px}\@-webkit-keyframes pulse-border{0%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);opacity:1}100%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);opacity:0}}\@keyframes pulse-border{0%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);opacity:1}100%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);opacity:0}}.video-overlay{position:fixed;z-index:-1;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.8);opacity:0;-webkit-transition:all ease .5s;transition:all ease .5s}.video-overlay.open{position:fixed;z-index:1000;opacity:1}.video-overlay-close{position:absolute;z-index:1000;top:15px;right:20px;font-size:36px;line-height:1;font-weight:400;color:#fff;text-decoration:none;cursor:pointer;-webkit-transition:all .2s;transition:all .2s}.video-overlay-close:hover{color:#fa183d}.video-overlay iframe{position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-box-shadow:0 0 15px rgba(0,0,0,.75);box-shadow:0 0 15px rgba(0,0,0,.75)}.st_allContent{position:relative}.overlay_error{position:absolute;top:0;height:100%;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-line-pack:center;align-content:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#fff;font-size:14px;font-weight:400;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.upload-name{font-weight:400;margin:1px}cwc-upload-item.hydrated{width:auto;max-width:20%;padding:13px}"}}class l{constructor(){this.endpoint="",this.file="Blob",this.upload=!0,this.value="",this.errors=[],this.refreshState=!1}componentDidLoad(){this.fileProvided.uploadObj?(this.uploadObj=this.fileProvided.uploadObj,this.uploadObj.abort(),console.log(this.uploadObj),this.currentFile=this.uploadObj.file,this.currentFile.uploadObj=null,this.uploader(this.uploadObj.file)):this.init(this.fileProvided)}init(e){e.pause=!1,e.uploaded=!1,e.progress={bytesUploaded:0,bytesTotal:e.size,percentage:"0%"},e.id=Date.now().toString()+e.name,this.currentFile=e,this.placeholderImage(e,e.type),1==this.upload?this.startUploads():(this.currentFile.pause=!0,this.uploader(this.currentFile))}startUploads(){this.upload=!0,this.uploader(this.currentFile)}uploader(e){let t=this;this.uploadObj=new tus.Upload(e,{endpoint:this.endpoint,retryDelays:[0,1e3,3e3,5e3,6e4,12e4],metadata:{filename:e.name,filetype:e.type},onError:function(e){t.errorHandler(e)},onProgress:function(e,s){var l=Math.round(100*e/s).toString()+"%";t.progressHandler(l)},onSuccess:function(){t.uploadSuccess()}}),0==e.pause&&this.uploadObj.start(),this.save.emit(this.uploadObj)}progressHandler(e){this.currentFile.progress.percentage=e,this.refreshState=!this.refreshState,this.progress.emit(this.currentFile)}uploadSuccess(){this.currentFile.uploaded=!0,this.refreshState=!this.refreshState}errorHandler(e){let t;console.log(e),this.refreshState=!this.refreshState,this.errors=[...this.errors,e.tus],clearInterval(t),t=setInterval(()=>{this.errors=[]},3e3),this.error.emit(this.errors)}resumeAbortUploading(){1==this.upload?(this.currentFile.pause=!this.currentFile.pause,1==this.currentFile.pause?this.uploadObj.abort():this.uploadObj.start()):(this.currentFile.pause=!1,this.uploader(this.currentFile)),this.refreshState=!this.refreshState}cancelUpload(){this.uploadObj.abort(),this.refreshState=!this.refreshState,this.cancelEvent.emit(this.currentFile)}placeholderImage(e,t){let[s]=t.split("/");"image"==s?this.getBase64(e):this.currentFile.src="https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/thumbnail/thumbnail_placeholder_256.png"}getBase64(e){var t=new FileReader;t.readAsDataURL(e);let s=this;t.onload=function(){s.currentFile.src=t.result},t.onerror=function(e){console.log(e)}}render(){return e("div",{class:"st_wid_100"},this.currentFile?e("div",{class:"st_allContent"},e("div",null,""==this.endpoint?"No endpoint given.":0==this.upload?"Ready to upload":null),e("slot",{name:"file-preview"},e("div",{class:"st_image"},e("img",{src:this.currentFile.src,class:"st_wid_100"}),this.errors[0]?e("div",{class:"overlay_error"}," ",this.errors[0]," "):null)),e("div",{class:"st_barVDOcancel st_w_100"},e("div",{class:"st_row st_bg"},e("div",{class:"st_wid_15 tick"},1==this.currentFile.uploaded?e("a",{class:"st_closeBtn",innerHTML:"<img src='/assets/icon/checked.svg' />"}):1==this.currentFile.pause?e("a",{class:"st_closeBtn",innerHTML:"<img src='/assets/icon/upload-button.svg' >",onClick:()=>this.resumeAbortUploading()}," "):e("a",{class:"st_closeBtn",innerHTML:"<img src='/assets/icon/pause.svg'/>",onClick:()=>this.resumeAbortUploading()})),e("div",{class:"st_right_sec"},e("div",{class:"file_name"},e("p",{class:"upload-name"},"  ",this.currentFile.name.slice(0,15)),e("div",{class:"st_wid_18"},e("a",{class:"fnt-14"},this.currentFile.progress.percentage))),e("div",{class:"st_wid_52"},e("slot",{name:"progress"},e("div",{class:"st_progress-bar"},e("div",{class:"st_loaded",style:{width:this.currentFile.progress.percentage}})))),e("div",{class:"st_wid_15 cancel",onClick:()=>this.cancelUpload()},e("slot",{name:"cancel-Button"},e("a",{class:"st_closeBtn"},e("img",{src:"/assets/icon/close-circle.svg"})))))))):null)}static get is(){return"cwc-upload-item"}static get properties(){return{currentFile:{state:!0},endpoint:{type:"Any",attr:"endpoint"},errors:{state:!0},file:{type:String,attr:"file"},fileProvided:{type:"Any",attr:"file-provided"},refreshState:{state:!0},upload:{type:Boolean,attr:"upload",mutable:!0},uploadObj:{state:!0},value:{type:String,attr:"value"}}}static get events(){return[{name:"error",method:"error",bubbles:!0,cancelable:!0,composed:!0},{name:"cancelEvent",method:"cancelEvent",bubbles:!0,cancelable:!0,composed:!0},{name:"progress",method:"progress",bubbles:!0,cancelable:!0,composed:!0},{name:"save",method:"save",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".app-profile,.file-chooser{padding:10px}.st_uploaded_file cwc-upload-item.hydrated{max-width:400px;padding:13px;width:400px}button{background:#5851ff;color:#fff;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;-webkit-box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;-webkit-transition:all .15s ease;transition:all .15s ease;cursor:pointer}.play-pause-btn{background:0 0;max-width:30px;margin:0;padding:0;-webkit-box-shadow:0 0;box-shadow:0 0}.play-pause-btn img{width:100%}button:hover{-webkit-box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);-webkit-transform:translateY(1px);transform:translateY(1px)}div#drag-drop-area{position:relative;margin-bottom:15px}h6.water-mark{position:absolute;top:50%;left:37%;display:block!important;font-weight:400;font-size:1.15em!important;margin-bottom:5px!important}#image-list{width:100%;max-height:15%;padding-bottom:6px}#image-list img{width:50px;height:50px;padding:5px}#myProgress{width:100%;background-color:#ddd}#myProgress div{width:1%;height:2px;background-color:#4caf50}.progress-footer{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;text-align:center;padding-top:5px}.progress-footer span{margin:auto;text-align:center;padding-left:8px;font-size:15px}.progress-list{padding:7px;background:#f1f1f1;margin-bottom:8px}.file-name{padding:7px 7px 7px 0;color:#7421da}body{font-family:Montserrat,sans-serif;font-weight:700;padding:0;margin:0;-webkit-font-smoothing:antialiased}.st_row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.st_container{width:100%;margin:auto;max-width:1170px}.st_w_100{width:100%}.st_wid_100{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.st_wid_20{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:100%;padding:15px;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_70{-webkit-box-flex:0;-ms-flex:0 0 70%;flex:0 0 70%;max-width:70%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_52{-webkit-box-flex:0;-ms-flex:0 0 51%;flex:0 0 51%;max-width:51%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_18{-webkit-box-flex:0;-ms-flex:0 0 18%;flex:0 0 18%;max-width:18%;-webkit-box-sizing:border-box;box-sizing:border-box;margin-right:2px}.st_wid_15{-webkit-box-flex:0;-ms-flex:0 0 15%;flex:0 0 15%;max-width:15%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_content_align_center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:center;align-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%}.st_text-center{text-align:center}.st_barVDOcancel .st_progress-bar{height:7px;width:100%;background:#d3d3d3;margin:5px 0 13px}.st_loaded{height:100%;background:#2391ff;-webkit-animation:3s linear infinite loading;animation:3s linear infinite loading;-webkit-transform-origin:0;transform-origin:0}.uploaded_images{margin-top:45px}a.st_closeBtn{display:inline-block;cursor:pointer}a.st_closeBtn img{width:20px}.st_image{border:1px solid #eee;height:150px;vertical-align:middle;position:relative}.st_image img{height:auto;width:auto;max-height:100px;position:absolute;left:0;right:0;margin:auto;top:50%;-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}.st_uploaded_file .st_bg{background:#fff;-webkit-box-shadow:0 4px 17px rgba(196,221,255,.8);box-shadow:0 4px 17px rgba(196,221,255,.8);padding:0;position:relative}.st_uploaded_file .st_wid_15{border-right:1px solid #daecff;margin-right:20px}.video-play-button{position:relative;z-index:10;top:50%;left:20px;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:32px;height:44px;border-radius:50%;padding:5px}.video-play-button:before{content:\"\";position:absolute;z-index:0;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);display:block;width:20px;height:20px;background:#ba1f24;border-radius:50%;-webkit-animation:1.5s ease-out infinite pulse-border;animation:1.5s ease-out infinite pulse-border}.video-play-button:after{content:\"\";position:absolute;z-index:1;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);display:block;width:20px;height:20px;background:#fa183d;border-radius:50%;-webkit-transition:all .2s;transition:all .2s}.video-play-button:hover:after{background-color:#da0528}.video-play-button img{position:relative;z-index:3;max-width:100%;width:auto;height:auto}.video-play-button span{display:block;position:relative;z-index:3;width:0;height:0;border-left:8px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent;top:17px;left:14px}\@-webkit-keyframes pulse-border{0%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);opacity:1}100%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);opacity:0}}\@keyframes pulse-border{0%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);opacity:1}100%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);opacity:0}}.video-overlay{position:fixed;z-index:-1;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.8);opacity:0;-webkit-transition:all ease .5s;transition:all ease .5s}.video-overlay.open{position:fixed;z-index:1000;opacity:1}.video-overlay-close{position:absolute;z-index:1000;top:15px;right:20px;font-size:36px;line-height:1;font-weight:400;color:#fff;text-decoration:none;cursor:pointer;-webkit-transition:all .2s;transition:all .2s}.video-overlay-close:hover{color:#fa183d}.video-overlay iframe{position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-box-shadow:0 0 15px rgba(0,0,0,.75);box-shadow:0 0 15px rgba(0,0,0,.75)}.st_allContent{position:relative}.overlay_error{position:absolute;top:0;height:100%;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-line-pack:center;align-content:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#fff;font-size:14px;font-weight:400;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.upload-name{font-weight:400;margin:1px}.fnt-14{font-size:14px}.st_right_sec{width:80%;display:inline-block;padding-top:0}.st_wid_15.cancel a.st_closeBtn{padding-top:0}.st_wid_15.cancel{border:none;position:absolute;right:-5px;top:-8px;margin:0}.file_name{width:100%;float:left;text-align:left;margin:7px 0 5px}.file_name p.upload-name{display:inline-block}.file_name .st_wid_18{margin-left:10px;display:inline-block}.st_wid_15.tick{position:relative}.tick a.st_closeBtn{position:absolute;top:50%;left:0;right:0;-webkit-transform:translate(0,-50%);transform:translate(0,-50%);padding:0}.st_barVDOcancel .st_wid_52{float:left;width:100%;display:block;max-width:95%}"}}export{t as CwcFileChooser,s as CwcFileRoot,l as CwcUploadItem};
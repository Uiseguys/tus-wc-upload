/*! Built with http://stenciljs.com */
const{h:e}=window.App;class t{constructor(){this.endpoint="",this.file="Blob",this.upload=!0,this.value="",this.errors="",this.refreshState=!1}componentDidLoad(){this.fileProvided.uploadObj?(this.uploadObj=this.fileProvided.uploadObj,"100%"==this.fileProvided.progress?(this.currentFile=this.uploadObj.file,this.uploadSuccess()):(this.currentFile=this.fileProvided,this.timer=setInterval(()=>{this.uploadObj=this.uploadObj.count+1},1e3))):this.init(this.fileProvided)}init(e){e.pause=!1,e.uploaded=!1,e.progress={bytesUploaded:0,bytesTotal:e.size,percentage:"0%"},e.id=Date.now().toString()+e.name,e.count=0,this.currentFile=e,this.placeholderImage(e,e.type),1==this.upload?this.startUploads():(this.currentFile.pause=!0,this.uploader(this.currentFile))}startUploads(){this.upload=!0,this.uploader(this.currentFile)}uploader(e){let t=this;this.uploadObj=new tus.Upload(e,{endpoint:this.endpoint,retryDelays:[0,1e3],metadata:{filename:e.name,filetype:e.type},onError:function(e){t.errorHandler(e)},onProgress:function(e,s){var r=Math.round(100*e/s).toString()+"%";t.progressHandler(r)},onSuccess:function(){t.uploadSuccess()}}),0==e.pause&&this.uploadObj.start(),this.save.emit(this.uploadObj)}progressHandler(e){this.currentFile.progress.percentage=e,this.refreshState=!this.refreshState,this.progress.emit(this.currentFile)}uploadSuccess(){this.currentFile.uploaded=!0,this.refreshState=!this.refreshState}errorHandler(e){let t;console.log(e),this.currentFile.pause=!0,this.refreshState=!this.refreshState,this.errors="We got a server error, Please try again.",clearInterval(t),t=setTimeout(()=>{this.errors=""},3e4),this.error.emit(this.errors)}resumeAbortUploading(){1==this.upload?(this.currentFile.pause=!this.currentFile.pause,1==this.currentFile.pause?this.uploadObj.abort():this.uploadObj.start()):(this.currentFile.pause=!1,this.uploader(this.currentFile)),""!=this.errors&&(this.errors="",this.save.emit(this.uploadObj)),this.refreshState=!this.refreshState}cancelUpload(){this.uploadObj.abort(),this.refreshState=!this.refreshState,this.cancelEvent.emit(this.currentFile)}placeholderImage(e,t){let[s]=t.split("/");"image"==s?this.getBase64(e):this.currentFile.src="https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/thumbnail/thumbnail_placeholder_256.png"}getBase64(e){var t=new FileReader;t.readAsDataURL(e);let s=this;t.onload=function(){s.currentFile.src=t.result},t.onerror=function(e){console.log(e)}}render(){return e("div",{class:"st_wid_100"},this.currentFile?e("div",{class:"st_allContent"},e("div",null,""==this.endpoint?"No endpoint given.":0==this.upload?"Ready to upload":null),e("slot",{name:"file-preview"},e("div",{class:"st_image"},e("img",{src:this.currentFile.src,class:"st_wid_100"}),this.errors?e("div",{class:"overlay_error"}," ",this.errors," "):null)),e("div",{class:"st_barVDOcancel st_w_100"},e("div",{class:"st_row st_bg"},e("div",{class:"st_wid_15 tick"},1==this.currentFile.uploaded?e("a",{class:"st_closeBtn",innerHTML:"<img src='/assets/icon/checked.svg' />"}):1==this.currentFile.pause?e("a",{class:"st_closeBtn",innerHTML:"<img src='/assets/icon/upload-button.svg' >",onClick:()=>this.resumeAbortUploading()}," "):e("a",{class:"st_closeBtn",innerHTML:"<img src='/assets/icon/pause.svg'/>",onClick:()=>this.resumeAbortUploading()})),e("div",{class:"st_right_sec"},e("div",{class:"file_name"},e("p",{class:"upload-name"},"  ",this.currentFile.name.slice(0,15)),e("div",{class:"st_wid_18"},e("a",{class:"fnt-14"},this.currentFile.progress.percentage))),e("div",{class:"st_wid_52"},e("slot",{name:"progress"},e("div",{class:"st_progress-bar"},e("div",{class:"st_loaded",style:{width:this.currentFile.progress.percentage}})))),e("div",{class:"st_wid_15 cancel",onClick:()=>this.cancelUpload()},e("slot",{name:"cancel-Button"},e("a",{class:"st_closeBtn"},e("img",{src:"/assets/icon/close-circle.svg"})))))))):null)}static get is(){return"cwc-upload-item"}static get properties(){return{currentFile:{state:!0},endpoint:{type:"Any",attr:"endpoint"},errors:{state:!0},file:{type:String,attr:"file"},fileProvided:{type:"Any",attr:"file-provided"},refreshState:{state:!0},timer:{state:!0},upload:{type:Boolean,attr:"upload",mutable:!0},uploadObj:{state:!0},value:{type:String,attr:"value"}}}static get events(){return[{name:"error",method:"error",bubbles:!0,cancelable:!0,composed:!0},{name:"cancelEvent",method:"cancelEvent",bubbles:!0,cancelable:!0,composed:!0},{name:"progress",method:"progress",bubbles:!0,cancelable:!0,composed:!0},{name:"save",method:"save",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".app-profile,.file-chooser{padding:10px}.st_uploaded_file cwc-upload-item.hydrated{max-width:400px;padding:13px;width:400px}button{background:#5851ff;color:#fff;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;-webkit-box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;-webkit-transition:all .15s ease;transition:all .15s ease;cursor:pointer}.play-pause-btn{background:0 0;max-width:30px;margin:0;padding:0;-webkit-box-shadow:0 0;box-shadow:0 0}.play-pause-btn img{width:100%}button:hover{-webkit-box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);-webkit-transform:translateY(1px);transform:translateY(1px)}div#drag-drop-area{position:relative;margin-bottom:15px}h6.water-mark{position:absolute;top:50%;left:37%;display:block!important;font-weight:400;font-size:1.15em!important;margin-bottom:5px!important}#image-list{width:100%;max-height:15%;padding-bottom:6px}#image-list img{width:50px;height:50px;padding:5px}#myProgress{width:100%;background-color:#ddd}#myProgress div{width:1%;height:2px;background-color:#4caf50}.progress-footer{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;text-align:center;padding-top:5px}.progress-footer span{margin:auto;text-align:center;padding-left:8px;font-size:15px}.progress-list{padding:7px;background:#f1f1f1;margin-bottom:8px}.file-name{padding:7px 7px 7px 0;color:#7421da}body{font-family:Montserrat,sans-serif;font-weight:700;padding:0;margin:0;-webkit-font-smoothing:antialiased}.st_row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.st_container{width:100%;margin:auto;max-width:1170px}.st_w_100{width:100%}.st_wid_100{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.st_wid_20{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:100%;padding:15px;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_70{-webkit-box-flex:0;-ms-flex:0 0 70%;flex:0 0 70%;max-width:70%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_52{-webkit-box-flex:0;-ms-flex:0 0 51%;flex:0 0 51%;max-width:51%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_wid_18{-webkit-box-flex:0;-ms-flex:0 0 18%;flex:0 0 18%;max-width:18%;-webkit-box-sizing:border-box;box-sizing:border-box;margin-right:2px}.st_wid_15{-webkit-box-flex:0;-ms-flex:0 0 15%;flex:0 0 15%;max-width:15%;-webkit-box-sizing:border-box;box-sizing:border-box}.st_content_align_center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:center;align-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%}.st_text-center{text-align:center}.st_barVDOcancel .st_progress-bar{height:7px;width:100%;background:#d3d3d3;margin:5px 0 13px}.st_loaded{height:100%;background:#2391ff;-webkit-animation:3s linear infinite loading;animation:3s linear infinite loading;-webkit-transform-origin:0;transform-origin:0}.uploaded_images{margin-top:45px}a.st_closeBtn{display:inline-block;cursor:pointer}a.st_closeBtn img{width:20px}.st_image{border:1px solid #eee;height:150px;vertical-align:middle;position:relative}.st_image img{height:auto;width:auto;max-height:100px;position:absolute;left:0;right:0;margin:auto;top:50%;-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}.st_uploaded_file .st_bg{background:#fff;-webkit-box-shadow:0 4px 17px rgba(196,221,255,.8);box-shadow:0 4px 17px rgba(196,221,255,.8);padding:0;position:relative}.st_uploaded_file .st_wid_15{border-right:1px solid #daecff;margin-right:20px}.video-play-button{position:relative;z-index:10;top:50%;left:20px;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:32px;height:44px;border-radius:50%;padding:5px}.video-play-button:before{content:\"\";position:absolute;z-index:0;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);display:block;width:20px;height:20px;background:#ba1f24;border-radius:50%;-webkit-animation:1.5s ease-out infinite pulse-border;animation:1.5s ease-out infinite pulse-border}.video-play-button:after{content:\"\";position:absolute;z-index:1;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);display:block;width:20px;height:20px;background:#fa183d;border-radius:50%;-webkit-transition:all .2s;transition:all .2s}.video-play-button:hover:after{background-color:#da0528}.video-play-button img{position:relative;z-index:3;max-width:100%;width:auto;height:auto}.video-play-button span{display:block;position:relative;z-index:3;width:0;height:0;border-left:8px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent;top:17px;left:14px}\@-webkit-keyframes pulse-border{0%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);opacity:1}100%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);opacity:0}}\@keyframes pulse-border{0%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1);opacity:1}100%{-webkit-transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);transform:translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);opacity:0}}.video-overlay{position:fixed;z-index:-1;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.8);opacity:0;-webkit-transition:all ease .5s;transition:all ease .5s}.video-overlay.open{position:fixed;z-index:1000;opacity:1}.video-overlay-close{position:absolute;z-index:1000;top:15px;right:20px;font-size:36px;line-height:1;font-weight:400;color:#fff;text-decoration:none;cursor:pointer;-webkit-transition:all .2s;transition:all .2s}.video-overlay-close:hover{color:#fa183d}.video-overlay iframe{position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-box-shadow:0 0 15px rgba(0,0,0,.75);box-shadow:0 0 15px rgba(0,0,0,.75)}.st_allContent{position:relative}.overlay_error{position:absolute;top:0;height:100%;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-line-pack:center;align-content:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#ff0202;font-size:14px;font-weight:400;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.upload-name{font-weight:400;margin:1px}.fnt-14{font-size:14px}.st_right_sec{width:80%;display:inline-block;padding-top:0}.st_wid_15.cancel a.st_closeBtn{padding-top:0}.st_wid_15.cancel{border:none;position:absolute;right:-5px;top:-8px;margin:0}.file_name{width:100%;float:left;text-align:left;margin:7px 0 5px}.file_name p.upload-name{display:inline-block}.file_name .st_wid_18{margin-left:10px;display:inline-block}.st_wid_15.tick{position:relative}.tick a.st_closeBtn{position:absolute;top:50%;left:0;right:0;-webkit-transform:translate(0,-50%);transform:translate(0,-50%);padding:0}.st_barVDOcancel .st_wid_52{float:left;width:100%;display:block;max-width:95%}"}}export{t as CwcUploadItem};
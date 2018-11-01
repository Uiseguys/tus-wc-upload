/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppRoot {
    constructor() {
        this.files = [];
        this.filesList = [];
        this.note = "Uploads List";
        this.refreshState = false;
    }
    errors(e) {
        console.log(e);
    }
    onFilesChosen(event) {
        this.files = event.detail;
        for (let i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            this.filesList = [...this.filesList, file];
        }
    }
    onError(e) {
        console.log(e.detail);
    }
    onprogress(e) {
        console.log(e.detail);
    }
    onCancel(e) {
        let index = this.filesList.findIndex(x => x.name == e.detail.name && x.size == e.detail.size);
        if (index > -1) {
            this.filesList.splice(index, 1);
        }
        this.refreshState = !this.refreshState;
    }
    // fileProvided(file,i) {
    //   return this.filesList[i]
    // }               
    componentDidLoad() {
    }
    getFilesFromStorage() {
        // let files = JSON.parse(localStorage.getItem("files"));
    }
    render() {
        this.getFilesFromStorage();
        // const arr = ['image/*', '.jpg', '.jpeg', '.png', '.gif'];
        return (h("div", null,
            h("header", null,
                h("h1", null, "File Upload Library with Stencil Js")),
            h("div", { class: "st_mainPage" },
                h("cwc-file-chooser", { allowDrop: "true", allowClick: "true", allowMultiple: "true" }),
                h("div", { class: "st_container" },
                    h("div", { class: "st_content_align_center" },
                        h("div", { class: "st_uploaded_file st_w_100 st_text-center" },
                            h("div", { class: "uploaded_images" },
                                h("div", { class: "st_row" }, this.filesList.length > 0 ?
                                    this.filesList.map((file) => h("cwc-upload-item", { fileProvided: file, endpoint: "https://master.tus.io/files/", file: "Blob", upload: true, value: this.note }))
                                    : "No files Added"))))))));
    }
    static get is() { return "app-main"; }
    static get properties() { return {
        "errors": {
            "method": true
        },
        "files": {
            "state": true
        },
        "filesList": {
            "state": true
        },
        "note": {
            "state": true
        },
        "refreshState": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "filesChosen",
            "method": "onFilesChosen"
        }, {
            "name": "errors",
            "method": "onError"
        }, {
            "name": "progress",
            "method": "onprogress"
        }, {
            "name": "cancelEvent",
            "method": "onCancel"
        }]; }
    static get style() { return "header {\n  background: #5851ff;\n  color: white;\n  height: 56px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n}\n\nh1 {\n  font-size: 1.4rem;\n  font-weight: 500;\n  color: #fff;\n  padding: 0 12px;\n}\n.column {\n  width: 40%;\n  float: left;\n  padding: 5%;\n}\n.UppyInput-Progress{\n  width: 90%;\n  clear: both;\n  padding:0 5%;\n}\n\n.app-profile {\n  padding: 10px;\n}\n\n.file-chooser {\n  padding: 10px;\n}\n\nbutton {\n  background: #5851ff;\n  color: white;\n  margin: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 16px 20px;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  outline: 0;\n  letter-spacing: 0.04em;\n  -webkit-transition: all 0.15s ease;\n  transition: all 0.15s ease;\n  cursor: pointer;\n}\n\n.play-pause-btn {\n  background: transparent;\n  max-width: 30px;\n  margin: 0px;\n  padding: 0px;\n  -webkit-box-shadow: 0 0 0 0;\n  box-shadow: 0 0 0 0;\n}\n.play-pause-btn img {\n  width: 100%;\n}\n\nbutton:hover {\n  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n  -webkit-transform: translateY(1px);\n  transform: translateY(1px);\n}\ndiv#drag-drop-area {\n  position: relative;\n  margin-bottom: 15px;\n}\n\nh6.water-mark {\n  position: absolute;\n  top: 50%;\n  left: 37%;\n  display: block !important;\n  font-weight: normal;\n  font-size: 1.15em !important;\n  margin-bottom: 5px !important;\n}\n#image-list {\n  width: 100%;\n  max-height: 15%;\n  padding-bottom: 6px;\n}\n#image-list img {\n  width: 50px;\n  height: 50px;\n  padding: 5px;\n}\n#myProgress {\n  width: 100%;\n  background-color: #ddd;\n}\n\n#myProgress div {\n  width: 1%;\n  height: 2px;\n  background-color: #4caf50;\n}\n.progress-footer {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  text-align: center;\n  padding-top: 5px;\n}\n.progress-footer span {\n  margin: auto;\n  text-align: center;\n  padding-left: 8px;\n  font-size: 15px;\n}\n.progress-list {\n  padding: 7px;\n  background: #f1f1f1;\n  margin-bottom: 8px;\n}\n.file-name {\n  padding: 7px;\n  padding-left: 0px;\n  color: #7421da;\n}\nbody {\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: bold;\n  padding: 0;\n  margin: 0px;\n  -webkit-font-smoothing: antialiased;\n}\n\n/*****************************************\n design styles\n******************************************/\n\n.st_row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.st_container {\n  width: 100%;\n  margin: auto;\n  max-width: 1170px;\n}\n.st_w_100 {\n  width: 100%;\n}\n.st_wid_100 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n\n.st_wid_70 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 70%;\n  flex: 0 0 70%;\n  max-width: 70%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.st_wid_15 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 15%;\n  flex: 0 0 15%;\n  max-width: 15%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.st_content_align_center {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n}\n.st_text-center {\n  text-align: center;\n}\n\n.st_progress-bar {\n  height: 4px;\n  width: 100%;\n  background: lightgray;\n  margin-top: 25px;\n}\n.st_loaded {\n  height: 100%;\n  background: #444;\n  -webkit-animation: 3s linear infinite loading;\n  animation: 3s linear infinite loading;\n  -webkit-transform-origin: 0%;\n  transform-origin: 0%;\n}\n.uploaded_images {\n  margin-top: 45px;\n}\na.st_closeBtn {\n  padding-top: 16px;\n  display: inline-block;\n  cursor: pointer;\n}\na.st_closeBtn img{\n  width: 20px;\n}\n.st_image {\n  border: 1px solid #eee;\n  position: relative;\n}\n\n.st_bg {\n  background: #f6f6f6;\n  padding: 0 10px;\n}\n.video-play-button {\n  position: relative;\n  z-index: 10;\n  top: 50%;\n  left: 20px;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  display: block;\n  width: 32px;\n  height: 44px;\n  /* background: #fa183d; */\n  border-radius: 50%;\n  padding: 5px;\n}\n.video-play-button:before {\n  content: \"\";\n  position: absolute;\n  z-index: 0;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  display: block;\n  width: 20px;\n  height: 20px;\n\n  background: #ba1f24;\n  border-radius: 50%;\n  -webkit-animation: pulse-border 1500ms ease-out infinite;\n  animation: pulse-border 1500ms ease-out infinite;\n}\n.video-play-button:after {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  display: block;\n  width: 20px;\n  height: 20px;\n\n  background: #fa183d;\n  border-radius: 50%;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\n\n.video-play-button:hover:after {\n  background-color: #da0528;\n}\n.video-play-button img {\n  position: relative;\n  z-index: 3;\n  max-width: 100%;\n  width: auto;\n  height: auto;\n}\n.video-play-button span {\n  display: block;\n  position: relative;\n  z-index: 3;\n  width: 0;\n  height: 0;\n  border-left: 8px solid #fff;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  top: 17px;\n  left: 14px;\n}\n\@-webkit-keyframes pulse-border {\n  0% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0)\n      scale(1.5);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n    opacity: 0;\n  }\n}\n\n\@keyframes pulse-border {\n  0% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0)\n      scale(1.5);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n    opacity: 0;\n  }\n}\n.video-overlay {\n  position: fixed;\n  z-index: -1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  -webkit-transition: all ease 500ms;\n  transition: all ease 500ms;\n}\n.video-overlay.open {\n  position: fixed;\n  z-index: 1000;\n  opacity: 1;\n}\n.video-overlay-close {\n  position: absolute;\n  z-index: 1000;\n  top: 15px;\n  right: 20px;\n  font-size: 36px;\n  line-height: 1;\n  font-weight: 400;\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\n.video-overlay-close:hover {\n  color: #fa183d;\n}\n.video-overlay iframe {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  /* width: 90%; */\n  /* height: auto; */\n  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n}\n\n\n.st_allContent {\n  position: relative;\n}\n.overlay_error {\n  position: absolute;\n  top: 0;\n  height: 100%;\n  background:#313030e6;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  color: #fff;\n  font-size: 14px;\n  font-weight: normal;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.upload-name{\n  font-weight: normal;\n  margin: 1px;\n}\ncwc-upload-item.hydrated {\n  width: auto;\n  max-width: 20%;\n  padding: 13px;\n}"; }
}

class AppChooser {
    constructor() {
        this.allowDrop = "true";
        this.allowClick = "true";
        this.allowMultiple = "true";
        this.accept = [];
        this.file = [];
        this.error = [];
        this.currentFiles = [];
        this.upload = [];
        this.stringsText = "";
    }
    componentDidLoad() {
        this.initDragDropArea();
    }
    initDragDropArea() {
        if (this.allowDrop == "true" && this.allowClick == "true") {
            this.stringsText = this.allowMultiple == "true" ? "Please drop files here or " : "Please drop file or ";
        }
        else if (this.allowDrop == "true" && this.allowClick == "false") {
            this.stringsText = this.allowMultiple == "true" ? "Please drop files" : "Please drop file";
        }
        else if (this.allowDrop == "false" && this.allowClick == "true") {
            this.stringsText = "";
        }
        else {
            this.stringsText = "Please allow drop or allow Click";
        }
    }
    handleChange(e) {
        this.currentFiles = [];
        this.addedFiles(e.target.files);
        this.push.emit(e);
    }
    drop(e) {
        e.preventDefault();
        if (this.allowMultiple == "true") {
            this.addedFiles(e.dataTransfer.files);
        }
        else {
            if (e.dataTransfer.files.length > 1) {
                this.errorHandler("You can upload single file at a time.");
                let passedFiles = [];
                passedFiles = [...passedFiles, e.dataTransfer.files[0]];
                this.addedFiles(passedFiles);
            }
            else {
                this.addedFiles(e.dataTransfer.files);
            }
        }
    }
    addedFiles(files) {
        var hit;
        if (this.accept == [] || this.accept.length == 0 || this.accept == null) {
            this.filesChosen.emit(files);
        }
        else {
            let checkedFile = [];
            for (let j = 0; j < files.length; j++) {
                hit = false;
                for (let i = 0; i < this.accept.length; i++) {
                    if (this.formatValidator(this.accept[i], files[j].type) == true) {
                        hit = true;
                        checkedFile = [...checkedFile, files[j]];
                        break;
                    }
                }
                if (hit == false) {
                    this.errorHandler("Please select the file of required format.");
                }
            }
            this.filesChosen.emit(checkedFile);
        }
    }
    formatValidator(accept, incoming) {
        accept = accept.slice(accept.indexOf(".") + 1, accept.length);
        incoming = incoming.slice(incoming.indexOf("/") + 1, incoming.length);
        if (accept == incoming) {
            return true;
        }
        else {
            return false;
        }
    }
    allowDropFile(ev) {
        if (this.allowDrop == "true") {
            ev.preventDefault();
        }
    }
    errorHandler(error) {
        this.error = [...this.error, error];
        let timer;
        clearInterval(timer);
        timer = setInterval(() => {
            this.error = [];
        }, 5000);
    }
    render() {
        var multiple = this.allowMultiple == "true" ? true : false;
        return ([
            h("div", { class: "st_container" },
                h("div", { class: "st_top_50 dashed-border", onDrop: e => this.drop(e), onDragOver: e => this.allowDropFile(e) },
                    h("div", { class: "st_file_contain st_text-center" },
                        h("div", { class: "st_file_icon" },
                            h("div", { class: "st_scb-drop-area" },
                                h("img", { src: "/assets/icon/arrow-pointing-up.svg" }))),
                        h("div", { class: "st_scb-fi-default-label" },
                            h("slot", { name: "drop-target" },
                                h("p", null,
                                    this.stringsText,
                                    " ")),
                            h("slot", { name: "text" })),
                        this.allowClick == "true" ?
                            h("div", { class: "st_file-upload" },
                                h("slot", { name: "dialog-trigger" },
                                    h("label", { class: "st_file-upload__label" },
                                        "Choose",
                                        this.allowMultiple == "true" ? " Files" : " File")),
                                h("input", { id: "upload", class: "st_file-upload__input", type: "file", onChange: e => this.handleChange(e), accept: this.accept.toString(), multiple: multiple }))
                            : null,
                        h("div", { class: "st_scb-fi-default-error" }, this.error.map((err) => h("p", { class: "error_one" },
                            h("img", { src: "/assets/icon/error-triangle.svg" }),
                            err,
                            " "))))))
        ]);
    }
    static get is() { return "cwc-file-chooser"; }
    static get properties() { return {
        "accept": {
            "type": "Any",
            "attr": "accept"
        },
        "allowClick": {
            "type": String,
            "attr": "allow-click"
        },
        "allowDrop": {
            "type": String,
            "attr": "allow-drop"
        },
        "allowMultiple": {
            "type": String,
            "attr": "allow-multiple"
        },
        "currentFiles": {
            "state": true
        },
        "error": {
            "state": true
        },
        "file": {
            "state": true
        },
        "stringsText": {
            "state": true
        },
        "upload": {
            "state": true
        },
        "uppy": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "push",
            "method": "push",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "filesChosen",
            "method": "filesChosen",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/* .file-chooser {\n  padding: 10px;\n}\n\nbutton {\n  background: #5851ff;\n  color: white;\n  margin: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 16px 20px;\n  border-radius: 2px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  outline: 0;\n  letter-spacing: 0.04em;\n  transition: all 0.15s ease;\n  cursor: pointer;\n}\n\n.play-pause-btn {\n  background: transparent;\n  max-width: 30px;\n  margin: 0px;\n  padding: 0px;\n  box-shadow: 0 0 0 0;\n}\n.play-pause-btn img {\n  width: 100%;\n}\n\nbutton:hover {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n  transform: translateY(1px);\n}\ndiv#drag-drop-area {\n  width: 150px;\n  height: 150px;\n  background: #4caf50;\n  position: relative;\n  margin-bottom: 15px;\n}\n\nh6.water-mark {\n  position: absolute;\n  top: 50%;\n  left: 37%;\n  display: block !important;\n  font-weight: normal;\n  font-size: 1.15em !important;\n  margin-bottom: 5px !important;\n}\n#image-list {\n  width: 100%;\n  max-height: 15%;\n  padding-bottom: 6px;\n}\n#image-list img {\n  width: 50px;\n  height: 50px;\n  padding: 5px;\n}\n#myProgress {\n  width: 100%;\n  background-color: #ddd;\n}\n\n#myProgress div {\n  width: 1%;\n  height: 2px;\n  background-color: #4caf50;\n}\n.progress-footer {\n  display: inline-flex;\n  text-align: center;\n  padding-top: 5px;\n}\n.progress-footer span {\n  margin: auto;\n  text-align: center;\n  padding-left: 8px;\n  font-size: 15px;\n}\n.progress-list {\n  padding: 7px;\n  background: #f1f1f1;\n  margin-bottom: 8px;\n}\n.file-name{\n  padding: 7px;\n  padding-left: 0px;\n  color: #7421da;\n} */\nbody {\n  font-family: \"Montserrat\", sans-serif;\n  padding: 0;\n  margin: 0px;\n  -webkit-font-smoothing: antialiased;\n}\n\n/*****************************************\n design styles\n******************************************/\n\n.st_row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.st_container {\n  width: 100%;\n  margin: auto;\n  max-width: 1170px;\n}\n.st_w_100 {\n  width: 100%;\n}\n.st_wid_100 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n.st_wid_20 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 20%;\n  flex: 0 0 20%;\n  max-width: 20%;\n}\n\n.st_content_align_center {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n}\n.st_top_50 {\n  padding-top: 50px;\n  width: 31%;\n  margin: 15px auto;\n  padding: 26px;\n}\n.dashed-border {\n  border: 2px dashed #e8e4e4;\n}\n.st_text-center {\n  text-align: center;\n}\n.st_file-upload {\n  position: relative;\n  display: inline-block;\n  margin-top: 1rem;\n}\n\n.st_file-upload__label {\n  color: #fff;\n  background-color: #007bff;\n  padding: 1em 2em;\n  color: #fff;\n  border-radius: 2em;\n  -webkit-transition: background 0.3s;\n  transition: background 0.3s;\n}\n.st_file-upload__label:hover {\n  cursor: pointer;\n  background: #000;\n}\n\n.st_file-upload__input {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  font-size: 1;\n  width: 0;\n  height: 100%;\n  opacity: 0;\n}\n.st_scb-drop-area {\n  height: 80px;\n  width: 80px;\n  border: 3px solid #c7cfd7;\n  border-radius: 50%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  position: relative;\n  margin: auto;\n}\n.st_scb-drop-area:before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  display: block;\n  border-radius: 50%;\n  border: 1px solid #c7cfd7;\n  width: 80px;\n  height: 80px;\n  margin-left: -41px;\n  margin-top: -41px;\n  -webkit-animation: 1s ease-in infinite beforeWave;\n  animation: 1s ease-in infinite beforeWave;\n}\n.st_scb-drop-area img {\n  height: 63%;\n}\n\@-webkit-keyframes beforeWave {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.4;\n  }\n  20% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    opacity: 0.6;\n  }\n  40% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2);\n    opacity: 0.8;\n  }\n  60% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n    opacity: 0.9;\n  }\n  75% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.6);\n    transform: scale(1.6);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n\@keyframes beforeWave {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.4;\n  }\n  20% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    opacity: 0.6;\n  }\n  40% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2);\n    opacity: 0.8;\n  }\n  60% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n    opacity: 0.9;\n  }\n  75% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.6);\n    transform: scale(1.6);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n.st_file_icon {\n  margin-bottom: 20px;\n}\n.st_scb-fi-default-label p {\n  font-weight: normal;\n  color: #797979;\n}\n.st_file_contain st_text-center {\n  width: 33%;\n  margin: auto;\n  border: 4px dashed #eee;\n  padding: 49px 20px;\n}\np.error_one {\n  color: #f6183d;\n  font-weight: normal;\n  font-size: 12px;\n  width: 100%;\n}\np.error_one img{\n  \n    width: 15px;\n    opacity: 0.8;\n    position: relative;\n    top: 2px;\n    left: -4px;\n}\n\n.st_scb-fi-default-error {\n  margin-top: 35px !important;\n}\n.st_file-upload input[type=file] {\n  height: 50px !important;\n  width: 100% !important;\n  top: -16px;\n  border-radius: 46px;\n}"; }
}

class AppUploader {
    constructor() {
        this.endpoint = "";
        this.file = "Blob";
        this.upload = true;
        this.value = "";
        this.error = [];
        this.refreshState = false;
    }
    componentDidLoad() {
        this.init(this.fileProvided);
        window.addEventListener('online', () => {
            console.log("hit");
            this.uploader(this.currentFile);
        });
    }
    init(file) {
        file['pause'] = false;
        file['uploaded'] = false;
        file['progress'] = { bytesUploaded: 0, bytesTotal: file.size, percentage: "0%" };
        file['id'] = Date.now().toString() + file.name;
        this.currentFile = file;
        this.placeholderImage(file, file.type);
        if (this.upload == true) {
            this.uploader(this.currentFile);
        }
    }
    startUploads() {
        this.upload = true;
        this.uploader(this.currentFile);
    }
    uploader(file) {
        let self = this;
        if (file.pause == false) {
            this.uploadObj = new tus.Upload(file, {
                endpoint: this.endpoint,
                retryDelays: [0, 1000, 3000, 5000, 60000, 120000],
                metadata: {
                    filename: file.name,
                    filetype: file.type
                },
                onError: function (error) {
                    self.errorHandler(error);
                },
                onProgress: function (bytesUploaded, bytesTotal) {
                    var percentage = (Math.round((bytesUploaded * 100) / bytesTotal)).toString() + "%";
                    console.log(percentage);
                    self.progressHandler(percentage);
                },
                onSuccess: function () {
                    self.uploadSuccess();
                }
            });
            this.uploadObj.start();
        }
    }
    progressHandler(percentage) {
        this.currentFile.progress.percentage = percentage;
        this.refreshState = !this.refreshState;
    }
    uploadSuccess() {
        this.currentFile.uploaded = true;
        this.refreshState = !this.refreshState;
    }
    errorHandler(error) {
        console.log(error);
        this.fileProvided.pause = true;
        this.refreshState = !this.refreshState;
        this.error = [...this.error, error.tus];
        let timer;
        clearInterval(timer);
        timer = setInterval(() => {
            this.error = [];
        }, 3000);
        console.log("Failed because: " + error);
        this.errors.emit(this.error);
    }
    resumeAbortUploading(file) {
        this.currentFile.pause = !this.currentFile.pause;
        if (this.currentFile.pause == true) {
            this.uploadObj.abort();
        }
        else {
            this.uploadObj.start();
        }
        this.refreshState = !this.refreshState;
    }
    cancelUpload() {
        this.uploadObj.abort();
        this.refreshState = !this.refreshState;
        this.cancelEvent.emit(this.currentFile);
    }
    progress() {
    }
    placeholderImage(file, type) {
        let [first] = type.split('/');
        if (first == "image") {
            this.getBase64(file);
        }
        else {
            this.currentFile.src = "https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/thumbnail/thumbnail_placeholder_256.png";
        }
    }
    getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let self = this;
        reader.onload = function () {
            self.currentFile.src = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    render() {
        var resumeButton = "<img src='/assets/icon/play-button.svg' >";
        var pauseButton = "<img src='/assets/icon/pause-button.svg'/>";
        var check = "<img src='/assets/icon/checked.svg' />";
        return (h("div", { class: "st_wid_100" }, this.currentFile ?
            h("div", { class: "st_allContent" },
                h("div", null, this.endpoint == "" ? "No endpoint given." : this.upload == false ? "Ready to upload" :
                    null),
                h("slot", { name: "file-preview" },
                    h("div", { class: "st_image" },
                        h("img", { src: this.currentFile.src, class: "st_wid_100" }),
                        this.error[0] ? h("div", { class: "overlay_error" },
                            " ",
                            this.error[0],
                            " ") : null)),
                h("p", { class: "upload-name" },
                    "  ",
                    this.currentFile.name.slice(0, 15)),
                h("div", { class: "st_barVDOcancel st_w_100" },
                    h("div", { class: "st_row st_bg" },
                        h("div", { class: "st_wid_70" },
                            h("slot", { name: "progress" },
                                h("div", { class: "st_progress-bar" },
                                    h("div", { class: "st_loaded", style: { width: (this.currentFile.progress.percentage) } })))),
                        h("div", { class: "st_wid_15" }, this.currentFile.uploaded == true ?
                            h("a", { class: "st_closeBtn", innerHTML: check })
                            : this.currentFile.pause == true ?
                                h("a", { class: "st_closeBtn", innerHTML: resumeButton, onClick: () => this.resumeAbortUploading(this.currentFile) }, " ")
                                : h("a", { class: "st_closeBtn", innerHTML: pauseButton, onClick: () => this.resumeAbortUploading(this.currentFile) })),
                        h("div", { class: "st_wid_15", onClick: () => this.cancelUpload() },
                            h("slot", { name: "cancel-Button" },
                                h("a", { class: "st_closeBtn" },
                                    h("img", { src: "/assets/icon/cancel.svg" })))))))
            : null));
    }
    static get is() { return "cwc-upload-item"; }
    static get properties() { return {
        "currentFile": {
            "state": true
        },
        "endpoint": {
            "type": "Any",
            "attr": "endpoint"
        },
        "error": {
            "state": true
        },
        "file": {
            "type": String,
            "attr": "file"
        },
        "fileProvided": {
            "type": "Any",
            "attr": "file-provided"
        },
        "refreshState": {
            "state": true
        },
        "upload": {
            "type": Boolean,
            "attr": "upload",
            "mutable": true
        },
        "uploadObj": {
            "state": true
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get events() { return [{
            "name": "errors",
            "method": "errors",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "cancelEvent",
            "method": "cancelEvent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".app-profile {\n  padding: 10px;\n}\n\n.file-chooser {\n  padding: 10px;\n}\n\nbutton {\n  background: #5851ff;\n  color: white;\n  margin: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 16px 20px;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  outline: 0;\n  letter-spacing: 0.04em;\n  -webkit-transition: all 0.15s ease;\n  transition: all 0.15s ease;\n  cursor: pointer;\n}\n\n.play-pause-btn {\n  background: transparent;\n  max-width: 30px;\n  margin: 0px;\n  padding: 0px;\n  -webkit-box-shadow: 0 0 0 0;\n  box-shadow: 0 0 0 0;\n}\n.play-pause-btn img {\n  width: 100%;\n}\n\nbutton:hover {\n  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n  -webkit-transform: translateY(1px);\n  transform: translateY(1px);\n}\ndiv#drag-drop-area {\n  position: relative;\n  margin-bottom: 15px;\n}\n\nh6.water-mark {\n  position: absolute;\n  top: 50%;\n  left: 37%;\n  display: block !important;\n  font-weight: normal;\n  font-size: 1.15em !important;\n  margin-bottom: 5px !important;\n}\n#image-list {\n  width: 100%;\n  max-height: 15%;\n  padding-bottom: 6px;\n}\n#image-list img {\n  width: 50px;\n  height: 50px;\n  padding: 5px;\n}\n#myProgress {\n  width: 100%;\n  background-color: #ddd;\n}\n\n#myProgress div {\n  width: 1%;\n  height: 2px;\n  background-color: #4caf50;\n}\n.progress-footer {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  text-align: center;\n  padding-top: 5px;\n}\n.progress-footer span {\n  margin: auto;\n  text-align: center;\n  padding-left: 8px;\n  font-size: 15px;\n}\n.progress-list {\n  padding: 7px;\n  background: #f1f1f1;\n  margin-bottom: 8px;\n}\n.file-name {\n  padding: 7px;\n  padding-left: 0px;\n  color: #7421da;\n}\nbody {\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: bold;\n  padding: 0;\n  margin: 0px;\n  -webkit-font-smoothing: antialiased;\n}\n\n/*****************************************\n design styles\n******************************************/\n\n.st_row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.st_container {\n  width: 100%;\n  margin: auto;\n  max-width: 1170px;\n}\n.st_w_100 {\n  width: 100%;\n}\n.st_wid_100 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n.st_wid_20 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 20%;\n  flex: 0 0 20%;\n  max-width: 100%;\n  padding: 15px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.st_wid_70 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 70%;\n  flex: 0 0 70%;\n  max-width: 70%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.st_wid_15 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 15%;\n  flex: 0 0 15%;\n  max-width: 15%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.st_content_align_center {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n}\n.st_text-center {\n  text-align: center;\n}\n\n.st_progress-bar {\n  height: 4px;\n  width: 100%;\n  background: lightgray;\n  margin-top: 25px;\n}\n.st_loaded {\n  height: 100%;\n  background: #444;\n  -webkit-animation: 3s linear infinite loading;\n  animation: 3s linear infinite loading;\n  -webkit-transform-origin: 0%;\n  transform-origin: 0%;\n}\n.uploaded_images {\n  margin-top: 45px;\n}\na.st_closeBtn {\n  padding-top: 16px;\n  display: inline-block;\n  cursor: pointer;\n}\na.st_closeBtn img {\n  width: 20px;\n}\n.st_image {\n  width: 234px;\n  border: 1px solid #eee;\n  position: relative;\n}\n.st_image img {\n  height: 130px;\n  width: 100%;\n}\n\n.st_bg {\n  background: #f6f6f6;\n  padding: 0 10px;\n}\n.video-play-button {\n  position: relative;\n  z-index: 10;\n  top: 50%;\n  left: 20px;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  display: block;\n  width: 32px;\n  height: 44px;\n  /* background: #fa183d; */\n  border-radius: 50%;\n  padding: 5px;\n}\n.video-play-button:before {\n  content: \"\";\n  position: absolute;\n  z-index: 0;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  display: block;\n  width: 20px;\n  height: 20px;\n\n  background: #ba1f24;\n  border-radius: 50%;\n  -webkit-animation: pulse-border 1500ms ease-out infinite;\n  animation: pulse-border 1500ms ease-out infinite;\n}\n.video-play-button:after {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  display: block;\n  width: 20px;\n  height: 20px;\n\n  background: #fa183d;\n  border-radius: 50%;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\n\n.video-play-button:hover:after {\n  background-color: #da0528;\n}\n.video-play-button img {\n  position: relative;\n  z-index: 3;\n  max-width: 100%;\n  width: auto;\n  height: auto;\n}\n.video-play-button span {\n  display: block;\n  position: relative;\n  z-index: 3;\n  width: 0;\n  height: 0;\n  border-left: 8px solid #fff;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  top: 17px;\n  left: 14px;\n}\n\@-webkit-keyframes pulse-border {\n  0% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0)\n      scale(1.5);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n    opacity: 0;\n  }\n}\n\n\@keyframes pulse-border {\n  0% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0)\n      scale(1.5);\n    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n    opacity: 0;\n  }\n}\n.video-overlay {\n  position: fixed;\n  z-index: -1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  -webkit-transition: all ease 500ms;\n  transition: all ease 500ms;\n}\n.video-overlay.open {\n  position: fixed;\n  z-index: 1000;\n  opacity: 1;\n}\n.video-overlay-close {\n  position: absolute;\n  z-index: 1000;\n  top: 15px;\n  right: 20px;\n  font-size: 36px;\n  line-height: 1;\n  font-weight: 400;\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n}\n.video-overlay-close:hover {\n  color: #fa183d;\n}\n.video-overlay iframe {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  /* width: 90%; */\n  /* height: auto; */\n  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n}\n\n.st_allContent {\n  position: relative;\n}\n.overlay_error {\n  position: absolute;\n  top: 0;\n  height: 100%;\n  background: #313030e6;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  color: #fff;\n  font-size: 14px;\n  font-weight: normal;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.upload-name {\n  font-weight: normal;\n  margin: 1px;\n}"; }
}

export { AppRoot as AppMain, AppChooser as CwcFileChooser, AppUploader as CwcUploadItem };

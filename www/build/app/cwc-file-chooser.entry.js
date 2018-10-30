/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppChooser {
    constructor() {
        this.allowDrop = true;
        this.allowClick = true;
        this.allowMultiple = true;
        this.accept = [];
        this.error = [];
        this.stringsText = "";
    }
    componentDidLoad() {
        this.initDragDropArea();
    }
    /**
     * Intialize the view
     */
    initDragDropArea() {
        if (this.allowDrop == true && this.allowClick == true) {
            this.stringsText = this.allowMultiple == true ? "Please drop files here or " : "Please drop file or ";
        }
        else if (this.allowDrop == true && this.allowClick == false) {
            this.stringsText = this.allowMultiple == true ? "Please drop files" : "Please drop file";
        }
        else if (this.allowDrop == false && this.allowClick == true) {
            this.stringsText = "";
        }
        else {
            this.stringsText = "Please allow drop or allow Click";
        }
    }
    /**
     * Handle change event in files Input
     * @param e :Event
     */
    handleChange(e) {
        this.addedFiles(e.target.files);
    }
    /**
     * Handle Drop event
     * @param e :Event
     */
    drop(e) {
        e.preventDefault();
        if (this.allowMultiple == true) {
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
    /**
     * Emit the choosen file
     * @param files
     */
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
    /**
     * Check for file type to valid
     * @param accept
     * @param incoming
     */
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
    /**
     * Handle the allow drop event
     * @param ev :UIEvent
     */
    allowDropFile(ev) {
        if (this.allowDrop == true) {
            ev.preventDefault();
        }
    }
    /**
     * Handle All the errors
     * @param error :string
     */
    errorHandler(error) {
        this.error = [...this.error, error];
        let timer;
        clearInterval(timer);
        timer = setInterval(() => {
            this.error = [];
        }, 5000);
    }
    render() {
        var multiple = this.allowMultiple == true ? true : false;
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
                        this.allowClick == true ?
                            h("div", { class: "st_file-upload" },
                                h("slot", { name: "dialog-trigger" },
                                    h("label", { class: "st_file-upload__label" },
                                        "Choose",
                                        this.allowMultiple == true ? " Files" : " File")),
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
            "type": Boolean,
            "attr": "allow-click"
        },
        "allowDrop": {
            "type": Boolean,
            "attr": "allow-drop"
        },
        "allowMultiple": {
            "type": Boolean,
            "attr": "allow-multiple"
        },
        "error": {
            "state": true
        },
        "stringsText": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "filesChosen",
            "method": "filesChosen",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "body {\n  font-family: \"Montserrat\", sans-serif;\n  padding: 0;\n  margin: 0px;\n  -webkit-font-smoothing: antialiased;\n}\n\n/*****************************************\n design styles\n******************************************/\n\n.st_row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.st_container {\n  width: 100%;\n  margin: auto;\n  max-width: 1170px;\n}\n.st_w_100 {\n  width: 100%;\n}\n.st_wid_100 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n.st_wid_20 {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 20%;\n  flex: 0 0 20%;\n  max-width: 20%;\n}\n\n.st_content_align_center {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n}\n.st_top_50 {\n  padding-top: 50px;\n  width: 31%;\n  margin: 15px auto;\n  padding: 26px;\n}\n.dashed-border {\n  border: 2px dashed #e8e4e4;\n}\n.st_text-center {\n  text-align: center;\n}\n.st_file-upload {\n  position: relative;\n  display: inline-block;\n  margin-top: 1rem;\n}\n\n.st_file-upload__label {\n  color: #fff;\n  background-color: #007bff;\n  padding: 1em 2em;\n  color: #fff;\n  border-radius: 2em;\n  -webkit-transition: background 0.3s;\n  transition: background 0.3s;\n}\n.st_file-upload__label:hover {\n  cursor: pointer;\n  background: #000;\n}\n\n.st_file-upload__input {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  font-size: 1;\n  width: 0;\n  height: 100%;\n  opacity: 0;\n}\n.st_scb-drop-area {\n  height: 80px;\n  width: 80px;\n  border: 3px solid #c7cfd7;\n  border-radius: 50%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  position: relative;\n  margin: auto;\n}\n.st_scb-drop-area:before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  display: block;\n  border-radius: 50%;\n  border: 1px solid #c7cfd7;\n  width: 80px;\n  height: 80px;\n  margin-left: -41px;\n  margin-top: -41px;\n  -webkit-animation: 1s ease-in infinite beforeWave;\n  animation: 1s ease-in infinite beforeWave;\n}\n.st_scb-drop-area img {\n  height: 63%;\n}\n\@-webkit-keyframes beforeWave {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.4;\n  }\n  20% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    opacity: 0.6;\n  }\n  40% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2);\n    opacity: 0.8;\n  }\n  60% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n    opacity: 0.9;\n  }\n  75% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.6);\n    transform: scale(1.6);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n\@keyframes beforeWave {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.4;\n  }\n  20% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    opacity: 0.6;\n  }\n  40% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2);\n    opacity: 0.8;\n  }\n  60% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n    opacity: 0.9;\n  }\n  75% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5);\n    opacity: 0;\n  }\n  60% {\n    -webkit-transform: scale(1.6);\n    transform: scale(1.6);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n.st_file_icon {\n  margin-bottom: 20px;\n}\n.st_scb-fi-default-label p {\n  font-weight: normal;\n  color: #797979;\n}\n.st_file_contain st_text-center {\n  width: 33%;\n  margin: auto;\n  border: 4px dashed #eee;\n  padding: 49px 20px;\n}\np.error_one {\n  color: #f6183d;\n  font-weight: normal;\n  font-size: 12px;\n  width: 100%;\n}\np.error_one img{\n  \n    width: 15px;\n    opacity: 0.8;\n    position: relative;\n    top: 2px;\n    left: -4px;\n}\n\n.st_scb-fi-default-error {\n  margin-top: 35px !important;\n}\n.st_file-upload input[type=file] {\n  height: 50px !important;\n  width: 100% !important;\n  top: -16px;\n  border-radius: 46px;\n}\n\@media (max-width:480px){\n  .st_top_50 {\n    padding-top: 50px;\n    width: 90%;\n    margin: 15px auto;\n    padding: 15px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n}"; }
}

export { AppChooser as CwcFileChooser };

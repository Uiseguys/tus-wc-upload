/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppUploader {
    constructor() {
        this.endpoint = "";
        this.file = "Blob";
        this.indicator = "circular";
        this.upload = true;
        this.value = "";
        this.canvasId = Math.round(Math.random() * 111111).toString();
        this.errors = "";
        this.refreshState = {};
    }
    componentDidLoad() {
        // When we got existed file
        if (this.fileProvided.uploadObj) {
            this.uploadObj = this.fileProvided.uploadObj;
            if (this.fileProvided.progress == 100) {
                this.currentFile = this.uploadObj.file;
                this.uploadSuccess();
            }
            else {
                this.currentFile = this.fileProvided;
                // Refresh the state
                this.timer = setInterval(() => {
                    this.refreshState = Object.assign({}, this.refreshState);
                    this.drawProgress(this.activeProgress, this.currentFile.progress.percentage / 100);
                }, 1000);
            }
            // Draw the progress in circular 
            this.drawProgressMain();
        }
        else {
            // When we have new file
            this.init(this.fileProvided);
        }
    }
    /**
     * Initialise the new file
     * @param file
     */
    init(file) {
        file['pause'] = false;
        file['uploaded'] = false;
        file['progress'] = { bytesUploaded: 0, bytesTotal: file.size, percentage: 0 };
        file['id'] = Date.now().toString() + file.name;
        this.currentFile = file;
        this.placeholderImage(file, file.type);
        // check for the auto upload
        if (this.upload == true) {
            this.startUploads();
        }
        else {
            this.currentFile.pause = true;
            this.uploader(this.currentFile);
        }
    }
    // start the upload
    startUploads() {
        this.upload = true;
        this.uploader(this.currentFile);
    }
    /**
     * File uploader
     * @param file
     */
    uploader(file) {
        this.drawProgressMain();
        let self = this;
        this.uploadObj = new tus.Upload(file, {
            endpoint: this.endpoint,
            retryDelays: [0, 1000],
            metadata: {
                filename: file.name,
                filetype: file.type
            },
            onError: function (error) {
                self.errorHandler(error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                var percentage = (Math.round((bytesUploaded * 100) / bytesTotal));
                self.progressHandler(percentage);
            },
            onSuccess: function () {
                self.uploadSuccess();
            }
        });
        // check for the upload status
        if (file.pause == false) {
            this.uploadObj.start();
        }
        this.save.emit(this.uploadObj);
    }
    /**
     * Handle the progress of the upload
     * @param percentage
     */
    progressHandler(percentage) {
        this.drawProgress(this.activeProgress, percentage / 100);
        this.currentFile.progress.percentage = percentage;
        this.uploadObj.file = this.currentFile;
        this.refreshState = !this.refreshState;
        this.progress.emit(this.currentFile);
    }
    /**
     * Display the upload completion
     */
    uploadSuccess() {
        this.currentFile.uploaded = true;
        this.refreshState = !this.refreshState;
        clearInterval(this.timer);
    }
    /**
     * Handle Error in uploading
     * @param error
     */
    errorHandler(error) {
        console.log(error);
        this.currentFile.pause = true;
        this.refreshState = !this.refreshState;
        this.errors = "We got a server error, Please try again.";
        let timer;
        clearInterval(timer);
        timer = setTimeout(() => {
            this.errors = "";
        }, 30000);
        this.error.emit(this.errors);
    }
    /**
     * Handle Resume or Pause of the upload
     */
    resumeAbortUploading() {
        if (this.upload == true) {
            this.currentFile.pause = !this.currentFile.pause;
            if (this.currentFile.pause == true) {
                this.uploadObj.abort();
            }
            else {
                this.uploadObj.start();
            }
        }
        else {
            this.currentFile.pause = false;
            this.uploader(this.currentFile);
        }
        if (this.errors != "") {
            this.errors = "";
            this.save.emit(this.uploadObj);
        }
        this.refreshState = !this.refreshState;
    }
    /**
     * cancel the file upload
     */
    cancelUpload() {
        this.uploadObj.abort();
        this.refreshState = !this.refreshState;
        this.cancelEvent.emit(this.currentFile);
    }
    /**
     * Get the image for preview
     * @param file
     * @param type
     */
    placeholderImage(file, type) {
        let [first] = type.split('/');
        if (first == "image") {
            this.getBase64(file);
        }
        else {
            this.currentFile.src = "https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/thumbnail/thumbnail_placeholder_256.png";
        }
    }
    /**
     * Convert the Blob file to base64
     * @param file
     */
    getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let self = this;
        reader.onload = function () {
            self.currentFile.src = reader.result;
        };
        reader.onerror = function (error) {
            console.log(error);
        };
    }
    /**
     * This create the progress bar in circular
     */
    drawProgressMain() {
        var iProgress = document.getElementById('inactiveProgress' + this.canvasId);
        this.activeProgress = document.getElementById('activeProgress' + this.canvasId);
        var iProgressCTX = iProgress.getContext('2d');
        this.drawInactive(iProgressCTX);
    }
    /**
     * Draw the inactive faseed circle
     * @param iProgressCTX
     */
    drawInactive(iProgressCTX) {
        iProgressCTX.lineCap = 'square';
        //progress bar
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#e6e6e6';
        iProgressCTX.arc(75, 75, 74, 0, 2 * Math.PI);
        iProgressCTX.fill();
        //progressbar caption
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#fff';
        iProgressCTX.arc(75, 75, 67, 0, 2 * Math.PI);
        iProgressCTX.fill();
    }
    /**
     * Drow the progress
     * @param bar
     * @param percentage
     */
    drawProgress(bar, percentage) {
        var barCTX = bar.getContext("2d");
        var quarterTurn = Math.PI / 2;
        var endingAngle = ((2 * percentage) * Math.PI) - quarterTurn;
        var startingAngle = 0 - quarterTurn;
        bar.width = bar.width;
        barCTX.lineCap = 'square';
        barCTX.beginPath();
        barCTX.lineWidth = 6;
        barCTX.strokeStyle = '#037cff';
        barCTX.arc(75, 75, 70, startingAngle, endingAngle);
        barCTX.stroke();
    }
    render() {
        var resumeButton = "<img src='/assets/icon/upload-button.svg' >";
        var pauseButton = "<img src='/assets/icon/pause.svg'/>";
        var check = "<img src='/assets/icon/checked.svg' />";
        var indicator = this.indicator === "circular" ? "unset" : "none";
        return (h("div", { class: "st_wid_100", style: { width: "auto" } },
            h("div", { id: "page", class: "page", style: { display: indicator } },
                h("div", null, this.endpoint == "" ? "No endpoint given." : this.upload == false ? "Ready to upload" :
                    null),
                h("slot", { name: "progress" },
                    h("div", { class: "progress-bar" },
                        h("canvas", { id: "inactiveProgress" + this.canvasId, class: "progress-inactive", width: 150, height: 150 }),
                        h("canvas", { id: "activeProgress" + this.canvasId, class: "progress-active", width: 150, height: 150 }),
                        this.currentFile ?
                            h("p", { class: "progress-text" },
                                this.currentFile ? this.currentFile.progress.percentage + "%" : "loading",
                                h("br", null),
                                h("span", null, this.currentFile.uploaded == true ?
                                    "Completed"
                                    : this.currentFile.pause == true ?
                                        "Paused"
                                        : "Uploading"))
                            : null)),
                this.currentFile ?
                    h("div", { class: "bottm_sec" },
                        this.currentFile.uploaded == true ?
                            h("a", { class: " btm_in", innerHTML: check })
                            : this.currentFile.pause == true ?
                                h("a", { class: " btm_in", innerHTML: resumeButton, onClick: () => this.resumeAbortUploading() }, " ")
                                : h("a", { class: " btm_in", innerHTML: pauseButton, onClick: () => this.resumeAbortUploading() }),
                        h("p", { class: "btm_in" }, this.currentFile.name.slice(0, 15)),
                        h("div", { class: "clos btm_in", onClick: () => this.cancelUpload() },
                            h("slot", { name: "cancel-Button" },
                                h("img", { src: "/assets/icon/circle-close.png" }))))
                    : null),
            this.currentFile ?
                this.indicator == "linear" ?
                    h("div", { class: "st_allContent" },
                        h("div", null, this.endpoint == "" ? "No endpoint given." : this.upload == false ? "Ready to upload" :
                            null),
                        h("slot", { name: "file-preview" },
                            h("div", { class: "st_image" },
                                h("img", { src: this.currentFile.src, class: "st_wid_100" }),
                                this.errors ? h("div", { class: "overlay_error" },
                                    " ",
                                    this.errors,
                                    " ") : null)),
                        h("div", { class: "st_barVDOcancel st_w_100" },
                            h("div", { class: "st_row st_bg" },
                                h("div", { class: "st_wid_15 tick" }, this.currentFile.uploaded == true ?
                                    h("a", { class: "st_closeBtn", innerHTML: check })
                                    : this.currentFile.pause == true ?
                                        h("a", { class: "st_closeBtn", innerHTML: resumeButton, onClick: () => this.resumeAbortUploading() }, " ")
                                        : h("a", { class: "st_closeBtn", innerHTML: pauseButton, onClick: () => this.resumeAbortUploading() })),
                                h("div", { class: "st_right_sec" },
                                    h("div", { class: "file_name" },
                                        h("p", { class: "upload-name" },
                                            "  ",
                                            this.currentFile.name.slice(0, 15)),
                                        h("div", { class: "st_wid_18" },
                                            h("a", { class: "fnt-14" },
                                                this.currentFile.progress.percentage,
                                                "%"))),
                                    h("div", { class: "st_wid_52" },
                                        h("slot", { name: "progress" },
                                            h("div", { class: "st_progress-bar" },
                                                h("div", { class: "st_loaded", style: { width: (this.currentFile.progress.percentage + '%') } })))),
                                    h("div", { class: "st_wid_15 cancel", onClick: () => this.cancelUpload() },
                                        h("slot", { name: "cancel-Button" },
                                            h("a", { class: "st_closeBtn" },
                                                h("img", { src: "/assets/icon/close-circle.svg" }))))))))
                    :
                        null
                : null));
    }
    static get is() { return "cwc-upload-item"; }
    static get properties() { return {
        "barCTX": {
            "state": true
        },
        "canvasId": {
            "state": true
        },
        "currentFile": {
            "state": true
        },
        "endpoint": {
            "type": "Any",
            "attr": "endpoint"
        },
        "errors": {
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
        "indicator": {
            "type": String,
            "attr": "indicator"
        },
        "refreshState": {
            "state": true
        },
        "timer": {
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
            "name": "cancelEvent",
            "method": "cancelEvent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "error",
            "method": "error",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "progress",
            "method": "progress",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "save",
            "method": "save",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".app-profile {\n    padding: 10px;\n}\n\n.file-chooser {\n    padding: 10px;\n}\n\n.st_uploaded_file cwc-upload-item.hydrated {\n    max-width: 400px;\n    padding: 13px;\n    width: 400px;\n}\n\nbutton {\n    background: #5851ff;\n    color: white;\n    margin: 8px;\n    border: none;\n    font-size: 13px;\n    font-weight: 700;\n    text-transform: uppercase;\n    padding: 16px 20px;\n    border-radius: 2px;\n    -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n    outline: 0;\n    letter-spacing: 0.04em;\n    -webkit-transition: all 0.15s ease;\n    transition: all 0.15s ease;\n    cursor: pointer;\n}\n\n.play-pause-btn {\n    background: transparent;\n    max-width: 30px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-box-shadow: 0 0 0 0;\n    box-shadow: 0 0 0 0;\n}\n\n.play-pause-btn img {\n    width: 100%;\n}\n\nbutton:hover {\n    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);\n    -webkit-transform: translateY(1px);\n    transform: translateY(1px);\n}\n\ndiv#drag-drop-area {\n    position: relative;\n    margin-bottom: 15px;\n}\n\nh6.water-mark {\n    position: absolute;\n    top: 50%;\n    left: 37%;\n    display: block !important;\n    font-weight: normal;\n    font-size: 1.15em !important;\n    margin-bottom: 5px !important;\n}\n\n#image-list {\n    width: 100%;\n    max-height: 15%;\n    padding-bottom: 6px;\n}\n\n#image-list img {\n    width: 50px;\n    height: 50px;\n    padding: 5px;\n}\n\n#myProgress {\n    width: 100%;\n    background-color: #ddd;\n}\n\n#myProgress div {\n    width: 1%;\n    height: 2px;\n    background-color: #4caf50;\n}\n\n.progress-footer {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    text-align: center;\n    padding-top: 5px;\n}\n\n.progress-footer span {\n    margin: auto;\n    text-align: center;\n    padding-left: 8px;\n    font-size: 15px;\n}\n\n.progress-list {\n    padding: 7px;\n    background: #f1f1f1;\n    margin-bottom: 8px;\n}\n\n.file-name {\n    padding: 7px;\n    padding-left: 0px;\n    color: #7421da;\n}\n\nbody {\n    font-family: \"Montserrat\", sans-serif;\n    font-weight: bold;\n    padding: 0;\n    margin: 0px;\n    -webkit-font-smoothing: antialiased;\n}\n\n/*****************************************\n design styles\n******************************************/\n\n.st_row {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n}\n\n.st_container {\n    width: 100%;\n    margin: auto;\n    max-width: 1170px;\n}\n\n.st_w_100 {\n    width: 100%;\n}\n\n.st_wid_100 {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n}\n\n.st_wid_20 {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n    max-width: 100%;\n    padding: 15px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.st_wid_70 {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n    max-width: 70%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.st_wid_52 {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 51%;\n    flex: 0 0 51%;\n    max-width: 51%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.st_wid_18 {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 18%;\n    flex: 0 0 18%;\n    max-width: 18%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    margin-right: 2px;\n}\n\n.st_wid_15 {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n    max-width: 15%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.st_content_align_center {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 100%;\n}\n\n.st_text-center {\n    text-align: center;\n}\n\n.st_barVDOcancel .st_progress-bar {\n    height: 7px;\n    width: 100%;\n    background: lightgray;\n    margin: 5px 0 13px;\n}\n\n.st_loaded {\n    height: 100%;\n    background: #2391ff;\n    -webkit-animation: 3s linear infinite loading;\n    animation: 3s linear infinite loading;\n    -webkit-transform-origin: 0%;\n    transform-origin: 0%;\n}\n\n.uploaded_images {\n    margin-top: 45px;\n}\n\na.st_closeBtn {\n    display: inline-block;\n    cursor: pointer;\n}\n\na.st_closeBtn img {\n    width: 20px;\n}\n\n.st_image {\n    border: 1px solid #eee;\n    height: 150px;\n    vertical-align: middle;\n    position: relative;\n}\n\n.st_image img {\n    height: auto;\n    width: auto;\n    max-height: 100px;\n    position: absolute;\n    left: 0;\n    right: 0;\n    margin: auto;\n    top: 50%;\n    -webkit-transform: translate(0, -50%);\n    transform: translate(0, -50%);\n}\n\n.st_uploaded_file .st_bg {\n    background: #fff;\n    -webkit-box-shadow: 0 4px 17px rgba(196, 221, 255, 0.8);\n    box-shadow: 0 4px 17px rgba(196, 221, 255, 0.8);\n    padding: 0;\n    position: relative;\n}\n\n.st_uploaded_file .st_wid_15 {\n    border-right: 1px solid #daecff;\n    margin-right: 20px;\n}\n\n.video-play-button {\n    position: relative;\n    z-index: 10;\n    top: 50%;\n    left: 20px;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n    transform: translateX(-50%) translateY(-50%);\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    display: block;\n    width: 32px;\n    height: 44px;\n    /* background: #fa183d; */\n    border-radius: 50%;\n    padding: 5px;\n}\n\n.video-play-button:before {\n    content: \"\";\n    position: absolute;\n    z-index: 0;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n    transform: translateX(-50%) translateY(-50%);\n    display: block;\n    width: 20px;\n    height: 20px;\n    background: #ba1f24;\n    border-radius: 50%;\n    -webkit-animation: pulse-border 1500ms ease-out infinite;\n    animation: pulse-border 1500ms ease-out infinite;\n}\n\n.video-play-button:after {\n    content: \"\";\n    position: absolute;\n    z-index: 1;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n    transform: translateX(-50%) translateY(-50%);\n    display: block;\n    width: 20px;\n    height: 20px;\n    background: #fa183d;\n    border-radius: 50%;\n    -webkit-transition: all 200ms;\n    transition: all 200ms;\n}\n\n.video-play-button:hover:after {\n    background-color: #da0528;\n}\n\n.video-play-button img {\n    position: relative;\n    z-index: 3;\n    max-width: 100%;\n    width: auto;\n    height: auto;\n}\n\n.video-play-button span {\n    display: block;\n    position: relative;\n    z-index: 3;\n    width: 0;\n    height: 0;\n    border-left: 8px solid #fff;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    top: 17px;\n    left: 14px;\n}\n\n\@-webkit-keyframes pulse-border {\n    0% {\n        -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n        opacity: 1;\n    }\n    100% {\n        -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n        opacity: 0;\n    }\n}\n\n\@keyframes pulse-border {\n    0% {\n        -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);\n        opacity: 1;\n    }\n    100% {\n        -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);\n        opacity: 0;\n    }\n}\n\n.video-overlay {\n    position: fixed;\n    z-index: -1;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0.8);\n    opacity: 0;\n    -webkit-transition: all ease 500ms;\n    transition: all ease 500ms;\n}\n\n.video-overlay.open {\n    position: fixed;\n    z-index: 1000;\n    opacity: 1;\n}\n\n.video-overlay-close {\n    position: absolute;\n    z-index: 1000;\n    top: 15px;\n    right: 20px;\n    font-size: 36px;\n    line-height: 1;\n    font-weight: 400;\n    color: #fff;\n    text-decoration: none;\n    cursor: pointer;\n    -webkit-transition: all 200ms;\n    transition: all 200ms;\n}\n\n.video-overlay-close:hover {\n    color: #fa183d;\n}\n\n.video-overlay iframe {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n    transform: translateX(-50%) translateY(-50%);\n    /* width: 90%; */\n    /* height: auto; */\n    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n    box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n}\n\n.st_allContent {\n    position: relative;\n}\n\n.overlay_error {\n    position: absolute;\n    top: 0;\n    height: 100%;\n    background: #313030e6;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    color: #ff0202;\n    font-size: 14px;\n    font-weight: normal;\n    padding: 10px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.upload-name {\n    font-weight: normal;\n    margin: 1px;\n}\n\n.fnt-14 {\n    font-size: 14px;\n}\n\n.st_right_sec {\n    width: 80%;\n    display: inline-block;\n    padding-top: 0;\n}\n\n.st_wid_15.cancel a.st_closeBtn {\n    padding-top: 0;\n}\n\n.st_wid_15.cancel {\n    border: none;\n    position: absolute;\n    right: -5px;\n    top: -8px;\n    margin: 0;\n}\n\n.file_name {\n    width: 100%;\n    float: left;\n    text-align: left;\n    margin: 7px 0 5px;\n}\n\n.file_name p.upload-name {\n    display: inline-block;\n}\n\n.file_name .st_wid_18 {\n    margin-left: 10px;\n    display: inline-block;\n}\n\n.st_wid_15.tick {\n    position: relative;\n}\n\n.tick a.st_closeBtn {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    -webkit-transform: translate(0, -50%);\n    transform: translate(0, -50%);\n    padding: 0;\n}\n\n.st_barVDOcancel .st_wid_52 {\n    float: left;\n    width: 100%;\n    display: block;\n    max-width: 95%;\n}\n\n/* *************************************\n **********New Css********************\n ************************** */\n\n .page{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  width: 150px;\n  margin: 20px auto;\n}\n.progress-bar{\n	display: inline-block;\n	width: 150px;\n	height: 150px;\n	margin: 7px;\n  padding: 0;\n  position: relative;\n}\n.progress-bar .progress-active {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.progress-bar .progress-text {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  width: 150px;\n  top: 50%;\n  font-size: 39px;\n  font-weight: 500;\n  text-align: center;\n  line-height: 17px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n#progressControllerContainer{\n  position: absolute;\n  top: 320px;\n  padding: 10px 80px;\n}\n.progress-bar p span {\n  font-size: 15px;\n  text-transform: uppercase;\n} \n.bottm_sec img {\n  width: 20px;\n}\n.bottm_sec {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.bottm_sec p.btm_in {\n  margin: 0 10px;\n}\n\@media (max-width: 480px){\n.st_allContent .st_wid_15.cancel {\n  right: 5px;\n  top: 5px;\n}\n.st_allContent .st_right_sec {\n    width: 65%;\n}\n.st_allContent .st_wid_15 {\n  -ms-flex: 0 0 20%;\n  -webkit-box-flex: 0;\n  flex: 0 0 20%;\n  max-width: 20%;\n}\n}"; }
}

export { AppUploader as CwcUploadItem };

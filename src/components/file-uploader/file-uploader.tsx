import { Component, Prop, State, EventEmitter, Event, } from '@stencil/core';
declare var tus;

@Component({
  tag: 'cwc-upload-item',
  styleUrl: 'file-uploader.css',
})
export class AppUploader {

  @Prop() endpoint: String = "";
  @Prop() fileProvided: any;
  @Prop() file: string = "Blob";
  @Prop() indicator: string = "circular";
  @Prop({ mutable: true }) upload: boolean = true;
  @Prop() value: string = "";

  @Event() cancelEvent: EventEmitter;
  @Event() error: EventEmitter;
  @Event() progress: EventEmitter;
  @Event() save: EventEmitter;

  @State() barCTX: any;
  @State() currentFile: any;
  @State() canvasId = Math.round(Math.random() * 111111).toString();
  @State() errors: string = "";
  @State() refreshState: any = {};
  @State() timer: any;
  @State() uploadObj: any;
  activeProgress: any;

  componentDidLoad() {

    // When we got existed file
    if (this.fileProvided.uploadObj) {
      this.uploadObj = this.fileProvided.uploadObj;
      if (this.fileProvided.progress == 100) {
        this.currentFile = this.uploadObj.file;
        this.uploadSuccess();
      } else {
        this.currentFile = this.fileProvided;
        // Refresh the state
        this.timer = setInterval(() => {
          this.refreshState = { ...this.refreshState }
          this.drawProgress(this.activeProgress, this.currentFile.progress.percentage / 100);
        }, 1000)
      }

      // Draw the progress in circular 
      this.drawProgressMain()
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
    } else {
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
    this.drawProgressMain()
    let self = this;

    this.uploadObj = new tus.Upload(file, {
      endpoint: this.endpoint,
      retryDelays: [0, 1000],
      metadata: {
        filename: file.name,
        filetype: file.type
      },
      onError: function (error) {
        self.errorHandler(error)
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = (Math.round((bytesUploaded * 100) / bytesTotal))
        self.progressHandler(percentage)
      },
      onSuccess: function () {
        self.uploadSuccess()
      }
    })

    // check for the upload status
    if (file.pause == false) {
      this.uploadObj.start()
    }
    this.save.emit(this.uploadObj)
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
    this.progress.emit(this.currentFile)
  }

  /**
   * Display the upload completion
   */
  uploadSuccess() {
    this.currentFile.uploaded = true;
    this.refreshState = !this.refreshState;
    clearInterval(this.timer)
  }

  /**
   * Handle Error in uploading
   * @param error 
   */
  errorHandler(error) {
    console.log(error)
    this.currentFile.pause = true
    this.refreshState = !this.refreshState;
    this.errors = "We got a server error, Please try again.";
    let timer;
    clearInterval(timer)
    timer = setTimeout(() => {
      this.errors = "";
    }, 30000)
    this.error.emit(this.errors)
  }

  /**
   * Handle Resume or Pause of the upload
   */
  resumeAbortUploading() {
    if (this.upload == true) {
      this.currentFile.pause = !this.currentFile.pause;
      if (this.currentFile.pause == true) {
        this.uploadObj.abort();
      } else {
        this.uploadObj.start()
      }
    } else {
      this.currentFile.pause = false;
      this.uploader(this.currentFile)
    }
    if (this.errors != "") {
      this.errors = "";
      this.save.emit(this.uploadObj)
    }
    this.refreshState = !this.refreshState;
  }

  /**
   * cancel the file upload
   */
  cancelUpload() {
    this.uploadObj.abort()
    this.refreshState = !this.refreshState;
    this.cancelEvent.emit(this.currentFile);
  }

  /**
   * Get the image for preview
   * @param file 
   * @param type 
   */
  placeholderImage(file, type: string) {
    let [first] = type.split('/');
    if (first == "image") {
      this.getBase64(file);
    } else {
      this.currentFile.src = "https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/thumbnail/thumbnail_placeholder_256.png"
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
      console.log(error)
    };
  }

  /**
   * This create the progress bar in circular
   */
  drawProgressMain() {
    var iProgress: any = document.getElementById('inactiveProgress' + this.canvasId);
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
    var indicator = this.indicator === "circular" ? "unset" : "none"
    return (
      <div class="st_wid_100" style={{ width: "auto" }}>
        {/* Circlular Progress Bar */}
        <div id="page" class="page" style={{ display: indicator }}>
          <div>
            {this.endpoint == "" ? "No endpoint given." : this.upload == false ? "Ready to upload" :
              null}
          </div>
          <slot name="progress">
            <div class="progress-bar">
              <canvas id={"inactiveProgress" + this.canvasId} class="progress-inactive" width={150} height={150} ></canvas>
              <canvas id={"activeProgress" + this.canvasId} class="progress-active" width={150} height={150} ></canvas>
              {this.currentFile ?
                <p class="progress-text">{this.currentFile ? this.currentFile.progress.percentage + "%" : "loading"}
                  <br />
                  <span>
                    {this.currentFile.uploaded == true ?
                      "Completed"
                      : this.currentFile.pause == true ?
                        "Paused"
                        : "Uploading"
                    }

                  </span></p>
                : null}
            </div>
          </slot>
          {this.currentFile ?
            <div class="bottm_sec">
              {this.currentFile.uploaded == true ?
                <a class=" btm_in" innerHTML={check}></a>
                : this.currentFile.pause == true ?
                  <a class=" btm_in" innerHTML={resumeButton} onClick={() => this.resumeAbortUploading()}> </a>
                  : <a class=" btm_in" innerHTML={pauseButton} onClick={() => this.resumeAbortUploading()}></a>
              }

              <p class="btm_in">{this.currentFile.name.slice(0, 15)}</p>
              <div class="clos btm_in" onClick={() => this.cancelUpload()}>
                <slot name="cancel-Button"   >

                  <img src="/assets/icon/circle-close.png" />
                </slot>
              </div>
            </div>
            : null}
        </div>

        {/* Linear Progress bar */}
        {this.currentFile ?

          this.indicator == "linear" ?
            <div class="st_allContent">
              <div>
                {this.endpoint == "" ? "No endpoint given." : this.upload == false ? "Ready to upload" :
                  null}
              </div>
              <slot name="file-preview">
                <div class="st_image">
                  <img src={this.currentFile.src} class="st_wid_100" />
                  {this.errors ? <div class="overlay_error"> {this.errors} </div> : null}
                </div>
              </slot>
              <div class="st_barVDOcancel st_w_100">
                <div class="st_row st_bg">
                  <div class="st_wid_15 tick">
                    {this.currentFile.uploaded == true ?
                      <a class="st_closeBtn" innerHTML={check}></a>
                      : this.currentFile.pause == true ?
                        <a class="st_closeBtn" innerHTML={resumeButton} onClick={() => this.resumeAbortUploading()}> </a>
                        : <a class="st_closeBtn" innerHTML={pauseButton} onClick={() => this.resumeAbortUploading()}></a>
                    }
                  </div>
                  <div class="st_right_sec">
                    <div class="file_name">
                      <p class="upload-name">  {this.currentFile.name.slice(0, 15)}</p>
                      <div class="st_wid_18">
                        <a class="fnt-14" >
                          {this.currentFile.progress.percentage}%</a>
                      </div>
                    </div>
                    <div class="st_wid_52">
                      <slot name="progress">
                        <div class="st_progress-bar">
                          <div class="st_loaded" style={{ width: (this.currentFile.progress.percentage + '%') }}>
                          </div>
                        </div>
                      </slot>
                    </div>
                    <div class="st_wid_15 cancel" onClick={() => this.cancelUpload()}>
                      <slot name="cancel-Button"   >
                        <a class="st_closeBtn">
                          <img src="/assets/icon/close-circle.svg" />
                        </a>
                      </slot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            null
          : null
        }
      </div>
    )
  }
}

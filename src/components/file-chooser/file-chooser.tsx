import { Component, State, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'cwc-file-chooser',
  styleUrl: 'file-chooser.css'
})
export class AppChooser {

  @Prop() allowDrop: boolean = true;
  @Prop() allowClick: boolean = true;
  @Prop() allowMultiple: boolean = true;
  @Prop() accept: string[] = [];
  @Prop() acceptRatio: string[] = [];
  @Prop() maxWidth: number = null;
  @Prop() maxHeight: number = null;
  @Prop() minWidth: number = null;
  @Prop() minHeight: number = null;

  @Event() filesChosen: EventEmitter;
  @State() error: string[] = [];
  @State() stringsText: string = ""
  @State() passedFiles: any[];
  @State() validRatio: number[] = [];
  index = 0;

  componentDidLoad() {
    this.initDragDropArea();
    if (this.acceptRatio && this.acceptRatio.length > 0) {
      for (let i = 0; i < this.acceptRatio.length; i++) {
        let [width, height] = this.acceptRatio[i].split(':');
        let ratio = parseInt(width, 10) / parseInt(height, 10);
        ratio = parseFloat(ratio.toFixed(1))
        this.validRatio = [...this.validRatio, ratio];
      }
    }
  }

  /**
   * Intialize the view
   */
  initDragDropArea() {

    if (this.allowDrop == true && this.allowClick == true) {

      this.stringsText = this.allowMultiple == true ? "Please drop files here or " : "Please drop file or "

    } else if (this.allowDrop == true && this.allowClick == false) {

      this.stringsText = this.allowMultiple == true ? "Please drop files" : "Please drop file"

    } else if (this.allowDrop == false && this.allowClick == true) {

      this.stringsText = "";

    } else {

      this.stringsText = "Please allow drop or allow Click";

    }
  }

  /**
   * Handle change event in files Input
   * @param e :Event
   */
  handleChange(e) {
    this.addedFiles(e.target.files)
  }

  /**
   * Handle Drop event
   * @param e :Event
   */
  drop(e) {
    e.preventDefault();

    if (this.allowMultiple == true) {
      this.addedFiles(e.dataTransfer.files)

    } else {
      if (e.dataTransfer.files.length > 1) {
        this.errorHandler("You can upload single file at a time.")
        let passedFiles = []
        passedFiles = [...passedFiles, e.dataTransfer.files[0]]
        this.addedFiles(passedFiles);
      } else {
        this.addedFiles(e.dataTransfer.files)
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
      this.checkForSize(files)
    } else {
      let checkedFile = [];

      for (let j = 0; j < files.length; j++) {

        hit = false;

        for (let i = 0; i < this.accept.length; i++) {
          if (this.formatValidator(this.accept[i], files[j].type) == true) {
            hit = true
            checkedFile = [...checkedFile, files[j]]
            break;
          }
        }

        if (hit == false) {
          this.errorHandler("Please select the file of required format.")
        }
      }
      this.checkForSize(checkedFile)
    }
  }

  /**
   * Aspect Ratio and width or height validtion
   * @param files 
   */
  checkForSize(files) {
    this.passedFiles = []
    this.passedFiles = [...files];
    var self = this;

    if (self.maxWidth || self.maxHeight || self.minHeight || self.minWidth || self.validRatio.length > 0) {
      this.index = 0;
      this.fileLoop(this.passedFiles[this.index])
    }
    else {
      this.filesChosen.emit(this.passedFiles)
    }
  }

  /**
   * Loop for processing the files
   * @param file 
   */
  fileLoop(file) {
    if (file) {
      let [first] = file.type.split('/')
      var self = this;
      if (first === "image") {
        var _URL = window.URL;
        var img = new Image();
        img.onload = function () {
          var width = img.naturalWidth || img.width;
          var height = img.naturalHeight || img.height;

          var isValid = true;
          if (self.maxWidth && width > self.maxWidth) {
            isValid = false;
          }
          if (self.maxHeight && height > self.maxHeight) {
            isValid = false;
          }
          if (self.minHeight && height < self.minHeight) {
            isValid = false;
          }
          if (self.minWidth && width < self.minWidth) {
            isValid = false;
          }
          if (isValid === false) {
            self.errorHandler("Please select the file of given size limit.")
            return true;
          } else {
            if (self.validRatio && self.validRatio.length > 0) {
              var ratio = width / height;
              ratio = parseFloat(ratio.toFixed(1))

              for (let k = 0; k < self.validRatio.length; k++) {
                if (ratio === self.validRatio[k]) {
                  isValid = true;
                  break;
                } else {
                  isValid = false
                }
              }
              if (isValid === false) {
                self.errorHandler("Please select the file of given Aspect Ratio.")
                return false;
              } else {
                self.filesChosen.emit([file]);
                return true;
              }
            }
            else {
              self.filesChosen.emit([file]);
              return true;
            }
          }
        }

        img.onerror = function () {
          alert("not a valid file: " + file.type);
        };

        img.src = _URL.createObjectURL(file);
        setTimeout(() => {
          if (this.index < this.passedFiles.length) {
            this.index = this.index + 1;
            this.fileLoop(this.passedFiles[this.index]);
          }
        }, 1000);

      } else {
        self.filesChosen.emit([file]);
        if (this.index < this.passedFiles.length) {
          this.index = this.index + 1;
          this.fileLoop(this.passedFiles[this.index]);
        }
      }
    }
  }

  /**
   * Check for file type to valid
   * @param accept 
   * @param incoming 
   */
  formatValidator(accept: string, incoming: string): boolean {
    accept = accept.slice(accept.indexOf(".") + 1, accept.length);
    incoming = incoming.slice(incoming.indexOf("/") + 1, incoming.length)

    if (accept == incoming) {
      return true
    } else {
      return false
    }
  }

  /**
   * Handle the allow drop event
   * @param ev :UIEvent
   */
  allowDropFile(ev: UIEvent) {
    if (this.allowDrop == true) {
      ev.preventDefault();

    }
  }

  /**
   * Handle All the errors
   * @param error :string
   */
  errorHandler(error: string) {
    this.error = [...this.error, error];
    let timer;
    clearInterval(timer)
    timer = setInterval(() => {
      this.error = [];
    }, 5000)
  }

  render() {
    var multiple: boolean = this.allowMultiple == true ? true : false;
    return ([
      <div class="st_container">
        <div class="st_top_50 dashed-border" onDrop={e => this.drop(e)} onDragOver={e => this.allowDropFile(e)}>
          <div class="st_file_contain st_text-center">
            <div class="st_file_icon">
              <div class="st_scb-drop-area">
                <img src="/assets/icon/arrow-pointing-up.svg"></img>
              </div>
            </div>
            <div class="st_scb-fi-default-label">
              <slot name="drop-target">
                <p>{this.stringsText} </p>
              </slot>
              <slot name="text">
              </slot>
            </div>
            {
              this.allowClick == true ?
                <div class="st_file-upload">
                  <slot name="dialog-trigger">
                    <label class="st_file-upload__label">
                      Choose
                {this.allowMultiple == true ? " Files" : " File"}
                    </label>
                  </slot>
                  <input id="upload" class="st_file-upload__input" type="file" onChange={e => this.handleChange(e)} accept={this.accept.toString()} multiple={multiple} />
                </div>
                : null
            }
            <div class="st_scb-fi-default-error">
              {this.error.map((err) =>
                <p class="error_one"><img src="/assets/icon/error-triangle.svg" />{err} </p>
              )}
            </div>
          </div>
        </div>
      </div>
    ])
  }

}

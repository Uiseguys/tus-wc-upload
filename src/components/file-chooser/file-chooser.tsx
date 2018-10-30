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

  @Event() filesChosen: EventEmitter;
  @State() error: string[] = [];
  @State() stringsText: string = ""

  componentDidLoad() {
    this.initDragDropArea();
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
      this.filesChosen.emit(files);

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

      this.filesChosen.emit(checkedFile);
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

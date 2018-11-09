import { Component, Listen, State, Method, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'cwc-file-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  @State() files: any[] = [];
  @State() filesList: any[] = [];
  @State() note: string = "Uploads List";
  @State() refreshState: boolean = false;
  @Event() allFiles: EventEmitter;
  @Method() errors(e) {
    console.log(e)
  }
  @Listen('filesChosen')
  onFilesChosen(event) {
    this.files = event.detail;

    for (let i = 0; i < this.files.length; i++) {

      var file = this.files[i];
      file['uploadObj']=null

      this.filesList = [...this.filesList, file];
    }
  }

  @Listen('errors')
  onError(e) {
    console.log(e.detail)
  }
  @Listen('save')
  onSave(e) {
    console.log(e.detail)

  }

  @Listen('progress')
  onprogress() {
  }
  

  @Listen('cancelEvent')
  onCancel(e) {
    let index = this.filesList.findIndex(x => x.name == e.detail.name && x.size == e.detail.size);
    if (index > -1) {
      this.filesList.splice(index, 1);
    }
    this.refreshState = !this.refreshState
  }

  componentDidLoad() {
 
  }


  render() {
    // const arr = ['image/*', '.jpg', '.jpeg', '.png', '.gif'];

    return (
      <div>
        <div class="st_mainPage">
          <cwc-file-chooser
            allowDrop={true}
            allowClick={true}
            allowMultiple={true}
            maxHeight={null}
          // accept={arr}
          >

            {/* <div slot="drop-target">My custom Drop Target Text</div>
            <div slot="text">My custom Text</div>
            <label slot="dialog-trigger" class="st_file-upload__label">My custom Button Text</label> */}

          </cwc-file-chooser>
          <div class="st_container">

            <div class="st_content_align_center">

              <div class="st_uploaded_file st_w_100 st_text-center">

                <div class="uploaded_images">
                  <div class="st_row">

                    {/* <h4>{this.note}</h4> */}


                    {this.filesList.length > 0 ?
                      this.filesList.map((file) =>
                        <cwc-upload-item
                          fileProvided={file}
                          endpoint="https://master.tus.io/files/"
                          file="Blob"
                          upload={true}
                          value={this.note}
                        >
                          {/* <div slot="file-preview">
                          </div> */}

                          {/* <div slot="progress">
                            <div class="st_progress-bar">
                              <div class="st_loaded" style={{ width: (file.progress.percentage) }}>
                              </div>
                            </div>
                          </div>
                          <div slot="cancel-Button"  >
                            <a class="st_closeBtn">
                              <img src="/assets/icon/cancel.svg" />
                            </a>
                          </div> */}

                        </cwc-upload-item>

                      )
                      : "No files Added"}
                  </div>
                </div></div></div></div>
        </div>
        {/* <main class="row">

        <div class="column">

          <cwc-file-chooser
            allowDrop="false"
            allowClick="true"
            allowMultiple="true"
          >
          </cwc-file-chooser>

        </div>

        <div class="column">

          <cwc-upload-item
            fileProvided={this.files}
            endpoint="https://master.tus.io/files/"
          >
          </cwc-upload-item>
        </div>

        <div class="UppyInput-Progress"></div>

    </main>  */}

      </div >
    );
  }
}

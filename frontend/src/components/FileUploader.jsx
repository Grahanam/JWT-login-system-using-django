import axios from 'axios';
  
import React,{Component} from 'react';
  
class FileUploader extends Component {
   
    state = {
      selectedFile: null
    };
     
    
    onFileChange = event => {
     
      
      this.setState({ selectedFile: event.target.files[0] });
     
    };
     
    
    onFileUpload = () => {
     
      
      const formData = new FormData();
     
      
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
     
      
      console.log(this.state.selectedFile);
     
      
      axios.post("http://localhost:8000/api/imageresize/", formData)
      .then((res) => {
        alert("File Upload success");
        window.location.reload(false)
      })
      .catch((err) => alert("File Upload Error"));
    };
     
    
    fileData = () => {
     
      if (this.state.selectedFile) {
          
        return (
          <div>
            <h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p>
  
            <p>File Type: {this.state.selectedFile.type}</p>
  
            <p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
  
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
     
    render() {
     
      return (
        <div>
            <h1>
            Resize Image Using Pillow
            </h1>
            <h3>
              Thumbnail || Medium || Large || Grayscale
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
  
  export default FileUploader;
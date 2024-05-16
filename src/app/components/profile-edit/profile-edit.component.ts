import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/servvice/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  image:any=""
  profiledata = new FormGroup({
    name:new FormControl(""),
    email:new FormControl(""),
    mobilenumber:new FormControl(""),
    image:new FormControl("")
  })
  constructor(private profileService:ProfileService){}

  ngOninit(){

  }

  addprofile(){
    console.log(this.profiledata.value)
  }
  onFileSelected(event: any) {
    // debugger
    const selectedFile = event.target.files[0];

    this.convertToBinary(selectedFile);
  }
//   convertToBinary(file: File) {
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       const binaryString = e.target.result;
//       this.sendBinaryData(binaryString);
//     };
//     reader.readAsBinaryString(file)
// }
convertToBinary(file: File) {
  const reader = new FileReader();
  reader.onload = () => {
    this.image = reader.result as string; // Update image data
    // console.log(this.image)
  };

  reader.readAsDataURL(file);
}
sendBinaryData(binaryData: string) {

  // this.image=binaryData
  console.log('Binary image data:', this.image);
}


sendData(){
  this.profiledata.value.image = this.image;
  this.profileService.postdata(this.profiledata.value).subscribe(
    response => {
      console.log('Profile data posted successfully:', response);
    }
  );
}

}

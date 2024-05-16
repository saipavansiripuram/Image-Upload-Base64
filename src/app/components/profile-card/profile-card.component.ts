import { Component } from '@angular/core';
import { ProfileService } from 'src/app/servvice/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  profile:any;
  constructor(private profileService:ProfileService){

  }

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.profileService.postProfile().subscribe((data)=>{
      console.log(data)
      this.profile = data


    })
  }

}

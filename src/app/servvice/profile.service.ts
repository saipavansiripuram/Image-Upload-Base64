import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // getProfile(){
  //   return this.http.get('http://localhost:3000/api/items');
  // }

  updateProfile(id:any,newProfile:any){
    this.http.put('',newProfile)
  }
  postProfile(){
    return this.http.get(`https://localhost:7047/api/profile?id=${5}`);
  }
  postdata(data:any){
    return this.http.post("https://localhost:7047/api/profile/post",data )
  }
}

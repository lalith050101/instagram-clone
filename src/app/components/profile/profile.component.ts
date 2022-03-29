import { Component, OnInit } from '@angular/core';
import { PostHover } from 'src/app/core/interfaces/profile/post-hover';
import { User } from 'src/app/core/interfaces/user/user';
import { FileUpload } from 'src/app/core/models/file-upload';
import { FileUploadService } from 'src/app/core/services/media/file-upload.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { ToastNotificationService } from 'src/app/core/services/toaster/toast-notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  authenticatedUser: User={} as User;
  postDetails:PostHover[]=[];
  
  fileformat:string='';

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  
  isdisableok=false;
  
  hidechooseProfile:boolean=true;
  hideuploadProfile:boolean=true;

  constructor(private postservice:PostService,private uploadService: FileUploadService,private toaster:ToastNotificationService) {}

  ngOnInit(): void {
    this.getUser();
    
  }

  loadThumbnail(url:string){
    console.log("something");
    
    return url+'#t=20';
  }

  showPost(){
    this.postservice.showPost();
  }

  getUser() {
    this.authenticatedUser=JSON.parse(localStorage.getItem('user')!);
    console.log(this.authenticatedUser.id);
    
    this.postservice.viewProfilePosts(this.authenticatedUser.id).subscribe((data)=>{
       this.postDetails=data;
       console.log(this.postDetails);
       
    })
    
  }

  
  isImage(url: string) {
    return this.postservice.isImage(url);
  }

  showchooseProfile(){
    this.hidechooseProfile=false;
  }
  closechooseProfile(){
    this.hidechooseProfile=true;
  }
  closeuploadProfile(){
    this.hideuploadProfile=true;
  }


    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      if(this.selectedFiles){
        this.hidechooseProfile=true;
        this.hideuploadProfile=false;
    }

}

  uploadProfile(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        let count=0;
        this.uploadService.pushFileToStorage(this.currentFileUpload,this.authenticatedUser.id,'profile').subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            this.isdisableok=true;
            if(this.percentage==100){      
              this.hidechooseProfile=true;
              this.hideuploadProfile=true;
              if(count===0){
                this.toaster.showSuccess('Profile updated successfully','success')
                count=1;
              }
            this.isdisableok=false;

            }
          },
          error => {
            console.log(error);
            this.toaster.showError('Profile updated Failed','error')
          }
        );
      }
    }
  }

}

import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { environment } from './../../../environments/environment.prod';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
       item.withCredentials = false;
    });
 }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() =>
    this.user.photoUrl = photo.url);
    this.accountService.setCurrentUser(this.user);
    this.member.photoUrl = photo.url;
    this.member.photos.forEach(p => {
      if (p.isMain) p.isMain = false;
      if (p.id == photo.id) p.isMain = true;
    })
  }

  initializeUploader() {
    console.log(this.baseUrl)
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      headers: [{name:'Accept', value:'application/json'}],
    });


    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }

  }

}

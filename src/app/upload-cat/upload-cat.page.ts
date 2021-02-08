import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Gatti2Service } from '../shared/gatti2.service';
import { Gatto } from '../shared/gattoModel';
import { finalize, tap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-cat',
  templateUrl: './upload-cat.page.html',
  styleUrls: ['./upload-cat.page.scss'],
})
export class UploadCatPage implements OnInit {
  gatti = [];
  bookingForm: FormGroup;
  // File upload task
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;
  // Uploaded image collection
  files: Observable<Gatto['img'][]>;
  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<Gatto['img']>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private aptService: Gatti2Service,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Define uploaded files collection
    this.filesCollection = afs.collection<Gatto['img']>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }
  fileStoragePath;
  uploadImage(event: FileList) {
    const file = event.item(0);

    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName = file.name;
    const path1 =
      'https://firebasestorage.googleapis.com/v0/b/gatscroll.appspot.com/o/';
    // Storage path
    this.fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    console.log(this.fileStoragePath);
    // Image reference
    const imageRef = this.afStorage.ref(this.fileStoragePath);
    console.log(imageRef);
    // File upload task
    this.fileUploadTask = this.afStorage.upload(this.fileStoragePath, file);

    console.log(this.bookingForm);
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();

        this.UploadedImageURL.subscribe(
          (resp) => {
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });

            this.bookingForm = this.fb.group({
              name: [''],
              description: [''],

              img: [resp],
            });
            console.log(resp);
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap) => {
        this.imgSize = snap.totalBytes;
      })
    );
    return this.fileStoragePath;
  }

  storeFilesFirebase(image: Gatto['img']) {
    const fileId = this.afs.createId();

    this.filesCollection
      .doc(fileId)
      .set(image)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      description: [''],

      img: ['ff'],
    });

    this.fetchBookings();
    let bookingRes = this.aptService.getCatList();
    bookingRes.snapshotChanges().subscribe((res) => {
      this.gatti = [];
      res.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.gatti.push(a as Gatto);
      });
    });
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService
        .createCat(this.bookingForm.value)
        .then((res) => {
          console.log(res);
          this.bookingForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }
  fetchBookings() {
    this.aptService
      .getCatList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteBooking(id) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id);
    }
  }
}

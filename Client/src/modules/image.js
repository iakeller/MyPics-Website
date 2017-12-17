import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {Images} from '../resources/data/images';

@inject(Router,Images,AuthService)
export class image {
  constructor(router,images,auth) {
  this.router = router;
  this.images = images;
  this.auth = auth;
  this.message = 'Image List';
  this.user = JSON.parse(sessionStorage.getItem('user'));
  this.showList = true;
  this.showForm = false;
  this.title = "You Have Some Images!"
	this.editTodoForm = false;
	this.showCompleted = false;
  }
async activate(gallery){
		await this.images.getGalleryImages(JSON.parse(sessionStorage.getItem('gallery'))._id);
	}

   logout(){
	sessionStorage.removeItem('user');
	this.auth.logout();
   }


   createImage(){	
		this.imageObj = {
			galleryId: JSON.parse(sessionStorage.getItem('gallery'))._id
			
		}
		this.showList = false;
		this.showForm = true;		
   }

   async saveImage(){
        if(this.imageObj){       
            let response = await this.images.save(this.imageObj);
            if(response.error){
                alert("There was an error creating the Image");
            } else {
                var galleryId = JSON.parse(sessionStorage.getItem('gallery'))._id;
                var imageId = response._id;
                if(this.filesToUpload && this.filesToUpload.length){
                    await this.images.uploadFile(this.filesToUpload, galleryId,imageId );
                    this.filesToUpload = [];
                }
            }
            this.showList = true;
			this.showForm = false;
        }
    }


	backToList(){
		this.router.navigate('list');
	}

	 back(){
		 this. showList = true;
		  this.showForm = false;
	 }

	  editImage(image){
        this.imageObj = image;
        this. showList = false;
		this.showForm = true;
      }

   deleteImage(image){
        this.images.deleteImage(image._id);
    }

	 changeFiles(){
    	this.filesToUpload = new Array(); 
    	this.filesToUpload.push(this.files[0]);
	}
	removeFile(index){
    	this.filesToUpload.splice(index,1);
	}
}

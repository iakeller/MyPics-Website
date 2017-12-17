import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Images {
   constructor(data) {
        		this.data = data;
        		this.IMAGE_SERVICE = 'images';
                this.imagesArray = [];

   		 }
    async save(image){
		if(image){
			if(!image._id){
				let serverResponse = await this.data.post(image, this.IMAGE_SERVICE);
		if(!serverResponse.error){
			this.imagesArray.push(serverResponse);
		     }
		           return serverResponse;
		 }else{
			 let serverResponse = await this.data.put(image, this.IMAGE_SERVICE + "/" +image._id);
			  return serverResponse;
		 }
}}

async uploadFile(files, galleryId, imageId){
        let formData = new FormData();
        files.forEach((item, index) => {
	    formData.append("file" + index, item);
        });
    
	let response = await this.data.uploadFiles(formData, this.IMAGE_SERVICE + "/upload/"  + galleryId + "/"   + imageId);
	console.log("this is being called " + this.IMAGE_SERVICE + "/upload/" + galleryId + "/" + imageId);
	return response;
}



async getGalleryImages(id){
		let response = await this.data.get(this.IMAGE_SERVICE + "/gallery/" + id);
		if(!response.error && !response.message){
			this.imagesArray = response;
		}
	   }
async deleteImage(id){
		let response = await this.data.delete(this.IMAGE_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.imagesArray.length; i++){
				if(this.imagesArray[i]._id === id){
					this.imagesArray.splice(i,1);
				}
			}
		}
	}

}


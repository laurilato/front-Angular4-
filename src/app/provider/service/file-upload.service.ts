import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as Global from '../globals';

import 'rxjs/add/operator/map';

@Injectable()
export class FileUploadService {

	constructor(private http: Http) { }

	// Get Image infor
	index(img_id: number){
		return this.http.get(Global.API_URL + 'image/' + img_id);
	}
	// when like click
	like(img_id: number, user_id: number) {
		return this.http.get(Global.API_URL + 'image/like/' + img_id + '/' + user_id);
	}

	// Comment Operation
	newComment(stick: string, newcmt: string, image_id:number, author: number, parent_cmt_id: number) {
		return this.http.post(Global.API_URL + 'image/cmt',
            {
            	image_id: image_id,
            	author: author,
            	parent_id: parent_cmt_id,
            	stick: stick,
            	newcmt: newcmt
            },
            {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
	}
	getComment(img_id: number){
		return this.http.get(Global.API_URL + 'image/cmt/' + img_id);
	}

	ImageDelete(id: number) {
		return this.http.delete(Global.API_URL + 'image/' + id);
	}

	shareSocial(category: string) {
		return this.http.get(Global.API_URL + 'share/' + category);
	}

	SocialInvite(fullname: string, email: string, content: string) {
		return this.http.post(Global.API_URL + 'invite', {
			fullname: fullname,
			email: email,
			content: content
		},
		{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
	}

	follow(follower_id: string, user_id: string) {
		return this.http.post(Global.API_URL + 'follow', {
			follower_id: follower_id,
			user_id: user_id
		},
		{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
	}

	favorite(favData: any, image_id: number, user_id: number) {
		return this.http.post(Global.API_URL + 'fav/' + image_id, {
			favData: favData,
			user_id: user_id
		},
		{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
	}

	getFavInfo(img_id: number, user_id: number) {
		return this.http.get(Global.API_URL + 'fav/' + img_id + '/' + user_id);
	}

	favDelete(img_id: number, user_id: number) {
		return this.http.delete(Global.API_URL + 'fav/' + img_id + '/' + user_id);
	}
}

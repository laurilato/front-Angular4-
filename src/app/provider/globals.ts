import { AuthService } from './service/auth.service';

'use strict';

// export const API_URL: string = 'http://dn-api.us-east-1.elasticbeanstalk.com/api/';
export const API_URL: string = 'http://localhost:8083/api/';
export const s3Url: string = 'https://s3.amazonaws.com/beta.desktopnexus.com/uploads/';
// export user: any = [];


export function getUser() {
	let storageUser = localStorage.getItem('currentUser');
	let user = JSON.parse(storageUser);
	return user;
}
export function loadScript() {
	console.log('preparing to load...');
	// let node0 = document.createElement('script');
	// node0.src = "assets/js/jquery-2.1.1.min.js";
	// node0.async = true;
	// node0.charset = 'utf-8';
	// document.getElementsByTagName('head')[0].appendChild(node0);  
	let node = document.createElement('script');
	node.src = "https://www.google.com/recaptcha/api.js";
	node.async = true;
	node.charset = 'utf-8';
	document.getElementsByTagName('head')[0].appendChild(node);
	let node1 = document.createElement('script');
	node1.src = "assets/js/desktopnexus.js";
	node1.async = true;
	node1.charset = 'utf-8';
	document.getElementsByTagName('head')[0].appendChild(node1);
	let node2 = document.createElement('script');
	node2.src = "assets/js/init.js";
	node2.async = true;
	node2.charset = 'utf-8';
	document.getElementsByTagName('head')[0].appendChild(node2);         
}

export function setLoading() {
    let elem = <HTMLElement>document.querySelector('.loading');
    elem.style.display = "block";
}

export function outLoading() {
    let elem = <HTMLElement>document.querySelector('.loading');
    elem.style.display = "none";
}
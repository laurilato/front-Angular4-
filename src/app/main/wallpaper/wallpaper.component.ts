import { Injectable } from '@angular/core';
import { ElementRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FileUploadService } from '../../provider/service/file-upload.service';
import { AuthService } from '../../provider/service/auth.service';
import { ShareButtonsService } from 'ngx-sharebuttons';
import { ToastrService } from 'ngx-toastr';

import * as Global from '../../provider/globals';

declare var jQuery: any;
declare var $ : any;
// Component management
@Component({
    selector: 'app-main-wallpaper',
    templateUrl: './wallpaper.component.html',
    styleUrls: ['./wallpaper.component.css']
})

@Injectable()
export class MainWallpaperComponent implements OnInit, AfterViewInit{
    loadAPI: Promise<any>;
    s3Url = Global.s3Url;
    user: any = [];
    image: any = [];
    tags: any = [];
    temptags: any = [];
    uploader: any = [];
    // comment
    newcmt: string = '';
    cmtauthor: any = [];
    cmtlists: any = [];
    cmtData: any = [];
    counter: number;
    parent_cmt_id: number = 0;
    totalShare: number = 0;
    getColor: string = "";
    _data: any = [];
    constructor(private _elementRef: ElementRef, private router: Router, private route: ActivatedRoute, private fileService: FileUploadService, private authService: AuthService, private toastrService: ToastrService) {
        this.user = Global.getUser();
     }

    ngOnInit() {
        this.route.params.forEach(params => {

            let img_id = params['img_id'];
            // this.imagecrud(img_id);
            this.fileService.index(img_id).subscribe(
                response => {
                    let temp = response.json();
                    this.image = temp.image;
                    console.log('image', this.image);
                    // Get User Inof
                    this.authService.getUser(this.image.upload_by).subscribe(
                        response => {
                            let temp = response.json();
                            this.uploader = temp.user;
                            console.log('Uploader',this.uploader);
                        },
                        error => console.log(error)
                    );
                    /* Tag display*/
                    this.tags = temp.tags;
                    // display view
                    for(var v in this.tags) {
                        this.temptags.push(this.tags[v].name);
                    }
                    this.tagname.nativeElement.value = this.temptags;
                    console.log(this.temptags);
                },
                error => {
                    console.log(error);
                }
            );
            // Get Comments
            this.fileService.getComment(img_id).subscribe(
                response => {
                    var temp = response.json();
                    this.cmtData = temp.comments;
                    this.cmtlists = this.cmtData;
                    this.counter = 0;
                    // this.getCmtData();
                    console.log('comments---', this.cmtData);
                },
                error => console.log(error)
            );

            // Get Favorite Info
            this.fileService.getFavInfo(img_id, this.user.id).subscribe(
              response => {
                var temp = response.json();
                console.log('--temp--', temp.result);
                if(temp.result)
                  this.getColor = "red";
                this._data = temp.folders;
              },
              error => console.log('favInfoError-', error)
            )
        });

        this.loadAPI = new Promise((resolve) => {
            console.log('resolving promise');
            Global.loadScript();
        });
    }

    @ViewChild('tagname') tagname: ElementRef;
    @ViewChild('stclear') stclear: ElementRef;
    // Custom Javascript Snippet
    ngAfterViewInit() {
        var s = document.createElement("script");
        s.text = `
            $(function(){
            PopularListing();
            $('.bd_textarea').autoResize();
            });
        `;
        this._elementRef.nativeElement.appendChild(s);
    }
    // set Background Image of Edit click Event
    setBackImg() {
        $('.cus_img').css('background-image', 'url(' + this.s3Url + this.image.s3_id + ')');//back img
        for(var i = 0; i < this.temptags.length; i++) {
            $("#edit-tags").tagsinput('add',this.temptags[i]);
        }
    }

    //  Update Image info.
    changeInfo(name: any, title: string) {
        $('#EditPic').modal('hide');
        console.log('--title--', title);
        console.log("-----tags-----",name);
        let changetag= name.split(",");
        this.temptags = changetag;
    }

    // like event
    onlike(img_id: number) {
        Global.setLoading();
        this.fileService.like(img_id, this.user.id).subscribe(
            response => {
                Global.outLoading();
                console.log("Like successfully"); this.ngOnInit();
            },
            error => {
                Global.outLoading();
                console.log(error);
            }
        );
    }

    // new comment
    cmtpost(stick: any, newcontent: string) {
        var temp = stick.innerHTML;
        console.log("stick---", temp);
        var sticker = '';
        if (temp) {
            console.log(stick.innerHTML, ",", typeof(temp));
            var strstr = '<img src="http://site.org/one.jpg" />';
            console.log(strstr);
            var str = temp;
            var rex = /<img[^>]+src="?([^"\s]+)"?\s*\>/g;
            var m = rex.exec(str);
            console.log(m[1]);
            sticker = m[1];
        }
        if(!localStorage.getItem('reply'))
            this.parent_cmt_id = 0;
        this.fileService.newComment(sticker, newcontent, this.image.id, this.user.id, this.parent_cmt_id).subscribe(
            response => {
                $('.msg-bd-close').click();
                var temp = response.json();
                this.cmtlists.push(temp.newcomment);
                console.log("Comment Successfully");
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
        this.newcmt = '';
        this.stclear.nativeElement.click();
    }
    // reply comment
    replycmt(parent_cmt_id: number) {
        this.parent_cmt_id = parent_cmt_id;
        localStorage.setItem('reply', 'true');
    }
    // Image Delete
    ImageDelete(id) {
        Global.setLoading();
        this.fileService.ImageDelete(id).subscribe(
            response => {
                Global.outLoading();
                $('#EditPic').modal('hide');
                console.log("Image Delete Successful");
                this.router.navigate(['']);
            },
            error => {
                Global.outLoading();
                console.log("Image Delete Error", error);
            }
        );
    }

    getCmtData() {
        console.log(this.counter + 'dat size' + this.cmtData.length);

        for(let i = this.counter + 1; i < this.cmtData.length; i++)
        {
            this.cmtlists.push(this.cmtData[i]);
            if(i%5==0) break;
        }
        this.counter+=5;
    }

    sumCounts(count) {
        console.log("----count---", count);
        this.image.shares += count;
    }

    onSocialInvite(form: NgForm) {
        var str = form.value.content;
        var temp = str.split(",");
        var email = temp[0];
        var content = temp[1];
        console.log(form.value.fullname, email, content);
        Global.setLoading();
        this.fileService.SocialInvite(form.value.fullname, email, content).subscribe(
            response => {
                Global.outLoading();
                this.toastrService.success('Success');
                console.log(response);
            },
            error => {
                Global.outLoading();
                console.log(error);
            }
        );
    }

    onFollow(follower_id, user_id) {
        Global.setLoading();
        this.fileService.follow(follower_id, user_id).subscribe(
            response => {
                Global.outLoading();
                this.toastrService.success("Success");
                console.log(response);
            },
            error => {
                Global.outLoading();
                console.log(error);
            }
            );
    }
    // get selected node
    favselected() {
        Global.setLoading();
        var _path = $('.favtree').jstree().get_path($('.favtree').jstree("get_selected", true)[0], ' > ');
        var folders = _path.split(' > ');
        console.log('o---', folders.length, folders);
        //** Get Tree Node Id
        var instance = $('.favtree').jstree();
        var selected = instance.get_selected(), i, j;
        for(i= 0, j= selected.length; i< j; i++){
            selected = selected.concat(instance.get_node(selected[i]).parents);
        }
        selected = $.vakata.array_unique(selected);
        selected.pop('#');
        console.log('-need-', selected.length, selected);
        // ----End Tree Node Id
        var favData = [];
        for( i = 0, j = selected.length - 1; i< j; i++){
            favData.push({'text': folders[j - i], 'id': selected[i], 'parent': selected[i+1]});
        }
        console.log('total---', favData, this.image.id, this.user.id);

        this.fileService.favorite(favData, this.image.id, this.user.id).subscribe(
            response => {
                Global.outLoading();
                var temp = response.json();
                this.image.favorites = temp.result;
                this.getColor = "red";
                console.log('---fav--', this.image.favorites);
            },
            error => {
                Global.outLoading();
                console.log(error);
            }
        );
        $('#favDesktopNexus').modal('hide');

    }

    MakeFovourite() {
      if(this.getColor){
        Global.setLoading();
        this.fileService.favDelete(this.image.id, this.user.id).subscribe(
          response => {
            var temp = response.json();
            this.image.favorites = temp.result;
            this.getColor = ''; Global.outLoading();
          },
          error => console.log(error)
        );
      }
        else {

        var folder = [
          { "id": "ajson1", "parent": "#", "text": "My Favorites", "state": {"opened": true, "delete" : false, "selected": true}, "li_attr" : { "class" : "my-fav" }, "data" : { "file" : false } }
        ];
        if(this._data)
          folder = folder.concat(this._data);
        console.log($('.favtree'));
        $('.favtree').jstree({
            core: {
              check_callback: true,
              data: folder
          },
            plugins : ["contextmenu","contextmenubtn"],
            "contextmenu" : {
                "items" : this.customMenu(folder)
            },
            "ui" : {
                "initially_select" : [ "root" ]
            }
        });
        $('#favDesktopNexus').modal('show');

      }
  }
    customMenu(node) {
        // The default set of all items
        var items = {
            createItem: { // The "create" menu item
                label: "Add Folder",
                action: function (data) {
                    var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                    inst.create_node(obj, {}, "last", function (new_node) {
                        new_node.data = {file: true};
                        new_node.text = "New Folder";
                        setTimeout(function () { inst.edit(new_node); },0);
                    });
                }
            },
            renameItem: { // The "rename" menu item
                label: "Rename",
                // _disabled: false,
                action: function (data) {
                    var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                    inst.edit(obj);
                    //alert(node.text);
                    setTimeout(function(){
                      console.log($('.jstree-node').html());
                    },1000);

                }
            },
            deleteItem: { // The "delete" menu item
                label: "Delete",
                // _disabled: false,
                action: function (data) {
                    //alert('Any images inside this folder will be moved to the top level: My Favorites');

                    var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                    if(inst.is_selected(obj)) {
                        //inst.delete_node(inst.get_selected());
                        $('#ConfirmDelete').addClass('visible-elem');
                        //alert(node.text);
                        $('#conf_txt').html('Are you sure want to delete <strong>' + node.text +'</strong>?');
                    }
                    else {
                        //inst.delete_node(obj);
                    }
                    // if ( confirm("Are you sure want to delete " + node.text + "?") ) {
                    //     inst.delete_node(obj);
                    // }


                    $(document).on('click', '.del-item', function(){
                      inst.delete_node(obj);
                      $('#ConfirmDelete').removeClass('visible-elem');
                    });
                    $(document).on('click', '.cancel-del-tree', function(){
                      $('#ConfirmDelete').removeClass('visible-elem');
                    });
                }
            }
        };
        console.log('--node---', node.children);
        // if (node.children.length > 0) {
        //   items.deleteItem._disabled = true;
        //   items.renameItem._disabled = true;
        // }

        return items;
    }

}

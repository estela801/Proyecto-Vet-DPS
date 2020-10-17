import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  submenu1 : boolean = false;
  submenu2 : boolean = false;
  submenu3 : boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  onsubmenu1(){
    if(this.submenu1) this.submenu1 = false;
    else this.submenu1 = true; 
    this.submenu2 = false;
    this.submenu3 = false;
  }

  onSubmenu2(){
    if(this.submenu2) this.submenu2 = false;
    else this.submenu2 = true;
    this.submenu1 = false;
    this.submenu3 = false;
  }

  onSubmenu3(){
    if(this.submenu3) this.submenu3 = false;
    else this.submenu3 = true;
    this.submenu2 = false;
    this.submenu1 = false;
  }
}

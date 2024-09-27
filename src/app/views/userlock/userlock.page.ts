import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlock',
  templateUrl: './userlock.page.html',
  styleUrls: ['./userlock.page.scss'],
})
export class UserlockPage implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  blocks: any[] = [];
  count: number = 0;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getBlocks(this.userId).subscribe((response) =>{
      console.log(response, 'response');
      this.blocks = response.data.data;
      this.count = response.data.count;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlock',
  templateUrl: './userlock.page.html',
  styleUrls: ['./userlock.page.scss'],
})
export class UserlockPage implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  blocks: any;
  count: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getBlockedUsers(this.userId).subscribe((response) =>{
      console.log(response, 'response');
      this.blocks = (response as any).data.data; // Cast response to 'any' to access 'data'
      this.count = (response as any).data.count;
      console.log(this.blocks, 'response');
    });
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'user',
  template: `<p><strong>Student:</strong> {{name}}</p>
  <p><strong>Email:</strong> {{email}}</p>
  <p><strong>Peformance</strong></p>
  <table style = "border: 1px solid black">
    <tr>
      <th> Points</th>
      <th> Points Possible </th>
      <th> Percent </th>
      <th> Grade </th>
    </tr>
    <tr>
      <td> {{getPointsScored()}} </td>
      <td> {{getPointsPossible()}} </td>
      <td> {{getPercent()}} </td>
      <td> {{getGrade()}} </td>
    </tr>
  </table>
  <hr />
  <p><strong>Add Assignment</strong></p>
  
  <form>

    <p><label>Assignment Name: </label>
    <input type="text" name="name" [(ngModel)]="assignmentName" /></p>
    
    <p><label>Scored Points: </label>
    <input type="number" name="scoredPoints" [(ngModel)]="assignementPointsScored" /></p>
    <p><label>Points Possible</label>
    <input type="number" name="pointsPossible" [(ngModel)]="assignmentPointsPossible" /></p>
    
  </form>
  
  <button (click)="addAssignment()">Add Assignment</button>

  <p><strong>Assignments</strong></p>
  <table style = "border: 1px solid black">
    <tr>
      <th> Assignment Name </th>
      <th> Points Scored </th>
      <th> Points Possible </th>
      <th> Percent </th>
    </tr>
    <tr *ngFor="let assignmentItem of assignmentList; let i = index;">
      <td>{{assignmentItem.name}}</td>
      <td>{{assignmentItem.pointsScored}}</td>
      <td>{{assignmentItem.pointsPossible}}</td>
      <td>{{(assignmentItem.pointsScored / assignmentItem.pointsPossible * 100).toFixed(0) + "%"}}</td>
    </tr>
  </table>

  <div *ngIf = "showHobbies">
    <h3>Hobbies</h3>
    <ul>
      <li *ngFor="let hobby of hobbies; let i = index;">
        {{hobby}} <button (click)="deleteHobby(i)">X</button>
      </li>
    </ul>
    <form (submit)="addHobby(hobby.value)">
      <label>Add Hobby: </label> <br/>
      <input type="text" #hobby /><br/>
    </form>
  </div>
  <hr />
  <h3>Edit User</h3>
  <form>
    <label>Name: </label> <br/>
    <input type="text" name="name" [(ngModel)]="name" /><br/>
    <label>Email: </label> <br/>
    <input type="text" name="email" [(ngModel)]="email" /><br/>
    <label>Street: </label> <br/>
    <input type="text" name="address.street" [(ngModel)]="address.street" /><br/>
    <label>City: </label> <br/>
    <input type="text" name="address.city" [(ngModel)]="address.city" /><br/>
    <label>State: </label> <br/>
    <input type="text" name="address.state" [(ngModel)]="address.state" /><br/>
  </form>
  `,
})
export class UserComponent {
  name: string;
  email: string;
  address: address;
  hobbies: string[];
  showHobbies: boolean;
  assignmentList: assignment[];
  assignmentName: string;
  assignmentPointsPossible: number;
  assignementPointsScored: number;

  constructor() {
    this.name = 'Aaron';
    this.email = "aaron@gmail.com";
    this.address = {
      street: '12 main street',
      city: 'Bentonville',
      state: 'AR'
    }
    let item = {name: "banana", pointsScored: 7, pointsPossible: 13};
    let item2 = {name: "hammock", pointsScored: 3, pointsPossible: 18};
    this.assignmentList = [item, item2];
    this.hobbies = ['Music', 'Movies', 'Sports'];
    this.showHobbies = false;

    
  }

  addAssignment(): void {
   let a = {name: this.assignmentName, pointsScored: this.assignementPointsScored, pointsPossible: this.assignmentPointsPossible}
   this.assignmentName = "";
   this.assignementPointsScored = 0;
   this.assignmentPointsPossible = 0;
  }

  addHobby(hobby: string) {
    this.hobbies.push(hobby);
  }

  getPointsPossible(): number {
    let sum: number = 0;
    for (let p of this.assignmentList)
      sum += p.pointsPossible;
    return sum;
  }

  getPointsScored(): number {
    let sum: number = 0;
    for (let p of this.assignmentList)
      sum += p.pointsScored;
    return sum;
  }

 

  getPercent(): string{
    return (this.getPointsScored() / this.getPointsPossible() * 100).toFixed(0) + "%";
  }

  getGrade(): string{
    let percent: number = this.getPointsScored() / this.getPointsPossible() * 100;
    if(percent > 90)
      return "A";
    else if(percent > 80)
      return "B";
    else if(percent > 70)
      return "C";
    else if(percent > 60)
      return "D";
    else
      return "F";
  }
}

interface assignment {
  name: string,
  pointsScored: number,
  pointsPossible: number
}

interface address {
  street: string;
  city: string;
  state: string;
}
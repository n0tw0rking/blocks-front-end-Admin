import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get(
        "http://localhost:8000/api/user"
        // ,
        //  {
        //   headers: new HttpHeaders({
        //     auth:
        //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTIwYTY4YTgyNWEyYzAzZjRhYmI5OWQiLCJpYXQiOjE1NzkzNTc5NTV9.hQrqmdssy7KN0FfJ8HjJp6IZd72xyPY-z9ai0v78m6U"
        //   })
        // }
      )
      .subscribe(data => console.log(data));
  }

 
  getBlock(id){ //get all info of block by id 

  }

  getBlocks(){ //get all blocks id s and name s

  }

  getUsersOfBlock(id) { //get all user s inside this block(id)

  }




  postNewBlock(Block) {
    console.log("getuser triggerde", Block);
    return this.http
      .post("http://localhost:3000/api/", Block)
      .subscribe(data => console.log(data));
  }
}

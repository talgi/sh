import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



/*import { Country } from '../view-models/country';*/
import { Room } from '../view-models/room';
import { Question } from '../view-models/question';
import { DrawingCordinatesRequest, DrawingCoordinatesResponse ,OldAnswer, OldQuestion, ItemData } from '../view-models/old_question';
import { Item } from '../view-models/item';
import { Observable } from 'rxjs/Observable';

//import { UserService } from './user.service';


@Injectable()
export class AppDataService {
  //DotNet Server 
  //private baseUrl = 'http://localhost:52497/api/questions';


  //Python Server
  private baseUrl = 'http://javish.hopto.org:1234/';
  
  constructor(private http: Http) { }
  coordinates=[]


 

  //POST - create
  /* private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
       product.id = undefined;
       return this.http.post(this.baseUrl, product, options)
           .map(this.extractData)
           .do(data => console.log('createProduct: ' + JSON.stringify(data)))
           .catch(this.handleError);
   }*/


  getOldQuestion(id: number): Observable<OldQuestion> {
    //Python Server
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let oldAnswer = new OldAnswer();
    oldAnswer.token = 666;
    oldAnswer.chosenAnswer = id;
    options.body = JSON.stringify(oldAnswer);
    //console.log(JSON.stringify(oldAnswer));
    return this.http.post(this.baseUrl + 'pickStyle/', JSON.stringify(oldAnswer), options)
      .map(this.extractData)
      .do(data => console.log('Sent Answer: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }
    getProposal(): Observable<DrawingCoordinatesResponse> {
    //Python Server
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let coordinates = this.coordinates;
    let request = new DrawingCordinatesRequest();

    request.token = 666;
    request.coordinates = coordinates;

    options.body = JSON.stringify(request);
    console.log("Request= "+options.body);
    //console.log(JSON.stringify(oldAnswer));
    return this.http.post(this.baseUrl+'roomDraw_ver2/', JSON.stringify(request), options)
      .map(this.extractData)
      .do(data => console.log('Sent Answer: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }

  /*  getQuestion(id: number): Observable<Question> {
      //DotNet Server
      const url = `${this.baseUrl}/${id}`;
      console.log("url:" + url);
      return this.http.get(url)
        .map(this.extractData)
        .do(data => console.log('getAnswer: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }*/

  private extractData(response: Response) {
    console.log("extractData");
    console.log(response);
    let body = response.json();
    console.log("extractDataBody:" + body);
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    console.log("error");
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  /*private countries : Array<Country> = [
    /*{ id: 1, name:"Switzerland",  epiIndex: 87.67 },
    { id: 2, name:"Luxembourg",   epiIndex: 83.29 },
    { id: 3, name:"Australia", epiIndex: 82.4 },
    { id: 4, name:"Singapore", epiIndex: 81.78 },
    { id: 5, name:"Czech Republic", epiIndex: 81.47 },
    { id: 6, name:"Germany", epiIndex: 80.47 },
    { id: 7, name:"Spain", epiIndex: 79.09 },
    { id: 8, name:"Austria", epiIndex: 78.32 },
    { id: 9, name:"Sweden", epiIndex: 78.09 },
    { id: 10, name:"Norway", epiIndex: 78.04 }
  ];*/


  private rooms: Array<Room> = [
    { id: 1, name: "room1", epiIndex: 87.67, url: '/assets/rooms/room1.png' },
    { id: 2, name: "room2", epiIndex: 87.67, url: '/assets/rooms/room2.png' },
    { id: 3, name: "room3", epiIndex: 87.67, url: '/assets/rooms/room3.png' },
    { id: 4, name: "room4", epiIndex: 87.67, url: '/assets/rooms/room4.png' },
    { id: 5, name: "room5", epiIndex: 87.67, url: '/assets/rooms/room5.png' },
    { id: 6, name: "room6", epiIndex: 87.67, url: '/assets/rooms/room6.png' },
    { id: 7, name: "room7", epiIndex: 87.67, url: '/assets/rooms/room7.png' },
    { id: 8, name: "room8", epiIndex: 87.67, url: '/assets/rooms/room8.png' },
    //{ id: 8, name: "room8", epiIndex: 87.67 , url:'http://52x.co/dev/sweet-home//image/data/other_questions/chairs/classic_1.jpg'},


    /* { id: 2, name:"Luxembourg",   epiIndex: 83.29 },
     { id: 3, name:"Australia", epiIndex: 82.4 },
     { id: 4, name:"Singapore", epiIndex: 81.78 },
     { id: 5, name:"Czech Republic", epiIndex: 81.47 },
     { id: 6, name:"Germany", epiIndex: 80.47 },
     { id: 7, name:"Spain", epiIndex: 79.09 },
     { id: 8, name:"Austria", epiIndex: 78.32 },
     { id: 9, name:"Sweden", epiIndex: 78.09 },
     { id: 10, name:"Norway", epiIndex: 78.04 }*/
  ];

  private items: Array<Item> = [
    { id: 1, catalogName: "alsager-end-table-1", name: "table-1", description: "info about this item ..." },
    { id: 2, catalogName: "alsager-end-table-2", name: "table-2", description: "info about this item ..." },
    { id: 3, catalogName: "alsager-end-table-3", name: "table-3", description: "info about this item ..." },
    { id: 4, catalogName: "alsager-end-table-4", name: "table-4", description: "info about this item ..." },
  ];

  private itemDataList: Array<ItemData> = [
    { width: "100", length: "200", position: [{ "y": 262.7647, "x": 445 }], direction: 0, furniture: "coffee_table" }
  ];




  getRooms() {
    return this.rooms;
  }
  getItems() {
    return this.items;
  }
    getItemsData() :Array<ItemData>{
    return this.itemDataList;
  }
}

  /* 
     getCountries()  {
     return this.countries;
   }
  
  createCountry(vm: Country) : Observable<any> {
     //return Observable.of({}).delay(2000).flatMap(x=>Observable.throw('Unable to create country'));
     let id = 0;
     this.countries.forEach(c => { if (c.id >= id) id = c.id+1 });
     vm.id = id;
     this.countries.push(vm);
     return Observable.of(vm);
   }
 
   deleteCountry(id: number) : Observable<any> {
     //return Observable.of({}).delay(2000).flatMap(x=>Observable.throw('Delete error.'));
     return Observable.of({}).delay(2000)
      .do(e => this.countries.splice(this.countries.findIndex(c => c.id == id), 1));
   }
 
 /*  getCountries() : Observable<any> {
     return Observable.of(this.countries);
   }
 
 
   getCountry(id: number) : Observable<Country> {
     var country = this.countries.find(c => c.id == id);
     return Observable.of(country);
   }
 
   updateCountry(updatedCountry: Country) : Observable<any> {
     var country = this.countries.find(c => c.id == updatedCountry.id);
     Object.assign(country, updatedCountry);
     return Observable.of(country).delay(2000);
     //return Observable.of({}).delay(2000).flatMap(x=>Observable.throw(''));
   }
   */


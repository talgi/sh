import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



import { Room } from '../view-models/room';
import { Question } from '../view-models/question';
import { DrawingCordinatesRequest, DrawingCoordinatesResponse, OldAnswer, OldQuestion, ItemData } from '../view-models/old_question';
import { Item,ProposalItem } from '../view-models/item';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AppDataService {
  //Python Server
  private baseUrl = 'http://javish1.hopto.org:1234/';

  constructor(private http: Http) { }
  public coordinates = []
  private finalDesign = null;
  private dataItemsResponse;

  private resetLayoutEmitter = new EventEmitter<void>();
  resetLayoutObservable = this.resetLayoutEmitter.asObservable();

  resetLayout() {
    this.coordinates = [];
    this.resetLayoutEmitter.emit();
  }

  getCoordinates() {
    return this.coordinates;
  }
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

    return this.http.post(this.baseUrl + 'pickStyle/', JSON.stringify(oldAnswer), options)
      .map(this.extractData)
      .do(data => console.log('Sent Answer: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }

  getProposal(): Observable<Object> {
    //Python Server
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let coordinates = this.coordinates;
    let request = new DrawingCordinatesRequest();

    request.token = 666;
    request.coordinates = coordinates;

    //options.body = JSON.stringify(request);
    //console.log("Request= " + options.body);
    //console.log(JSON.stringify(oldAnswer));
    return this.http.post(this.baseUrl + 'roomDraw_ver3/', JSON.stringify(request), options)
      .map(this.extractData)
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
    let body = response.json();
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    console.log("error");
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  private rooms: Array<Room> = [
    { id: 1, name: "room1", epiIndex: 87.67, url: '/assets/rooms/room1.png' },
    { id: 2, name: "room2", epiIndex: 87.67, url: '/assets/rooms/room2.png' },
    { id: 3, name: "room3", epiIndex: 87.67, url: '/assets/rooms/room3.png' },
    { id: 4, name: "room4", epiIndex: 87.67, url: '/assets/rooms/room4.png' },
    { id: 5, name: "room5", epiIndex: 87.67, url: '/assets/rooms/room5.png' },
    { id: 6, name: "room6", epiIndex: 87.67, url: '/assets/rooms/room6.png' },
    { id: 7, name: "room7", epiIndex: 87.67, url: '/assets/rooms/room7.png' },
    { id: 8, name: "room8", epiIndex: 87.67, url: '/assets/rooms/room8.png' },
  ];

  private Items: Array<Item> = [
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
    return this.Items;
  }
  getItemsData(): Array<ItemData> {
    return this.itemDataList;
  }
}
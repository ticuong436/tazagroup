import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Files } from './tailieunguon.types';

@Injectable({
  providedIn: 'root'
})
export class TailienguonService {
  private urlApi = 'http://localhost:3000/tailieu';
  private _files: BehaviorSubject<Files[] | null> = new BehaviorSubject(null);
  private _file: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  get files$(): Observable<Files[]> {
      return this._files.asObservable();
  }
  
  get file$(): Observable<any> {
      return this._file.asObservable();
  }

  getFile() {
      return this.http.get<any>(this.urlApi).pipe(
          tap((files) => {

              this._files.next(files);
          })
      );
  }
  addFolder(data) {
      return this.files$.pipe(
          take(1),
          switchMap((files) =>
              this.http.post(this.urlApi, data).pipe(
                  map((file: Files) => {
                      this._files.next([file, ...files]);
                      return file;
                  })
              )
          )
      );
  }

  updateFile(data) {
      return this.files$.pipe(
          take(1),
          switchMap((files) =>
              this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                  map((updateCourse) => {
                      // Find the index of the updated tag
                      const index = files.findIndex(
                          (item) => item.id === item.id
                      );

                      // Update the tag
                      files[index] = data;
                      console.log(updateCourse);

                      // Update the tags
                      this._files.next(files);

                      // Return the updated tag
                      return updateCourse;
                  })
              )
          )
      );
  }
  getFileDetail(id){
      return this.http.get(this.urlApi + `/${id}`).pipe(
          tap((res) => {
              this._file.next(res)
              return res;
          })
      );
  }
  updateFileDetail(file){        
      return this.http.patch(this.urlApi + `/${file.id}`,file).pipe(
          tap((res)=>{
              
              this._file.next(res)
              return res;
          })
      )
  }
  deleteFileDetail(id){
      return this.files$.pipe(
          take(1),
          switchMap(files=>this.http.delete(this.urlApi + `/${id}`).pipe(map((isDelete => {
            
           const updateFile =  files.filter(e => e.id != id);
            
            this._files.next(updateFile)
            return isDelete
    
          }))))
        )
  }
}

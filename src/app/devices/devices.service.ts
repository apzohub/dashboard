import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Device } from './device';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DevicesService {

  private deviceAPI = '/api/v1/devices';

  constructor(private http: HttpClient) { }

  readDevice(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.deviceAPI}/${id}`)
    .pipe(
      tap(_ => this.log(`read device with id=${id}`)),
      catchError(this.handleError<Device>(`readDevice id=${id}`))
    );
  }

  createDevice (device: Device): Observable<Device> {
    return this.http.post<Device>(this.deviceAPI, device, httpOptions)
    .pipe(
      tap((device: Device) => this.log(`added device w/ id=${device.id}`)),
      catchError(this.handleError<Device>('createDevice'))
    );
  }

  updateDevice (device: Device): Observable<any> {
    return this.http.put(this.deviceAPI, device, httpOptions)
    .pipe(
      tap(_ => this.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>('updateDevice'))
    );
  }

  deleteDevice (device: Device | string): Observable<Device> {
    const id = typeof device === 'string' ? device : device.id;
    return this.http.delete<Device>(`${this.deviceAPI}/${id}`, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted device id=${id}`)),
      catchError(this.handleError<Device>('deleteDevice'))
    );
  }

  /* read all devices */
  readDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceAPI)
    .pipe(
      tap(devices => this.log(`fetched devices`)),
      catchError(this.handleError('readDevices', []))
    );
  }

  findDevicesBy(name: string): Observable<Device[]> {
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<Device[]>(`${this.deviceAPI}/?name=${name}`)
      .pipe(
        tap(_ => this.log(`found devices for "${name}"`)),
        catchError(this.handleError<Device[]>('findDevicesBy', []))
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T);
    };
  }

  private log(msg: string) {
    console.info(msg);
  }
}

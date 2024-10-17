import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerProfile } from '../models/customer-profile.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {
  private apiUrl = 'https://localhost:7238/api/customerprofiles';  

  constructor(private http: HttpClient) { }

  // Get all customer profiles
  getCustomerProfiles(): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(this.apiUrl);
  }

  // Get a customer profile by ID
  getCustomerProfile(id: number): Observable<CustomerProfile> {
    return this.http.get<CustomerProfile>(`${this.apiUrl}/${id}`);
  }

  // Add a new customer profile
  addCustomerProfile(customerProfile: CustomerProfile): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(this.apiUrl, customerProfile);
  }

  // Update an existing customer profile
  updateCustomerProfile(id: number, customerProfile: CustomerProfile): Observable<CustomerProfile> {
    return this.http.put<CustomerProfile>(`${this.apiUrl}/${id}`, customerProfile);
  }

  // Delete a customer profile
  deleteCustomerProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

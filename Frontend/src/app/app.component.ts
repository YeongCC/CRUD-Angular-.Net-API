import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomerProfile } from '../models/customer-profile.model';
import { CustomerProfileService } from '../services/customer-profile.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  customerForm: FormGroup;
  customerProfiles: CustomerProfile[] = [];
  isEditMode = false; 
  selectedCustomerId?: number;  

  constructor(
    private fb: FormBuilder,
    private customerProfileService: CustomerProfileService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      dateOfBirth: ['']
    });
  }

  ngOnInit(): void {
    this.loadCustomerProfiles();
  }

  loadCustomerProfiles(): void {
    this.customerProfileService.getCustomerProfiles().subscribe(profiles => {
      this.customerProfiles = profiles;
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      customerData.customerID = this.selectedCustomerId; 
      if (this.isEditMode && this.selectedCustomerId) {
        this.customerProfileService.updateCustomerProfile(this.selectedCustomerId, customerData).subscribe({
          next: () => {
            this.loadCustomerProfiles();
            this.resetForm();
          },
          error: (error) => {
            console.error("Error during update:", error);
          }
        });
      } else {
        this.customerProfileService.addCustomerProfile(customerData).subscribe({
          next: () => {
            this.loadCustomerProfiles();
            this.customerForm.reset();
          },
          error: (error) => {
            console.error("Error during add:", error);
          }
        });
      }
    }
  }

  // Edit customer profile (populate the form and switch to edit mode)
  editCustomerProfile(profile: CustomerProfile): void {
    this.isEditMode = true; 
    this.selectedCustomerId = profile.customerID;  
    this.customerForm.patchValue(profile); 
  }

  // Delete customer profile
  deleteCustomerProfile(id: number): void {
    this.customerProfileService.deleteCustomerProfile(id).subscribe(() => {
      this.loadCustomerProfiles();
    });
  }


  resetForm(): void {
    this.isEditMode = false;  
    this.selectedCustomerId = undefined;
    this.customerForm.reset();  
  }
}

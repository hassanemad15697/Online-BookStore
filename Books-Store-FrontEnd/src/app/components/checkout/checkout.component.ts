import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { City } from 'src/app/model/city';
import { Country } from 'src/app/model/country';
import { State } from 'src/app/model/state';
import { CartService } from 'src/app/service/cart.service';
import { ShopFormService } from 'src/app/service/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  checkoutFormGroup: FormGroup;

  years: number[] = [];
  months: number[] = [];
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  constructor(private formBuilder: FormBuilder, private cartService: CartService, private shopService: ShopFormService) { }



  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        mobile: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        fullName: [''],
        cardNumber: [''],
        expYear: [''],
        expMonth: [''],
        sercurityCode: ['']
      })
    });

    this.updateCartStatus();
    this.getYears();
    this.getMonths(new Date().getMonth());
    this.getCountries();
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
    console.log(this.checkoutFormGroup.get('billingAddress')?.value);
    console.log(this.checkoutFormGroup.get('creditCard')?.value);
  }
  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.get('billingAddress')?.setValue(this.checkoutFormGroup.get('shippingAddress')?.value)
    }
    else{
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeTheCartTotal()
    console.log(this.totalPrice)
  }

  getYears() {
    return this.shopService.getYears().subscribe(
      data => { this.years = data; }
    )

  }
  getMonths(starMonth: number) {
    return this.shopService.getMonths(starMonth + 1).subscribe(
      data => { this.months = data; }
    )
  }
  handleMonthsBasedOnYear() {
    let selectedYear: number = this.checkoutFormGroup.get('creditCard')?.value.expYear;
    let currentYear: number = new Date().getFullYear();
    console.log('selected years is ' + selectedYear);
    console.log('selected years is ' + currentYear);

    if (selectedYear != currentYear) {
      this.getMonths(0)
    } else {
      console.log('selected years is ' + new Date().getMonth());
      this.getMonths(new Date().getMonth())
    }
  }
  getCountries() {
    this.shopService.getCountries().subscribe(
      data => { this.countries = data }
    )
  }
  handleStates(FormGroup: string) {
    let thrShortName: string = this.checkoutFormGroup.get(FormGroup)?.value.country.shortname;
    this.shopService.getStates(thrShortName).subscribe(
      data => { this.states = data; }
    )

  }
  handleCities(FormGroup: string){
    let state_id: number = this.checkoutFormGroup.get(FormGroup)?.value.state.id;
    this.shopService.getCities(state_id).subscribe(
      data =>{
        this.cities = data;
      }
    )
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { City } from 'src/app/model/city';
import { Country } from 'src/app/model/country';
import { State } from 'src/app/model/state';
import { CartService } from 'src/app/service/cart.service';
import { ShopFormService } from 'src/app/service/shop-form.service';
import { CheckoutValidator } from 'src/app/validators/checkout-validator';

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
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidator.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidator.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        mobile: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, CheckoutValidator.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, CheckoutValidator.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        fullName: new FormControl('', [Validators.required, Validators.minLength(8), CheckoutValidator.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        expYear: new FormControl('', [Validators.required]),
        expMonth: new FormControl('', [Validators.required]),
        sercurityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')])
      })
    });

    this.updateCartStatus();
    this.getYears();
    this.getMonths(new Date().getMonth());
    this.getCountries();
  }
  // getters for validators
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  get mobile() {
    return this.checkoutFormGroup.get('customer.mobile');
  }
  get shippingStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get billingStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get cardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get fullName() {
    return this.checkoutFormGroup.get('creditCard.fullName');
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get expYear() {
    return this.checkoutFormGroup.get('creditCard.expYear');
  }
  get expMonth() {
    return this.checkoutFormGroup.get('creditCard.expMonth');
  }
  get sercurityCode() {
    return this.checkoutFormGroup.get('creditCard.sercurityCode');
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    } 
      console.log(this.checkoutFormGroup.get('customer')?.value);
      console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
      console.log(this.checkoutFormGroup.get('billingAddress')?.value);
      console.log(this.checkoutFormGroup.get('creditCard')?.value);
    
  }
  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.get('billingAddress')?.setValue(this.checkoutFormGroup.get('shippingAddress')?.value)
    }
    else {
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
  handleCities(FormGroup: string) {
    let state_id: number = this.checkoutFormGroup.get(FormGroup)?.value.state.id;
    this.shopService.getCities(state_id).subscribe(
      data => {
        this.cities = data;
      }
    )
  }
}
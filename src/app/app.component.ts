import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'invoice-app';

  invoiceForm: any;
  pdfMake: any;
  pdfFonts: any;

  // Define an array to store items
  items: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.invoiceForm = this.formBuilder.group({
      // Define your form controls and validations here
      business_name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      invoice_number: ['', Validators.required],
      invoice_date: ['', Validators.required],
      due_date: ['', Validators.required],
    });

    // Initialize pdfMake with fonts
    this.pdfMake = pdfMake;
    this.pdfFonts = pdfFonts;
    this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

    ngOnInit(): void {
    // Set up initial state
    this.addItem(); // Add one item initially
  }

  // Add a new item to the items array
  addItem(): void {
    this.items.push({
      priceUnit: 0, // You can set an initial value if needed
      quantity: 1, // You can set an initial value if needed
      amount: 0, // Initialize amount property
    });
  }

  // Remove an item from the items array
  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  // Calculate the amount for an item
  calculateAmount(item: any): number {
    return item.priceUnit * item.quantity;
  }


  generatePDF() {
    // console.log(this.invoiceForm.value);
    // if (this.invoiceForm.value.valid) {
    const 
    { business_name , address, phone_number, email, invoice_number, invoice_date, due_date } =
      this.invoiceForm.value ;

  // Create an array to store the item data for the PDF table
  const itemData = this.items.map((item: any, index: number) => [
    `Item ${index + 1}`, // Item number (1-based index)
    item.quantity,
    `$${item.priceUnit.toFixed(2)}`, // Add USD sign and format unit price
    `$${(item.quantity * item.priceUnit).toFixed(2)}`, // Add USD sign and format amount
  ],);


    // Define the table structure
    const table = {
      table: {
        widths: ['*', 80, 80, 80], // Adjust column widths as needed
        headerRows: 1,
        body: [
          // Table header row
          [
            { text: 'Item', style: 'tableHeader' }, // Add a header for item numbers
            { text: 'Quantity', style: 'tableHeader' },
            { text: 'Price Unit', style: 'tableHeader' },
            { text: 'Amount', style: 'tableHeader' },
          ],
          ...itemData, // Add item data rows
        ],
      },
    };

    // Convert form data into PDF format using pdfMake
    const docDefinition = {
      content: [
        // Define the content of your PDF here
        { text: 'Invoice', style: 'header' },
        { text: `Geoproject Ke`, style: 'normal' },
        { text: `Nairobi, kenya`, style: 'normal' },
        { text: `+25471 958 1245`, style: 'normal' },
        { text: `geprojectke@gmail.com`, style: 'normal' },

        { text: 'Bill to:', style: 'subheader' },
        { text: `Business Name: ${business_name}`, style: 'normal' },
        { text: `Address: ${address}`, style: 'normal' },
        { text: `Phone Number: ${phone_number}`, style: 'normal' },
        { text: `Email: ${email}`, style: 'normal' },
        { text: `Invoice Number: ${invoice_number}`, style: 'subheader' },
        { text: `Invoice Date: ${invoice_date}`, style: 'subheader' },
        { text: `Payment due: ${due_date}`, style: 'subheader' },
        { text: 'Items:', style: 'subheader' }, table,
        { text: `Terms and conditions`, style: 'normal' },
        { text: `Terms and conditions go here`, style: 'signOff' },
      ],
      styles: {
        header: {
          fontSize: 36,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        normal:{
          fontSize: 13,
          bold: false,
          margin: [0, 10, 0, 5],
        },
        signOff: {
          fontSize: 10,
          bold: false,
          italics: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true, // Make text bold
          fillColor: 'orange', // Set the background color to orange
        },
      },
    };

    this.pdfMake.createPdf(docDefinition).open(); // Opens the PDF in a new tab
      // } else {
      //   // Handle invalid form data, show error messages, etc.
      // }
  }
}

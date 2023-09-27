import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'invoice-app';

  invoiceForm: any;
  pdfMake: any;
  pdfFonts: any;

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

  generatePDF() {
    // console.log(this.invoiceForm.value);
    // if (this.invoiceForm.value.valid) {
    const 
    { business_name , address, phone_number, email, invoice_number, invoice_date, due_date } =
      this.invoiceForm.value ;
    // console.log("Bonface ", this.invoiceForm.value.address);
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
        { text: 'Items:', style: 'subheader' },
        // {
        //   ul: items.map((item: any) => {
        //     return `${item.description} - Quantity: ${item.quantity}, Unit Price: $${item.unitPrice}`;
        //   }),
        // },
        // { text: `Total Amount: $${totalAmount}`, style: 'subheader' },
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
        }
      },
    };

    this.pdfMake.createPdf(docDefinition).open(); // Opens the PDF in a new tab
      // } else {
      //   // Handle invalid form data, show error messages, etc.
      // }
  }
}

import { Component, ViewChild, assertPlatform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {

  importForm: FormGroup;

  constructor(private fb: FormBuilder, private _setService: SetService, private _router:Router) {
    this.importForm = this.fb.group({
      contactListName: ["", Validators.required],
      csvFile: [null, [Validators.required, this.validateFileExtension]]
    });
  }

  validateFileExtension(control: any) {
    if (!control.value || !control.value.name.endsWith('.csv')) {
      return { accept: true };
    }
    return null;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.importForm.patchValue({
      csvFile: file
    });
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   const reader: FileReader = new FileReader();

  //   reader.onload = (e: any) => {
  //     const contents: string = e.target.result;
  //     const lines: string[] = contents.split('\n');
  //     // Extract header row (first line)
  //     const headerRow: string = lines[0];
  //     const headers: string[] = headerRow.split(',');

  //     console.log('Header row:', headers);
  //     // Update the form control with the selected file
  //     // this.importForm.patchValue({
  //     //   csvFile: file
  //     // });
  //   };
  //   reader.readAsText(file);
  // }

  onSubmit(): void {
    // if (this.importForm.valid) {
      // check list name already exist or not?

      // if exists show error

      // Submit the form data
      
      const apiUrl = this.apiMapping[this.selectedStatistic];
      this.importForm.value.contactListName = this.selectedStatistic
      
      const formdata = new FormData();
      formdata.append("file_path", this.importForm.value.csvFile);
      formdata.append("filename", this.importForm.value.contactListName);
      this._setService.postRequest_FormData(apiUrl, formdata)
        .pipe(
          // Handle error
          catchError(error => {
            console.error('Error uploading file:', error);
            return error;
          })
        )
        .subscribe(
          (response) => {
            alert("File Uploaded");
            this._router.navigate (['/home'])
            console.log('File uploaded successfully:', response);
            // Handle response as needed
          });
      console.log(this.importForm.value);
    // } else {
      // Form is invalid
      // Handle invalid form submission
    // }
  }




  selectedStatistic: string = '';

  apiMapping: { [key: string]: string } = {
    'Rotator Cuff Pathologies': 'file/rotator_cuff_pathologies',
    'Prevalence of Neer Three- or Four-part Proximal Humeral Fracture by Age & Sex': 'file/create_prevalence_Neer3_entry',
    'Anatomic Total Shoulder Arthroplasty by Indication': 'file/create_anatomic_total_shoulder_arthroplasty_entry',
    'Shoulder Arthroplasty by Complication': 'file/create_shoulder_arthroplasty_by_complication_entry',
    'Shoulder Arthroplasty Revision Rate by Sex': 'file/create_shoulder_arthroplasty_revision_rate_by_sex_entry',
    'Shoulder Arthroplasty Revision Rate by Age': 'file/create_shoulder_arthroplasty_revision_rate_by_age_entry',
    'Shoulder Arthroplasty by Sex': 'file/create_shoulder_arthroplasty_by_sex_entry',
    'Shoulder Arthroplasty by Age': 'file/create_shoulder_arthroplasty_by_age_entry',
    'Reverse Total Shoulder Arthroplasty by Indication': 'file/create_reverse_total_shoulder_arthroplasty_by_indication_entry',
    'Hemiarthroplasty by Age & Sex': 'file/create_hemiarthroplasty_by_age_and_sex_entry',
    'Anatomic Total Shoulder Arthroplasty by Age & Sex': 'file/create_anatomic_total_shoulder_arthroplasty_by_age_and_sex_entry',
    'Reverse Total Shoulder Arthroplasty by Age & Sex': 'file/create_reverse_total_shoulder_arthroplasty_by_age_and_sex_entry',
    'Prevalence of patients with Rotator cuff pathology with ≥ 1 comorbiditie by Age & Sex': 'file/create_prevalence_of_patients_with_rotatorcuff_pathology_greater1_comorbidity_entry',
    'Hemiarthroplasty by Indication': 'file/create_hemiarthroplasty_by_indication_entry',
    'Frequency of Prosthesis Company by Age': 'file/create_prosthesis_company_frequency_by_age_entry',
    'Frequency of Prosthesis Company by Indication': 'file/create_prosthesis_company_frequency_by_indication_entry',
    'Revision Rates of Prosthesis Company': 'file/create_revision_rates_of_prosthesis_company_entry'
  };

  // constructor(private http: HttpClient) {}

  // onSelectionChange(value: string) {
    // const apiUrl = this.apiMapping[value];
  // }
}
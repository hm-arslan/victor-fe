import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { Chart } from 'chart.js';
import { GetService } from 'src/app/services/get.service';

import { Chart } from '../../../../../../node_modules/chart.js/auto/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.register(ChartDataLabels);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private _getService: GetService) { }

  ngAfterViewInit(): void {
    this.renderChart()
  }

  @ViewChild('get_rotatorcuff_pathologies_with_counts') get_rotatorcuff_pathologies_with_counts: any;
  @ViewChild('get_prevalence_of_Neer3_by_age_and_sex') get_prevalence_of_Neer3_by_age_and_sex: any;
  @ViewChild('get_shoulder_arthroplasty_by_indication') get_shoulder_arthroplasty_by_indication: any;
  @ViewChild('get_reverse_shoulder_arthroplasty_by_indication') get_reverse_shoulder_arthroplasty_by_indication: any;
  @ViewChild('get_shoulder_arthroplasty_by_complication') get_shoulder_arthroplasty_by_complication: any;
  @ViewChild('get_shoulder_arthroplasty_by_age') get_shoulder_arthroplasty_by_age: any;
  @ViewChild('get_shoulder_arthoplasty_revision_rate_by_age') get_shoulder_arthoplasty_revision_rate_by_age: any;
  @ViewChild('get_shoulder_arthroplasty_by_sex') get_shoulder_arthroplasty_by_sex: any;
  @ViewChild('get_shoulder_arthoplasty_revision_rate_by_sex') get_shoulder_arthoplasty_revision_rate_by_sex: any;

  @ViewChild('get_hemiarthroplasty_by_age_and_sex') get_hemiarthroplasty_by_age_and_sex: any;
  @ViewChild('get_hemiarthroplasty_by_indication') get_hemiarthroplasty_by_indication: any;
  @ViewChild('get_anatomic_total_shoulder_arthroplasty_by_age_and_sex') get_anatomic_total_shoulder_arthroplasty_by_age_and_sex: any;
  @ViewChild('get_reverse_total_shoulder_arthroplasty_by_age_and_sex') get_reverse_total_shoulder_arthroplasty_by_age_and_sex: any;

  @ViewChild('get_prosthesis_company_frequency_by_age_group') get_prosthesis_company_frequency_by_age_group: any;
  @ViewChild('get_prosthesis_company_frequency_by_indication') get_prosthesis_company_frequency_by_indication: any;
  @ViewChild('get_revision_rates_of_prosthesis_company_by_indication') get_revision_rates_of_prosthesis_company_by_indication: any;
  @ViewChild('get_prevalence_of_rotatorcuff_pathology_with_comorbidities_by_age_and_sex') get_prevalence_of_rotatorcuff_pathology_with_comorbidities_by_age_and_sex: any;


  renderChart() {

    //#region 1.	Prevalence of Rotator Cuff Pathologies
    this._getService.getRequest('data/get_rotatorcuff_pathologies_with_counts').subscribe(
      res => {
        var x_values: string[] = [];
        var y_values: number[] = [];

        res.forEach((item: any) => {
          x_values.push(item.pathologies);
          y_values.push(item.total_count);
        });

        const get_rotatorcuff_pathologies_with_counts = this.get_rotatorcuff_pathologies_with_counts.nativeElement.getContext('2d');
        new Chart(get_rotatorcuff_pathologies_with_counts, {
          type: 'pie',
          data: {
            labels: x_values,
            datasets: [{
              data: y_values,
              backgroundColor: [
                '#4A90E2', // Blue
                '#F5A623', // Orange
                '#50E3C2', // Green
                '#824aa1', // Light Blue
                // '#f0fc03'  // Red
              ],
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Prevalence of Rotator Cuff Pathologies',
                color: '#fff'
              },
              legend: {
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  const dataArray = context.chart.data.datasets[0].data;
                  const total = dataArray.reduce((acc: number, val: number) => acc + val, 0);
                  const percentage = (value / total * 100).toFixed(0) + '%';
                  return percentage;
                },
                color: '#fff',
              }
            }
          },
          plugins: [ChartDataLabels],
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 2.	get_prevalence_of_rotatorcuff_pathology_with_comorbidities_by_age_and_sex
    this._getService.getRequest('data/get_prevalence_of_rotatorcuff_pathology_with_comorbidities_by_age_and_sex').subscribe(
      res => {
        const data = {
          labels: ['0-19', '20-39', '40-59', '60-79', '80+'],
          datasets: [
            {
              label: 'Male',
              data: [res[0].total_zero_19, res[0].total_twenty_39, res[0].total_forty_59, res[0].total_sixty_79, res[0].total_greater_than_80],
              backgroundColor: '#4A90E2'
            },
            {
              label: 'Female',
              data: [res[1].total_zero_19, res[1].total_twenty_39, res[1].total_forty_59, res[1].total_sixty_79, res[1].total_greater_than_80],
              backgroundColor: '#F5A623'
            },
            {
              label: 'Male+Female',
              data: [res[2].total_zero_19, res[2].total_twenty_39, res[2].total_forty_59, res[2].total_sixty_79, res[2].total_greater_than_80],
              backgroundColor: '#50E3C2'
            }
          ]
        };

        new Chart(this.get_prevalence_of_rotatorcuff_pathology_with_comorbidities_by_age_and_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: data,
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff'
                }
              },
              title: {
                display: true,
                text: 'Prevalence of Rotatorcuff Pathology with ≥ Comorbidity by Age and Sex',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'center',
                font: {
                  // weight: 'bold',
                  size: 8,
                }
              }
            },
            datasets: {
              bar: {
                barThickness: 20
              }
            },
          },
          // plugins: [ChartDataLabels],
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 3. get_prevalence_of_Neer3_by_age_and_sex
    this._getService.getRequest('data/get_prevalence_of_Neer3_by_age_and_sex').subscribe(
      res => {
        const maleData = {
          label: 'Male',
          data: res.filter((item: any) => item.sex__sex === 'Male').map((item: any) => [
            item.total_zero_19,
            item.total_twenty_39,
            item.total_forty_59,
            item.total_sixty_79,
            item.total_greaterThan_80
          ])[0].reverse(), // Flatten the array
          backgroundColor: '#4A90E2'
        };

        const femaleData = {
          label: 'Female',
          data: res.filter((item: any) => item.sex__sex === 'Female').map((item: any) => [
            item.total_zero_19,
            item.total_twenty_39,
            item.total_forty_59,
            item.total_sixty_79,
            item.total_greaterThan_80
          ])[0].reverse(), // Flatten the array
          backgroundColor: '#F5A623'
        };

        const labels = ['0-19', '20-39', '40-59', '60-79', '80+'].reverse();

        new Chart(this.get_prevalence_of_Neer3_by_age_and_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [maleData, femaleData]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
                beginAtZero: true
              },
              y: {
                title: {
                  display: true,
                  text: 'Age',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Prevalence of Neer 3-4 Proximal Humeral Fractures by Age & Sex',
                color: '#fff',
              },
              // datalabels: {
              //   formatter: (value: number, context: any) => {
              //     return value; 
              //   },
              //   color: '#fff',
              //   anchor: 'end',
              //   align: 'end',
              //   font: {
              //     size: 8,
              //   }
              // },
            },
            datasets: {
              bar: {
                barThickness: 10 // Change the value according to your preference
              }
            }
          }
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );

    //#endregion

    //#region 4.	get_hemiarthroplasty_by_age_and_sex
    this._getService.getRequest('data/get_hemiarthroplasty_by_age_and_sex').subscribe(
      res => {
        const labels = ['0-19', '20-39', '40-59', '60-79', '80+'];
        const maleData = {
          label: 'Male',
          data: [
            res[0].total_zero_19,
            res[0].total_twenty_39,
            res[0].total_forty_59,
            res[0].total_sixty_79,
            res[0].total_greater_than_80
          ],
          backgroundColor: '#4A90E2', // Default color for male
          borderColor: '#4A90E2',
          borderWidth: 1
        };
        const femaleData = {
          label: 'Female',
          data: [
            res[1].total_zero_19,
            res[1].total_twenty_39,
            res[1].total_forty_59,
            res[1].total_sixty_79,
            res[1].total_greater_than_80
          ],
          backgroundColor: '#F5A623', // Default color for female
          borderColor: '#F5A623',
          borderWidth: 1
        };

        // Create the bar chart
        new Chart(this.get_hemiarthroplasty_by_age_and_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [maleData, femaleData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff' // Legend text color
                },
              },
              title: {
                display: true,
                text: 'Hemiarthroplasty by Age and Sex',
                color: '#fff'
              },
              // datalabels: {
              //   formatter: (value: number, context: any) => {
              //     return value; // Display the value directly on the bar
              //   },
              //   color: '#fff',
              //   anchor: 'end',
              //   align: 'center',
              //   font: {
              //     // weight: 'bold',
              //     size: 8,
              //   }
              // },
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            },
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 4.1.	get_hemiarthroplasty_by_indication
    this._getService.getRequest('data/get_hemiarthroplasty_by_indication').subscribe(
      res => {

        const data = res.map((item: any) => item.total_number);
        // const labels = res.map((item: any) => item.indication__indication);
        const labels = res.map((item: any) => wrapLabel(replaceLabel(item.indication__indication), 10));

        function replaceLabel(label: string): string {
          switch (label) {
            case 'Three- or Four-part PHF':
              return 'Three-/Four-part PHF';
            case 'Avascular Necrosis without glenoid involvement':
              return 'Necrosis w/o glenoid involvement';
            case 'Osteoarthritis of Humeral Head with preserved glenoid surface':
              return 'OA of HH with preserved glenoid';
            case 'Osteoarthritis with poor glenoid bone stock':
              return 'OA with poor glenoid';
            default:
              return label;
          }
        }

        function wrapLabel(label: string, maxLineLength: number): string {
          const words = label.split(' ');
          let wrappedLabel = '';
          let line = '';
          for (const word of words) {
            if (line.length + word.length > maxLineLength) {
              wrappedLabel += line + '\n';
              line = '';
            }
            line += word + ' ';
          }
          wrappedLabel += line.trim();
          return wrappedLabel;
        }

        // Create the bar chart
        new Chart(this.get_hemiarthroplasty_by_indication.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              // label: 'Anatomic Total Shoulder Arthroplasty by Indication Number',
              data: data,
              backgroundColor: '#4A90E2'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Indication',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff', 
                  // maxRotation: 90, // Prevent automatic rotation
                  minRotation: 50,

                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                display: false,
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Hemiarthroplasty by Indication',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              },
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 6.	get_anatomic_total_shoulder_arthroplasty_by_age_and_sex
    this._getService.getRequest('data/get_anatomic_total_shoulder_arthroplasty_by_age_and_sex').subscribe(
      res => {
        const data = res;
        const labels = ['0-19', '20-39', '40-59', '60-79', '80+'];

        const maleData = {
          label: 'Male',
          data: [
            data[0].total_zero_19,
            data[0].total_twenty_39,
            data[0].total_forty_59,
            data[0].total_sixty_79,
            data[0].total_greater_than_80
          ],
          backgroundColor: '#4A90E2', // Default color for male
          borderColor: '#4A90E2',
          borderWidth: 1
        };

        const femaleData = {
          label: 'Female',
          data: [
            data[1].total_zero_19,
            data[1].total_twenty_39,
            data[1].total_forty_59,
            data[1].total_sixty_79,
            data[1].total_greater_than_80
          ],
          backgroundColor: '#F5A623', // Default color for female
          borderColor: '#F5A623',
          borderWidth: 1
        };

        new Chart(this.get_anatomic_total_shoulder_arthroplasty_by_age_and_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [maleData, femaleData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Anatomic Total Shoulder Arthroplasty by Age and Sex',
                color: '#fff'
              },
              // datalabels: {
              //   formatter: (value: number, context: any) => {
              //     return value; // Display the value directly on the bar
              //   },
              //   color: '#fff',
              //   anchor: 'end',
              //   align: 'center',
              //   font: {
              //     // weight: 'bold',
              //     size: 8,
              //   }
              // }
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            },
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 7. get_shoulder_arthroplasty_by_indication
    this._getService.getRequest('data/get_shoulder_arthroplasty_by_indication').subscribe(
      res => {
        const data = res.map((item: any) => item.total_number);
        const labels = res.map((item: any) => item.indication__indication);

        new Chart(this.get_shoulder_arthroplasty_by_indication.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              // label: 'Anatomic Total Shoulder Arthroplasty by Indication Number',
              data: data,
              backgroundColor: '#4A90E2'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Indication',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                display: false,
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Anatomic Total Shoulder Arthroplasty by Indication',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              },
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 8.	get_reverse_total_shoulder_arthroplasty_by_age_and_sex
    this._getService.getRequest('data/get_reverse_total_shoulder_arthroplasty_by_age_and_sex').subscribe(
      res => {
        const data = res;
        const labels = ['0-19', '20-39', '40-59', '60-79', '80+'];

        const maleData = {
          label: 'Male',
          data: [
            data[0].total_zero_19,
            data[0].total_twenty_39,
            data[0].total_forty_59,
            data[0].total_sixty_79,
            data[0].total_greater_than_80
          ],
          backgroundColor: '#4A90E2', // Default color for male
          borderColor: '#4A90E2',
          borderWidth: 1
        };

        const femaleData = {
          label: 'Female',
          data: [
            data[1].total_zero_19,
            data[1].total_twenty_39,
            data[1].total_forty_59,
            data[1].total_sixty_79,
            data[1].total_greater_than_80
          ],
          backgroundColor: '#F5A623', // Default color for female
          borderColor: '#F5A623',
          borderWidth: 1
        };

        new Chart(this.get_reverse_total_shoulder_arthroplasty_by_age_and_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [maleData, femaleData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Reverse Total Shoulder Arthroplasty by Age and sex',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'center',
                font: {
                  // weight: 'bold',
                  size: 8,
                }
              },
            },

            datasets: {
              bar: {
                barThickness: 20
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 9. get_reverse_shoulder_arthroplasty_by_indication
    this._getService.getRequest('data/get_reverse_shoulder_arthroplasty_by_indication').subscribe(
      res => {
        const data = res.map((item: any) => item.total_number);
        const labels = res.map((item: any) => item.indication__indication);

        new Chart(this.get_reverse_shoulder_arthroplasty_by_indication.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Reverse Shoulder Arthroplasty by Indication',
              data: data,
              backgroundColor: '#4A90E2'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Indication',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                display: false,
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Reverse Shoulder Arthroplasty by Indication',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              },
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 10.	get_shoulder_arthroplasty_by_age
    this._getService.getRequest('data/get_shoulder_arthroplasty_by_age').subscribe(
      res => {
        const hemiarthroplastyData = {
          label: 'Hemiarthroplasty',
          data: res.map((item: any) => item.total_hemiarthroplasty),
          fill: false,
          backgroundColor: '#4A90E2'
        };

        const anatomicTotalShoulderArthroplastyData = {
          label: 'Anatomic Total Shoulder Arthroplasty',
          data: res.map((item: any) => item.total_anatomic_total_shoulder_arthroplasty),
          fill: false,
          backgroundColor: '#F5A623'
        };

        const reverseTotalShoulderArthroplastyData = {
          label: 'Reverse Total Shoulder Arthroplasty',
          data: res.map((item: any) => item.total_reverse_total_shoulder_arthroplasty),
          fill: false,
          backgroundColor: '#50E3C2'
        };

        const labels = res.map((item: any) => item.age__agegroup);

        new Chart(this.get_shoulder_arthroplasty_by_age.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [hemiarthroplastyData, anatomicTotalShoulderArthroplastyData, reverseTotalShoulderArthroplastyData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Shoulder Arthroplasty by Age',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              },
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });

      },
      err => {
        console.error('Error fetching data:', err);
      }
    );

    //#endregion

    //#region 11.	get_shoulder_arthroplasty_by_sex
    this._getService.getRequest('data/get_shoulder_arthroplasty_by_sex').subscribe(
      res => {
        const maleData = {
          label: 'Male',
          data: [res[0].total_anatomic_total_shoulder_arthroplasty, res[0].total_hemiarthroplasty, res[0].total_reverse_total_shoulder_arthroplasty],
          fill: 'false',
          backgroundColor: '#4A90E2'
        };

        const femaleData = {
          label: 'Female',
          data: [res[1].total_anatomic_total_shoulder_arthroplasty, res[1].total_hemiarthroplasty, res[1].total_reverse_total_shoulder_arthroplasty],
          fill: 'false',
          backgroundColor: '#F5A623'
        };

        const labels = ['Hemiarthroplasty', 'Anatomic Total Shoulder Arthroplasty', 'Reverse Total Shoulder Arthroplasty'];

        new Chart(this.get_shoulder_arthroplasty_by_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [maleData, femaleData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Arthoplasty',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600 
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff'// Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Shoulder Arthroplasty by Sex',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              }
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 12.	get_shoulder_arthoplasty_revision_rate_by_age
    this._getService.getRequest('data/get_shoulder_arthoplasty_revision_rate_by_age').subscribe(
      res => {
        const hemiarthroplastyData = {
          label: 'Hemiarthroplasty',
          data: res.map((item: any) => item.total_hemiarthroplasty),
          fill: false,
          backgroundColor: '#4A90E2'
        };

        const anatomicTotalShoulderArthroplastyData = {
          label: 'Anatomic Total Shoulder Arthroplasty',
          data: res.map((item: any) => item.total_anatomic_total_shoulder_arthroplasty),
          fill: false,
          backgroundColor: '#F5A623'
        };

        const reverseTotalShoulderArthroplastyData = {
          label: 'Reverse Total Shoulder Arthroplasty',
          data: res.map((item: any) => item.total_reverse_total_shoulder_arthroplasty),
          fill: false,
          backgroundColor: '#50E3C2'
        };

        const labels = res.map((item: any) => item.age__agegroup);

        new Chart(this.get_shoulder_arthoplasty_revision_rate_by_age.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [hemiarthroplastyData, anatomicTotalShoulderArthroplastyData, reverseTotalShoulderArthroplastyData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age Group',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Shoulder Arthoplasty Revision Rate by Age Group',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the line
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              }
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );

    //#endregion

    //#region 13.	get_shoulder_arthoplasty_revision_rate_by_sex
    this._getService.getRequest('data/get_shoulder_arthoplasty_revision_rate_by_sex').subscribe(
      res => {
        const maleData = {
          label: 'Male',
          data: [res[0].total_anatomic_total_shoulder_arthroplasty, res[0].total_hemiarthroplasty, res[0].total_reverse_total_shoulder_arthroplasty],
          fill: false,
          backgroundColor: '#4A90E2'
        };

        const femaleData = {
          label: 'Female',
          data: [res[1].total_anatomic_total_shoulder_arthroplasty, res[1].total_hemiarthroplasty, res[1].total_reverse_total_shoulder_arthroplasty],
          fill: false,
          backgroundColor: '#F5A623', 
        };

        const labels = ['Hemiarthroplasty', 'Anatomic Total Shoulder Arthroplasty', 'Reverse Total Shoulder Arthroplasty'];

        new Chart(this.get_shoulder_arthoplasty_revision_rate_by_sex.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [maleData, femaleData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Arthoplasty',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Shoulder Arthoplasty Revision Rate by Sex',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              }
            },
            datasets: {
              bar: {
                barThickness: 20 // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 14.	get_shoulder_arthroplasty_by_complication
    this._getService.getRequest('data/get_shoulder_arthroplasty_by_complication').subscribe(
      res => {
        const hemiarthroplastyData = {
          label: 'Hemiarthroplasty',
          data: res.map((item: any) => item.total_hemiarthroplasty),
          backgroundColor: '#4A90E2'
        };

        const anatomicTotalShoulderArthroplastyData = {
          label: 'Anatomic Total Shoulder Arthroplasty',
          data: res.map((item: any) => item.total_anatomic_total_shoulder_arthroplasty),
          backgroundColor: '#F5A623'
        };

        const reverseTotalShoulderArthroplastyData = {
          label: 'Reverse Total Shoulder Arthroplasty',
          data: res.map((item: any) => item.total_reverse_total_shoulder_arthroplasty),
          backgroundColor: '#50E3C2'
        };

        const labels = res.map((item: any) => item.complication__complication);

        function getBarThickness() {
          return window.innerWidth < 1000 ? 10 : 20;
        }

        new Chart(this.get_shoulder_arthroplasty_by_complication.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [hemiarthroplastyData, anatomicTotalShoulderArthroplastyData, reverseTotalShoulderArthroplastyData]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Complication',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff', // Tick color for x-axis
                  // minRotation: 90,
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                beginAtZero: true,
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#fff' // Legend text color
                }
              },
              title: {
                display: true,
                text: 'Shoulder Arthroplasty by Complication',
                color: '#fff'
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  return value; // Display the value directly on the bar
                },
                color: '#fff',
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8,
                }
              },
            },
            datasets: {
              bar: {
                barThickness: getBarThickness() // Change the value according to your preference
              }
            }
          },
          // plugins: [ChartDataLabels]
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );
    //#endregion

    //#region 15.	get_prosthesis_company_frequency_by_age_group
    this._getService.getRequest('data/get_prosthesis_company_frequency_by_age_group').subscribe(
      res => {
        const data = res;
        const labels = ['0-19', '20-39', '40-59', '60-79', '80+'];

        const arthrexData = {
          label: 'Arthrex',
          data: data.map((item: any) => item.total_arthrex),
          backgroundColor: '#4A90E2',
          borderWidth: 1
        };

        const depuySynthesData = {
          label: 'DePuy Synthes',
          data: data.map((item: any) => item.total_depuy_synthes),
          backgroundColor: '#F5A623',  
          borderWidth: 1
        };

        const smithNephewData = {
          label: 'Smith & Nephew',
          data: data.map((item: any) => item.total_smith_nephew),
          backgroundColor: '#50E3C2', 
          borderWidth: 1
        };

        const strykerData = {
          label: 'Stryker',
          data: data.map((item: any) => item.total_stryker),
          backgroundColor: '#824aa1', 
          borderWidth: 1
        };

        const zimmerBiometData = {
          label: 'Zimmer Biomet',
          data: data.map((item: any) => item.total_zimmer_biomet),
          backgroundColor: '#c21b1b', 
          borderWidth: 1
        };

        const exactechData = {
          label: 'Exactech',
          data: data.map((item: any) => item.total_exacthech),
          backgroundColor: '#ffc7bf',
          borderWidth: 1
        };

        const limaData = {
          label: 'Lima',
          data: data.map((item: any) => item.total_lima),
          backgroundColor: '#f5f384', 
          borderWidth: 1
        };
        const fxSolution = {
          label: 'Fx Solution',
          data: data.map((item: any) => item.total_fx_soltuion),
          backgroundColor: '#ef5350', 
          borderWidth: 1
        };
        const enovisDJO = {
          label: 'Enovis DJO',
          data: data.map((item: any) => item.total_enovis_djo),
          backgroundColor: '#26c6da', 
          borderWidth: 1
        };

        new Chart(this.get_prosthesis_company_frequency_by_age_group.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [arthrexData, depuySynthesData, smithNephewData, strykerData, zimmerBiometData, exactechData, limaData, fxSolution, enovisDJO]
          },
          options: {
            responsive: true,
            indexAxis: 'y', // This makes the bar chart horizontal
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Frequency',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff', // Tick color for x-axis
                  stepSize: 500 // Set step size for x-axis ticks
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Age Group',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff'
                }
              },
              title: {
                display: true,
                text: 'Prosthesis Company Frequency by Age Group',
                color: '#fff'
              }
            },
            datasets: {
              bar: {
                barThickness: 20
              },
            },
          },
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );

    //#endregion

    //#region 16.	get_prosthesis_company_frequency_by_indication
    this._getService.getRequest('data/get_prosthesis_company_frequency_by_indication').subscribe(
      res => {
        const data = res.reverse();
        const labels = data.map((item: any) => item.indication__indication);
        const arthrexData = data.map((item: any) => item.total_arthrex);
        const depuyData = data.map((item: any) => item.total_depuy_synthes);
        const smithNephewData = data.map((item: any) => item.total_smith_nephew);
        const strykerData = data.map((item: any) => item.total_stryker);
        const zimmerBiometData = data.map((item: any) => item.total_zimmer_biomet);
        const exactechData = data.map((item: any) => item.total_exacthech);
        const limaData = data.map((item: any) => item.total_lima);

        new Chart(this.get_prosthesis_company_frequency_by_indication.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              { label: 'Arthrex', data: arthrexData, backgroundColor: '#4A90E2', borderWidth: 1 },
              { label: 'DePuy Synthes', data: depuyData, backgroundColor: '#F5A623', borderWidth: 1 },
              { label: 'Smith & Nephew', data: smithNephewData, backgroundColor: '#50E3C2', borderWidth: 1 },
              { label: 'Stryker', data: strykerData, backgroundColor: '#824aa1', borderWidth: 1 },
              { label: 'Zimmer Biomet', data: zimmerBiometData, backgroundColor: '#c21b1b', borderWidth: 1 },
              { label: 'Exactech', data: exactechData, backgroundColor: '#ffc7bf', borderWidth: 1 },
              { label: 'Lima', data: limaData, backgroundColor: '#f5f384', borderWidth: 1 }
            ]
          },
          options: {
            responsive: true,
            indexAxis: 'y', // This makes the bar chart horizontal
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Freuency',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                ticks: {
                  color: '#fff', // Tick color for x-axis
                  // stepSize: 500 // Set step size for x-axis ticks
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Indication',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff'
                }
              },
              title: {
                display: true,
                text: 'Prosthesis Company Frequency by Indication',
                color: '#fff'
              },
              // datalabels: {
              //   formatter: (value: number, context: any) => {
              //     return value; // Display the value directly on the bar
              //   },
              //   color: '#fff',
              //   anchor: 'end',
              //   align: 'center',
              //   font: {
              //     size: 8,
              //   }
              // }
            },
            datasets: {
              bar: {
                barThickness: 20
              }
            },
          },
          // plugins: [ChartDataLabels],
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );

    //#endregion

    // backgroundColor: '#4A90E2',
    // backgroundColor: '#F5A623', 
    // backgroundColor: '#50E3C2', 
    // backgroundColor: '#824aa1', 
    // backgroundColor: '#c21b1b', 
    // backgroundColor: '#ffc7bf', 
    // backgroundColor: '#f5f384', 
    //#region 17.	get_revision_rates_of_prosthesis_company_by_indication
    this._getService.getRequest('data/get_revision_rates_of_prosthesis_company_by_indication').subscribe(
      res => {
        const data = res.reverse(); // Assuming 'res' is the response from your API

        const labels = data.map((item: any) => item.indication__indication);
        const arthrexData = data.map((item: any) => item.total_arthrex);
        const depuyData = data.map((item: any) => item.total_depuy_synthes);
        const smithNephewData = data.map((item: any) => item.total_smith_nephew);
        const strykerData = data.map((item: any) => item.total_stryker);
        const zimmerBiometData = data.map((item: any) => item.total_zimmer_biomet);
        const exactechData = data.map((item: any) => item.total_exacthech);
        const limaData = data.map((item: any) => item.total_lima);
        const fxSolution = data.map((item: any) => item.total_fx_solution);
        const enovisDJO = data.map((item: any) => item.total_enovis_djo);

        new Chart(this.get_revision_rates_of_prosthesis_company_by_indication.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              { label: 'Arthrex', data: arthrexData, backgroundColor: '#4A90E2', borderWidth: 1 },
              { label: 'DePuy Synthes', data: depuyData, backgroundColor: '#F5A623', borderWidth: 1 },
              { label: 'Smith & Nephew', data: smithNephewData, backgroundColor: '#50E3C2', borderWidth: 1 },
              { label: 'Stryker', data: strykerData, backgroundColor: '#824aa1', borderWidth: 1 },
              { label: 'Zimmer Biomet', data: zimmerBiometData, backgroundColor: '#c21b1b', borderWidth: 1 },
              { label: 'Exactech', data: exactechData, backgroundColor: '#ffc7bf', borderWidth: 1 },
              { label: 'Lima', data: limaData, backgroundColor: '#f5f384', borderWidth: 1 },
              { label: 'Fx Solution', data: fxSolution, backgroundColor: '#ef5350', borderWidth: 1 },
              { label: 'Enovis DJO', data: enovisDJO, backgroundColor: '#26c6da', borderWidth: 1 }
            ]
          },
          options: {
            responsive: true,
            indexAxis: 'y', // This makes the bar chart horizontal
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Revision Rate',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight:600
                  }
                },
                ticks: {
                  color: '#fff', // Tick color for x-axis
                  // stepSize: 500
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Indication',
                  color: '#fff',
                  font: {
                    size: 16,
                    weight: 600
                  }
                },
                ticks: {
                  color: '#fff' // Tick color for y-axis
                },
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff'
                }
              },
              title: {
                display: true,
                text: 'Revision Rate of Prosthesis Company by Indication',
                color: '#fff'
              },
            },
            datasets: {
              bar: {
                barThickness: 20
              }
            },
          },
        });
      },
      err => {
        console.error('Error fetching data:', err);
      }
    );


    //#endregion



  }

}
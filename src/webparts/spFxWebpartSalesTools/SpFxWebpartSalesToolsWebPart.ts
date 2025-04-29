import { AadHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxWebpartSalesToolsWebPartStrings';
import SpFxWebpartSalesTools from "./components/SpFxWebpartSalesTools";
import { ISpFxWebpartSalesToolsProps } from "./components/ISpFxWebpartSalesToolsProps";
import { Course } from "./components/ISpFxWebpartSalesToolsProps";


export interface ISpFxWebpartSalesToolsWebPartProps {
  description: string;
  uniqueAdsm: string[];
  uniqueRoles: string[];
  checkboxAdsm: string[];
  checkboxRoles: string[];
  backend_app_id: string;
  backend_url: string;
}


// interface Course {
//   id: string;
//   adsm: string;
//   name: string;
//   role: string;
//   originalid: number;
//   levelName: string;
//   completed: boolean;
//   course: string;
//   cid: string;
//   coriginalid: number;
//   accessUrl: string;
//   CourseImageURL: string;
// }

type PropertyPaneFieldValue = string | boolean | number | undefined;
export default class ISpFxWebpartSalesToolsWebPart extends BaseClientSideWebPart<ISpFxWebpartSalesToolsWebPartProps> {

  private Client: AadHttpClient;
  private trainingData: any;
  private newAdsm: string = '';
  private newRole: string = '';

  public render(): void {
    if(!this.properties.backend_app_id){
      this.domElement.innerHTML = `<p>No backend_app_id</p>`;
      return;
    } 
    if(!this.properties.backend_url){
      this.domElement.innerHTML = `<p>No backend_url</p>`;
      return;
    }
    else 
    // Defer rendering until `trainingData` is fetched
    if (!this.trainingData) {
      this.domElement.innerHTML =
      `<div class="flex justify-center items-center h-full w-full">
      <button disabled type="button" class="text-white bg-[#41273c]  hover:bg-[#896f85] hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
</button>
</div>`; // Optional: show a loading message

console.time("📡 Fetching from:");

this.Client.get(
        // "https://training-tools-portal-stg.checkpoint.com/sp-data/4sp/Sales tools and processes | Video",

        `${this.properties.backend_url}`,
        AadHttpClient.configurations.v1
      )
        .then((response: HttpClientResponse): Promise<{data : Course[]}> => {
          if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data: {data : Course[]}): void => {
          this.trainingData = data;
          console.timeEnd("📡 Fetching from:"); 

          this.render();
        })
        .catch((error) => {
          console.error(error);
        });

      return;
    }

    // console.log(this.trainingData);

    const element: React.ReactElement< ISpFxWebpartSalesToolsProps>
     = React.createElement(
  SpFxWebpartSalesTools,
      {
        trainingData: this.trainingData,
        description: this.properties.description || "Sales Tools & Processes",
        uniqueAdsm: this.properties.uniqueAdsm || [],
        uniqueRoles: this.properties.uniqueRoles || [],
        checkboxAdsm: this.properties.checkboxAdsm || [],
        checkboxRoles: this.properties.checkboxRoles || [],
        backend_app_id: this.properties.backend_app_id,
        backend_url: this.properties.backend_url,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return new Promise<void>(
      (resolve: () => void, reject: (err: Error) => void): void => {
        this.context.aadHttpClientFactory
      // 56214ef0-66f7-4e05-b871-eed7a16a7fb8
        .getClient(`api://${this.properties.backend_app_id}/`)
        .then((client: AadHttpClient) => {
          this.Client = client;
          resolve(); 
        })
        .catch((err: Error) => reject(err)); // Handle promise rejection with Error type
    });
  }
  

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }


  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: PropertyPaneFieldValue, newValue: PropertyPaneFieldValue): void {
    
    if (propertyPath.startsWith('adsm_')) {
      const index = parseInt(propertyPath.split('_')[1], 10);
      // console.log(this.properties.checkboxAdsm)
      if (newValue===false) {
        this.properties.uniqueAdsm = this.properties.uniqueAdsm.filter(p => p !== this.properties.checkboxAdsm[index]);
        // console.log(this.properties.uniqueAdsm)
        // console.log("new",newValue);
        this.context.propertyPane.refresh();
        this.render();

      }
      else if (this.properties.uniqueAdsm.indexOf(this.properties.checkboxAdsm[index]) === -1) {
        this.properties.uniqueAdsm = [...this.properties.uniqueAdsm, this.properties.checkboxAdsm[index]];
        this.context.propertyPane.refresh();
        this.render();
      }
    }


    if (propertyPath.startsWith('role_')) {
      const index = parseInt(propertyPath.split('_')[1], 10);
      // console.log(this.properties.checkboxRoles)
      if (newValue===false) {
        this.properties.uniqueRoles = this.properties.uniqueRoles.filter(p => p !== this.properties.checkboxRoles[index]);
        // console.log(this.properties.uniqueRoles)
        this.context.propertyPane.refresh();
        this.render();

      }
      else if (this.properties.uniqueRoles.indexOf(this.properties.checkboxRoles[index]) === -1) {
        this.properties.uniqueRoles = [...this.properties.uniqueRoles, this.properties.checkboxRoles[index]];
        this.context.propertyPane.refresh();
        this.render();
      }
    }
    

    if (propertyPath === "newAdsm") {
      this.newAdsm = newValue as string;
    }
    if (propertyPath === "newRole") {
      this.newRole = newValue as string;
    }

    if (propertyPath === "description") {
      this.render();
    }
    if (propertyPath === "backend_app_id") {
      this.onInit().catch(err => console.error(err));
    }
    if (propertyPath === "backend_url") {
      this.onInit().catch(err => console.error(err));
    }
 
  }

  protected onPropertyPaneConfigurationComplete(): void {
    if (this.newAdsm && this.properties.uniqueAdsm.indexOf(this.newAdsm) === -1) {
      this.properties.uniqueAdsm = [...this.properties.uniqueAdsm, this.newAdsm];
      this.properties.checkboxAdsm = [...this.properties.checkboxAdsm, this.newAdsm];
      this.newAdsm = '';
    }
    if (this.newRole && this.properties.uniqueRoles.indexOf(this.newRole) === -1) {
      this.properties.uniqueRoles= [...this.properties.uniqueRoles, this.newRole];
      this.properties.checkboxRoles = [...this.properties.checkboxRoles, this.newRole];
      this.newAdsm = '';
    }
    this.render()
  }

protected onDispose(): void {
  ReactDom.unmountComponentAtNode(this.domElement);
}

protected get dataVersion(): Version {
  return Version.parse('1.0');
}


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const dynamicAdsm = this.properties.checkboxAdsm.map((adsm, index) =>
      PropertyPaneCheckbox(`adsm_${index}`, {
        text: adsm,
        checked: true
        
      })
    );
    const dynamicRoles = this.properties.checkboxRoles.map((role, index) =>
      PropertyPaneCheckbox(`role_${index}`, {
        text: role,
        checked: true
        
      })
    );
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('backend_app_id',{
                  label: "Please enter backend app id"
                }),
                PropertyPaneTextField('backend_url',{
                  label: "Please enter backend url"
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: "Dynamic Fields",
              groupFields: [
                PropertyPaneTextField('newAdsm', {
                  label: "Add a new ADSM",
                  description: "Type the ADSM name and press enter",
                  onGetErrorMessage: (value) => {
                    if (this.properties.uniqueAdsm.indexOf(value) !== -1) {
                      return "Adsm already exists!";
                    }
                    return "";
                  }
                }),
                ...dynamicAdsm,

                PropertyPaneTextField('newRole', {
                  label: "Add a new Role",
                  description: "Type the Role name and press enter",
                  onGetErrorMessage: (value) => {
                    if (this.properties.uniqueRoles.indexOf(value) !== -1) {
                      return "Role already exists!";
                    }
                    return "";
                  }
                }),
                
                ...dynamicRoles
              ]
            }
          ]
        }
      ]
    };
  }
}
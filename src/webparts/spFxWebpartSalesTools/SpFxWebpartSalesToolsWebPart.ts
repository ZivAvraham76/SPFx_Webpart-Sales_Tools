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


export interface IZiv1WebPartProps {
  description: string;
  uniqueAdsm: string[];
  uniqueRoles: string[];
  checkboxAdsm: string[];
  checkboxRoles: string[];
  backend_app_id: string;
}


interface Course {
  id: string;
  adsm: string;
  name: string;
  role: string;
  originalid: number;
  levelName: string;
  completed: boolean;
  course: string;
  cid: string;
  coriginalid: number;
  accessUrl: string;
}

type PropertyPaneFieldValue = string | boolean | number | undefined;
export default class Ziv1WebPart extends BaseClientSideWebPart<IZiv1WebPartProps> {

  private Client: AadHttpClient;
  private trainingData: {data : Course[]};
  private newAdsm: string = '';
  private newRole: string = '';


  public render(): void {
    if(!this.properties.backend_app_id){
      this.domElement.innerHTML = `<p>No backend_app_id</p>`;
      return;
    } else 
    // Defer rendering until `trainingData` is fetched
    if (!this.trainingData) {
      this.domElement.innerHTML = `<p>Loading...</p>`; // Optional: show a loading message

      this.Client.get(
        "http://localhost:3000/sp-data/4sp/Sales tools and processes | Video",
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
          this.render();
        })
        .catch((error) => {
          console.error(error);
        });

      return;
    }

    console.log(this.trainingData);

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
      console.log(this.properties.checkboxAdsm)
      if (newValue===false) {
        this.properties.uniqueAdsm = this.properties.uniqueAdsm.filter(p => p !== this.properties.checkboxAdsm[index]);
        console.log(this.properties.uniqueAdsm)
        console.log("new",newValue);
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
      console.log(this.properties.checkboxRoles)
      if (newValue===false) {
        this.properties.uniqueRoles = this.properties.uniqueRoles.filter(p => p !== this.properties.checkboxRoles[index]);
        console.log(this.properties.uniqueRoles)
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
                      return "Pilar already exists!";
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
                      return "Pilar already exists!";
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

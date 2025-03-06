import { AadHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxWebpartSalesToolsWebPartStrings';
import SpFxWebpartSalesTools from "./components/SpFxWebpartSalesTools";
import { ISpFxWebpartSalesToolsProps } from "./components/ISpFxWebpartSalesToolsProps";

export interface IZiv1WebPartProps {
  description: string;
}

export default class Ziv1WebPart extends BaseClientSideWebPart<IZiv1WebPartProps> {

  private Client: AadHttpClient;
  private trainingData: any;

  public render(): void {
    // Defer rendering until `trainingData` is fetched
    if (!this.trainingData) {
      this.domElement.innerHTML = `<p>Loading...</p>`; // Optional: show a loading message

      this.Client.get(
        "http://localhost:3000/sp-data/4sp/Sales tools and processes | Video",
        AadHttpClient.configurations.v1
      )
        .then((response: HttpClientResponse): Promise<any> => {
          if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data: {}): void => {
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
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return new Promise<void>(
      (resolve: () => void, reject: (err: any) => void): void => {
        this.context.aadHttpClientFactory
          .getClient("api://56214ef0-66f7-4e05-b871-eed7a16a7fb8/")
          .then((client: AadHttpClient): void => {
            this.Client = client;
            resolve();
          });
      }
    );
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


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
            }
          ]
        }
      ]
    };
  }
}

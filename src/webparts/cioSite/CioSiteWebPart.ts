import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createContext } from "react";
import { Version } from '@microsoft/sp-core-library';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'CioSiteWebPartStrings';
import CioSite from './components/CioSite';
import { ICioSiteProps } from './components/ICioSiteProps';

export interface ICioSiteWebPartProps {
  lists: string | string[];
  description: string;
  tColor:string;
  showTitle:boolean;
  webpartTitle:string;
  plainNav:boolean;
  titleFont:string;
  noofTiles:string;
  showImageTitle:boolean;
  tabColor:string,
  tabfont:string;
  color:string;
  Accordion:boolean;
  imagenav:boolean;
  tabType:string;
  shadowsize:string;
  
}

export default class CioSiteWebPart extends BaseClientSideWebPart<ICioSiteWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICioSiteProps> = React.createElement(
      CioSite,
      {
        description: this.properties.description,
        websiteUrl:this.context.pageContext.site.absoluteUrl,
        tColor:this.properties.tColor,
        showTitle:this.properties.showTitle,
        webpartTitle:this.properties.webpartTitle,
        plainNav:this.properties.plainNav,
        tFont:this.properties.titleFont,
        noofTiles:this.properties.noofTiles,
        showImageTitle:this.properties.showImageTitle,
        tabColor:this.properties.tabColor,
        tabfont:this.properties.tabfont,
        color:this.properties.color,
        lists:this.properties.lists as any,
        Accordion:this.properties.Accordion,
        imagenav:this.properties.imagenav,
        tabType:this.properties.tabType,
        shadowsize:this.properties.shadowsize,
        
        onConfigure: () => {
          this.context.propertyPane.open();
        }
       
      }
    );

    ReactDom.render(element, this.domElement);
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
            description: 'Please Configure Web Part Properties'
          },
          displayGroupsAsAccordion:true,
          groups: [
            

            {
              groupName: 'LIST PROPERTIES',
              isCollapsed:false,
              groupFields: [
                
                PropertyPaneTextField('color', {
                  label: 'Shadow Color'
                }),
              

               /*  PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }) ,
 */
                 PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })

              ]
            },
            {
              groupName:'WEB PPART TITLE PROPERTIES',
              isCollapsed:false,
              groupFields: [
                PropertyPaneCheckbox('showTitle', {
                  text: 'Show title bar',
                  checked:false
                 }),
               
                
                PropertyPaneTextField('tColor', {
                  label: 'Title background color(eg. green, #ccc)'
                }),
              
                PropertyPaneTextField('webpartTitle', {
                  label: 'Web part title text'
                }),
                PropertyPaneSlider('titleFont',{  
                  label:"Title font size",  
                  min:10,  
                  max:30,  
                  value:14,  
                  showValue:true,  
                  step:1                
                }),
                
              ]
            },
            {
              groupName: 'NAV TAB PROPERTIES',
              isCollapsed:false,
              groupFields: [
                
                PropertyPaneCheckbox('showImageTitle', {
                  text: 'Display image nav titles',
                  checked:true
                 }),

                 PropertyPaneDropdown('tabType', {
                  label: 'Select Tabs Used to Navigate',
                  options: [
                  { key: 'images', text: 'Images'},
                  { key: 'plain', text: 'Plain' },
                  { key: 'dialog', text: 'Dialog on Title' },
                  { key: 'accordion', text: 'Accordion' }
                  ],
                  selectedKey: 'images',
                  }),
                
                PropertyPaneSlider('noofTiles',{  
                  label:"Number of tabs/tiles used(up to 8 supported)",  
                  min:1,  
                  max:12,  
                  value:6,  
                  showValue:true,  
                  step:1                
                }),
                PropertyPaneTextField('tabColor', {
                  label: 'Plain tab/Accordion background color'
                }),
                PropertyPaneSlider('shadowsize',{  
                  label:"Selected Images Tab shadow width",  
                  min:10,  
                  max:40,  
                  value:10,  
                  showValue:true,  
                  step:1                
                }),
                PropertyPaneSlider('tabfont',{  
                  label:"Plain tabs/Accorion font size",  
                  min:10,  
                  max:30,  
                  value:14,  
                  showValue:true,  
                  step:1                
                }),
              ]
            },
          ]
          
        }
      ]
    };
  }

  
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'tabType','showTitle','lists',
    ];
    //alert('props updated');
    console.log('onPropertyPaneFieldChanged:', propertyPath, oldValue, newValue);
    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;
      this.context.propertyPane.refresh();
    } else {super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);

    }
    this.render();
  }

}



import * as React from "react";
import { sp, Web, IWeb } from "@pnp/sp/presets/all";
import { AnimatedDialog } from "@pnp/spfx-controls-react/lib/AnimatedDialog";
import "bootstrap/dist/css/bootstrap.min.css";
import { ICioSiteProps } from "./ICioSiteProps";
import "office-ui-fabric-react/dist/css/fabric.css";
import "./hoverall.css";
import styles from "./CioSite.module.scss";
 import './reactAccordion.css';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { SPComponentLoader } from "@microsoft/sp-loader";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "@pnp/spfx-controls-react/lib/AccessibleAccordion";
import { DefaultButton, DialogFooter, DialogType, IDialogContentProps, IModalProps, PrimaryButton } from "office-ui-fabric-react";

require("bootstrap");
export interface CioSiteStateState {
  Richtxt: any;
  listitems: any;
  Title: any;
  ImageUrl: any;
  SelectedItem: any;
  showAnimatedDialog: boolean
}
const animatedModalProps= {
  isDarkOverlay: true
};

export default class CioSite extends React.Component<
  ICioSiteProps,
  CioSiteStateState
> {
  public constructor(props: ICioSiteProps, state: CioSiteStateState) {
    super(props);
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    );
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    );
 ;
    
    this.state = {
      listitems: [],
      Title: "First_Title",
      ImageUrl: "",
      Richtxt: "",
      SelectedItem: "First_Title",
      showAnimatedDialog:false
    };

    
  }

  

  public async componentDidMount() {
    await this.fetchData();
  }

  public async componentDidUpdate(prevous) {
    //may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition TO PREVENT INFINIT LOOP 
    if (prevous.tabType !== this.props.tabType) {
      await this.fetchData();
    }
  }
  changeTitle = async (newTItle) => {
    this.setState({
      SelectedItem: newTItle,
    });
  };
  public async fetchData() {
    let web = Web(this.props.websiteUrl);
    const lname = this.props.lists;
    const items = await web.lists.getById(lname).items.get();
    this.setState({ listitems: items });
    if (this.props.tabType !== "accordion") {
     // this.setState({ Richtxt: items[0].Richtxt });
    }
  }

  public render(): React.ReactElement<ICioSiteProps> {
    const defaultfunc = (() => {
      const itemCol = this.state.listitems.length;

      const arrays = [
        "col-lg-12 col-md-12 col-sm-12 col-xs-12",
        "col-lg-6 col-md-6 col-sm-6 col-xs-2",
        "col-lg-4 col-md-4 col-sm-4 col-xs-2",
        "col-lg-3 col-md-3 col-sm-3 col-xs-2",
        "col-md-5ths col-lg-5ths col-sm-5ths col-xs-5ths",
        "col-lg-2 col-md-2 col-sm-2 col-xs-2",
        "col-7",
        "col-lg-8r col-md-8r col-sm-8r col-xs-8r",
        "col-9",
        "col-10",
      ];
      switch (itemCol) {
        case 1:
          return arrays[0];
        case 2:
          return arrays[1];
        case 3:
          return arrays[2];
        case 4:
          return arrays[3];
        case 5:
          return arrays[4];
        case 6:
          return arrays[5];
        case 7:
          return arrays[6];
        case 8:
          return arrays[7];
        case 9:
          return arrays[8];
        case 10:
          return arrays[9];
      }
    })();

    const selectedImageTitle = {
      fontWeight: "bold",
      textDecoration: "underline",
      fontSize: "14px",
      fontFamily: "Segoe UI",
    };

   /*  const animatedDialogContentProps = {
      type: DialogType.largeHeader,
      title: 'Animated Dialog',
      subText: 'Do you really like the animated dialog?, Please help me',
    }
 */
    const unSelectedImageTitle = {
      fontSize: "14px",
      fontFamily: "Segoe UI",
    };

    const listSelected: boolean =
      typeof this.props.lists !== "undefined" && this.props.lists.length > 0;
    const unselectedNav = {
      color: "#fff",
      width: "100%",
      fontSize: this.props.tabfont,
      textAlign: "center" as "center",
      paddingTop: "5px",
      paddingBottom: "5px",
      borderRadius: "5px",
      backgroundColor: this.props.tabColor || "red",
    };

    const selectedNav = {
      color: "#fff",
      width: "100%",
      textAlign: "center" as "center",
      paddingTop: "5px",
      fontSize: this.props.tabfont,
      paddingBottom: "5px",
      borderRadius: "5px",
      backgroundColor: "#ccc",
    };

    const colsfunc = (() => {
      const tabs = {
        oneRow: "col-lg-12 col-md-12 col-sm-12 col-xs-12",
        sixRow: "col-lg-2 col-md-2 col-sm-2 col-xs-2",
        fourRow: "col-lg-3 col-md-3 col-sm-3 col-xs-2",
        threeRow: "col-lg-4 col-md-4 col-sm-4 col-xs-2",
        twoRow: "col-lg-6 col-md-6 col-sm-6 col-xs-2",
        fiveRow: "col-md-5ths col-lg-5ths col-sm-5ths col-xs-5ths",
        eightRow: "col-lg-8r col-md-8r col-sm-8r col-xs-8r",
        sevenRow: "col-7",
        nineRow: "col-9",
        tenRow: "col-10",
      };
      switch (this.props.noofTiles as any) {
        case 1:
          return tabs.oneRow;
        case 2:
          return tabs.twoRow;
        case 3:
          return tabs.threeRow;
        case 4:
          return tabs.fourRow;
        case 5:
          return tabs.fiveRow;
        case 6:
          return tabs.sixRow;
        case 7:
          return tabs.sevenRow;
        case 8:
          return tabs.eightRow;
        case 9:
          return tabs.nineRow;
        case 10:
          return tabs.tenRow;
        default:
          return defaultfunc;
      }
    })();

    return (
      <div className="panel">
        {!listSelected && (
          <Placeholder
            iconName="DeveloperTools"
            iconText="Configure your web part"
            description="Select a list with a Title field and Content field and refresh to have contents rendred"
            buttonLabel="Choose a List"
            onConfigure={this.props.onConfigure}
          />
        )}
         
        {this.props.showTitle && (
          <div
            className="panel-heading lowpadding"
            style={{
              backgroundColor: this.props.tColor || "red",
              color: "white",
              fontSize: this.props.tFont,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {this.props.webpartTitle}
          </div>
        )}
        {this.props.tabType === "dialog" && (
        
    
          <>
          {this.state.listitems.map((listitem) => {
           // const richtxt = listitem.Richtxt;
            return (
              <>
        <button className="btn btn-Primary" type="button" onClick={() =>{this.setState({showAnimatedDialog:!this.state.showAnimatedDialog}) }}> {listitem.Title}</button>
           <AnimatedDialog
                    hidden={!this.state.showAnimatedDialog}
                    onDismiss={() => { this.setState({ showAnimatedDialog: false }); }}
                    dialogContentProps = {{ 
                       type: DialogType.largeHeader,
                        title: listitem.Title,
                        subText: `This is funy ${listitem.Title}`,
                      
                      }
                    
                    }
                    modalProps={animatedModalProps}
                    
    >
        <DialogFooter>
            <PrimaryButton onClick={() => {
               this.setState({ showAnimatedDialog: false }); 
               }} text="Yes" />
            <DefaultButton onClick={() => { 
              this.setState({ showAnimatedDialog: false });
              alert('Heeya')
              }} text="No" />
        </DialogFooter>
      </AnimatedDialog>
      </>
)})} 
         </> 
        )}
        {this.props.tabType == "images" && (
          <>
                 
            <div className="panel-body">
              <div className="imagesTop row fix">
                {this.state.listitems.map((listitem) => {
                  return (
                    <div className={`${colsfunc} txtalign`}>
                      <img
                        src={listitem.ImageUrl}
                        style={{
                          boxShadow:
                            this.state.SelectedItem === listitem.Title
                              ? `0px 0px ${this.props.shadowsize}px ${this.props.color}`
                              : "",
                          borderRadius: "5px",
                          width: "100%",
                          height: "auto",
                          maxHeight:'60px'
                        }}
                        className="blockPanel img-responsive"
                        title={listitem.Title}
                        onClick={() => {
                          this.changeTitle(listitem.Title);
                          this.setState({ Richtxt: listitem.Richtxt });
                        }}
                      />

                      {this.props.showImageTitle && (
                        <span
                          style={
                            this.state.SelectedItem === listitem.Title
                              ? selectedImageTitle
                              : unSelectedImageTitle
                          }
                        >
                          {listitem.Title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {this.props.tabType === "accordion" && (
          <Accordion allowZeroExpanded allowMultipleExpanded>
                        

            {this.state.listitems.map((listitem) => {
              const isExpanded = this.state.listitems.length < 2;
              return (
                <AccordionItem dangerouslySetExpanded={isExpanded}>
                  <AccordionItemHeading  style={{
                        backgroundColor: "#c7c7c7" || this.props.tabColor,
                        borderRadius: "10px",
                        fontSize: this.props.tabfont,
                        fontWeight: 900,
                        textAlign: "center",
                      }}>
                    <AccordionItemButton
                     
                    >
                      {listitem.Title}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div
                      className="panel-body"
                      dangerouslySetInnerHTML={{ __html: listitem.Richtxt }}
                    />
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}

        {this.props.tabType == "plain" && (
          <>
                  
            <div className="panel-body">
              <div className="imagesTop row fix">
                {this.state.listitems.map((listitem) => {
                  return (
                    <div
                      className={`${colsfunc}  blockPanel lessPaddingLeftRight`}
                    >
                      <div
                        onClick={() => {
                          this.changeTitle(listitem.Title);
                          this.setState({ Richtxt: listitem.Richtxt });
                        }}
                        style={
                          this.state.SelectedItem === listitem.Title
                            ? selectedNav
                            : unselectedNav
                        }
                      >
                        {listitem.Title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {this.props.tabType !== "accordion" && (
          <div className="panel">
            <div
              className="panel-body"
              dangerouslySetInnerHTML={{ __html: this.state.Richtxt }}
            />
          </div>
        )}
      </div>
    );
  }
}

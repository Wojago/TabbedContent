import * as React from "react"

export interface CyberInterface{
hover:boolean;
}
class ITCyber extends React.Component<{}, CyberInterface> {
    constructor(props) {
      super(props)
      this.state = { hover: false }
    }
    handleMouseIn() {
        this.setState({ hover: true })
      }
      
      handleMouseOut() {
        this.setState({ hover: false })
      }
    render() {
        const tooltipStyle = {
            display: this.state.hover ? 'block' : 'none'
          }
          
    return (
        <div>
  <div className="panel-body nopadding" style={{position:'relative'}}>
<div className="panel-heading">

    <ul className="tree">
        <li>
            <span className="sttp"  title="Cyber Security" onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}> Cyber Security</span>
            <ul>
                <li>
                    <span className="stts" title="Enterprise Mission Support Branch">Cyber Security</span>
                    <div style={tooltipStyle}>this is the tooltip! for cyber security!</div>
                    <ul>
                        <li> <span className="sttl" title="Compliance Monitoring and Change Management  Section">Compliance Monitoring and Change Management  Section</span></li>
                        <li> <span className="sttl" title="Enterprise Architecture Section ">Enterprise Architecture Section </span></li>
                        <li> <span className="sttl" title="IT Policy Section">IT Policy Section</span></li>
                        <li> <span className="sttl" title="Project Authorization & Requirements Section">Project Authorization & Requirements Section</span></li>
                    </ul>
                </li>
                <li>
                    <span className="stts" title="IT Investment Management Branch ">Cyber Security </span>
                    <ul>
                        <li> <span className="sttl" title="CPIC Oversight Section">CPIC Oversight Section</span></li>
                        <li> <span className="sttl" title="IT Portfolio Section">IT Portfolio Section</span></li>
                    </ul>
               </li>
            </ul>
        </li>
    </ul>
</div>
{/* <div ng-show="display" className="fixedtoolTip" >

    <div className="panel panel-warning">       

        <div className="panel-body text-center" >

            <p>

            All e-mail to/from this account is subject to official review and is for official use only. Action may be taken in response to any inappropriate use of the Secret Service's e-mail system. This e-mail may contain information that is privileged, law enforcement sensitive, or subject to other disclosure limitations. Such information is loaned to you and should not be further disseminated without the permission of the Secret Service. If you have received this e-mail in error, do not keep, use, disclose, or copy it; notify the sender immediately and delete it.   

            </p>       

        </div>

  
</div> */}

<div> All Cyber Security Links will be here..<span className="fas fa-camera"></span></div>
</div>
</div>
      )}
}

export default ITCyber
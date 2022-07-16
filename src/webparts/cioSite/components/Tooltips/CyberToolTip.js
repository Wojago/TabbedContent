import * as React from "react"
const CyberToolTip = () => {
    return (
        <div>
        <div onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>on hover here we will show the tooltip</div>
        <div>
          <div style={tooltipStyle}>this is the tooltip!!</div>
        </div>
      </div>

    )

    const tooltipStyle = {
        display: this.state.hover ? 'block' : 'none'
      }

}

export default CyberToolTip